<template>
  <div>
    <el-row style="margin-left: 40px;">
      <el-col :span="3">
        <el-icon size="20" color="red"><CircleCloseFilled /></el-icon>{{ errorNum }}报错
      </el-col>
      <el-col :span="3">
        <el-icon size="20" color="#409EFF"><InfoFilled /></el-icon>{{ infoNum }}信息
      </el-col>
      <el-col :span="14"></el-col>
      <el-col :span="2"><el-button icon="FullScreen" @click="dialogVisibleTable = true">全屏显示</el-button></el-col>
      <el-col :span="2"><el-button icon="CircleCloseFilled" @click="tableData.length = 0">全部清除</el-button></el-col>
    </el-row>
    <el-table :data="tableData" border height="120" style="width: 97.6%;margin: 5px 10px;">
      <el-table-column type="index" index="index+1" label="序号" width="60" />
      <el-table-column prop="date" label="发生时间" width="210" />
      <el-table-column prop="isError" label="类型" width="70" filter-multiple="false"
      :filters="[
        { text: '报错', value: true },
        { text: '日志', value: false }
      ]"
      :filter-method="filterHandler">
        <template #default="scope">
          <el-icon v-if="scope.row.isError" size="20" color="red"><CircleCloseFilled /></el-icon>
          <el-icon v-else size="20" color="#409EFF"><InfoFilled /></el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="log" label="日志" width="180" />
      <el-table-column prop="logDetail" label="具体信息" >
        <template #default="scope">
          <span v-if="scope.row.logDetail.length>60">{{scope.row.logDetail.slice(0,60)}}...
            <!-- showAllLogDetail(scope.row.logDetail) -->
            <div style="float: right;"><el-button icon="More" @click="logDetail=scope.row.logDetail;dialogVisible = true;">更多</el-button></div>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogVisible"
      title="具体信息"
      fullscreen
      append-to-body
      @before-close="dialogVisible = false"
    >
      <span>{{ logDetail }}</span>
    </el-dialog>
    <el-dialog
      v-model="dialogVisibleTable"
      title="函数日志"
      fullscreen
      append-to-body
      @before-close="dialogVisibleTable = false"
    >
    <el-table :data="tableData" border style="width: 100%;height: 100%;">
      <el-table-column type="index" index="index+1" label="序号" width="60" />
      <el-table-column prop="date" label="发生时间" width="210" />
      <el-table-column prop="isError" label="类型" width="70"
      :filters="[
        { text: '报错', value: true },
        { text: '日志', value: false }
      ]"
      :filter-method="filterHandler">
        <template #default="scope">
          <el-icon v-if="scope.row.isError" size="20" color="red"><CircleCloseFilled /></el-icon>
          <el-icon v-else size="20" color="#409EFF"><InfoFilled /></el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="log" label="日志" width="180" />
      <el-table-column prop="logDetail" label="具体信息" >
        <template #default="scope">
          <span v-if="scope.row.logDetail.length>60">{{scope.row.logDetail.slice(0,60)}}...
            <!-- showAllLogDetail(scope.row.logDetail) -->
            <div style="float: right;"><el-button icon="More" @click="logDetail=scope.row.logDetail;dialogVisible = true;">更多</el-button></div>
          </span>
        </template>
      </el-table-column>
    </el-table>
    </el-dialog>
  </div>
</template>

<script setup>
import { column } from "element-plus/es/components/table-v2/src/common";

const router = useRouter();
let dialogVisible  = ref(false)
let dialogVisibleTable = ref(false)
let logDetail = ref('')
const errorNum = ref(12);
const infoNum = ref(105);
const tableData = ref([
  {
    date: '2016-05-04T02:11:05.420Z',
    isError: true,
    log: '编译错误',
    logDetail: '一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八结束开始需要全屏'
  },
  {
    date: '2016-05-03',
    isError: false,
    log: '所选设备资源保存成功',
    logDetail: ''
  },
  {
    date: '2016-05-02',
    isError: true,
    log: '语法错误',
    logDetail: '123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789'
  },
  {
    date: '2016-05-01',
    isError: false,
    log: 'success',
    logDetail: ''
  },
])

const filterHandler = (value, row, column) => {
  if (value) return row.isError === true
  else return row.isError === false
  // console.log(value)
  // console.log(row)
  // console.log(column)
}

onMounted(() => {
  //console.log("属性");
});

watch(
  () => router.currentRoute.value,
  (newValue) => {
    var newPaths = newValue.fullPath;
    //console.log("newPaths", newPaths);
  }
);
</script>

<style   scoped>
</style>