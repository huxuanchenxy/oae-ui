<template>
  <div class="ecc">
    <div class="main">
      <div>选中节点后拖动以创建连线，双击状态机新建算法和输出，右键在当前位置新建节点,选中后右键可删除节点</div>
      <div id="container" style="height:1000px" ref="container"></div>
    </div>
    <div class="right">
      <el-card class="box-card">
        <el-input
            style="width: 160px"
            placeholder="Filter keyword"
        />
        <div v-if="showProp==1">
          <div>
            编辑<el-button type="success" plain icon="Edit" @click="handleUpdateCanvas()"></el-button><br/>
            <el-descriptions title="执行控制图属性" direction="vertical" border>
              <el-descriptions-item label="描述">{{currentCanvas?.comment}}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
        <div v-if="showProp==2">
          <div>
            状态机属性
          </div>
          <hr/>
          <div>
            动态添加算法和事件
          </div>
        </div>
        <div v-if="showProp==3">
          <div>
            编辑<el-button type="success" plain icon="Edit" @click="handleUpdateEdge()"></el-button><br/>
            <el-descriptions title="连接线属性" direction="vertical" border column="1">
              <el-descriptions-item label="条件名称">{{currentEdge?.text}}</el-descriptions-item>
              <el-descriptions-item label="输入事件">{{currentEdge?.relateEveName}}</el-descriptions-item>
              <el-descriptions-item label="优先级">{{currentEdge?.priority}}</el-descriptions-item>
              <el-descriptions-item label="条件设置">{{currentEdge?.guard_condition}}</el-descriptions-item>
              <el-descriptions-item label="描述">{{currentEdge?.comment}}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </el-card>
    </div>
    <el-dialog :title="dialogCanvas.title" v-model="dialogCanvas.visible" width="500px" append-to-body>
    <el-form ref="canvasFormRef" :model="canvasForm"  label-width="80px">
      <el-form-item prop="key" v-if="false" >
        <el-input v-model="canvasForm.key" />
      </el-form-item>
      <el-form-item label="描述" prop="comment">
        <el-input v-model="canvasForm.comment" type="textarea" placeholder="请输入说明文字"/>
      </el-form-item>
    </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="saveCanvasForm">确 定</el-button>
          <el-button @click="cancelCanvasDialog">取 消</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog :title="dialogEdge.title" v-model="dialogEdge.visible" width="500px" append-to-body>
      <el-form ref="edgeFormRef" :model="edgeForm"  label-width="80px">
        <el-form-item prop="key" v-if="false" >
          <el-input v-model="edgeForm.key" />
        </el-form-item>
        <el-form-item label="名称" prop="text">
          <el-input v-model="edgeForm.text" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="输入事件">
          <el-select v-model="edgeForm.relatedEventId" placeholder="请选择">
            <el-option
                v-for="item in relateEveList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优先级" prop="type">
          <el-select v-model="edgeForm.priority" placeholder="请输入优先级">
            <el-option v-for="dict in edgePriority" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="条件设置" prop="guard_condition">
          <el-input v-model="edgeForm.guard_condition" type="textarea" placeholder="请输入说明文字"/>
        </el-form-item>
        <el-form-item label="描述" prop="comment">
          <el-input v-model="edgeForm.comment" type="textarea" placeholder="请输入说明文字"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitEdgeForm">确 定</el-button>
          <el-button @click="cancelEdgeDialog">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import G6 from "@antv/g6";
