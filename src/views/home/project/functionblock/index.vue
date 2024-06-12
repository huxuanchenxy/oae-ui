<template>
<div class="main">
  <div class="left"  id="container"  ref="container"></div>
  <div class="right">
    <el-tree
        ref="treeRef"
        style="max-width: 200px"
        :data="data"
        default-expand-all
        node-key="id"
        :props="defaultProps"
        draggable
        @node-drag-end="handleDragEnd"
        allow-drag="true"
    />
  </div>
  <el-dialog :title="dialogAlgAndEvent.title" v-model="dialogAlgAndEvent.visible" width="500px" :modal-append-to-body="false">
    <el-tabs v-model="activeName" class="demo-tabs" >
      <el-tab-pane label="输入事件" name="inputEventTab">
        <div class="table_in">
          <vxe-toolbar>
            <template #buttons>
              <vxe-button @click="insertInputEvent()">新增</vxe-button>
              <vxe-button @click="removeInputEvents()">删除选中</vxe-button>
            </template>
          </vxe-toolbar>
          <vxe-table
              border
              ref="inputEventTableRef"
              show-overflow
              :data="inputEventList"
              :column-config="{resizable: true}"
              :edit-config="{trigger: 'click', mode: 'cell'}">
            <vxe-column type="checkbox" field="key" width="60"></vxe-column>
            <vxe-column field="text" title="名称" :edit-render="{autofocus: '.vxe-input--inner'}">
              <template #edit="{ row }">
                <vxe-input v-model="row.text" type="text"></vxe-input>
              </template>
            </vxe-column>
            <vxe-column field="relatedEvent" title="映射事件" :edit-render="{}"  >
              <template #default="{ row }">
                <span>{{ formatSystemInputEvent(row.relatedEvent) }}</span>
              </template>
              <template #edit="{ row }">
                <vxe-select v-model="row.relatedEvent" transfer>
                  <vxe-option v-for="item in systemInputEvents" :key="item.key" :value="item.key" :label="item.text"></vxe-option>
                </vxe-select>
              </template>
            </vxe-column>
          </vxe-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="输出事件" name="outputEventTab">
        <div class="table_in">
          <vxe-toolbar>
            <template #buttons>
              <vxe-button @click="insertOutputEvent()">新增</vxe-button>
              <vxe-button @click="removeOutputEvents()">删除选中</vxe-button>
            </template>
          </vxe-toolbar>
          <vxe-table
              border
              ref="outputEventTableRef"
              show-overflow
              :data="outputEventList"
              :column-config="{resizable: true}"
              :edit-config="{trigger: 'click', mode: 'cell'}">
            <vxe-column type="checkbox" field="key" width="60"></vxe-column>
            <vxe-column field="text" title="名称" :edit-render="{autofocus: '.vxe-input--inner'}">
              <template #edit="{ row }">
                <vxe-input v-model="row.text" type="text"></vxe-input>
              </template>
            </vxe-column>
            <vxe-column field="relatedEvent" title="映射事件" :edit-render="{}"  >
              <template #default="{ row }">
                <span>{{ formatSystemOutputEvent(row.relatedEvent) }}</span>
              </template>
              <template #edit="{ row }">
                <vxe-select v-model="row.relatedEvent" transfer>
                  <vxe-option v-for="item in systemOutputEvents" :key="item.key" :value="item.key" :label="item.text"></vxe-option>
                </vxe-select>
              </template>
            </vxe-column>
          </vxe-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="输入变量" name="inputVariTab">
        <div class="table_in">
          <vxe-toolbar>
            <template #buttons>
              <vxe-button @click="insertInputVari()">新增</vxe-button>
              <vxe-button @click="removeInputVaris()">删除选中</vxe-button>
            </template>
          </vxe-toolbar>
          <vxe-table
              border
              ref="inputVariTableRef"
              show-overflow
              :data="inputVariList"
              :column-config="{resizable: true}"
              :edit-config="{trigger: 'click', mode: 'cell'}">
            <vxe-column type="checkbox" field="key" width="60"></vxe-column>
            <vxe-column field="text" title="名称" :edit-render="{autofocus: '.vxe-input--inner'}">
              <template #edit="{ row }">
                <vxe-input v-model="row.text" type="text"></vxe-input>
              </template>
            </vxe-column>
            <vxe-column field="relatedEvents" title="关联事件" :edit-render="{}"  >
              <template #default="{ row }">
                <span>{{ formatInputVariRelatedEvents(row.relatedEvents) }}</span>
              </template>
              <template #edit="{ row }">
                <vxe-select v-model="row.relatedEvents" transfer multiple>
                  <vxe-option v-for="item in inputEventList" :key="item.key" :value="item.key" :label="item.text"></vxe-option>
                </vxe-select>
              </template>
            </vxe-column>
            <vxe-column field="type" title="类型" :edit-render="{}"  >
              <template #default="{ row }">
                <span>{{ formatVariType(row.type) }}</span>
              </template>
              <template #edit="{ row }">
                <vxe-select v-model="row.type" transfer>
                  <vxe-option v-for="item in variType" :key="item.value" :value="item.value" :label="item.label"></vxe-option>
                </vxe-select>
              </template>
            </vxe-column>
            <vxe-column field="related" title="映射变量" :edit-render="{}"  >
              <template #default="{ row }">
                <span>{{ formatSystemInputVari(row.relatedVari) }}</span>
              </template>
              <template #edit="{ row }">
                <vxe-select v-model="row.relatedVari" transfer>
                  <vxe-option v-for="item in systemInputVaris" :key="item.key" :value="item.key" :label="item.text"></vxe-option>
                </vxe-select>
              </template>
            </vxe-column>
          </vxe-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="输出变量" name="outputVariTab">
        <div class="table_in">
          <vxe-toolbar>
            <template #buttons>
              <vxe-button @click="insertOutputVari()">新增</vxe-button>
              <vxe-button @click="removeOutputVaris()">删除选中</vxe-button>
            </template>
          </vxe-toolbar>
          <vxe-table
              border
              ref="outputVariTableRef"
              show-overflow
              :data="outputVariList"
              :column-config="{resizable: true}"
              :edit-config="{trigger: 'click', mode: 'cell'}">
            <vxe-column type="checkbox" field="key" width="60"></vxe-column>
            <vxe-column field="text" title="名称" :edit-render="{autofocus: '.vxe-input--inner'}">
              <template #edit="{ row }">
                <vxe-input v-model="row.text" type="text"></vxe-input>
              </template>
            </vxe-column>
            <vxe-column field="relatedEvents" title="关联事件" :edit-render="{}"  >
              <template #default="{ row }">
                <span>{{ formatOutputVariRelatedEvents(row.relatedEvents) }}</span>
              </template>
              <template #edit="{ row }">
                <vxe-select v-model="row.relatedEvents" transfer multiple>
                  <vxe-option v-for="item in outputEventList" :key="item.key" :value="item.key" :label="item.text"></vxe-option>
                </vxe-select>
              </template>
            </vxe-column>
            <vxe-column field="type" title="类型" :edit-render="{}"  >
              <template #default="{ row }">
                <span>{{ formatVariType(row.type) }}</span>
              </template>
              <template #edit="{ row }">
                <vxe-select v-model="row.type" transfer>
                  <vxe-option v-for="item in variType" :key="item.value" :value="item.value" :label="item.label"></vxe-option>
                </vxe-select>
              </template>
            </vxe-column>
            <vxe-column field="related" title="映射变量" :edit-render="{}"  >
              <template #default="{ row }">
                <span>{{ formatSystemOutputVari(row.relatedVari) }}</span>
              </template>
              <template #edit="{ row }">
                <vxe-select v-model="row.relatedVari" transfer>
                  <vxe-option v-for="item in systemOutputVaris" :key="item.key" :value="item.key" :label="item.text"></vxe-option>
                </vxe-select>
              </template>
            </vxe-column>
          </vxe-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="内部变量" name="inVariTab">
        <div class="table_in">
          <el-table :data="inVariList" style="width: 100%" height="150">
            <el-table-column type="selection" width="55"  prop="key"/>
            <el-table-column label="名称"   width="100" prop="text"/>
            <el-table-column label="映射变量" prop="comment"/>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
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
import { ElTree } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { DragEvents } from 'element-plus/es/components/tree/src/model/useDragNode'
// import {createGraphNode,updateGraphNode,updateGraphNodeController
//   // ,initGraph
// } from "@/antvgraph/functionBlock/functionBlockNode";
import type { FunctionBlock,FunctionBlockTree,BlockInputEventForm,
  BlockOutputEventForm,BlockInputVariForm,BlockOutputVariForm} from '@/api/functionBlock/type';
