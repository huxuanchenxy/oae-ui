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
import type { FunctionBlock} from '@/api/functionBlock/type';
interface Tree {
  id: number
  label: string
  children?: Tree[]
}
const treeRef = ref<InstanceType<typeof ElTree>>()
const defaultProps = {
  children: 'children',
  label: 'label',
}

const data: Tree[] = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]
onMounted(() => {
  initGraph();
});
const handleDragEnd = (
    draggingNode: Node,
    dropNode: Node,
    dropType,
    ev: DragEvents
) => {
  // console.log( dropNode.data.id,ev.x,ev.y)
  let functionBlock:FunctionBlock={
    inputEvents:['inputevent1'],
    outputEvents:['outputevent1'],
    inputVaris:['inputvari1'],
    outputVaris:['outputvari2'],
    x:ev.x,
    y:ev.y
  }
  createGraphNode(functionBlock)
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