import { v4 as uuidv4 } from 'uuid';
import { pagetagsStore } from "@/store/pageTags.js";
import  cache  from "@/plugins/cache.ts";
import type { EdgeForm,EdgeQuery,EdgeVO} from '@/api/ecc/edge/type';
import type { CanvasForm,CanvasQuery,CanvasVO} from '@/api/ecc/canvas/type';
import { Eve } from "@/api/inter/event/types";
import {getRelateEveList} from "@/api/inter/event";
import {getOneEdge,saveOrUpdateEdge,removeEdge} from "@/api/ecc/edge";
import {getCanvas,saveOrUpdateCanvas} from "@/api/ecc/canvas";
let currentEdge:EdgeVO=ref(null);
let currentCanvas:CanvasVO=ref(null);
//初始值
const initEdgeFormData:EdgeForm = {
  key:'',
  text:'',
  relatedEvents:{},
  priority:'',
  guard_condition:'',
  comment:''
}
const edgeData = reactive<PageData<EdgeForm, EdgeQuery>>({
  edgeForm: { ...initEdgeFormData },
  queryParams: {}
});
const initCanvasFormData:CanvasForm = {
  key:'',
  comment:'',
}
const canvasData = reactive<PageData<CanvasForm, CanvasQuery>>({
  canvasForm: { ...initCanvasFormData },
  queryParams: {}
});
const {  edgeForm } = toRefs(edgeData);
const {  canvasForm } = toRefs(canvasData);
const cacheKey="graph";
const project="project1";
const tagsStore = pagetagsStore();
const router = useRouter();
const route = useRoute();
const module=route.params.pid;
const graphCacheKey=cacheKey+"-"+project+"-"+module;
const prefState="state";
const prefAlg="alg";
const prefEvent="event";
const prefCombo="combo";
/**
 * 1：默认为画布，什么都不选中
 * 2:选中状态机
 * 3.选中连接线
 */
