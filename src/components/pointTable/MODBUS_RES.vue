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
    <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
      <el-tab-pane label="DI" name="DI">
        <ModbusTable v-model="tableDataObj"></ModbusTable>
      </el-tab-pane>
      <el-tab-pane label="DO" name="DO">
        <ModbusTable v-model="tableDataObj"></ModbusTable>
      </el-tab-pane>
      <el-tab-pane label="AI" name="AI">
        <ModbusTable v-model="tableDataObj"></ModbusTable>
      </el-tab-pane>
      <el-tab-pane label="AO" name="AO">
        <ModbusTable v-model="tableDataObj"></ModbusTable>
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
  typeName: "",
  type: {},
  tableData: [],
});

const activeName = ref("DI");
const handleClick = (tab, event) => {
  getDataTable();
};

onMounted(() => {
  getDataTable();
});

const getDataTable = () => {
  //console.log(modelValue.items,activeName.value)
  var obj = modelValue.items.find((x) => x.attrName == activeName.value);
  if (obj) {
    tableDataObj.value.typeName = activeName.value;
    tableDataObj.value.type = obj;
    tableDataObj.value.tableData = [];
    for (var i = 0; i < tableDataObj.value.type.value; i++) {
      var objTable = {
        registerAddress: 40000 + i,
        variable: "",
        variableName: "",
        variableType: activeName.value,
        dataType:
          activeName.value == "AO" || activeName.value == "AI"
            ? "UNIT"
            : "BOOL",
      };
      tableDataObj.value.tableData.push(objTable);
    }
  }
  console.log("tableDataObj", tableDataObj.value);
};
</script>

<style   scoped>
</style>
<style>
#modbus_resDig .el-dialog__body {
  padding-top: 5px !important;
}
</style>