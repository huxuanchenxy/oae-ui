<template>
  <el-dialog
    id="eldiSeg"
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
        <h1 style="font-size: 20px">控制器资源功能块管理</h1>
      </div>
    </template>
    <div class="wrapper">
      <div class="left">
        <el-row>
          <el-col :span="1"
            ><el-upload
              :action="actionUploadUrl"
              :data="uploadData"
              multiple
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
          <el-table-column label="操作" min-width="150">
            <template #default="scope">
              <el-link
                link
                type="primary"
                size="small"
                @click.prevent="deleteRow(scope.$index, scope.row)"
              >
                删除
              </el-link>
            </template>
          </el-table-column>
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
//const fileTemplateList = ref([]);

//let rightPopStatus = ref(false);
//let currentData = ref({});

const tableData = ref([]);

const handleTemplateSuccess = (res, uploadFile, uploadFiles) => {
  //console.log(res);
  if (res.isSuccess) {
    //ElMsg(res.data);
    ElMsg(`${uploadFile.name}： 文件${res.data}`);
  } else {
    //ElMsg(res.message, "error");
    ElMsg(`${uploadFile.name}：${res.message}`, "error");
  }
  let pFlag = uploadFiles.every((x) => x.percentage == 100);
  if (pFlag) {
    // sysApi.getResourcesList().then((res1) => {
    //   let list = res1;
    //   loadData(list);
    // });
    sysApi.getResourceFuncsList().then((res) => {
      tableData.value = res;
    });
  }
};

const handleOnChange = (file, fileList) => {
  // let cusLoading = CusElLoading();
  // if (file.percentage == 100) {
  //   cusLoading.close();
  // }
};

const dateFormatter = (row, column) => {
  console.log("row,column:", row[column.property]);
  const date = new Date(row[column.property]);
  return `${date.getFullYear()}-${getZero(date.getMonth() + 1)}-${getZero(
    date.getDate()
  )} ${getZero(date.getHours())}:${getZero(date.getMinutes())}:${getZero(
    date.getSeconds()
  )}`;
};

const getZero = (num) => {
  // 单数前面加0
  if (parseInt(num) < 10) {
    num = "0" + num;
  }
  return num;
};

const saveBase = () => {};
// const initloadTree = () => {};

onBeforeMount(() => {
  sysApi.getResourceFuncsList().then((res) => {
    tableData.value = res;
  });
});

const deleteRow = (index, row) => {
  console.log("delete Row", index, row);
  let msg = `确定要删除资源功能块：${row.name}吗?`;
  ElMessageBox.confirm(msg, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      let params = {
        id: row.id,
      };
      sysApi.delResourceFuncs(params).then((res1) => {
        tableData.value.splice(index, 1);
        ElMessage({
          type: "success",
          message: "删除成功",
        });
      });
    })
    .catch(() => {});
};
</script>
    
    <style >
#eldiSeg .el-dialog__body {
  padding-top: 5px !important;
}
</style>
<style scoped>
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