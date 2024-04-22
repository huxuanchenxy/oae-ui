<template>
  <div>
    <div>选中节点后拖动以创建连线，右键在当前位置新建节点,选中后右键可删除节点</div>
    <div id="container" ref="container"></div>
  </div>
</template>

<script setup lang="ts">
import G6 from "@antv/g6";
import { v4 as uuidv4 } from 'uuid';
import { pagetagsStore } from "@/store/pageTags.js";
const tagsStore = pagetagsStore();
const router = useRouter();
const route = useRoute();
const prefState="state";
const prefAlg="alg";
const prefEvent="event";
const prefCombo="combo";
let pid = ref("");
let id = ref("");
let sourceAnchorIdx, targetAnchorIdx;
const container = ref<any>(null);
let width = container.scrollWidth;
let height = (container.scrollHeight || 500) - 20;
let graph;
let graphWidth;
const startGraphSize=[60,25];
const stateGraphSize=[60,25];
const algGraphSize=[50,25];
const algEveSize=[50,25];
const lineWidth=20;
const nodeVertiPadding=20;//算法节点垂直的间隔距离
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
let mouseX,mouseY;
const contextMenu = new G6.Menu({
  getContent(evt) {
      let str="";
      if (evt.target && evt.target.isCanvas && evt.target.isCanvas()) {
        mouseX = evt.clientX;
        mouseY = evt.clientY;
        str= "<ul><li>新建</li>";
      } else if (evt.item) {
        str= "<ul><li>删除</li>";
      }
      return str;
  },
  handleMenuClick: (target, item) => {
    // console.log(`自定义右键菜单\nX: ${x}\nY: ${y}`);
    if(item){
      //如果右键的是节点或其他
      deleteNode(item);
    }else{
      //如果右键的是画布，则新建节点
      addCombo(mouseX,mouseY);
    }
  },
  // offsetX and offsetY include the padding of the parent container
  // 需要加上父级容器的 padding-left 16 与自身偏移量 10
  // the types of items that allow the menu show up
  // 在哪些类型的元素上响应
  itemTypes: ['node', 'edge', 'canvas'],
});
const deleteNode=async (item)=> {
    const nodes = graph.findAllByState('node', 'selected');
    const nodeIds = nodes.map((node) => node.get('id'));
    if (nodeIds.length != 0) {
      await  proxy?.$modal.confirm(`确认删除节点 ${nodeIds.join(';')} 吗？`);
      graph.removeItem(item);
    }
}
const processParallelEdgesOnAnchorPoint = (
    edges,
    offsetDiff = 15,
    multiEdgeType = 'quadratic',
    singleEdgeType = undefined,
    loopEdgeType = undefined
) => {
  const len = edges.length;
  const cod = offsetDiff * 2;
  const loopPosition = [
    'top',
    'top-right',
    'right',
    'bottom-right',
    'bottom',
    'bottom-left',
    'left',
    'top-left',
  ];
  const edgeMap = {};
  const tags = [];
  const reverses = {};
  for (let i = 0; i < len; i++) {
    const edge = edges[i];
    const { source, target, sourceAnchor, targetAnchor } = edge;
    const sourceTarget = `${source}|${sourceAnchor}-${target}|${targetAnchor}`;

    if (tags[i]) continue;
    if (!edgeMap[sourceTarget]) {
      edgeMap[sourceTarget] = [];
    }
    tags[i] = true;
    edgeMap[sourceTarget].push(edge);
    for (let j = 0; j < len; j++) {
      if (i === j) continue;
      const sedge = edges[j];
      const { source: src, target: dst, sourceAnchor: srcAnchor, targetAnchor: dstAnchor } = sedge;

      // 两个节点之间共同的边
      // 第一条的source = 第二条的target
      // 第一条的target = 第二条的source
      if (!tags[j]) {
        if (source === dst && sourceAnchor === dstAnchor
            && target === src && targetAnchor === srcAnchor) {
          edgeMap[sourceTarget].push(sedge);
          tags[j] = true;
          reverses[`${src}|${srcAnchor}|${dst}|${dstAnchor}|${edgeMap[sourceTarget].length - 1}`] = true;
        } else if (source === src && sourceAnchor === srcAnchor
            && target === dst  && targetAnchor === dstAnchor) {
          edgeMap[sourceTarget].push(sedge);
          tags[j] = true;
        }
      }
    }
  }

  for (const key in edgeMap) {
    const arcEdges = edgeMap[key];
    const { length } = arcEdges;
    for (let k = 0; k < length; k++) {
      const current = arcEdges[k];
      if (current.source === current.target) {
        if (loopEdgeType) current.type = loopEdgeType;
        // 超过8条自环边，则需要重新处理
        current.loopCfg = {
          position: loopPosition[k % 8],
          dist: Math.floor(k / 8) * 20 + 50,
        };
        continue;
      }
      if (length === 1 && singleEdgeType && (current.source !== current.target || current.sourceAnchor !== current.targetAnchor)) {
        current.type = singleEdgeType;
        continue;
      }
      current.type = multiEdgeType;
      const sign =
          (k % 2 === 0 ? 1 : -1) * (reverses[`${current.source}|${current.sourceAnchor}|${current.target}|${current.targetAnchor}|${k}`] ? -1 : 1);
      if (length % 2 === 1) {
        current.curveOffset = sign * Math.ceil(k / 2) * cod;
      } else {
        current.curveOffset = sign * (Math.floor(k / 2) * cod + offsetDiff);
      }
    }
  }
  return edges;
};

