<template>
  <el-dialog
    id="eldiDev"
    width="90%"
    :height="'auto'"
    style="overflow: hidden"
    top="2vh"
    v-model="modelValue.status"
    show-close
    :close-on-click-modal="true"
    :close-on-press-escape="false"
  >
    <template #header="">
      <div class="my-header">
        <h1 style="font-size: 20px">终端设备管理</h1>
      </div>
    </template>
    <div class="wrapper">
      <div class="leftContent">
        <!-- <el-row>
            <el-col :span="6"
              ><el-upload
                v-model:file-list="fileTemplateList"
                :action="actionUploadUrl"
                :data="uploadData"
                accept=".xlm,.dev,.seg"
                :on-change="handleOnChange"
                :on-success="handleTemplateSuccess"
                :show-file-list="false"
              >
                <el-link type="primary" :plain="true">上传数据</el-link>
              </el-upload></el-col
            >
            <el-col :span="6">
              <el-link type="primary" style="margin-top: -4px" :plain="true"
                >下载数据</el-link
              ></el-col
            >
          </el-row> -->
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
        <div id="devTree">
          <!-- highlight-current -->
          <el-tree
            ref="treeRef"
            :data="segLevelList"
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
        <el-tabs
          type="border-card"
          v-show="
            currentData?.jsonContent != '' && currentData?.jsonContent != null
          "
          style="height: 99%; overflow: hidden"
        >
          <el-tab-pane label="详情信息">
            <div style="display: flex; margin-bottom: 15px">
              <el-button
                type="primary"
                :plain="false"
                size="small"
                @click="saveBase()"
                style="margin-right: 10px"
              >
                <span class="iconfont">&#xe6a2;</span><span>保存</span>
              </el-button>

              <el-upload
                v-model:file-list="fileTemplateList"
                :action="actionUploadUrl"
                :data="uploadDataImg"
                accept=".jpg,.jpge,.png"
                :on-change="handleOnChange"
                :on-success="handleUploadImgSuccess"
                :show-file-list="false"
              >
                <el-button type="primary" size="small" :plain="false"
                  >上传图标</el-button
                >
              </el-upload>

              <el-image
                v-if="uploadImgPath"
                title="点击查看"
                alt="点击查看"
                style="margin-left: 10px; width: 25px; height: 25px"
                :preview-src-list="[uploadImgPath]"
                :preview-teleported="true"
                :src="uploadImgPath"
                :fit="fill"
                :hide-on-click-modal="true"
              />
            </div>
            <el-table
              id="eltable"
              :data="tableData"
              max-height="688"
              style="width: 100%; overflow: auto"
            >
              <el-table-column type="index" label="序号" width="80">
              </el-table-column>
              <el-table-column prop="name" label="字段名称"> </el-table-column>
              <el-table-column prop="displayName" label="中文名称">
                <template #default="{ row }">
                  <el-input v-model="row.displayName"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="字段类型"> </el-table-column>
              <el-table-column prop="arraySize" label="字段长度">
              </el-table-column>
              <el-table-column prop="initialValue" label="默认值">
                <template #default="{ row }">
                  <el-input
                    v-if="
                      row.initialValue != null &&
                      (row.option == '' || row.option == null)
                    "
                    v-model="row.initialValue"
                  ></el-input>
                  <span v-else-if="row.option != '' && row.option != null">{{
                    row.initialValue
                  }}</span>
                  <span v-else></span>
                </template>
              </el-table-column>
              <el-table-column prop="option" label="选项">
                <template #default="{ row }">
                  <el-select
                    v-if="row.option != '' && row.option != null"
                    v-model="row.initialValue"
                    placeholder="请选择"
                    style="width: 120px"
                  >
                    <el-option
                      v-for="item in row?.optionsArray"
                      :key="item.optionKey"
                      :label="item.optionValue"
                      :value="item.optionKey"
                    />
                  </el-select>
                  <span v-else></span>
                </template>
              </el-table-column>

              <el-table-column prop="enabled" label="是否启用" width="150">
                <template #default="{ row }">
                  <el-switch
                    v-if="row?.enabled != null"
                    v-model="row.enabled"
                  />
                </template>
              </el-table-column>
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
        accept=".dev"
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
let treeRef = ref();
const filterNode = (value, data) => {
  if (!value) return true;
  return data.name.includes(value);
};
watch(treeSearch, (val) => {
  treeRef.value.filter(val);
});
let actionUploadUrl = `${baseUrl}/sys/UploadFile`;
const uploadData = computed(() => {
  return {
    types: `dev,${currentData.value.id},.dev`,
  };
});
const uploadDataImg = computed(() => {
  return {
    types: `dev,${currentData.value.id},.dev,img`,
  };
});
//const fileTemplateList = ref([]);
let segList = ref([]);
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

