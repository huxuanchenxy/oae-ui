<template>
  <el-dialog
    width="90%"
    id="opcua_resDig"
    style="height: 80%; overflow: hidden"
    top="2vh"
    v-model="modelValue.status"
    show-close
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
        <el-input v-model="formInline.user" placeholder="节点类型" clearable />
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
      <el-table-column prop="date" label="序号" type="index" width="80" />
      <el-table-column prop="date" label="节点号" width="180" />
      <el-table-column prop="name" label="节点名称" width="180" />
      <el-table-column prop="address" label="节点类型" width="180">
        <template #default="{ row }">
          <el-select placeholder="请选择节点类型" size="small">
            <el-option label="只读" value="只读" key="只读" />
            <el-option label="关闭" value="关闭" key="关闭" />
            <el-option label="可读可写" value="可读可写" key="可读可写" />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="控制器资源" width="180" />
      <el-table-column prop="address" label="应用程序" width="180" />
      <el-table-column prop="address" label="功能块名称" width="180" />
      <el-table-column prop="address" label="变量名称" width="180" />
      <el-table-column prop="address" label="变量类型" width="180" />
    </el-table>
  </el-dialog>
</template>

<script setup>
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
  console.log("submit!");
};
</script>

<style   scoped>
</style>
<style>
#opcua_resDig .el-dialog__body {
  padding-top: 5px !important;
}
</style>