const initGraph=(data)=>{
  graph = new G6.Graph({
    container: 'container',
    width,
    height,
    plugins: [contextMenu],
    modes: {
      default: [
          'click-select',
          'drag-combo',
          {
            type: 'create-edge',
            trigger: 'drag', // 'click' by default. options: 'drag', 'click'
          },
        ],
    },
    defaultNode: {
      type: 'rect',
      style: {
        fill: '#eee',
        stroke: '#ccc',
      }
    },
    defaultEdge: {
      type: 'polyline',
      style: {
        stroke: '#F6BD16',
        lineWidth: 2,
        endArrow: true,
      },
    },
  });

  graph.data(data);
  graph.render();
  graph.on('combo:mouseenter', (evt) => {
    const { item } = evt;
    graph.setItemState(item, 'active', true);
  });

  graph.on('combo:mouseleave', (evt) => {
    const { item } = evt;
    graph.setItemState(item, 'active', false);
  });
  graph.on('combo:click', (evt) => {
    const { item } = evt;
    graph.setItemState(item, 'selected', true);
  });
  graph.on('aftercreateedge', (e) => {
    const edges = graph.save().edges;
    G6.Util.processParallelEdges(edges);
    graph.getEdges().forEach((edge, i) => {
      graph.updateItem(edge, {
        curveOffset: edges[i].curveOffset,
        curvePosition: edges[i].curvePosition,
      });
    });
  });
  graph.on('node:dblclick', nodeDbClick);
}
let data;

/**
 * 双击事件
 * @param e
 */
const nodeDbClick=(e) => {
  const item = e.item;
  const id=item.get("id")
  //如果双击的是状态机，就添加算法和事件
  if(id.startsWith(prefState)){
    addAlgAndEventNode(e)
  }
};
/**
 * 添加算法和事件节点
 * @param e
 */
const addAlgAndEventNode=(e)=>{
  const item = e.item;
  const stateId=item.get("id")
  //连线数量
  const edgesSize=item.get('edges').length;
  //item.getModel()是获取元素的数据模型。
  const comboId = item.getModel().comboId;
  const algNodeId=prefAlg+uuidv4();
  const eveNodeId=prefEvent+uuidv4();
  let canvasY=e.canvasY;
  //算法的x和最上面一行的算法X对齐，所以需要得到上面的算法node
  const algNodeFirstLine=graph.findById(prefAlg+stateId.substring(5,stateId.length));
  const algNodeX=algNodeFirstLine.getModel().x
  //根据连线数量来确定canvasX，公式为初始 y=e的Y+连线数量*（algGraphSize的高度+nodeVertiPadding）
  const algNodeY=canvasY+edgesSize*(algGraphSize[1]+nodeVertiPadding);
  const algNode={
    id:algNodeId,
    label: '算法',
    x: algNodeX,
    y: algNodeY,
    size:algEveSize,
    comboId:comboId
  }
  //事件的初始距离为算法的x+算法的长度,y是和左边的算法一致
  const eveNode={
    id:eveNodeId,
    label: '输出',
    x: algNodeX+algGraphSize[0],
    y: algNodeY,
    size:algEveSize,
    comboId:comboId
  }
  //状态机到算法的连接
  const stateToAlgEdge = {
    source: stateId,
    target: algNodeId,
    comboId:comboId,
    style: {
      endArrow: false,
    }
  };
  graph.addItem('node', algNode);
  graph.addItem('node', eveNode);
  graph.addItem('edge',stateToAlgEdge)
}
onMounted(() => {
  initLoad();
  //用ref获取DOM元素必须在onMounted中赋值,否则取不到
  graphWidth=container.value.offsetWidth;
  data = {
    nodes: [
      { id: 'node1', x: graphWidth/2, y: 25 ,label:'开始',size:startGraphSize},
    ]
  };
  initGraph(data);
});
const addCombo=(stateNodeX,stateNodey)=>{
  const nodeId=uuidv4();
  const comboId=prefCombo+nodeId;
  const stateNodeId=prefState+nodeId;
  const algNodeId=prefAlg+nodeId;
  const eveNodeId=prefEvent+nodeId;
  //初始距离是50,状态机的坐标永远是50,50
  const stateNode = {
    id:stateNodeId,
    label: '状态机',
    x: stateNodeX,
    y: stateNodey,
    size:algEveSize,
    comboId:comboId
  };
  //算法的x向右移初始距离+状态机的width+线的width
  const algNodeX=stateNodeX+stateGraphSize[0]+lineWidth
  const algNode={
    id:algNodeId,
    label: '算法',
    x: algNodeX,
    y: stateNodey,
    size:algEveSize,
    comboId:comboId
  }
  //事件的初始距离为算法的x+算法的长度
  const eveNode={
    id:eveNodeId,
    label: '输出',
    x: algNodeX+algGraphSize[0],
    y: stateNodey,
    size:algEveSize,
    comboId:comboId
  }
  //状态机到算法的连接
  const stateToAlgEdge = {
    source: stateNodeId,
    target: algNodeId,
    comboId:comboId,
    style: {
      endArrow: false,
    }
  };
  const comboConfig={
    id:comboId,
    type:'rect',
    label:"combotest",
    allowZoom: true, // 允许 Combo 跟随缩放
    allowDrag: true, // 允许 Combo 跟随平移
  }
  graph.addItem('combo',comboConfig)
  graph.addItem('node', stateNode);
  graph.addItem('node', algNode);
  graph.addItem('node', eveNode);
  graph.addItem('edge',stateToAlgEdge)
}
const initLoad = () => {
  pid.value = route.params.pid;
  id.value = route.params.id;
  //store.commit("ChangeTagModuleStatus", route.path);
  tagsStore.ChangeTagModuleStatus( route.path)
};
watch(
  () => router.currentRoute.value,
  (newValue) => {
    initLoad();
  }
);
</script>

<style   scoped>
</style>