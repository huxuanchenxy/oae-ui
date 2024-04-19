<template>
  <div>
    <div><el-button type="primary" @click="addItem">新增节点</el-button></div>
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

// custom a node with anchor-point shapes
G6.registerNode('rect-node', {
  // draw anchor-point circles according to the anchorPoints in afterDraw
  afterDraw(cfg, group) {
    const bbox = group.getBBox();
    const anchorPoints = this.getAnchorPoints(cfg)
    anchorPoints.forEach((anchorPos, i) => {
      group.addShape('circle', {
        attrs: {
          r: 5,
          x: bbox.x + bbox.width * anchorPos[0],
          y: bbox.y + bbox.height * anchorPos[1],
          fill: '#fff',
          stroke: '#5F95FF'
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: `anchor-point`, // the name, for searching by group.find(ele => ele.get('name') === 'anchor-point')
        anchorPointIdx: i, // flag the idx of the anchor-point circle
        links: 0, // cache the number of edges connected to this shape
        visible: false, // invisible by default, shows up when links > 1 or the node is in showAnchors state
        draggable: true // allow to catch the drag events on this shape
      })
    })
  },
  getAnchorPoints(cfg) {
    return cfg.anchorPoints || [[0, 0.5], [0.33, 0], [0.66, 0], [1, 0.5], [0.33, 1], [0.66, 1]];
  },
  // response the state changes and show/hide the link-point circles
  setState(name, value, item) {
    if (name === 'showAnchors') {
      const anchorPoints = item.getContainer().findAll(ele => ele.get('name') === 'anchor-point');
      anchorPoints.forEach(point => {
        if (value || point.get('links') > 0) point.show()
        else point.hide()
      })
    }
  }
}, 'rect')


const initGraph=(data)=>{
  graph = new G6.Graph({
    container: 'container',
    width,
    height,
    modes: {
      default: [
        // config the shouldBegin for drag-node to avoid node moving while dragging on the anchor-point circles
        {
          type: 'drag-node',
          shouldBegin: e => {
            if (e.target.get('name') === 'anchor-point') return false;
            return true;
          }
        },
        // config the shouldBegin and shouldEnd to make sure the create-edge is began and ended at anchor-point circles
        {
          type: 'create-edge',
          trigger: 'drag', // set the trigger to be drag to make the create-edge triggered by drag
          shouldBegin: e => {
            // avoid beginning at other shapes on the node
            if (e.target && e.target.get('name') !== 'anchor-point') return false;
            sourceAnchorIdx = e.target.get('anchorPointIdx');
            e.target.set('links', e.target.get('links') + 1); // cache the number of edge connected to this anchor-point circle
            return true;
          },
          shouldEnd: e => {
            // avoid ending at other shapes on the node
            if (e.target && e.target.get('name') !== 'anchor-point') return false;
            if (e.target) {
              targetAnchorIdx = e.target.get('anchorPointIdx');
              e.target.set('links', e.target.get('links') + 1);  // cache the number of edge connected to this anchor-point circle
              return true;
            }
            targetAnchorIdx = undefined;
            return true;
          },
        },
        'drag-canvas', 'drag-node', 'drag-combo', 'collapse-expand-combo'
        ],

    },
    defaultNode: {
      type: 'rect-node',
      style: {
        fill: '#eee',
        stroke: '#ccc',
      }
    },
    defaultEdge: {
      type: 'quadratic',
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
  graph.on('canvas:click', (evt) => {
    graph.getCombos().forEach((combo) => {
      graph.clearItemStates(combo);
    });
  });
  graph.on('aftercreateedge', (e) => {
    // update the sourceAnchor and targetAnchor for the newly added edge
    graph.updateItem(e.edge, {
      sourceAnchor: sourceAnchorIdx,
      targetAnchor: targetAnchorIdx
    })

    // update the curveOffset for parallel edges
    const edges = graph.save().edges;
    processParallelEdgesOnAnchorPoint(edges);
    graph.getEdges().forEach((edge, i) => {
      graph.updateItem(edge, {
        curveOffset: edges[i].curveOffset,
        curvePosition: edges[i].curvePosition,
      });
    });
  });

// after drag from the first node, the edge is created, update the sourceAnchor
  graph.on('afteradditem', e => {
    if (e.item && e.item.getType() === 'edge') {
      graph.updateItem(e.item, {
        sourceAnchor: sourceAnchorIdx
      });
    }
  })

// if create-edge is canceled before ending, update the 'links' on the anchor-point circles
  graph.on('afterremoveitem', e => {
    if (e.item && e.item.source && e.item.target) {
      const sourceNode = graph.findById(e.item.source);
      const targetNode = graph.findById(e.item.target);
      const { sourceAnchor, targetAnchor } = e.item;
      if (sourceNode && !isNaN(sourceAnchor)) {
        const sourceAnchorShape = sourceNode.getContainer().find(ele => (ele.get('name') === 'anchor-point' && ele.get('anchorPointIdx') === sourceAnchor));
        sourceAnchorShape.set('links', sourceAnchorShape.get('links') - 1);
      }
      if (targetNode && !isNaN(targetAnchor)) {
        const targetAnchorShape = targetNode.getContainer().find(ele => (ele.get('name') === 'anchor-point' && ele.get('anchorPointIdx') === targetAnchor));
        targetAnchorShape.set('links', targetAnchorShape.get('links') - 1);
      }
    }
  })

// some listeners to control the state of nodes to show and hide anchor-point circles
  graph.on('node:mouseenter', e => {
    graph.setItemState(e.item, 'showAnchors', true);
  })
  graph.on('node:mouseleave', e => {
    graph.setItemState(e.item, 'showAnchors', false);
  })
  graph.on('node:dragenter', e => {
    graph.setItemState(e.item, 'showAnchors', true);
  })
  graph.on('node:dragleave', e => {
    graph.setItemState(e.item, 'showAnchors', false);
  })
  graph.on('node:dragstart', e => {
    graph.setItemState(e.item, 'showAnchors', true);
  })
  graph.on('node:dragout', e => {
    graph.setItemState(e.item, 'showAnchors', false);
  })
}
let data;


onMounted(() => {
  initLoad();
  //用ref获取DOM元素必须在onMounted中赋值,否则取不到
  graphWidth=container.value.offsetWidth;
  data = {
    nodes: [
      { id: 'node1', x: graphWidth/2, y: 25 ,label:'开始',size:startGraphSize},
    ],
    // edges: [
    //   // Built-in polyline
    //   {
    //     source: 'node1',
    //     target: 'node2',
    //     style: {
    //       endArrow: false,
    //     },
    //   },
    // ],
  };
  initGraph(data);
});
const addItem=()=>{
  const stateNodeX=50;
  const stateNodey=50;
  const comboId=uuidv4();
  const stateNodeId=uuidv4();
  const algNodeId=uuidv4();
  const eveNodeId=uuidv4();
  //初始距离是50,状态机的坐标永远是50,50
  const stateNode = {
    id:stateNodeId,
    label: '状态机',
    x: stateNodeX,
    y: stateNodey,
    size:algEveSize,
    comboId:comboId
  };
  //算法的x向右移初始距离+状态机的width+线的width为20
  const algNodeX=stateNodeX+stateGraphSize[0]+20
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