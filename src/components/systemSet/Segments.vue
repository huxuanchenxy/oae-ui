<template>
  <el-dialog
    id="eldiSeg"
    width="90%"
    style="height: 80%; overflow: hidden"
    top="2vh"
    v-model="modelValue.status"
    title="网络段管理"
    show-close
    :close-on-click-modal="true"
    :close-on-press-escape="false"
  >
    <div class="wrapper">
      <div class="left">
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
        <div id="segTree">
          <!-- highlight-current -->
          <el-tree
            node-key="id"
            :data="segLevelList"
            :default-expanded-keys="defaultExpandedKeys"
            :expand-on-click-node="false"
            :props="defaultProps"
            @node-click="handleNodeClick"
            @node-contextmenu="showContextMenu"
          >
          </el-tree>
        </div>
      </div>
      <div class="right">
        <el-tabs
          type="border-card"
          v-show="
            currentData?.jsonContent != '' && currentData?.jsonContent != null
          "
          style="max-height: 500px; overflow: auto"
        >
          <el-tab-pane label="基本信息">
            <div style="display: flex; margin-bottom: 10px">
              <el-button
                type="primary"
                :plain="false"
                size="small"
                @click="saveBase()"
                style="margin-right: 10px"
              >
                <span class="iconfont">&#xe6a2;</span><span>保存</span>
              </el-button>

              部署图颜色：<el-color-picker v-model="currentData.images" />
            </div>
            <el-table
              :data="tableData"
              id="eltable"
              style="width: 100%"
              max-height="690"
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

              <el-table-column prop="enabled" label="是否启用">
                <template #default="{ row }">
                  <el-switch
                    v-if="row?.enabled != null"
                    v-model="row.enabled"
                  />
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="支持的终端设备">
            <el-button @click="addDevices">添加支持的终端设备</el-button>

            <el-table :data="tableDataDevice" style="width: 100%">
              <el-table-column type="index" label="序号" width="80">
              </el-table-column>
              <el-table-column
                prop="deviceName"
                label="终端设备名称"
                width="200"
              />
              <el-table-column label="操作" min-width="150">
                <template #default="scope">
                  <el-link
                    link
                    type="primary"
                    size="small"
                    @click.prevent="deleteDeviceRow(scope.$index, scope.row)"
                  >
                    删除
                  </el-link>
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
        currentData.parentId >= 0 &&
        (currentData?.jsonContent == '' || currentData?.jsonContent == null)
      "
    >
      <el-link type="primary" @click="newTreeMothod()">新建分组</el-link>
    </div>
    <div
      v-show="
        currentData.parentId > 0 &&
        (currentData?.jsonContent == '' || currentData?.jsonContent == null)
      "
      style="text-align: center; padding: 10px"
    >
      <el-upload
        v-model:file-list="fileTemplateList"
        :action="actionUploadUrl"
        :data="uploadData"
        accept=".xlm,.dev,.seg"
        :on-change="handleOnChange"
        :on-success="handleTemplateSuccess"
        :show-file-list="false"
      >
        <el-link type="primary" :plain="true">上传数据</el-link>
      </el-upload>
    </div>
    <div
      v-show="currentData.parentId > 0"
      style="text-align: center; padding: 10px"
    >
      <el-link type="primary" @click="delTree()">删除</el-link>
    </div>

    <div
      v-show="
        currentData.parentId > 0 &&
        (urrentData?.jsonContent == '' || currentData?.jsonContent == null)
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

  <el-dialog
    v-model="dialogTreeListVisible"
    :close-on-click-modal="false"
    title="终端设备列表"
    width="400"
  >
    <el-input
      v-model="filterText"
      style="width: 240px"
      placeholder="搜索终端设备"
    />
    <el-tree
      ref="treeDeviceRef"
      :data="deviceLevelList"
      default-expand-all
      :expand-on-click-node="false"
      :props="defaultProps"
      show-checkbox
      node-key="id"
      @node-click=""
      :filter-node-method="filterNode"
    >
    </el-tree>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogTreeListVisible = false">关闭</el-button>
        <el-button type="primary" @click="saveDeviceList">确定</el-button>
      </div>
    </template>
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
    types: `seg,${currentData.value.id},.seg`,
  };
});
const fileTemplateList = ref([]);
let segList = ref([]);
let segLevelList = ref([]);
let defaultExpandedKeys = ref([]);
let rightPopStatus = ref(false);
let segdevList = ref([]);

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
let dialogTreeListVisible = ref(false);
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
    sysApi.validateSegmentsName(params).then(async (res) => {
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
      sysApi.validateSegmentsName(params).then(async (res) => {
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

const newTreeMothod = () => {
  newTree.name = "";
  dialogTreeVisible.value = true;
  dialogTreeTitle.value = "新建";
};
const rulesTree = reactive({
  name: [
    { required: true, message: "请输入名称", trigger: "blur" },
    { validator: validateTreeName, trigger: "blur" },
  ],
});
const queryData = (list) => {
  list.forEach((obj) => {
    obj.isPenultimate = false;
    if (obj.child) {
      queryData(obj.child);
    }
  });
};
const handleNodeClick = async (data) => {
  //console.log(data.id);
  if (data.id < 0) return;
  currentData.value = data;
  queryData(segLevelList.value);
  data.isPenultimate = true;

  //console.log("current data", currentData.value);
  let params = { id: currentData.value.id };
  sysApi.getSegDevList(params).then((res1) => {
    //console.log("res1", res1);
    tableDataDevice.value = res1;
  });
  tableData.value = [];
  if (data.jsonContent) {
    //console.log("----", data.jsonContent);
    let objJsonContent = JSON.parse(data.jsonContent);
    //console.log("objJsonContent",objJsonContent);
    let objNew = {
      name: "SegmentType Name",
      displayName:
        objJsonContent.DisplayName == null
          ? objJsonContent.Name
          : objJsonContent.DisplayName,
      type: "",
      arraySize: "",
      option: "",
      optionsArray: [],
      initialValue: objJsonContent.Name, // "",
      //enabled: true,
    };
    tableData.value.push(objNew);
    objJsonContent.VarDeclaration.forEach((arr) => {
      let optionsArray = "";
      [{ optionKey: "", optionValue: "请选择" }];
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
    //console.log(objJsonContent, objJsonContent.Name);
  }
};
const showContextMenu = (e, data, node, n) => {
  e.preventDefault();
  currentData.value = data;
  if (currentData.value.id > 0) {
    dyStyle.rightPop.top = e.y + "px";
    dyStyle.rightPop.left = e.x + "px";
    rightPopStatus.value = true;
  }
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

const handleTemplateSuccess = (res) => {
  //console.log(res);
  if (res.isSuccess) {
    ElMsg(res.data);
    // sysApi.getSegmentsList().then((res1) => {
    //   let list = res1;
    //   loadData(list);
    // });
    initloadTree();
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

// const saveTree_older = async (formEl) => {
//   if (!formEl) return;
//   await formEl.validate((valid, fields) => {
//     if (valid) {
//       let addObj = {
//         id: 0,
//         name: newTree.value.name,
//         parentId: currentData.value.id,
//         status: 1,
//       };
//       sysApi.addSegments(addObj).then((res) => {
//         ElMessage({
//           message: "保存成功",
//           type: "success",
//         });
//         newTree.value.name = "";
//         sysApi.getSegmentsList().then((res1) => {
//           let list = res1.list;
//           loadData(list);
//           dialogTreeVisible.value = false;
//         });
//       });
//     }
//   });
// };
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
        sysApi.addSegments(addObj).then((res) => {
          ElMessage({
            message: "保存成功",
            type: "success",
          });
          newTree.value.name = "";
          // sysApi.getSegmentsList().then((res1) => {
          //   let list = res1;
          //   loadData(list);
          // });
          initloadTree();
        });
      } else if (dialogTreeTitle.value == "重命名") {
        if (newTree.value.name == currentData.value.name) {
        } else {
          addObj.id = currentData.value.id;
          sysApi.updateSegmentsName(addObj).then((res1) => {
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
  let msg = `确定要删除网络段${currentData.value.name}吗?`;
  if (
    currentData.value.jsonContent == "" &&
    currentData.value.child?.length > 0
  ) {
    msg = `确定要删除分组${currentData.value.name}，以及分组下的网络段吗?`;
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
      //console.log("curData.id", currentData.value);
      let params = {
        id: currentData.value.id,
      };
      sysApi.delSegments(params).then((res1) => {
        // sysApi.getSegmentsList().then((res) => {
        //   let list = res;
        //   loadData(list);
        //   ElMessage({
        //     type: "success",
        //     message: "删除成功",
        //   });
        //   currentData.value.jsonContent = null;
        // });
        initloadTree();
        currentData.value.jsonContent = null;
        ElMessage({
          type: "success",
          message: "删除成功",
        });
      });
    })
    .catch(() => {});
};

const saveBase = () => {
  let objJsonContent = JSON.parse(currentData.value.jsonContent);
  objJsonContent.DisplayName = tableData.value[0].displayName;
  objJsonContent.InitialValue = tableData.value[0].initialValue;

  objJsonContent.VarDeclaration.forEach((arr) => {
    var objTable = tableData.value.find((x) => x.name == arr.Name);
    if (objTable) {
      arr.DisplayName = objTable.displayName;
      arr.ArraySize = objTable.arraySize;
      arr.Type = objTable.type;
      arr.Option = objTable.option;
      arr.Enabled = objTable.enabled ? "1" : "0";
      arr.InitialValue = objTable.initialValue;
      //arr.OptionSelect = objTable?.optionsSelect;
    }
  });
  currentData.value.name = tableData.value[0].initialValue;
  objJsonContent.Name = tableData.value[0].initialValue;
  objJsonContent.Color = currentData.value.images;
  currentData.value.jsonContent = JSON.stringify(objJsonContent);
  sysApi.addSegments(currentData.value).then((res) => {
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
const initloadTree = () => {
  sysApi.getSegmentsList().then((res) => {
    let list = res.list;
    segdevList.value = res.segdevList;
    loadData(list);
  });
};
const loadData = (list) => {
  segList.value = list; //JSON.parse(sessionStorage.getItem("curFuncLists"));
  segLevelList.value = segList.value?.filter((obj) => {
    return obj.parentId == 0;
  });
  processMenuData(segLevelList.value);
  //console.log("defaultExpandedKeys.value", defaultExpandedKeys.value);
};

const processMenuData = (list) => {
  list?.forEach((l) => {
    defaultExpandedKeys.value.push(l.id);
    let isExistFlag = segList.value.some((t) => t.parentId == l.id);
    if (isExistFlag) {
      let childList = segList.value.filter((obj) => {
        return obj.parentId == l.id;
      });
      if (childList) {
        l.child = childList;
        processMenuData(childList);
      }
    } else {
      if (segdevList.value && segdevList.value.length > 0) {
        let devList = segdevList.value.filter((x) => x.segmentId == l.id);
        if (devList && devList.length > 0) {
          l.child = [];
          let objDevice = {
            id: -l.id,
            name: "终端设备",
            jsonContent: "",
            child: [],
          };
          defaultExpandedKeys.value.push(objDevice.id);
          devList?.forEach((d) => {
            let tempObj = {
              id: -d.deviceId,
              name: d.deviceName,
              jsonContent: "",
              child: [],
            };
            defaultExpandedKeys.value.push(tempObj.id);
            objDevice.child.push(tempObj);
          });
          l.child.push(objDevice);
        }
      }
    }
  });
};

onBeforeMount(() => {
  // sysApi.getSegmentsList().then((res) => {
  //   let list = res;
  //   loadData(list);
  // });
  initloadTree();
});

let deviceList = ref([]);
let deviceLevelList = ref([]);
const addDevices = () => {
  dialogTreeListVisible.value = true;
  sysApi.getDevicesList().then((res) => {
    let list = res;
    loadDeviceData(list);
  });
};

const loadDeviceData = (list) => {
  deviceList.value = list; //JSON.parse(sessionStorage.getItem("curFuncLists"));
  deviceLevelList.value = deviceList.value?.filter((obj) => {
    return obj.parentId == 0;
  });
  processDeviceMenuData(deviceLevelList.value);
};

const processDeviceMenuData = (list) => {
  list.forEach((l) => {
    let isExistFlag = deviceList.value.some((t) => t.parentId == l.id);
    if (isExistFlag) {
      let childList = deviceList.value.filter((obj) => {
        return obj.parentId == l.id;
      });
      if (childList) {
        l.child = childList;
        processDeviceMenuData(childList);
      }
    }
  });
};
let filterText = ref("");
let treeDeviceRef = ref();
let tableDataDevice = ref([]);
watch(filterText, (val) => {
  console.log("fdaf", val);
  treeDeviceRef.value.filter(val);
});
const filterNode = (value, data) => {
  console.log("value,data", value, data);
  if (!value) return true;
  return data.name.includes(value);
};
const saveDeviceList = () => {
  //console.log(treeDeviceRef.value.getCheckedNodes(false, false));//包含父节点
  //console.log(treeDeviceRef.value.getCheckedNodes(true, false));//不包含父节点
  // console.log(treeDeviceRef.value.getCheckedKeys(false));
  // console.log(treeDeviceRef.value.getCheckedKeys(true));
  if (currentData.value) {
    //let checkIdArray = treeDeviceRef.value.getCheckedKeys(true);
    let checkIdArray = treeDeviceRef.value.getCheckedNodes(true, false);
    let lsSegmentDevice = [];
    //console.log("checkIdArray", checkIdArray, currentData.value);
    checkIdArray?.forEach((x) => {
      let objN = {
        segmentId: currentData.value.id,
        deviceId: x.id,
        status: 1,
        id: 0,
        deviceName: "",
      };
      lsSegmentDevice.push(objN);
    });
    if (lsSegmentDevice?.length > 0) {
      sysApi.addSegDev(lsSegmentDevice).then((res) => {
        //console.log("das", res);
        ElMessage({
          message: "保存成功",
          type: "success",
        });
        let params = { id: currentData.value.id };
        sysApi.getSegDevList(params).then((res1) => {
          //console.log("res1", res1);
          tableDataDevice.value = res1;
          dialogTreeListVisible.value = false;
          //initloadTree();
          if (!currentData.value.child) {
            currentData.value.child = [];
            let objDevice = {
              id: -currentData.value.id,
              name: "终端设备",
              jsonContent: "",
              child: [],
            };
            currentData.value.child.push(objDevice);
          }
          checkIdArray?.forEach((d) => {
            let tempObj = {
              id: -d.id,
              name: d.name,
              jsonContent: "",
              isPenultimate: false,
              child: [],
            };
            currentData.value.child[0].child.push(tempObj);
          });
          segLevelList.value = [...segLevelList.value];
        });
      });
    }
  }
};

const deleteDeviceRow = (index, row) => {
  //console.log("scope:", row);
  let msg = `确定要删除终端设备${row.deviceName}吗?`;
  ElMessageBox.confirm(msg, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      let params = {
        id: row.id,
      };
      sysApi.delSegDev(params).then((res1) => {
        tableDataDevice.value.splice(index, 1);

        let treeIndex = currentData.value.child[0]?.child.findIndex(
          (x) => x.name == row.deviceName
        );
        if (treeIndex >= 0) {
          currentData.value.child[0]?.child.splice(treeIndex, 1);
          segLevelList.value = [...segLevelList.value];
        }
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
#segTree {
  margin-top: 10px;
}
#segTree .is-penultimate > .el-tree-node__content {
  /* color: #fff; */
  color: #4290f7;
  font-weight: bold;
}
#segTree .is-penultimate > .el-tree-node__content .el-tree-node__label {
  /* padding: 5px;
  background: #4290f7; */
}

.right {
  flex: 4;
  background-color: #fff;
  box-shadow: 1px 3px 8px 5px hsla(0, 0%, 61.2%, 0.4);
  border-radius: 5px;
  margin-right: 10px;
  overflow: hidden;
}
.right #eltable .el-input__wrapper {
  box-shadow: 0 0 0 1px #444549 inset;
}
</style>