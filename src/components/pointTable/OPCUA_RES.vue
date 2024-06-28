<template>
  <el-dialog
    width="90%"
    id="opcua_resDig"
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
        <h1 style="font-size: 20px">OPCUA_RES</h1>
      </div>
    </template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="节点类型">
        <el-select placeholder="请选择节点类型" v-model="formInline.user">
          <el-option label="请选择" value="" key="请选择" />
          <el-option label="只读" value="只读" key="只读" />
          <el-option label="关闭" value="关闭" key="关闭" />
          <el-option label="可读可写" value="可读可写" key="可读可写" />
        </el-select>
      </el-form-item>
      <el-form-item label="应用程序">
        <el-select v-model="formInline.region" placeholder="应用程序" clearable>
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="功能块名称">
        <el-input
          v-model="formInline.user"
          placeholder="功能块名称"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="80" />
      <el-table-column prop="nodeNo" label="节点号" width="180" />
      <el-table-column prop="nodeName" label="节点名称" width="180">
        <template #default="{ row }">
          <el-input v-model="row.nodeName" size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="nodeType" label="节点类型" width="180">
        <template #default="{ row }">
          <el-select
            placeholder="请选择节点类型"
            v-model="row.nodeType"
            size="small"
          >
            <el-option label="请选择" value="" key="请选择" />
            <el-option label="只读" value="只读" key="只读" />
            <el-option label="关闭" value="关闭" key="关闭" />
            <el-option label="可读可写" value="可读可写" key="可读可写" />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column prop="resourceName" label="控制器资源" width="180" />
      <el-table-column prop="appName" label="应用程序" width="180" />
      <el-table-column prop="funcName" label="功能块名称" width="180" />
      <el-table-column prop="varName" label="变量名称" width="180" />
      <el-table-column prop="varType" label="变量类型" width="180" />
    </el-table>
  </el-dialog>
</template>

<script setup>
import cache from "@/plugins/cache.ts";
import { onMounted } from "vue";
let cacheKey = "functionBlock";
const { modelValue } = defineProps({
  modelValue: {
    type: Object,
    default: {},
  },
});

const formInline = reactive({
  user: "",
  region: "",
  date: "",
});

let tableData = ref([]);
const onSubmit = () => {
  //console.log("submit!", tableData.value);
};

onMounted(() => {
  //console.log("onMounted ", modelValue.returnValue);
  let jsonFuncBlock = cache.local.getJSON(cacheKey);
  if (jsonFuncBlock) {
    let nodes = jsonFuncBlock.nodes;
    if (nodes) {
      let iNo = 50216;
      //console.log("nodes===", nodes);
      nodes.forEach((e) => {
        e.inputVar.forEach((i) => {
          let varType = "输入";
          let varName = i.name;
          assembleTable(e, iNo, varType, varName);
          iNo++;
        });

        e.outputVar.forEach((i) => {
          let varType = "输出";
          let varName = i.name;
          assembleTable(e, iNo, varType, varName);
          iNo++;
        });
      });
    }
  }
});

const assembleTable = (e, iNo, varType, varName) => {
  let appName = e.title;
  let funcName = e.label;
  let resourceName = e?.selectedResource?.label;
  let nodeName = `${appName}_${funcName}_${varName}`;
  let nodeType = "";

  let existObj = modelValue.returnValue.find(
    (x) =>
      x.appName == appName &&
      x.resourceName == resourceName &&
      x.funcName == funcName &&
      x.varType == varType &&
      x.varName == varName
  );
  if (existObj) {
    nodeName = existObj.nodeName;
    nodeType = existObj.nodeType;
  }
  tableData.value.push({
    nodeNo: iNo,
    nodeName,
    nodeType,
    resourceName,
    appName,
    funcName,
    varName,
    varType,
  });
};

const beforeClose = (done) => {
  modelValue.returnValue = tableData.value;
  console.log("done::", done, modelValue.returnValue);
  done();
  //modelValue.status = false;
};
</script>

<style   scoped>
</style>
<style>
#opcua_resDig .el-dialog__body {
  padding-top: 5px !important;
}

#opcua_resDig .el-table .el-input__wrapper {
  box-shadow: 0 0 0 1px #444549 inset;
}
</style>