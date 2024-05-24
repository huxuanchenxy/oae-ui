<template>
  <el-dialog
    id="eldiSeg"
    width="90%"
    style="height: 80%; overflow: hidden"
    top="2vh"
    v-model="modelValue.status"
    title="控制器资源功能块管理"
    show-close
    :close-on-click-modal="true"
    :close-on-press-escape="false"
  >
    <div class="wrapper">
      <div class="left">
        <el-row>
          <el-col :span="1"
            ><el-upload
              v-model:file-list="fileTemplateList"
              :action="actionUploadUrl"
              :data="uploadData"
              accept=".fbt"
              :on-change="handleOnChange"
              :on-success="handleTemplateSuccess"
              :show-file-list="false"
            >
              <el-link type="primary" :plain="true">上传数据</el-link>
            </el-upload></el-col
          >
          <el-col :span="1">
            <el-link type="primary" style="margin-top: -4px" :plain="true"
              >下载数据</el-link
            ></el-col
          >
        </el-row>

        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="资源功能块名称" />
          <el-table-column prop="type" label="从属资源类型" />
          <el-table-column prop="version" label="版本号" />
          <el-table-column prop="namespace" label="文件名" />
          <el-table-column
            prop="createDate"
            label="操作时间"
            :formatter="dateFormatter"
          />
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>
    
    <script setup>
import { baseUrl } from "@/api/baseUrl";
import sysApi from "@/api/sysApi";
import { ElMsg, CusElLoading } from "@/jslib/common.js";
const { modelValue } = defineProps({
  modelValue: {
    type: Object,
    default: {},
  },
});
let actionUploadUrl = `${baseUrl}/sys/UploadFile`;
const uploadData = computed(() => {
  return {
    types: `resourcefunc,0,.fbt`,
  };
});
const fileTemplateList = ref([]);

//let rightPopStatus = ref(false);
//let currentData = ref({});

const tableData = ref([]);

const handleTemplateSuccess = (res) => {
  //console.log(res);
  if (res.isSuccess) {
    ElMsg(res.data);
    sysApi.getResourcesList().then((res1) => {
      let list = res1;
      loadData(list);
    });
  } else {
    ElMsg(res.message, "error");
  }
};

const handleOnChange = (file, fileList) => {
  let cusLoading = CusElLoading();
  if (file.percentage == 100) {
    cusLoading.close();
  }
};

const dateFormatter = (row, column) => {
  console.log("row,column:", row[column.property]);
  const date = new Date(row[column.property]);
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

const saveBase = () => {};
// const initloadTree = () => {};

onBeforeMount(() => {
  sysApi.getResourceFuncsList().then((res) => {
    tableData.value = res;
  });
});
</script>
    
    <style >
#eldiSeg .el-dialog__body {
  padding-top: 5px !important;
}

.wrapper {
  display: flex;
  overflow: hidden;
  height: 800px;
}

.left {
  flex: 1;

  background-color: #fff;
  margin-right: 10px;
  /* box-shadow: 1px 3px 8px 5px hsla(0, 0%, 78.2%, 0.4); */
  border-radius: 5px;
  overflow: auto;
}
</style>