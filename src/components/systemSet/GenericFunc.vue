<template>
  <el-dialog
    id="gericfuncDig"
    width="90%"
    :height="'auto'"
    style="overflow: hidden"
    top="2vh"
    v-model="modelValue.status"
    title="通用功能块管理"
    show-close
    :close-on-click-modal="true"
    :close-on-press-escape="true"
  >
    <div class="wrapper">
      <div class="leftContent">
        <div id="genericfuncTree">
          <div
            class="search"
            style="padding-left: 5px; padding-right: 5px; margin-bottom: 5px"
          >
            <el-input
              placeholder="请输入内容"
              :prefix-icon="Search"
              v-model="treeSearch"
            ></el-input>
          </div>
          <!-- highlight-current -->
          <el-tree
            :data="segLevelList"
            ref="treeGenricRef"
            default-expand-all
            :expand-on-click-node="false"
            :props="defaultProps"
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
            @node-contextmenu="showContextMenu"
          >
          </el-tree>
        </div>
      </div>
      <div class="rightContent">
        <el-tabs type="border-card" style="height: 100%; overflow: hidden">
          <el-tab-pane label="详情信息">
            <el-table
              id="eltable"
              :data="tableData"
              max-height="700"
              style="width: 100%; overflow: auto"
              row-key="name"
              default-expand-all
            >
              <el-table-column type="index" label="序号" width="80">
              </el-table-column>
              <el-table-column prop="type" label="类型"> </el-table-column>
              <el-table-column prop="parentName" label="分类名称">
              </el-table-column>
              <el-table-column prop="name" label="功能块名称">
              </el-table-column>
              <el-table-column prop="version" label="版本号"> </el-table-column>
              <el-table-column prop="name" label="文件名"> </el-table-column>
              <el-table-column prop="option" label="操作"> </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </el-dialog>

  <div
    :style="dyStyle.rightPop"
    v-show="rightPopStatus"
    @mouseleave="rightPopStatus = false"
  >
    <div
      style="text-align: center; padding: 10px"
      v-show="
        currentData?.jsonContent == '' || currentData?.jsonContent == null
      "
    >
      <el-link type="primary" @click="newTreeMothod()">新建分组</el-link>
    </div>
    <div
      v-show="
        currentData?.jsonContent == '' || currentData?.jsonContent == null
      "
      style="text-align: center; padding: 10px"
    >
      <el-upload
        :action="actionUploadUrl"
        :data="uploadData"
        multiple
        accept=".fbt"
        :on-change="handleOnChange"
        :on-success="handleTemplateSuccess"
        :show-file-list="false"
      >
        <el-link type="primary" :plain="true">上传数据</el-link>
      </el-upload>
    </div>
    <div
      v-show="currentData.parentId != 0"
      style="text-align: center; padding: 10px"
    >
      <el-link type="primary" @click="delTree()">删除</el-link>
    </div>

    <div
      v-show="
        currentData.parentId != 0 &&
        (currentData?.jsonContent == '' || currentData?.jsonContent == null)
      "
      style="text-align: center; padding: 10px"
    >
      <el-link type="primary" @click="renameTree()">重命名</el-link>
    </div>
  </div>

  <el-dialog
    v-model="dialogTreeVisible"
    :close-on-click-modal="false"
    :title="dialogTreeTitle"
    width="300"
  >
    <el-form
      :model="newTree"
      :rules="rulesTree"
      status-icon
      ref="ruleTreeFormRef"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="newTree.name" placeholder="请输入" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogTreeVisible = false">取消</el-button>
        <el-button type="primary" @click="saveTree(ruleTreeFormRef)"
          >确定</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>
    
    <script setup>
import { baseUrl } from "@/api/baseUrl";
import sysApi from "@/api/sysApi";
import { ElMsg, CusElLoading } from "@/jslib/common.js";
import { Search } from "@element-plus/icons-vue";
const { modelValue } = defineProps({
  modelValue: {
    type: Object,
    default: {},
  },
});
let treeSearch = ref("");
let treeGenricRef = ref();
const filterNode = (value, data) => {
  if (!value) return true;
  return data.name.includes(value);
};
watch(treeSearch, (val) => { 
  treeGenricRef.value.filter(val);
});
let actionUploadUrl = `${baseUrl}/sys/UploadFile`;
const uploadData = computed(() => {
  return {
    types: `fbt,${currentData.value.id},.fbt`,
  };
});