import type { SystemEventInput,SystemEventOutput} from '@/api/systeminter/systemevent/type';
import type { SystemVariInput,SystemVariOutput} from '@/api/systeminter/systemvari/type';
import type { Link} from '@/api/functionBlockLink/type';
import { v4 as uuidv4 } from 'uuid';
import  cache  from "@/plugins/cache.ts";
import {getOneFunctionBlock,saveOrUpdateFunctionBlock} from "@/api/functionBlock";
import {saveOrUpdateLink} from "@/api/functionBlockLink";
import {getSystemInputEvents,getSystemOutputEvents} from "@/api/systeminter/systemevent";
import {getSystemInputVaris,getSystemOutputVaris} from "@/api/systeminter/systemvari";
import {listSegDataList} from "@/api/controller";
import { VXETable, VxeTableInstance } from 'vxe-table'
import G6 from "@antv/g6";
import {processParallelEdgesOnAnchorPoint,setLinkState,updateGraphNode} from "@/antvgraph/functionBlock/functionBlockNode";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
let inputEventList = ref<BlockInputEventForm[]>([]);
let outputEventList = ref<BlockOutputEventForm[]>([]);
let inputVariList = ref<BlockInputVariForm[]>([]);
let outputVariList = ref<BlockOutputVariForm[]>([]);
const activeName = ref('inputEventTab')
const { variType } = toRefs<any>(proxy?.useDict("variType"));
let graph;
let systemInputEvents=ref<SystemEventInput[]>([]);
let systemOutputEvents=ref<SystemEventOutput[]>([]);
let systemInputVaris=ref<SystemVariInput[]>([]);
let systemOutputVaris=ref<SystemVariOutput[]>([]);
const project="project1";
let currentBlockId="";
// let module=route.params.id;
 let module=4;//todo 后续改成route.params.id
