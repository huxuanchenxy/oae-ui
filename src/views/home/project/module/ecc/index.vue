<template>
  <div class="ecc">
    <div class="main">
      <div>按住shift后选中节点拖动以创建连线，双击状态机新建算法和输出，右键在当前位置新建节点,选中后右键可删除节点</div>
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
            <div>
              状态机属性
            </div>
            <div>
              状态机名称 {{currentState.text}}
            </div>
            <hr/>
            <div v-for="algAndEvent in currentState.algAndEventName">
              <el-button type="success" plain icon="Edit" @click="handleUpdateCondition()"></el-button>
              <el-button type="danger" plain icon="Delete"  @click="handleDeleteCondition(currentState.key)"></el-button><br/>
              <br/>
              <div>{{algAndEvent.alg}}</div>
              <div>{{algAndEvent.event}}</div>
              <hr/>
            </div>
            <el-button type="success"  @click="addCondition">新增条件</el-button>
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
        <el-form-item prop="from" v-if="false" >
          <el-input v-model="edgeForm.from" />
        </el-form-item>
        <el-form-item prop="to" v-if="false" >
          <el-input v-model="edgeForm.to" />
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
import G6, {IEdge, INode} from "@antv/g6";
import { v4 as uuidv4 } from 'uuid';
import { pagetagsStore } from "@/store/pageTags.js";
import  cache  from "@/plugins/cache.ts";
import type { EdgeForm,EdgeQuery,EdgeVO} from '@/api/ecc/edge/type';
import type { CanvasForm,CanvasQuery,CanvasVO} from '@/api/ecc/canvas/type';
import type { AlgSimple} from '@/api/alg/type';
import { Eve } from "@/api/inter/event/types";
import {getRelateEveList} from "@/api/inter/event";
import {getOneEdge,saveOrUpdateEdge,removeEdge} from "@/api/ecc/edge";
import {getCanvas,saveOrUpdateCanvas} from "@/api/ecc/canvas";
import {listStates,saveOrUpdateState,getOneState} from "@/api/ecc/state";
import type { StateMachine,StateForm,StateVO} from '@/api/ecc/state/type';
let currentEdge:EdgeVO=ref(null);
let currentCanvas:CanvasVO=ref(null);
let currentState:StateVO=ref(null);
//初始值
const initEdgeFormData:EdgeForm = {
  from:'',
  to:'',
  text:'',
  event_condition:{},
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
const module=route.params.id;
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

const addCondition=()=>{
  if(!currentState.value.algAndEvent){
    currentState.value.algAndEvent=new Array();
  }
  currentState.value.algAndEventName.push({alg:"事件",event:"输出"})
  addAlgAndEventNodeById(currentState.value.key)
}
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
    const edges = graph.findAllByState('edge', 'selected');
    const nodeIds = nodes.map((node) => node.get('id'));
    const edgeIds = edges.map((edge) => edge.get('id'));
    if (nodeIds.length != 0||edgeIds.length != 0) {
      await  proxy?.$modal.confirm(`确认删除选中节点吗？`);
      graph.removeItem(item);
      saveDataToServer();
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
            key: 'shift',
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
    getEdgesById({id:item.get("id"),from:item.getSource().get("id"),to:item.getTarget().get("id")});
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
    //如果节点是状态机
    if(id.startsWith(prefState)){
      showProp.value=2;
      //设置被选中的状态机
      let state:StateMachine=getOneState(project,module,id);
      currentState.value={...state}
      let algAndEvents=state.algAndEvent;
      if(!currentState.value.algAndEventName){
        currentState.value.algAndEventName=new Array();
      }
      algAndEvents?.forEach((algAndEvent)=>{
        currentState.value.algAndEventName.push({alg:algAndEvent.alg.text,event:algAndEvent.event.name})
      })
    }else{
      //如果节点不是状态机，那就算画布
      showProp.value=1
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
    addAlgAndEventNode(e.item,e.canvasY)
  }
  saveDataToServer()
};
//得到状态机的条件数量
const getStateConditionNumber=((stateId)=>{
  let number=0;
  let graphJson=cache.local.getJSON(graphCacheKey);
  let edges:IEdge[]=graphJson.edges;
    edges.forEach((edgeNode)=>{
      if(edgeNode.source==stateId&&typeof edgeNode.target=='string' &&edgeNode.target.startsWith(prefAlg)){
        number++;
      }
    });
    return number;
})
const addAlgAndEventNodeById=((id)=>{
  let node=graph.findById(id);
  if(!node){
    return;
  }
  addAlgAndEventNode(node,node.getModel().y);
})
/**
 * 添加算法和事件节点
 * @param e
 */
const addAlgAndEventNode=(item,canvasY)=>{
  // const item = e.item;
  const stateId=item.get("id")
  //连线数量
  //item.getModel()是获取元素的数据模型。
  const comboId = item.getModel().comboId;
  let uuid=uuidv4();
  const algNodeId=prefAlg+uuid;
  const eveNodeId=prefEvent+uuid;
  // let canvasY=e.canvasY;
  //算法的x和最上面一行的算法X对齐，所以需要得到上面的算法node
  const algNodeFirstLine=graph.findById(prefAlg+stateId.substring(5,stateId.length));
  const algNodeX=algNodeFirstLine.getModel().x
  //根据连线数量来确定canvasX，公式为初始 y=e的Y+连线数量*（algGraphSize的高度+nodeVertiPadding）
  const algNodeY=canvasY+getStateConditionNumber(stateId)*(algGraphSize[1]+nodeVertiPadding);
  const algLabel='算法';
  const eveLabel='输出';
  const algNode={
    id:algNodeId,
    label: algLabel,
    x: algNodeX,
    y: algNodeY,
    size:algEveSize,
    comboId:comboId
  }
  //事件的初始距离为算法的x+算法的长度,y是和左边的算法一致
  const eveNode={
    id:eveNodeId,
    label: eveLabel,
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
  saveDataToServer()
  if(!currentState.value.algAndEvent){
    currentState.value.algAndEvent=new Array();
  }
  currentState.value.algAndEventName.push({alg:algLabel,event:eveLabel})
  //大JSON更新
  let state:StateMachine=getOneState(project,module,stateId);
  let algAndEvents=state.algAndEvent;
  if(!algAndEvents){
    algAndEvents=new Array();
  }
  algAndEvents.push({ alg: {key:algNode.id,text:algNode.label},event: {id:eveNode.id,name:eveNode.label} });
  let algorithm=state.algorithm;
  if(!algorithm){
    algorithm=new Array();
  }
  algorithm.push({ key: algNode.id,text: algNode.label });
  let output_event=state.output_event;
  if(!output_event){
    output_event=new Array();
  }
  output_event.push({ key: eveNode.id,text: eveNode.label });
  saveOrUpdateState(project,module,state);
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
//初始化图形
const initGraphData=()=>{
    let stateList:StateForm[]=new Array();
    let graphJson=cache.local.getJSON(graphCacheKey);
    if(graphJson){
      stateList=new Array();
      //从数据中得到状态机列表放进stateList里。
      let nodes:INode[]=graphJson.nodes;
      let edges:IEdge[]=graphJson.edges;
      //找到所有状态机
      let stateNodes:INode[]=nodes.filter((data)=>data.id.startsWith(prefState));
      stateNodes.forEach((stateNode)=>{
          let state:StateMachine={};
          state.key=stateNode.id;
          state.text=stateNode.label;
          state.algorithm=new Array();
          state.output_event=new Array();
          state.algAndEvent=new Array();
          //遍历连线，找到source为本state的ID，并且target为算法的，输出的ID和算法相同，只是前缀不同
          edges.forEach((edgeNode)=>{
              //如果找到了
              if(edgeNode.source==stateNode.id&&typeof edgeNode.target=='string' &&edgeNode.target.startsWith(prefAlg)){
                  let algId=edgeNode.target;
                  let eventId=prefEvent+algId.substring(prefAlg.length,algId.length)
                  //从node找出该targeid对应的item,就是这个状态机连上的算法，在通过该ID做相应处理后找出对应的输出事件
                  let algNode:INode=nodes.find((data)=>data.id==algId);
                  let eventNode:INode=nodes.find((data)=>data.id==eventId);
                  //为减少业务连线错误，只有当两个都有时才放进数组，否则不做处理
                  if(algNode&&eventNode){
                      let alg:AlgSimple={key:algNode.id,text:algNode.label};
                      let eve:Eve={id:eventNode.id,name:eventNode.label};
                      state.algorithm.push(alg);
                      state.output_event.push(eve);
                      let algAndEvent={alg:alg,event:eve}
                      state.algAndEvent.push(algAndEvent)
                  }
              }
          })
          stateList.push(state);
      })
      saveOrUpdateState(project,module,stateList);
    }else{
      //如果不存在数据，就用初始数据
      graphJson=  {
        nodes: [
          { id: 'start', x: graphWidth/2, y: 25 ,label:'开始',size:startGraphSize},
        ]
      };
    }
  //返回图形数据
    return graphJson;
}
const addCombo=(stateNodeX,stateNodeY)=>{
  const nodeId=uuidv4();
  const comboId=prefCombo+nodeId;
  const stateNodeId=prefState+nodeId;
  const algNodeId=prefAlg+nodeId;
  const eveNodeId=prefEvent+nodeId;
  const stateLabel='状态机';
  const algLabel='算法';
  const eveLabel='输出';
  //初始距离是50,状态机的坐标永远是50,50
  const stateNode = {
    id:stateNodeId,
    label: stateLabel,
    x: stateNodeX,
    y: stateNodeY,
    size:algEveSize,
    comboId:comboId
  };
  //算法的x向右移初始距离+状态机的width+线的width
  const algNodeX=stateNodeX+stateGraphSize[0]+lineWidth
  const algNode={
    id:algNodeId,
    label: algLabel,
    x: algNodeX,
    y: stateNodeY,
    size:algEveSize,
    comboId:comboId
  }
  //事件的初始距离为算法的x+算法的长度
  const eveNode={
    id:eveNodeId,
    label: eveLabel,
    x: algNodeX+algGraphSize[0],
    y: stateNodeY,
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
    allowZoom: true, // 允许 Combo 跟随缩放
    allowDrag: true, // 允许 Combo 跟随平移
  }
  graph.addItem('combo',comboConfig)
  graph.addItem('node', stateNode);
  graph.addItem('node', algNode);
  graph.addItem('node', eveNode);
  graph.addItem('edge',stateToAlgEdge)
  //保存大JSON
  saveOrUpdateState(project,module,{
    key:stateNodeId,
    text:stateLabel,
    x:stateNodeX,
    y:stateNodeY,
    algorithm:[{ key: algNode.id,text: algNode.label }],
    output_event:[{ key: eveNode.id,text: eveNode.label }],
    algAndEvent:[{ alg: {key:algNode.id,text:algNode.label},event: {id:eveNode.id,name:eveNode.label} }] ,
    comment:''
  });
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
  data.event_condition=eventVo;
  //保存大JSON里 todo
  //保存连线
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
const getEdgesById=(data)=>{
  currentEdge.value=getOneEdge(project,module,data.id);
  if(!currentEdge.value){
    currentEdge.value=initEdgeFormData;
    currentEdge.value.key=data.id;
    currentEdge.value.from=data.from;
    currentEdge.value.to=data.to;
  }
}
//打开编辑控制图属性对话框
const handleUpdateCanvas=()=>{
  Object.assign(canvasForm.value, currentCanvas.value);
  dialogCanvas.visible = true;
  dialogCanvas.title = "修改控制图属性";
}
//从currentEdge赋值给form回显，打开编辑连接线对话框
const handleUpdateEdge=()=>{
  resetEdgeForm();
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
//打开编辑条件对话框
const handleUpdateCondition=(()=>{

})
const handleDeleteCondition=async(id)=>{
  await proxy?.$modal.confirm('是否确认删除？');
  let idNoPrefix=id.substring(prefState.length,id.length)
  //删除节点
  console.log(prefAlg,idNoPrefix)
  graph.removeItem(graph.findById(prefAlg+idNoPrefix));
  graph.removeItem(graph.findById(prefEvent+idNoPrefix));
  //更新双向绑定的数据
  //更新图JSON
  saveDataToServer()
  //更新大JSON
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