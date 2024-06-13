<template>
  <el-dialog
    width="90%"
    style="height: 80%; overflow: hidden"
    top="2vh"
    v-model="modelValue.status"
    title="OPCUA"
    show-close
    :close-on-click-modal="true"
    :close-on-press-escape="false"
  >
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
      <el-table-column prop="address" label="节点类型" width="180" />
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

<style lang="scss" scoped>
</style>