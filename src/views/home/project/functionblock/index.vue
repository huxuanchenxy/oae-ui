<template>
<div class="main">
  <div class="left"  id="container" >

  </div>
  <div class="right">
    <el-tree
        ref="treeRef"
        style="max-width: 600px"
        :data="data"
        default-expand-all
        node-key="id"
        :props="defaultProps"
        draggable
        @node-drag-end="handleDragEnd"
        allow-drag="true"
    />
  </div>
  <el-dialog :title="dialogAlgAndEvent.title" v-model="dialogAlgAndEvent.visible" width="500px" append-to-body>
    <el-tabs v-model="activeName" class="demo-tabs" >
      <el-tab-pane label="输入事件" name="inputEventTab">
        <div class="tab_table">
          <el-table :data="inputEventList" style="width: 100%" height="150"  @selection-change="handleSelectionChangeInput">
            <el-table-column type="selection" width="55"  prop="key"/>
            <el-table-column label="名称"  prop="text"/>
            <el-table-column label="映射事件" prop="text"/>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="输出事件" name="outputEventTab">Config</el-tab-pane>
      <el-tab-pane label="输入变量" name="inputVariTab">Role</el-tab-pane>
      <el-tab-pane label="输出变量" name="outputVariTab">Task</el-tab-pane>
      <el-tab-pane label="内部变量" name="inVariTab">Task</el-tab-pane>
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
import {createGraphNode,initGraph} from "@/antvgraph/functionBlock/functionBlockNode";
import type { FunctionBlock,FunctionBlockTree} from '@/api/functionBlock/type';
import {getInputEvents,getOutputEvents} from "@/api/inter/event";
import { v4 as uuidv4 } from 'uuid';
import type { EveInputForm,EveOutputForm} from '@/api/inter/event/type';
const inputEventList = ref<EveInputForm[]>([]);
const activeName = ref('inputEventTab')
let graph;
const project="project1";
// let module=route.params.id;
 let module=4;//todo 后续改成route.params.id
const dialogAlgAndEvent = reactive<DialogOption>({
  visible: false,
  title: ''
});
const treeRef = ref<InstanceType<typeof ElTree>>()
const defaultProps = {
  children: 'children',
  label: 'centerText',
}

const data: FunctionBlock[] = [
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
onMounted(() => {
  graph=initGraph();//初始化画布
  initGraphEvent();//初始化画布事件
  initData();//初始化数据
});
const initData=(()=>{
  module=4;
  initEveAndVariList();
})
const initGraphEvent=(()=>{
  graph.on('node:dblclick', nodeDbClick);
});
const nodeDbClick=((evt)=>{
  console.log(evt)
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
    inputEvents:['inputevent1'],
    outputEvents:['outputevent1'],
    inputVaris:['inputvari1'],
    outputVaris:['outputvari2'],
    x:ev.x,
    y:ev.y,
    centerText:dropNode.data.label,
    title:dropNode.data.title,
    device:dropNode.data.device
  }
  addFunctionBlockNode(functionBlock)
}
const submitAlgAndEventForm=(()=>{
  dialogAlgAndEvent.visible = false;
});
const initEveAndVariList = () => {
  inputEventList.value=getInputEvents(project,module);
}
</script>
<style scoped lang="scss">
  .main{
    height:1500px;
    display: flex;
    .left{
      width: 800px;
      border: 1px solid red;
    }
  }
</style>