const cacheKey="graph_fbbs";
let graphCacheKey=cacheKey+"-"+project+"-"+module;
const inputEventTableRef = ref<VxeTableInstance<BlockInputEventForm>>()
const outputEventTableRef = ref<VxeTableInstance<BlockOutputEventForm>>()
const inputVariTableRef = ref<VxeTableInstance<BlockInputVariForm>>()
const outputVariTableRef = ref<VxeTableInstance<BlockOutputVariForm>>()
const eventOrVariSize=[60,25];//第一个是宽度，第二个是调度
const startGraphSize=[60,25];//第一个是宽度，第二个是调度
const centerGraphSize=[100,25];//第一个是宽度，第二个是调度
const comboWidth=200;
const eventOrVariPadding=40;
const container = ref<any>(null);
let graphWidth;
let graphHeight;
let data=ref<FunctionBlockTree[]>([]);
let sourceAnchorIdx, targetAnchorIdx;
let oldInputEvents=new Array<BlockInputEventForm>();
let oldOutputEvents=new Array<BlockOutputEventForm>();
let oldInputVaris=new Array<BlockInputVariForm>();
let oldOutputVaris=new Array<BlockOutputVariForm>();
const dialogAlgAndEvent = reactive<DialogOption>({
  visible: false,
  title: ''
});
const treeRef = ref<InstanceType<typeof ElTree>>()
const defaultProps = {
  children: 'children',
  label: 'centerText',
}
const contextMenu = new G6.Menu({
  getContent(evt) {
    return "<ul><li>删除</li>";
  },
  handleMenuClick: (target, item) => {
    if(item){
      //如果右键的是节点或其他
      deleteNode(item);
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
    nodeIds.forEach((nodeId)=>{
      graph.removeItem(nodeId);
    })
    edgeIds.forEach((edgeId)=>{
      graph.removeItem(edgeId);
    })
  }else{
    proxy?.$modal.msgWarning("您没有选中任何节点");
  }
}
let segData;
let resourceData;

const cancelAlgAndEventDialog = () => {
  dialogAlgAndEvent.visible = false;
}

const initGraphEvent=(()=>{
  graph.on('combo:dblclick', nodeDbClick);
  graph.on('afterupdateitem', (e) => {
    saveDataToServer();
  });
  graph.on("aftercreateedge", (evt) => {
    let data={id:evt.edge.get("id"),from:evt.edge.getSource()._cfg?.id,to:evt.edge.getTarget()._cfg?.id}
    // saveOrUpdateLink(project,data);
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
  graph.on('node:mouseenter', e => {
    const item=e.item;
    setLinkState(item,true);
  })
  graph.on('node:mouseleave', e => {
    const item=e.item;
    setLinkState(item,false);
  })
  //边的事件
  graph.on('edge:click', (evt) => {
    const { item } = evt;
    graph.setItemState(item, 'selected', true);
  });
});
const nodeDbClick=((evt)=>{
  currentBlockId=evt.item.get("id");
  let block=getOneFunctionBlock(project,module,currentBlockId);
  if (block){
    inputEventList.value=block.input_events;
    outputEventList.value = block.output_events;
    inputVariList.value = block.inputs
    outputVariList.value = block.outputs;
    oldInputEvents=block.input_events;
    oldOutputEvents = block.output_events;
    oldInputVaris = block.inputs
    oldOutputVaris = block.outputs;
  }else{
    inputEventList.value=new Array();
    outputEventList.value = new Array();
    inputVariList.value = new Array();
    outputVariList.value = new Array();
  }
  //需要把原先的给保存进去，因为在确定更新后要对比进行更新，删除和新增
  dialogAlgAndEvent.visible = true;
});
const addFunctionBlockNode=((functionBlock:FunctionBlock)=>{
  // createGraphNode(functionBlock,graph)
  //双向绑定更新
  //大JSON更新
});
const addCombo=(comboX,comboY,functionBlock)=>{
  let topStartX=comboX;
  let topStartY=comboY;
  let bottomStartX;
  let bottomStartY;
  const comboId=uuidv4();
  let inputEvents=functionBlock.input_events;
  let outputEvents=functionBlock.output_events;
  let inputVaris=functionBlock.inputs;
  let outputVaris=functionBlock.outputs;
  const comboConfig={
    id:comboId,
    type:'rect',
    size:[comboWidth,200]
  }
  graph.addItem('combo',comboConfig)
  inputEvents.forEach((inputEvent,index)=>{
    let inputEventNode = {
      id:uuidv4(),
      label: inputEvent.text,
      x: topStartX,
      y: topStartY+index*eventOrVariPadding,
      size:eventOrVariSize,
      comboId:comboId,
      type:'rect-node',
    };
    graph.addItem('node', inputEventNode);
  })
  outputEvents.forEach((outputEvent,index)=>{
    let outputEventNode = {
      id:uuidv4(),
      label: outputEvent.text,
      x: topStartX+comboWidth,
      y: topStartY+index*eventOrVariPadding,
      size:eventOrVariSize,
      comboId:comboId,
      type:'rect-node',
    };
    graph.addItem('node', outputEventNode);
  })
  if (inputEvents.length>outputEvents.length){
    bottomStartY=topStartY+inputEvents.length*eventOrVariPadding+50;
  }else{
    bottomStartY=topStartY+outputEvents.length*eventOrVariPadding+50;
  }
  let centerNode = {
    id:uuidv4(),
    label: "center",
    x: comboX+100,
    y: bottomStartY-eventOrVariPadding,
    size:centerGraphSize,
    comboId:comboId,
    type:'rect',
  };
  graph.addItem('node', centerNode);
  inputVaris.forEach((inputVari,index)=>{
    let inputEventNode = {
      id:uuidv4(),
      label: inputVari.text,
      x: comboX,
      y: bottomStartY+index*eventOrVariPadding,
      size:eventOrVariSize,
      comboId:comboId,
      type:'rect-node',
    };
    graph.addItem('node', inputEventNode);
  })
  outputVaris.forEach((outputVari,index)=>{
    let outputEventNode = {
      id:uuidv4(),
      label: outputVari.text,
      x: comboX+200,
      y: bottomStartY+index*eventOrVariPadding,
      size:eventOrVariSize,
      comboId:comboId,
      type:'rect-node',
    };
    graph.addItem('node', outputEventNode);
  })

  saveDataToServer()
}
/**
 * 拖动结束后加上combo
 * @param draggingNode
 * @param dropNode
 * @param dropType
 * @param ev
 */
const handleDragEnd = (
    draggingNode: Node,
    dropNode: Node,
    dropType,
    ev: DragEvents
) => {
  //先加功能块
  let functionBlock:FunctionBlock={
    input_events:[{key:1,text:'inputevent1'},{key:2,text:'inputevent2'},],
    output_events:[{key:3,text:'output_events'},{key:4,text:'output_events2'}],
    inputs:[{key:5,text:'inputs'},{key:6,text:'inputs2'}],
    outputs:[{key:7,text:'outputs'},{key:8,text:'outputs2'}],
    // x:ev.x,
    // y:ev.y,
    // centerText:dropNode.data.label,
    // title:dropNode.data.title,
    // device:dropNode.data.device
  }
  addCombo(ev.x,ev.y,functionBlock);
  // addFunctionBlockNode(functionBlock)
  // saveDataToServer();
}

const saveDataToServer=()=>{
  const data = graph.save(); // 获取图实例的数据
  cache.local.setJSON(graphCacheKey,data);
}
/**
 * 重新加载图数据
 */
const changeGraphData=(()=>{
  const graphData=cache.local.getJSON(graphCacheKey)
  if (graphData){
    graph.data(graphData);
    graph.render();
  }
})
onMounted(() => {
  initData();//初始化基础数据
  // changeGraphData();//加载图像
  initGraphEvent();//初始化画布事件
});

const initTreeData=(()=>{
  segData=listSegDataList();
  // resourceData=listResourceDataList();
  data.value= [
    {
      id: 1,
      centerText: '通讯功能快',
      // children: [
      //   {
      //     id: 4,
      //     title: 'title two 1-1',
      //     centerText: 'Level two 1-1',
      //   },
      // ],
      children:segData
    },
    {
      id: 2,
      centerText: '资源功能块',
      children: resourceData
    }
  ]
})
const initData=(()=>{
  //初始化下拉框数据
  systemInputEvents.value=getSystemInputEvents(project,module);
  systemOutputEvents.value=getSystemOutputEvents(project,module);
  systemInputVaris.value=getSystemInputVaris(project,module)
  systemOutputVaris.value=getSystemOutputVaris(project,module);
  initTreeData();
  graphWidth=container.value.offsetWidth;
  graphHeight=container.value.offsetHeight;
  initGraph(initGraphData(),graphWidth,graphHeight);
})
const initGraphData=()=>{
  let graphJson=cache.local.getJSON(graphCacheKey);
  if(!graphJson){
    //如果不存在数据，就用初始数据
    graphJson=  {
      nodes: [
        { id: 'start', x: graphWidth/2, y: 25 ,label:'开始',size:startGraphSize,type:'rect'},
      ]
    };
  }
  //返回图形数据
  return graphJson;
}
//-------输入事件开始
const formatSystemInputEvent = (value: string) => {
  return systemInputEvents.value.find(x=>x.key==value)?.text;
}
//新增输入事件
const insertInputEvent=(async (row?: BlockInputEventForm | number)=>{
  const $table = inputEventTableRef.value
  if ($table) {
    const record = {
      key: uuidv4(),
      blockId:currentBlockId,
    }
    const { row: newRow } = await $table.insertAt(record, row)
    await $table.setEditCell(newRow, 'text')
  }
})
//删除输入事件
const removeInputEvents = () => {
  const $table = inputEventTableRef.value
  if ($table) {
    $table.removeCheckboxRow()
  }
}
//-------输入事件结束
//-------输出事件开始
const formatSystemOutputEvent = (value: string) => {
  return systemOutputEvents.value.find(x=>x.key==value)?.text;
}
//新增输出事件
const insertOutputEvent=(async (row?: BlockOutputEventForm | number)=>{
  const $table = outputEventTableRef.value
  if ($table) {
    const record = {
      key: uuidv4(),
      blockId:currentBlockId,
    }
    const { row: newRow } = await $table.insertAt(record, row)
    await $table.setEditCell(newRow, 'text')
  }
})
//删除输出事件
const removeOutputEvents = () => {
  const $table = outputEventTableRef.value
  if ($table) {
    $table.removeCheckboxRow()
  }
}
//-------输出事件结束
//-------输入变量开始
//格式化变量类型
const formatVariType = (value: string) => {
  return variType.value.find(x=>x.value==value)?.label;
}
//格式化系统输入变量
const formatSystemInputVari = (value: string) => {
  return systemInputVaris.value.find(x=>x.key==value)?.text;
}
//格式化输入变量映射事件
const formatInputVariRelatedEvents = (value: string[]) => {
  let str="";
  if(value){
    let rlts= inputEventList.value.filter(x=>value.includes(x.key))?.map(x=>x.text);
    rlts.forEach(rlt=>{str+=rlt+","});
    str=str.substring(0,str.length-1);
    return str;
  }

}

//新增输入变量
const insertInputVari=(async (row?: BlockInputVariForm | number)=>{
  const $table = inputVariTableRef.value
  if ($table) {
    const record = {
      key: uuidv4(),
      blockId:currentBlockId,
    }
    const { row: newRow } = await $table.insertAt(record, row)
    await $table.setEditCell(newRow, 'text')
  }
})
//删除输入变量
const removeInputVaris = () => {
  const $table = inputVariTableRef.value
  if ($table) {
    $table.removeCheckboxRow()
  }
}
//-------输入变量结束
//-------输出变量开始
//格式化系统输入变量
const formatSystemOutputVari = (value: string) => {
  return systemOutputVaris.value.find(x=>x.key==value)?.text;
}
//格式化输入变量映射事件
const formatOutputVariRelatedEvents = (value: string[]) => {
  let str="";
  if(value){
    let rlts= outputEventList.value.filter(x=>value.includes(x.key))?.map(x=>x.text);
    rlts.forEach(rlt=>{str+=rlt+","});
    str=str.substring(0,str.length-1);
    return str;
  }

}

//新增输出变量
  const insertOutputVari=(async (row?: BlockInputVariForm | number)=>{
  const $table = outputVariTableRef.value
  if ($table) {
    const record = {
      key: uuidv4(),
      blockId:currentBlockId,
    }
    const { row: newRow } = await $table.insertAt(record, row)
    await $table.setEditCell(newRow, 'text')
  }
})
//删除输入变量
const removeOutputVaris = () => {
  const $table = outputVariTableRef.value
  if ($table) {
    $table.removeCheckboxRow()
  }
}
//-------输入变量结束
const submitAlgAndEventForm=(()=>{
  const $inputEventTable = inputEventTableRef.value
  const $outputEventTable = outputEventTableRef.value
  const $inputVariTable = inputVariTableRef.value
  const $outputVariTable = outputVariTableRef.value
  //由于是用户操作，VXE的API处理双向绑定变量
  Object.assign(inputEventList.value,$inputEventTable.getTableData().fullData)
  Object.assign(outputEventList.value,$outputEventTable.getTableData().fullData)
  Object.assign(inputVariList.value,$inputVariTable.getTableData().fullData)
  Object.assign(outputVariList.value,$outputVariTable.getTableData().fullData)
  // Object.assign(outputVariList.value,$outputVariTable.getTableData().fullData)
  let inputEventNameList =inputEventList.value.map(x=>x.text);
  let outputEventNameList =outputEventList.value.map(x=>x.text);
  let inputVariNameList =inputVariList.value.map(x=>x.text);
  let outputVariNameList =outputVariList.value.map(x=>x.text);
  //更新graph
  let functionBlockGraphData:FunctionBlock={
    raw_id:currentBlockId,
    input_events:inputEventNameList,
    output_events:outputEventNameList,
    inputs:inputVariNameList,
    outputs:outputVariNameList,
  }
  updateGraphNode(functionBlockGraphData,graph);
  saveDataToServer();
  // 更新大JSON
  let functionBlockJsonData:FunctionBlock={
    raw_id:currentBlockId,
    input_events:inputEventList.value,
    output_events:outputEventList.value,
    inputs:inputVariList.value,
    outputs:outputVariList.value,
  }
  saveOrUpdateFunctionBlock(project,module,functionBlockJsonData);
  dialogAlgAndEvent.visible = false;
  proxy?.$modal.msgSuccess("操作成功");
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
          trigger: 'drag',
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
      },
    },
  });
  graph.data(data);
  graph.render();
}
</script>
<style scoped lang="scss">
  .main{
    height:1500px;
    display: flex;
    .left{
      flex:0.8;
      width: 1800px;
    }
    .right{
      flex:0.2
    }
  }
</style>