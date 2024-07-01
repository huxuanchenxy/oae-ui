<template>
  <el-dialog
    id="modbus_resDig"
    width="90%"
    style="height: 80%; overflow: hidden"
    top="2vh"
    v-model="modelValue.status"
    show-close
    :before-close="beforeClose"
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
import cache from "@/plugins/cache.ts";
let cacheKey = "functionBlock";
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
let curValue = ref({});

const activeName = ref("DI");
const handleClick = (tab, event) => {
  getDataTable();
};

onMounted(() => {
  curValue.value = modelValue.returnValue;
  console.log("onmounted modelValue", modelValue.returnValue);
  getDataTable();
});

const getDataTable = () => {
  var obj = modelValue.items.find((x) => x.attrName == activeName.value);
  if (obj) {
    //console.log("obj--",obj,activeName.value)
    tableDataObj.value.typeName = activeName.value;
    tableDataObj.value.type = obj;
    tableDataObj.value.tableData = [];
    let dataType =
      activeName.value == "AO" || activeName.value == "AI" ? "UNIT" : "BOOL";
    for (var i = 0; i < tableDataObj.value.type.value; i++) {
      var objTable = {
        registerAddress: 40000 + i,
        variable: "",
        variableName: "",
        variableType: activeName.value,
        dataType,
      };
      tableDataObj.value.tableData.push(objTable);
    }

    //console.log("tableDataObj", tableDataObj.value);
    getCacheData();
    console.log("curValue.value", curValue.value);

    curValue.value[activeName.value] = tableDataObj.value.tableData.filter(
      (x) => {
        return x.variable != "" && x.varName != "";
      }
    );
  }
};

const getCacheData = () => {
  let jsonFuncBlock = cache.local.getJSON(cacheKey);
  if (jsonFuncBlock) {
    let nodes = jsonFuncBlock.nodes;
    let dataType =
      activeName.value == "AO" || activeName.value == "AI" ? "UINT" : "BOOL";
    if (nodes) {
      nodes.forEach((e) => {
        if (activeName.value == "AO" || activeName.value == "DO") {
          e.inputVar.forEach((i) => {
            //let varType = "输入";
            let varName = i.name;
            if (i.type == dataType) {
              assembleTable(e, varName);
            }
          });
        } else {
          e.outputVar.forEach((i) => {
            //let varType = "输出";
            let varName = i.name;
            if (i.type == dataType) {
              assembleTable(e, varName);
            }
          });
        }
      });
    }
  }
};

const assembleTable = (e, varName) => {
  let appName = e.title;
  let funcName = e.label;
  //let resourceName = e?.selectedResource?.label;
  let variable = `${appName}_${funcName}_${varName}`;
  let variableName = `${appName}_${funcName}_${varName}`;
  var objTbNoData = tableDataObj.value.tableData.find(
    (x) => x.variable == "" && x.variableName == ""
  );
  if (objTbNoData) {
    let existObj = curValue.value[activeName.value]?.find(
      (x) => x.variable == variable
    );
    if (existObj) {
      variableName = existObj.variableName;
    }
    objTbNoData.variable = variable;
    objTbNoData.variableName = variableName;
  }
};

const beforeClose = (done) => {
  modelValue.returnValue = curValue.value;
  //console.log("done::", done, modelValue.returnValue);
  console.log(" beforeClose modelValue.returnValue ", modelValue.returnValue);
  done();
  //modelValue.status = false;
};
</script>

<style   scoped>
</style>
<style>
#modbus_resDig .el-dialog__body {
  padding-top: 5px !important;
}
</style>