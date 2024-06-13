<template>
    <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="序号" type="index" width="80" />
          <el-table-column prop="date" label="寄存器地址" width="180" />
          <el-table-column prop="name" label="变量" width="180" />
          <el-table-column prop="address" label="变量名称" width="180" />
          <el-table-column prop="address" label="变量类型" width="180" />
          <el-table-column prop="address" label="数据类型" width="180" />
          <el-table-column prop="address" label="操作" width="180" />
        </el-table>
</template>

<script setup>

</script>

<style  scoped>

</style>