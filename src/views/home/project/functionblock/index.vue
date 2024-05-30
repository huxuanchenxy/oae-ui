<template>
<div class="main">
  <div class="left"  id="container" ></div>
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
<!--            <vxe-column type="seq" width="60"></vxe-column>-->
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
          <vxe-table
              border
              show-overflow
              :data="outputEventList"
              :column-config="{resizable: true}"
              :edit-config="{trigger: 'click', mode: 'cell'}">
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="text" title="名称" :edit-render="{autofocus: '.vxe-input--inner'}">
              <template #edit="{ row }">
                <vxe-input v-model="row.text" type="text"></vxe-input>
              </template>
            </vxe-column>
          </vxe-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="输入变量" name="inputVariTab">
        <div class="table_in">
          <el-table :data="inputVariList" style="width: 100%" height="150" >
            <el-table-column type="selection" width="55"  prop="key"/>
            <el-table-column label="名称"   width="100" prop="text"/>
            <el-table-column label="关联事件" width="150"  prop="relateEveName"/>
            <el-table-column label="类型" prop="type">
              <template #default="scope">
                <dict-tag :options="variType" :value="scope.row.type" />
              </template>
            </el-table-column>
            <el-table-column label="映射变量" prop="comment"/>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="输出变量" name="outputVariTab">
        <div class="table_in">
          <el-table :data="outputVariList" style="width: 100%" height="150" >
            <el-table-column type="selection" width="55"  prop="key"/>
            <el-table-column label="名称"   width="100" prop="text"/>
            <el-table-column label="关联事件" width="150"  prop="relateEveName"/>
            <el-table-column label="类型" prop="type">
              <template #default="scope">
                <dict-tag :options="variType" :value="scope.row.type" />
              </template>
            </el-table-column>
            <el-table-column label="映射变量" prop="comment"/>
          </el-table>
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
import {createGraphNode,updateGraphNode,initGraph} from "@/antvgraph/functionBlock/functionBlockNode";
import type { FunctionBlock,FunctionBlockTree,BlockInputEventForm,BlockInputEventVO,
  BlockOutputEventForm,BlockOutputEventVO,BlockInputVariForm,BlockInputVariVO,BlockOutputVariForm,BlockOutputVariVO} from '@/api/functionBlock/type';
import type { SystemEventInput,SystemEventOutput} from '@/api/systeminter/systemevent/type';
import type { SystemVariInput,SystemVariOutput} from '@/api/systeminter/systemvari/type';
import { v4 as uuidv4 } from 'uuid';
import  cache  from "@/plugins/cache.ts";
import {getOneFunctionBlock,saveOrUpdateFunctionBlock} from "@/api/functionBlock";
import {getSystemInputEvents,getSystemOutputEvents} from "@/api/systeminter/systemevent";
import {getSystemInputVaris,getSystemOutputVaris} from "@/api/systeminter/systemvari";
import { VXETable, VxeTableInstance } from 'vxe-table'
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
const dialogAlgAndEvent = reactive<DialogOption>({
  visible: false,
  title: ''
});
const treeRef = ref<InstanceType<typeof ElTree>>()
const defaultProps = {
  children: 'children',
  label: 'centerText',
}
const data: FunctionBlockTree[] = [
  {
    id: 1,
    title: 'title 1',
    centerText: 'Level one 1',
    children: [
      {
        id: 4,
        title: 'title two 1-1',
        centerText: 'Level two 1-1',
        children: [
          {
            id: 9,
            title: 'title three 1-1-1',
            centerText: 'Level three 1-1-1',
          },
          {
            id: 10,
            title: 'title three 1-1-2',
            centerText: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'title one 2',
    centerText: 'Level one 2',
    children: [
      {
        id: 5,
        title: 'title two 2-1',
        centerText: 'Level two 2-1',
      },
      {
        id: 6,
        title: 'title two 2-2',
        centerText: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    title: 'title one 3',
    centerText: 'Level one 3',
    children: [
      {
        id: 7,
        title: 'title two 3-1',
        centerText: 'Level two 3-1',
      },
      {
        id: 8,
        title: 'title two 3-2',
        centerText: 'Level two 3-2',
      },
    ],
  },
]
const cancelAlgAndEventDialog = () => {
  dialogAlgAndEvent.visible = false;
}

const initGraphEvent=(()=>{
  graph.on('node:dblclick', nodeDbClick);
});
const nodeDbClick=((evt)=>{
  currentBlockId=evt.item.get("id");
  let block=getOneFunctionBlock(project,module,currentBlockId);
  if (block&&block.interface){
    inputEventList=block.interface.input_events;
    outputEventList = block.interface.output_events;
    inputVariList = block.interface.inputs
    outputVariList = block.interface.outputs;
  }
  dialogAlgAndEvent.visible = true;
});
const addFunctionBlockNode=((functionBlock:FunctionBlock)=>{
  createGraphNode(functionBlock,graph)
  //双向绑定更新
  //大JSON更新
});
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
    input_events:['inputevent1'],
    output_events:['outputevent1'],
    inputs:['inputvari1'],
    outputs:['outputvari2'],
    x:ev.x,
    y:ev.y,
    centerText:dropNode.data.label,
    title:dropNode.data.title,
    device:dropNode.data.device
  }
  addFunctionBlockNode(functionBlock)
  saveDataToServer();
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
  graph=initGraph();//初始化画布
  changeGraphData();//加载图像
  initGraphEvent();//初始化画布事件
  initData();//初始化基础数据
});
const initData=(()=>{
  module=4;
  //初始化下拉框数据
  systemInputEvents.value=getSystemInputEvents(project,module);
  systemOutputEvents.value=getSystemOutputEvents(project,module);
  systemInputVaris.value=getSystemInputVaris(project,module)
  systemOutputVaris.value=getSystemOutputVaris(project,module);
})
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
const submitAlgAndEventForm=(()=>{
  const $inputEventTable = inputEventTableRef.value
  //由于是用户操作，VXE的API处理双向绑定变量
  Object.assign(inputEventList.value,$inputEventTable.getTableData().fullData)
  //更新graph
  let functionBlock:FunctionBlock={
    raw_id:currentBlockId,
    input_events:inputEventList.value.map(x=>x.text),
    output_events:outputEventList.value.map(x=>x.text),
    inputs:inputVariList.value.map(x=>x.text),
    outputs:outputEventList.value.map(x=>x.text),
  }
  updateGraphNode(functionBlock,graph);
  // 更新大JSON
  saveOrUpdateFunctionBlock(project,module,functionBlock);
  dialogAlgAndEvent.visible = false;
  proxy?.$modal.msgSuccess("操作成功");
});
</script>
<style scoped lang="scss">
  .main{
    height:1500px;
    display: flex;
    .left{
      flex:0.8;
      width: 1800px;
      border: 1px solid red;
    }
    .right{
      flex:0.2
    }
  }
</style>