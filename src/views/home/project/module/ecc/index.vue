<template>
  <div class="ecc">
    <div class="main">
      <div>点击连接点以创建连线，双击状态机新建算法和输出，右键在当前位置新建节点,选中后右键可删除节点</div>
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
              {{currentState?.text}}<el-button type="success" plain icon="Edit" @click="handleUpdateState"></el-button>
            </div>
            <hr/>
            <div v-for="algAndEvent in currentState?.algAndEvent">
              <el-button type="success" plain icon="Edit" @click="handleUpdateCondition(currentState.key,algAndEvent.id)"></el-button>
              <el-button type="danger" plain icon="Delete"  @click="handleDeleteCondition(currentState.key,algAndEvent.id)"></el-button><br/>
              <br/>
              <div>{{algAndEvent?.alg.text}}</div>
              <div>{{algAndEvent?.event.text}}</div>
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
                v-for="item in inputEventList"
                :key="item.key"
                :label="item.text"
                :value="item.key"
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
    <el-dialog :title="dialogState.title" v-model="dialogState.visible" width="500px" append-to-body>
      <el-form ref="stateFormRef" :model="stateForm"  label-width="80px">
        <el-form-item prop="key" v-if="false" >
          <el-input v-model="stateForm.key" />
        </el-form-item>
        <el-form-item label="名称" prop="text">
          <el-input v-model="stateForm.text" placeholder="请输入名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitStateForm">确 定</el-button>
          <el-button @click="cancelStateDialog">取 消</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog :title="dialogAlgAndEvent.title" v-model="dialogAlgAndEvent.visible" width="500px" append-to-body>
      <el-form ref="algAndEventFormRef" :model="algAndEventForm"  label-width="80px">
        <el-form-item prop="stateId" v-if="false" >
          <el-input v-model="algAndEventForm.stateId" />
        </el-form-item>
        <el-form-item prop="id" v-if="false" >
          <el-input v-model="algAndEventForm.id" />
        </el-form-item>
        <el-form-item prop="algGraphId" v-if="false" >
          <el-input v-model="algAndEventForm.algGraphId" />
        </el-form-item>
        <el-form-item prop="eventGraphId" v-if="false" >
          <el-input v-model="algAndEventForm.eventGraphId" />
        </el-form-item>
        <el-form-item label="算法">
          <el-select v-model="algAndEventForm.alg" placeholder="请选择">
            <el-option
                v-for="item in algList"
                :key="item.key"
                :label="item.text"
                :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="输出事件">
          <el-select v-model="algAndEventForm.event" placeholder="请选择">
            <el-option
                v-for="item in outputEventList"
                :key="item.key"
                :label="item.text"
                :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitAlgAndEventForm">确 定</el-button>
          <el-button @click="cancelAlgAndEventDialog">取 消</el-button>
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
import {getInputEvents,getOutputEvents} from "@/api/inter/event";
import {getAlgList} from "@/api/alg";
import {getOneEdge,saveOrUpdateEdge} from "@/api/ecc/edge";
import {getCanvas,saveOrUpdateCanvas} from "@/api/ecc/canvas";
import {removeAlgAndEvent,saveOrUpdateState,getOneState,removeState} from "@/api/ecc/state";
import {getAlgAndEventById} from "@/api/ecc/algandevent";
import type { StateMachine,StateForm,StateVO,StateQuery} from '@/api/ecc/state/type';
import type { AlgAndEventQuery,AlgAndEventForm} from '@/api/ecc/algandevent/type';
import {processParallelEdgesOnAnchorPoint} from "@/antvgraph/statemachine/stateMachineNode";
import {watch} from "vue";
let currentEdge:EdgeVO=ref(null);
let currentCanvas:CanvasVO=ref(null);
let currentState:StateVO=ref(null);
let defaultEvent:Eve=ref(null);
let defaultAlg:AlgSimple=ref(null);
const dialogEdge = reactive<DialogOption>({
  visible: false,
  title: ''
});
const dialogCanvas = reactive<DialogOption>({
  visible: false,
  title: ''
});
const dialogState = reactive<DialogOption>({
  visible: false,
  title: ''
});
const dialogAlgAndEvent = reactive<DialogOption>({
  visible: false,
  title: ''
});
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

