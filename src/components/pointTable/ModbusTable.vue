<template>
  <el-table id="modtb" :data="modelValue.tableData" style="width: 100%">
    <el-table-column label="序号" type="index" width="80" />
    <el-table-column prop="registerAddress" label="寄存器地址" width="180" />
    <el-table-column prop="variable" label="变量" width="180" />
    <el-table-column prop="variableName" label="变量名称" width="180">
      <template #default="{ row }">
        <el-input v-model="row.variableName" size="small"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="variableType" label="变量类型" width="180" />
    <el-table-column prop="dataType" label="数据类型" width="180" />
    <el-table-column label="操作" width="180">
      <template #default="{ row }">
        <el-link type="primary">清空</el-link>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
const { modelValue } = defineProps({
  modelValue: {
    type: Object,
    default: {},
  },
});
</script>

<style  >
#modtb .el-input__wrapper {
  box-shadow: 0 0 0 1px #444549 inset;
}
</style>