let showProp=ref(1);
let pid = ref("");
let id = ref("");
let sourceAnchorIdx, targetAnchorIdx;
const container = ref<any>(null);
let graph;
let graphWidth;
let graphHeight;
const startGraphSize=[60,25];
const stateGraphSize=[60,25];
const algGraphSize=[50,25];
const algEveSize=[50,25];
const lineWidth=20;
const nodeVertiPadding=20;//算法节点垂直的间隔距离
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
let mouseX,mouseY;
const edgeFormRef = ref<ElFormInstance>();//用于重置，还可以用于验证
const canvasFormRef = ref<ElFormInstance>();//用于重置，还可以用于验证
const { edgePriority } = toRefs<any>(proxy?.useDict("edgePriority"));
const relateEveList = ref<Eve[]>([]);

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
    saveDataToServer()
  },
  // 在哪些类型的元素上响应
  itemTypes: ['node', 'edge', 'canvas'],
});
const deleteNode=async (item)=> {
    const nodes = graph.findAllByState('node', 'selected');
    const nodeIds = nodes.map((node) => node.get('id'));
    if (nodeIds.length != 0) {
      await  proxy?.$modal.confirm(`确认删除选中节点吗？`);
      graph.removeItem(item);
    }else{
      proxy?.$modal.msgWarning("您没有选中任何节点");
    }
}
const initGraph=(data,graphWidth,graphHeight)=>{
  graph = new G6.Graph({
    container: 'container',
    graphWidth,
    graphHeight,
    plugins: [contextMenu],
    modes: {
      default: [
          'click-select',
          'drag-combo',
          // 'drag-node',
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
    showProp.value=2;
  });
  graph.on('edge:click', (evt) => {
    const { item } = evt;
    graph.setItemState(item, 'selected', true);
    showProp.value=3;
    getEdgesById(item.get("id"));
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
  graph.on('node:click', (evt) => {
    const { item } = evt;
    let id=item.get("id");
    if(!id.startsWith(prefState)){
      showProp.value=1;
    }else{
      showProp.value=2
    }
  });
  graph.on('node:dblclick', nodeDbClick);
  // 监听图数据更新事件
  graph.on('afterupdateitem', (e) => {
    saveDataToServer();
  });
  graph.on('canvas:click', (evt)=>{
    showProp.value=1;
  });
}
let data;
const saveDataToServer=()=>{
  const data = graph.save(); // 获取图实例的数据
  cache.local.setJSON(graphCacheKey,data);
}

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
  saveDataToServer()
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
  //得到事件列表
  relateEveList.value=getRelateEveList();
  initLoad();
  //用ref获取DOM元素必须在onMounted中赋值,否则取不到
  graphWidth=container.value.offsetWidth;
  graphHeight=container.value.offsetHeight;
  data=initGraphData();
  initGraph(data,graphWidth,graphHeight);
});
const getCurrentCanvas=()=>{
  currentCanvas.value= getCanvas(project,module);
}
const initGraphData=()=>{
    let graphJson=cache.local.getJSON(graphCacheKey);
    if(graphJson){
      return graphJson;
    }else{
      return  {
        nodes: [
          { id: 'start', x: graphWidth/2, y: 25 ,label:'开始',size:startGraphSize},
        ]
      };
    }
}
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
const saveCanvasForm=()=>{
  let data=canvasForm.value;
  //保存大JSON里 todo
  //保存连线
  saveOrUpdateCanvas(project,module,data);
  currentCanvas.value=data;
  proxy?.$modal.msgSuccess("操作成功");
  dialogCanvas.visible = false;
}

const submitEdgeForm = () => {
  let data=edgeForm.value;
  // edgeForm.value
  let eventVo:Eve={};
  if(data.relatedEventId){
    eventVo={id:data.relatedEventId,name:""}
  }
  relateEveList.value.forEach( dict=> {
    if(dict.id==eventVo.id){
      eventVo.name=dict.name;
      data.relateEveName=dict.name;
    }
  });
  data.relatedEvents=eventVo;
  //保存大JSON里 todo
  //保存连线
  console.log(111,data)
  saveOrUpdateEdge(project,module,data);
  //详情双向绑定
  currentEdge.value=data
  //antv回显
  let edge=graph.findById(data.key)
  if(edge){
    graph.update(edge, {
      label: eventVo.name+"-"+data.guard_condition
    });
  }
  proxy?.$modal.msgSuccess("操作成功");
  dialogEdge.visible = false;
}
//拿到当前连接线赋给currentEdge
const getEdgesById=(id)=>{
  currentEdge.value=getOneEdge(project,module,id);
  if(!currentEdge.value){
    currentEdge.value=initEdgeFormData;
    currentEdge.value.key=id;
  }
}
const handleUpdateCanvas=()=>{
  Object.assign(canvasForm.value, currentCanvas.value);
  dialogCanvas.visible = true;
  dialogCanvas.title = "修改控制图属性";
}
//从currentEdge赋值给form回显
const handleUpdateEdge=()=>{
  let id=edgeForm.value.key;
  if(currentEdge.value){
    Object.assign(edgeForm.value,currentEdge.value);
  }else{
    edgeForm.value.key=id;
    initEdgeFormData.key=id;
    currentEdge.value=initEdgeFormData;
  }
  dialogEdge.visible = true;
  dialogEdge.title = "修改连接线属性";
}
const resetEdgeForm = () => {
  edgeForm.value={ ...initEdgeFormData };
  edgeFormRef.value?.resetFields();
}
const resetCanvasForm = () => {
  canvasForm.value={ ...initCanvasFormData };
  canvasFormRef.value?.resetFields();
}
const dialogEdge = reactive<DialogOption>({
  visible: false,
  title: ''
});
const dialogCanvas = reactive<DialogOption>({
  visible: false,
  title: ''
});
const cancelEdgeDialog = () => {
  dialogEdge.visible = false;
}
const cancelCanvasDialog = () => {
  dialogCanvas.visible = false;
}
watch(
  () => router.currentRoute.value,
  (newValue) => {
    initLoad();
  }
);
</script>

<style   scoped>
  .ecc{
    display: flex;
    .main{
      flex:9;
    }
    .right {
      flex:2;
      width: 200px;
      transition: all 0.2s;
      height: 500px;
      //display: flex;
      //flex-direction: column;
      .box-card{
        height: 500px;
      }
    }
  }

</style>