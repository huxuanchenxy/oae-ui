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
</div>
</template>
<script setup lang="ts">
import { ElTree } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { DragEvents } from 'element-plus/es/components/tree/src/model/useDragNode'
import {createGraphNode,initGraph} from "@/antvgraph/functionBlock/functionBlockNode";
import type { FunctionBlock,FunctionBlockTree} from '@/api/functionBlock/type';
import { v4 as uuidv4 } from 'uuid';
let graph;
const deviceSize=[50,25];
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
onMounted(() => {
  graph=initGraph();
});
const addCombo=((functionBlock:FunctionBlock)=>{
  createGraphNode(functionBlock,graph)
  //再加设备矩形
  // const node={
  //   id:uuidv4(),
  //   label: "",
  //   x: x+10,
  //   y: y+140,
  //   size:deviceSize,
  //   type: 'rect',
  //   comboId:comboId
  // }
  // graph.addItem('node',node)
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
  addCombo(functionBlock)
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