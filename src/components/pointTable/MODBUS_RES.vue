<template>
  <el-dialog
    id="modbus_resDig"
    width="90%"
    style="height: 80%; overflow: hidden"
    top="2vh"
    v-model="modelValue.status"
    show-close
    :close-on-click-modal="true"
    :close-on-press-escape="false"
  >
    <template #header="">
      <div class="my-header">
        <h1 style="font-size: 20px">{{ modelValue.id }}</h1>
      </div>
    </template>
    <el-tabs
      v-model="activeName"
      class="demo-tabs"
      @tab-change="handleClick"
      @tab-click="handleClick"
    >
      <el-tab-pane label="DI" name="DI">
       
      </el-tab-pane>
      <el-tab-pane label="DO" name="DO">

      </el-tab-pane>
      <el-tab-pane label="AI" name="AI">

      </el-tab-pane>
      <el-tab-pane label="AO" name="AO">
        
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup>
import { onMounted } from "vue";
import {ModbusTable} from 
const { modelValue } = defineProps({
  modelValue: {
    type: Object,
    default: {},
  },
});

let tableDataObj = ref({
    status:true,
    tableData:[]
});

const activeName = ref("DI");
let tableData = ref([]);
let items = ref({});
const handleClick = (tab, event) => {
  //console.log(tab, event);
  console.log("activeName",activeName.value);
};

onMounted(() => {
  items.value = modelValue.items;
  console.log("items onMounted:::", activeName.value, items.value);
});
</script>

<style   scoped>
</style>
<style>
#modbus_resDig .el-dialog__body {
  padding-top: 5px !important;
}
</style>