//const fileTemplateList = ref([]);
let segList = ref([]);
//let tableList = ref([]);
const tableData = ref([]);
let segLevelList = ref([]);
let rightPopStatus = ref(false);
const dyStyle = reactive({
  rightPop: {
    position: "absolute",
    width: "80px",
    background: "#fff",
    border: "1px solid #aaa",
    borderRadius: "5px",
    color: "#000",
    zIndex: 5000,
    left: "0px",
    top: "0px",
  },
});
let currentData = ref({});
let dialogTreeVisible = ref(false);
let dialogTreeTitle = ref("");
const ruleTreeFormRef = ref();
const newTree = ref({
  id: 0,
  name: "",
});

const validateTreeName = (rule, value, callback) => {
  if (value !== "") {
    if (dialogTreeTitle.value == "重命名" && value == currentData.value.name) {
      callback();
    } else {
      let pid = currentData.value.id;
      if (dialogTreeTitle.value == "重命名") {
        pid = currentData.value.parentId;
      }
      let params = {
        name: value,
        pid,
      };
      sysApi.validateInternalFbsName(params).then(async (res) => {
        if (res.data) {
          await callback();
        } else {
          await callback(new Error("名称已存在"));
        }
      });
    }
  } else {
    callback(new Error("请输入名称"));
  }
};

const rulesTree = reactive({
  name: [
    { required: true, message: "请输入名称", trigger: "blur" },
    { validator: validateTreeName, trigger: "blur" },
  ],
});

const newTreeMothod = () => {
  newTree.name = "";
  dialogTreeVisible.value = true;
  dialogTreeTitle.value = "新建";
};

const queryData = (list) => {
  list.forEach((obj) => {
    obj.isPenultimate = false;
    if (obj.child) {
      queryData(obj.child);
    }
  });
};
const handleNodeClick = async (data) => {
  queryData(segLevelList.value);
  data.isPenultimate = true;
};
const showContextMenu = (e, data, node, n) => {
  e.preventDefault();
  dyStyle.rightPop.top = e.y + "px";
  dyStyle.rightPop.left = e.x + "px";
  rightPopStatus.value = true;
  currentData.value = data;
  //console.log("currentData.value:::", currentData.value);
};

const customNodeClass = (data, node) => {
  //console.log("cusNodeClass:::", data);
  if (data.isPenultimate) {
    return "is-penultimate";
  }
  return null;
};
const defaultProps = {
  children: "child",
  label: "name",
  class: customNodeClass,
};

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
    sysApi.getInternalFbsList().then((res1) => {
      let list = res1.list;
      loadData(list);
      tableData.value = res1.lsIfbs;
    });
  }
};

const handleOnChange = (file, fileList) => {
  // let cusLoading = CusElLoading("上传中……");
  // if (file.percentage == 100) {
  //   cusLoading.close();
  // }
};

const saveTree = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      dialogTreeVisible.value = false;
      let addObj = {
        id: 0,
        name: newTree.value.name,
        parentId: currentData.value.id,
        status: 1,
      };
      if (dialogTreeTitle.value == "新建") {
        sysApi.addInternalFbs(addObj).then((res) => {
          ElMessage({
            message: "保存成功",
            type: "success",
          });
          newTree.value.name = "";
          sysApi.getInternalFbsList().then((res1) => {
            let list = res1.list;
            tableData.value = res.lsIfbs;
            loadData(list);
          });
        });
      } else if (dialogTreeTitle.value == "重命名") {
        if (newTree.value.name == currentData.value.name) {
        } else {
          addObj.id = currentData.value.id;
          sysApi.updateInternalFbsName(addObj).then((res1) => {
            ElMessage({
              message: "重命名成功",
              type: "success",
            });
            currentData.value.name = newTree.value.name;
          });
        }
      }
    }
  });
};