const initCanvasFormData:CanvasForm = {
  comment:'',
}
const initStateFormData:StateForm = {
  text:'',
}
const initAlgAndEventFormData:AlgAndEventForm = {
  alg:'',
  event:''
}
const edgeData = reactive<PageData<EdgeForm, EdgeQuery>>({
  edgeForm: { ...initEdgeFormData },
  queryParams: {}
});
const canvasData = reactive<PageData<CanvasForm, CanvasQuery>>({
  canvasForm: { ...initCanvasFormData },
  queryParams: {}
});
const stateData = reactive<PageData<StateForm, StateQuery>>({
  stateForm: { ...initStateFormData },
  queryParams: {}
});
const algAndEventData = reactive<PageData<AlgAndEventForm, AlgAndEventQuery>>({
  algAndEventForm: { ...initAlgAndEventFormData },
  queryParams: {}
});

const {  edgeForm } = toRefs(edgeData);
const {  canvasForm } = toRefs(canvasData);
const {  stateForm } = toRefs(stateData);
const {  algAndEventForm } = toRefs(algAndEventData);
const cacheKey="graph";
const project="project1";
const tagsStore = pagetagsStore();
const router = useRouter();
const route = useRoute();
let module=route.params.id;
let graphCacheKey=cacheKey+"-"+project+"-"+module;
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
const stateFormRef = ref<ElFormInstance>();//用于重置，还可以用于验证
const algAndEventFormRef = ref<ElFormInstance>();//用于重置，还可以用于验证
const { edgePriority } = toRefs<any>(proxy?.useDict("edgePriority"));
const inputEventList = ref<Eve[]>([]);
const outputEventList = ref<Eve[]>([]);
const algList = ref<AlgSimple[]>([]);
let sourceAnchorIdx, targetAnchorIdx;
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
    let id=item.get("id");
    //根据不同的ID前缀来删除对应的节点
    if(id.startsWith(prefState)){
      deleteStateNode(item);
    }else if(id.startsWith(prefAlg)){
      deleteAlgNode(item);
    }else if(id.startsWith(prefEvent)){
      deleteEventNode(item);
    }
  }else{
    proxy?.$modal.msgWarning("您没有选中任何节点");
  }
}
//删除状态机，同时会删除下面所有的事件和输出
const deleteStateNode=((item)=>{
  const edges = graph.getEdges();
  let stateId=item.get("id");
  let algIds=new Array();
  let eventIds=new Array();
  edges.forEach((edge)=>{
    if(edge.getSource().get("id")==stateId&&edge.getTarget().get("id").startsWith(prefAlg))
      algIds.push(edge.getTarget().get("id"))
  })
  algIds.forEach((algId)=>{
    eventIds.push(prefEvent+algId.substring(prefAlg.length,algId.length));
  })
  // //图上删除事件和算法
  algIds.forEach((algId)=>{
    graph.removeItem(graph.findById(algId));
  })
  eventIds.forEach((eventId)=>{
    graph.removeItem(graph.findById(eventId));
  })
  graph.removeItem(graph.findById(stateId));
  //图上删除对应的
  saveDataToServer();
  //更新大JSON
  removeState(project,module,stateId);
});
//删除算法，同时删除对应的事件
const deleteAlgNode=((item)=>{
  const edges = graph.getEdges();
  let stateId;
  edges.forEach((edge)=>{
    if(edge.getTarget().get("id")==item.get("id"))
    stateId=edge.getSource().get("id");
    return;
  })
  //图上删除算法
  let algId=item.get("id");
  let eventId=prefEvent+algId.substring(prefAlg.length,algId.length);
  graph.removeItem(item);
  graph.removeItem(graph.findById(eventId));
  //图上删除对应的
  saveDataToServer();
  //更新大JSON
  removeAlgAndEvent(project,module,stateId,algId);
});
//删除事件，同时删除对应的算法
const deleteEventNode=((item)=>{
  const edges = graph.getEdges();
  let stateId;
  let eventId=item.get("id");
  let algId=prefAlg+eventId.substring(prefEvent.length,eventId.length);
  console.log(algId)
  edges.forEach((edge)=>{
    if(edge.getTarget().get("id")==algId)
    stateId=edge.getSource().get("id");
    return;
  })
  //图上删除事件和算法
  graph.removeItem(item);
  graph.removeItem(graph.findById(algId));
  //图上删除对应的
  saveDataToServer();
  //更新大JSON
  removeAlgAndEvent(project,module,stateId,algId);
});
const initGraph=(data,graphWidth,graphHeight)=>{
  if(graph){
    graph.destroy();
  }
  graph = new G6.Graph({
    container: 'container',
    graphWidth,
    graphHeight,
    plugins: [contextMenu],
    modes: {
      default: [
        'click-select',
        // 'drag-combo',
        // 'drag-node',
        // 'drag-node',
        'drag-edge',
        // config the shouldBegin and shouldEnd to make sure the create-edge is began and ended at anchor-point circles
        {
          type: 'create-edge',
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
          // update the sourceAnchor
          // getEdgeConfig: () => {
          //   return {
          //     sourceAnchor: sourceAnchorIdx
          //   }
          // }
        },
        {
          type: 'drag-combo',
          trigger: 'drag', // 'click' by default. options: 'drag', 'click'
          // key: 'shift',
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
  //combo的事件
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

  //边的事件
  graph.on('edge:click', (evt) => {
    const { item } = evt;
    graph.setItemState(item, 'selected', true);
    showProp.value=3;
    getEdgesById({id:item.get("id"),from:item.getSource().get("id"),to:item.getTarget().get("id")});
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
//鼠标事件
  // some listeners to control the state of nodes to show and hide anchor-point circles
  graph.on('node:mouseenter', e => {
    graph.setItemState(e.item, 'showAnchors', true);
  })
  graph.on('node:mouseleave', e => {
    graph.setItemState(e.item, 'showAnchors', false);
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

// after clicking on the first node, the edge is created, update the sourceAnchor
  graph.on('afteradditem', e => {
    if (e.item && e.item.getType() === 'edge') {
      graph.updateItem(e.item, {
        sourceAnchor: sourceAnchorIdx
      });
    }
  })

  //节点的事件
  graph.on('node:click', (evt) => {
    const { item } = evt;
    let id=item.get("id");
    //如果节点是状态机
    if(id.startsWith(prefState)){
      showProp.value=2;
      //设置被选中的状态机
      getCurrentState(project,module,id)
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
const getCurrentState=((project,module,id)=>{
  let state:StateMachine=getOneState(project,module,id);
  currentState.value={...state}
  // delete currentState.value.algorithm;
  // delete currentState.value.output_event;
  return currentState.value;
});
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
  //保存大JSON
  saveDataToServer()
};
const addCondition=(()=>{
  let node=graph.findById(currentState.value.key);
  if(!node){
    return;
  }
  addAlgAndEventNode(node,node.getModel().y);
});
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
/**
 * 添加算法和事件节点
 * @param e
 */
const addAlgAndEventNode=(item,canvasY)=>{
  defaultAlg=algList.value[0];
  defaultEvent=outputEventList.value[0];
  if(!defaultAlg||!defaultEvent){
    proxy?.$modal.alertError("必须至少有一个算法和输出事件");
    return;
  }
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
  const algNode={
    id:algNodeId,
    label: defaultAlg.text,
    x: algNodeX,
    y: algNodeY,
    size:algEveSize,
    comboId:comboId
  }
  //事件的初始距离为算法的x+算法的长度,y是和左边的算法一致
  const eveNode={
    id:eveNodeId,
    label: defaultEvent.text,
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
    type:'polyline',
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
  currentState.value.algAndEvent.push({
    id:uuid,
    alg: {key:algNodeId,text:defaultAlg.text},
    event:{key:eveNodeId,text:defaultEvent.text}
  })
  //大JSON更新
  let state:StateMachine=getOneState(project,module,stateId);
  let algAndEvents:AlgAndEventForm[]=state.algAndEvent;
  if(!algAndEvents){
    algAndEvents=new Array();
  }
  algAndEvents.push({
    id:uuid,
    alg: {
      key:defaultAlg.key,text:defaultAlg.text,graphId:algNodeId
    },
    event: {
      key:defaultEvent.key,text:defaultEvent.text,graphId:eveNodeId
    }
  });
  // let algorithm=state.algorithm;
  // if(!algorithm){
  //   algorithm=new Array();
  // }
  // algorithm.push({ key: defaultAlg.key,text: defaultEvent.text});
  // let output_event=state.output_event;
  // if(!output_event){
  //   output_event=new Array();
  // }
  // output_event.push({ key:defaultEvent.key,text: defaultEvent.text });
  saveOrUpdateState(project,module,state);
}

const getCurrentCanvas=()=>{
  currentCanvas.value= getCanvas(project,module);
}
//初始化图形数据
const initGraphData=()=>{
  let graphJson=cache.local.getJSON(graphCacheKey);
  if(!graphJson){
    //如果不存在数据，就用初始数据
    graphJson=  {
      nodes: [
        { id: 'start', x: graphWidth/2, y: 25 ,label:'开始',size:startGraphSize,type:'rect-node'},
      ]
    };
  }
  //返回图形数据
  return graphJson;
}
const addCombo=(stateNodeX,stateNodeY)=>{
  defaultAlg=algList.value[0];
  defaultEvent=outputEventList.value[0];
  if(!defaultAlg||!defaultEvent){
    proxy?.$modal.alertError("必须至少有一个算法和输出事件");
    return;
  }
  const nodeId=uuidv4();
  const comboId=prefCombo+nodeId;
  const stateNodeId=prefState+nodeId;
  const algNodeId=prefAlg+nodeId;
  const eveNodeId=prefEvent+nodeId;
  const stateLabel='状态机';
  //初始距离是50,状态机的坐标永远是50,50
  const stateNode = {
    id:stateNodeId,
    label: stateLabel,
    x: stateNodeX,
    y: stateNodeY,
    size:algEveSize,
    comboId:comboId,
    type:'rect-node'
  };
  //算法的x向右移初始距离+状态机的width+线的width
  const algNodeX=stateNodeX+stateGraphSize[0]+lineWidth
  const algNode={
    id:algNodeId,
    label: defaultAlg.text,
    x: algNodeX,
    y: stateNodeY,
    size:algEveSize,
    comboId:comboId
  }
  //事件的初始距离为算法的x+算法的长度
  const eveNode={
    id:eveNodeId,
    label: defaultEvent.text,
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
    type:'polyline',
    style: {
      endArrow: false
    }
  };
  const comboConfig={
    id:comboId,
    type:'rect',
    allowZoom: true, // 允许 Combo 跟随缩放
    allowDrag: false, // 允许 Combo 跟随平移
  }
  graph.addItem('combo',comboConfig)
  graph.addItem('node', stateNode);
  graph.addItem('node', algNode);
  graph.addItem('node', eveNode);
  graph.addItem('edge',stateToAlgEdge)
  //保存大JSON
  const data={
    key:stateNodeId,
    text:stateLabel,
    x:stateNodeX,
    y:stateNodeY,
    // algorithm:[{ key: defaultAlg.key,text:defaultAlg.text }],
    // output_event:[{ key: defaultEvent.key,text: defaultEvent.text }],
    //需要有个ID标识是哪一个algAndEvent
    algAndEvent:[{
      id:uuidv4(),
      alg: {
        key:defaultAlg.key,text:defaultAlg.text,graphId:algNodeId
      },
      event: {
        key:defaultEvent.key,text:defaultEvent.text,graphId:eveNodeId
      }
    }] ,
    comment:''
  };
  saveOrUpdateState(project,module,data);
}
const initLoad = () => {
  pid.value = route.params.pid;
  id.value = route.params.id;
  //store.commit("ChangeTagModuleStatus", route.path);
  tagsStore.ChangeTagModuleStatus( route.path)
};
const saveCanvasForm=()=>{
  let data=canvasForm.value;
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
    eventVo={key:data.relatedEventId,text:""}
  }
  inputEventList.value.forEach( dict=> {
    if(dict.key==eventVo.key){
      eventVo.text=dict.text;
      data.relateEveName=dict.text;
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
      label: eventVo.text+"-"+data.guard_condition
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
const submitStateForm=(()=>{
  let data=stateForm.value;
  Object.assign(currentState.value,stateForm.value);
  //antv回显
  let stateNode=graph.findById(data.key)
  if(stateNode){
    graph.update(stateNode, {
      label: data.text
    });
  }
  proxy?.$modal.msgSuccess("操作成功");
  dialogState.visible = false;
})
const submitAlgAndEventForm=(()=>{
  let eventVO:Eve={key:algAndEventForm.value.event,text:"",graphId:algAndEventForm.value.eventGraphId};
  let algVO:AlgSimple={key:algAndEventForm.value.alg,text:"",graphId:algAndEventForm.value.algGraphId};
  algList.value.forEach( dict=> {
    if(dict.key==algVO.key){
      algVO.text=dict.text;
    }
  });
  outputEventList.value.forEach( dict=> {
    if(dict.key==eventVO.key){
      eventVO.text=dict.text;
    }
  });
  //双向绑定数据更新
  let algAndEvents:AlgAndEventForm[]=currentState.value.algAndEvent;
  algAndEvents.forEach((algAndEvent)=>{
    if(algAndEvent.id==algAndEventForm.value.id){
      algAndEvent.alg=algVO;
      algAndEvent.event=eventVO;
    }
  })
  currentState.value.algAndEvent=algAndEvents;
  //antv回显
  let algNode=graph.findById(algAndEventForm.value.algGraphId)
  let eventNode=graph.findById(algAndEventForm.value.eventGraphId)
  if(algNode){
    graph.update(algNode, {
      label: algVO.text
    });
  }
  if(eventNode){
    graph.update(eventNode, {
      label: eventVO.text
    });
  }
  let jsonData:StateMachine={};
  //大JSON更新
  Object.assign(jsonData, currentState.value);
  let jsonDataAlgArr=new Array();
  let jsonDataEventArr=new Array();
  algAndEvents.forEach((algAndEvent)=>{
    jsonDataAlgArr.push({key:algAndEvent.alg.key,text:algAndEvent.alg.text});
    jsonDataEventArr.push({key:algAndEvent.event.key,text:algAndEvent.event.text});
  })
  // jsonData.algorithm=jsonDataAlgArr;
  // jsonData.output_event=jsonDataEventArr;
  saveOrUpdateState(project,module,jsonData);
  proxy?.$modal.msgSuccess("操作成功");
  dialogAlgAndEvent.visible = false;
})
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
const handleUpdateCondition=((stateId:string,id:string)=>{
  let algAndEvent:AlgAndEventForm=getAlgAndEventById(project,module,stateId,id);
  dialogAlgAndEvent.visible = true;
  dialogAlgAndEvent.title = "修改算法和事件";
  algAndEventForm.value.id=algAndEvent.id;
  algAndEventForm.value.stateId=stateId;
  algAndEventForm.value.alg=algAndEvent.alg.key;
  algAndEventForm.value.algGraphId=algAndEvent.alg.graphId;
  algAndEventForm.value.event=algAndEvent.event.key;
  algAndEventForm.value.eventGraphId=algAndEvent.event.graphId;
})
const handleUpdateState=(()=>{
  resetStateForm();
  Object.assign(stateForm.value,currentState.value);
  dialogState.visible = true;
  dialogState.title = "修改状态机";
})
const handleDeleteCondition=async(stateId,id)=>{
  await proxy?.$modal.confirm('是否确认删除？');
  let algAndEvents:AlgAndEventForm[]=currentState.value.algAndEvent;
  //删除节点
  let algAndEvent=algAndEvents.find(x=>x.id==id);
  graph.removeItem(graph.findById(algAndEvent.alg.key));
  graph.removeItem(graph.findById(algAndEvent.event.key));
  //更新双向绑定的数据
  algAndEvents=algAndEvents.filter(x=>x.alg.key!=algAndEvent.alg.key);
  algAndEvents=algAndEvents.filter(x=>x.event.key!=algAndEvent.event.key);
  currentState.value.algAndEvent=algAndEvents;
  //更新图JSON
  saveDataToServer();
  //更新大JSON
  removeAlgAndEvent(project,module,stateId,prefAlg+id);
}

const resetEdgeForm = () => {
  edgeForm.value={ ...initEdgeFormData };
  edgeFormRef.value?.resetFields();
}
const resetCanvasForm = () => {
  canvasForm.value={ ...initCanvasFormData };
  canvasFormRef.value?.resetFields();
}
const resetStateForm = () => {
  stateForm.value={ ...initStateFormData };
  stateFormRef.value?.resetFields();
}
const resetAlgAndEventForm = () => {
  algAndEventForm.value={ ...initAlgAndEventFormData };
  algAndEventFormRef.value?.resetFields();
}
const cancelEdgeDialog = () => {
  dialogEdge.visible = false;
}
const cancelCanvasDialog = () => {
  dialogCanvas.visible = false;
}
const cancelStateDialog = () => {
  dialogState.visible = false;
}
const cancelAlgAndEventDialog = () => {
  dialogAlgAndEvent.visible = false;
}
onMounted(() => {
  initData();
});
const initData=(()=>{
  module=route.params.id;
  //得到事件列表
  inputEventList.value=getInputEvents(project,module);
  outputEventList.value=getOutputEvents(project,module);
  algList.value=getAlgList(project,module);
  initLoad();
  //用ref获取DOM元素必须在onMounted中赋值,否则取不到
  graphWidth=container.value.offsetWidth;
  graphHeight=container.value.offsetHeight;
  data=initGraphData();
  initGraph(data,graphWidth,graphHeight);
})
watch(() => route.params.id, (newVal, oldVal) => {
  graphCacheKey=cacheKey+"-"+project+"-"+newVal;
  initData();
});
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