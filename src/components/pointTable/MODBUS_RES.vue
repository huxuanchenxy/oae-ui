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
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="DI" name="DI">
        <ModbusTable></ModbusTable>
      </el-tab-pane>
      <el-tab-pane label="DO" name="DO">
        <ModbusTable></ModbusTable>
      </el-tab-pane>
      <el-tab-pane label="AI" name="AI">
        <ModbusTable></ModbusTable>
      </el-tab-pane>
      <el-tab-pane label="AO" name="AO">
        <ModbusTable></ModbusTable>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup>
import { onMounted } from "vue";
import ModbusTable from "@/components/pointTable/ModbusTable.vue";
const { modelValue } = defineProps({
  modelValue: {
    type: Object,
    default: {},
  },
});

let tableDataObj = ref({
  status: true,
  type: {},
  tableData: [],
});

const activeName = ref("DI");

//let items = ref([]);
const handleClick = (tab, event) => {
  //console.log(tab, event);
  console.log("activeName", activeName.value);
};

onMounted(() => {
  //items.value.find(x=>x.)
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