const tableData = ref([]);
const validateTreeName_older = (rule, value, callback) => {
  if (value !== "") {
    let params = {
      name: value,
      pid: currentData.value.id,
    };
    sysApi.validateDevicesName(params).then(async (res) => {
      if (res.data) {
        await callback();
      } else {
        await callback(new Error("名称已存在"));
      }
    });
  } else {
    callback(new Error("请输入名称"));
  }
};

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
      sysApi.validateDevicesName(params).then(async (res) => {
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
  currentData.value = data;
  if (data.images) {
    uploadImgPath.value = `${baseUrl}/devimgs/${data.images}`;
  } else {
    uploadImgPath.value = "";
  }
  tableData.value = [];
  if (data.jsonContent) {
    //console.log("----", data.jsonContent);
    let objJsonContent = JSON.parse(data.jsonContent);
    //console.log("objJsonContent", objJsonContent);
    let objNew = {
      name: "DeviceType",
      displayName:
        objJsonContent.DisplayName == null
          ? objJsonContent.Name
          : objJsonContent.DisplayName,
      type: "",
      arraySize: "",
      option: "",
      initialValue: objJsonContent.Name,
      // enabled: true,
    };
    tableData.value.push(objNew);
    objJsonContent?.VarDeclaration?.forEach((arr) => {
      let optionsArray = "";
      if (arr.Option) {
        optionsArray = [{ optionKey: "", optionValue: "请选择" }];
        var arrOption = arr.Option.split(",");
        arrOption?.forEach((a) => {
          var arrContent = a.split(":");
          let optionKey = arrContent[0];
          let optionValue = arrContent[1];
          optionsArray.push({ optionKey, optionValue });
        });
      }

      objNew = {
        name: arr.Name,
        displayName: arr.DisplayName == null ? arr.Name : arr.DisplayName,
        type: arr.Type,
        arraySize: arr.ArraySize,
        option: arr.Option,
        initialValue: arr.InitialValue,
        enabled: arr.Enabled == "1" ? true : false,
        optionsArray: optionsArray,
        //optionsSelect: arr?.OptionSelect,
      };
      tableData.value.push(objNew);
    });
    if (objJsonContent?.ResourceTypeName) {
      let objNewRes = {
        name: null, // objJsonContent?.ResourceTypeName.Name,
        displayName: "动态接口变量表", // objJsonContent.DisplayName,
        type: null,
        arraySize: null,
        option: null,
        initialValue: null,
        // enabled: true,
        children: [],
      };

      if (objJsonContent?.ResourceTypeName?.VarDeclaration) {
        objJsonContent?.ResourceTypeName?.VarDeclaration?.forEach((arr) => {
          let optionsArray = "";
          if (arr.Option && arr.Option != "") {
            optionsArray = [{ optionKey: "", optionValue: "请选择" }];
            var arrOption = arr.Option.split(",");
            arrOption?.forEach((a) => {
              var arrContent = a.split(":");
              let optionKey = arrContent[0];
              let optionValue = arrContent[1];
              optionsArray.push({ optionKey, optionValue });
            });
          }
          let childObjNew = {
            name: arr.Name,
            displayName: arr.DisplayName == null ? arr.Name : arr.DisplayName,
            type: arr.Type,
            arraySize: arr.ArraySize,
            option: arr.Option,
            initialValue: arr.InitialValue,
            enabled: arr.Enabled == "1" ? true : false,
            optionsArray: optionsArray,
            optionsSelect: arr?.OptionSelect,
          };
          objNewRes.children.push(childObjNew);
          //tableData.value.push(objNew);
        });
        tableData.value.push(objNewRes);
      }
    }
  }
  // console.log("tableData.value", tableData.value);
};
const showContextMenu = (e, data, node, n) => {
  e.preventDefault();
  dyStyle.rightPop.top = e.y + "px";
  dyStyle.rightPop.left = e.x + "px";
  rightPopStatus.value = true;
  currentData.value = data;
  console.log("currentData.value:::", currentData.value);
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
    sysApi.getDevicesList().then((res1) => {
      let list = res1;
      loadData(list);
    });
  }
};
let uploadImgPath = ref("");
const handleUploadImgSuccess = (res) => {
  if (res.isSuccess) {
    ElMsg(res.message);
    // console.log(
    //   res,
    //   `${baseUrl}/${res.data.linkFilePath}`,
    //   res.data.sourceFileName
    // );
    uploadImgPath.value = `${baseUrl}/${res.data.linkFilePath}`;
    currentData.value.images = res.data.sourceFileName;
    //uploadImgName.value = res.data.sourceFileName;
    // sysApi.getDevicesList().then((res1) => {
    //   let list = res1;
    //   loadData(list);
    // });
  } else {
    ElMsg(res.message, "error");
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
        sysApi.addDevices(addObj).then((res) => {
          ElMessage({
            message: "保存成功",
            type: "success",
          });
          newTree.value.name = "";
          sysApi.getDevicesList().then((res1) => {
            let list = res1;
            loadData(list);
          });
        });
      } else if (dialogTreeTitle.value == "重命名") {
        if (newTree.value.name == currentData.value.name) {
        } else {
          addObj.id = currentData.value.id;
          sysApi.updateDevicesName(addObj).then((res1) => {
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
  let msg = `确定要删除终端设备${currentData.value.name}吗?`;
  if (
    currentData.value.jsonContent == "" &&
    currentData.value.child?.length > 0
  ) {
    msg = `确定要删除分组${currentData.value.name}，以及分组下的终端设备吗?`;
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
      sysApi.delDevices(params).then((res1) => {
        sysApi.getDevicesList().then((res) => {
          let list = res;
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
  sysApi.getDevicesList().then((res) => {
    let list = res;
    loadData(list);
  });
});
</script>
  
  <style >
#eldiDev .el-dialog__body {
  padding-top: 5px !important;
}

#eldiDev
  .wrapper
  .leftContent
  #devTree
  .is-penultimate
  > .el-tree-node__content {
  /* color: #fff; */
  color: #4290f7;
  font-weight: bold;
}
</style>
<style scoped>
#eldiDev .wrapper {
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  height: 800px;
}

#eldiDev .wrapper .leftContent {
  flex: 1;
  background-color: #fff;
  margin-right: 10px;
  /* box-shadow: 1px 3px 8px 5px hsla(0, 0%, 78.2%, 0.4); */
  /* border-radius: 5px; */
  /* border-right: 1px solid #dcdfe6; */
  border-bottom: 1px solid #dcdfe6;
  border-left: 1px solid #dcdfe6;
  overflow: auto;
  height: 99%;
}
#eldiDev .wrapper .leftContent #devTree {
  margin-bottom: 20px;
}

#eldiDev .wrapper .rightContent {
  flex: 4;
  background-color: #fff;
  /* box-shadow: 1px 3px 8px 5px hsla(0, 0%, 61.2%, 0.4); */
  /* border-radius: 5px; */
  margin-right: 10px;
  height: 100%;
  overflow: hidden;
}

#eldiDev .wrapper .rightContent #eltable .el-input__wrapper {
  box-shadow: 0 0 0 1px #444549 inset;
}
</style>