const delTree = () => {
  let msg = `确定要删除通用功能块:${currentData.value.name}吗?`;
  if (
    currentData.value.jsonContent == "" &&
    currentData.value.child?.length > 0
  ) {
    msg = `确定要删除分组${currentData.value.name}，以及分组下的通用功能块吗?`;
  } else if (currentData.value.jsonContent == "") {
    msg = `确定要删除分组${currentData.value.name}吗?`;
  }
  ElMessageBox.confirm(msg, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      //处理逻辑
      rightPopStatus.value = false;
      let params = {
        id: currentData.value.id,
      };
      sysApi.delInternalFbs(params).then((res1) => {
        sysApi.getInternalFbsList().then((res) => {
          let list = res.list;
          tableData.value = res.lsIfbs;
          loadData(list);
          ElMessage({
            type: "success",
            message: "删除成功",
          });
          currentData.value.jsonContent = null;
        });
      });
    })
    .catch(() => {});
};
const saveBase = () => {
  //console.log("saveBase--tableData.value--:", tableData.value);
  let objJsonContent = JSON.parse(currentData.value.jsonContent);
  objJsonContent.DisplayName = tableData.value[0].displayName;
  objJsonContent.InitialValue = tableData.value[0].initialValue;
  objJsonContent?.VarDeclaration?.forEach((arr) => {
    var objTable = tableData.value.find((x) => x.name == arr.Name);
    if (objTable) {
      arr.DisplayName = objTable?.displayName;
      arr.ArraySize = objTable?.arraySize;
      arr.Type = objTable?.type;
      arr.Option = objTable?.option;
      arr.OptionSelect = objTable?.optionsSelect;
      arr.Enabled = objTable.enabled ? "1" : "0";
      arr.InitialValue = objTable.initialValue;
    }
  });
  if (objJsonContent?.ResourceTypeName?.VarDeclaration) {
    objJsonContent?.ResourceTypeName?.VarDeclaration.forEach((arr) => {
      var objTable = tableData.value[tableData.value.length - 1].children.find(
        (x) => x.name == arr.Name
      );
      if (objTable) {
        arr.DisplayName = objTable?.displayName;
        arr.ArraySize = objTable?.arraySize;
        arr.Type = objTable.type;
        arr.Option = objTable.option;
        arr.Enabled = objTable.enabled ? "1" : "0";
        arr.InitialValue = objTable.initialValue;
      }
    });
  }

  currentData.value.name = tableData.value[0].initialValue;
  objJsonContent.Name = tableData.value[0].initialValue;
  objJsonContent.Icon = currentData.value.images;
  currentData.value.jsonContent = JSON.stringify(objJsonContent);
  sysApi.addDevices(currentData.value).then((res) => {
    ElMessage({
      message: "保存成功",
      type: "success",
    });
  });
};

const renameTree = () => {
  newTree.value.name = currentData.value.name;
  dialogTreeVisible.value = true;
  dialogTreeTitle.value = "重命名";
  //console.log("currentData", currentData.value);
};

const loadData = (list) => {
  segList.value = list; //JSON.parse(sessionStorage.getItem("curFuncLists"));
  segLevelList.value = segList.value?.filter((obj) => {
    return obj.parentId == 0;
  });
  processMenuData(segLevelList.value);
};

const processMenuData = (list) => {
  list.forEach((l) => {
    let isExistFlag = segList.value.some((t) => t.parentId == l.id);
    if (isExistFlag) {
      let childList = segList.value.filter((obj) => {
        return obj.parentId == l.id;
      });
      if (childList) {
        l.child = childList;
        processMenuData(childList);
      }
    }
  });
};

onBeforeMount(() => {
  sysApi.getInternalFbsList().then((res) => {
    let list = res.list;
    tableData.value = res.lsIfbs;
    loadData(list);
  });
});
</script> 
  
<style >
#gericfuncDig .el-dialog__body {
  padding-top: 5px !important;
}
</style>
<style scoped>
#gericfuncDig .wrapper {
  display: flex;
  overflow: hidden;
  justify-content: space-between;
}

#gericfuncDig .wrapper .leftContent {
  flex: 1;
  background-color: #fff;
  margin-right: 10px;
  /* box-shadow: 1px 3px 8px 5px hsla(0, 0%, 78.2%, 0.4); */
  border-radius: 5px;
  overflow: auto;
}
#gericfuncDig .wrapper .left #genericfuncTree {
  margin-bottom: 20px;
}
#gericfuncDig
  .wrapper
  .leftContent
  #genericfuncTree
  .is-penultimate
  > .el-tree-node__content {
  /* color: #fff; */
  color: #4290f7;
  font-weight: bold;
}

#gericfuncDig .wrapper .rightContent {
  flex: 4;
  background-color: #fff;
  /* box-shadow: 1px 3px 8px 5px hsla(0, 0%, 61.2%, 0.4); */
  /* border-radius: 5px; */
  margin-right: 10px;
  overflow: hidden;
}

#gericfuncDig .wrapper .right #eltable .el-input__wrapper {
  box-shadow: 0 0 0 1px #444549 inset;
}
</style>