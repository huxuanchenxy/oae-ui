<template>
  <el-aside id="leftTree" class="asideTree" :style="asideTreeStyle.asideTree">
    <div style="float: left; width: 205px" v-show="isShowTree">
      <div
        style="
          text-align: center;
          height: 48px;
          width: 205px;
          line-height: 48px;
          border-bottom: 1px solid #bbb;
          /* border-left: none;
        border-top: none; */
        "
      >
        <img
          style="width: 100px; margin: 12px 0 0 -25px"
          src="../assets/img/logo-shdq.png"
          alt=""
        />
      </div>
      <div id="navTree">
        <!-- highlight-current -->
        <el-tree
          :data="listOneFuncList"
          default-expand-all
          :expand-on-click-node="false"
          :props="defaultProps"
          @node-click="handleNodeClick"
          @node-contextmenu="showContextMenu"
        >
          <template #default="{ node, data }">
            <i
              v-show="data.operationType?.includes('algorithm')"
              class="algorithm-icon"
              >{{ data.type }}</i
            >
            <el-input
              ref="isAutoFocus"
              v-model="data.funcName"
              autofocus
              v-if="data.isEdit"
              style="height: 26px; margin-left: 4px"
              @keyup.enter="saveName(data)"
            ></el-input>
            <span
              :title="data.funcName"
              style="
                margin-left: 4px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
              v-else
              >{{ data.funcName }}</span
            >
          </template>
        </el-tree>
      </div>
    </div>
    <div class="sp" @click="showOrHidden()" :title="treeTitle">
      <div :class="{ arrowLeft: isShowTree, arrowRight: !isShowTree }"></div>
    </div>
  </el-aside>
  <div
    :style="dyStyle.rightPop"
    v-show="popStatus && currentData.operation?.includes('right')"
    @mouseleave="popStatus = false"
  >
    <div style="text-align: center">
      <el-link
        style="padding: 10px"
        type="primary"
        v-show="
          currentData.operation?.includes('new') &&
          currentData.operationType === 'algorithm'
        "
        @click="dialogVisible = true"
        >新建</el-link
      >
      <el-link
        style="padding: 10px"
        type="primary"
        v-show="
          currentData.operation?.includes('new') &&
          currentData.operationType === 'bfb'
        "
        @click="
          newModule.name = '';
          dialogModuleVisible = true;
        "
        >新建</el-link
      >
    </div>

    <div
      v-show="currentData.operation?.includes('open')"
      style="text-align: center; padding: 10px"
    >
      <el-link type="primary" @click="handleNodeClick(currentData)"
        >打开</el-link
      >
    </div>
    <div
      v-show="currentData.operation?.includes('del')"
      style="text-align: center; padding: 10px"
    >
      <el-link
        type="primary"
        v-show="currentData.operationType?.includes('algorithm')"
        @click="delAlgorithm(currentData)"
        >删除</el-link
      >
      <el-link
        v-show="currentData.operationType?.includes('module')"
        type="primary"
        @click="delModule(currentData)"
        >删除</el-link
      >
    </div>
    <div
      style="text-align: center"
      v-show="currentData.operation?.includes('rename')"
    >
      <el-link
        type="primary"
        style="padding: 10px"
        @click="renameName(currentData)"
        >重命名</el-link
      >
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="" width="500">
    <el-form
      :model="newAlgorithm"
      :rules="rules"
      status-icon
      ref="ruleFormRef"
      class="demo-ruleForm"
    >
      <el-form-item label="算法名称" prop="text">
        <el-input v-model="newAlgorithm.text" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="语言类型" prop="type">
        <el-select v-model="newAlgorithm.type" placeholder="请选择">
          <el-option
            v-for="item in codeLanguage"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit(ruleFormRef)"
          >确定</el-button
        >
      </div>
    </template>
  </el-dialog>

  <el-dialog
    v-model="dialogModuleVisible"
    :close-on-click-modal="false"
    title="新建模块"
    width="500"
  >
    <el-form
      :model="newModule"
      :rules="rulesModule"
      status-icon
      ref="ruleModuleFormRef"
    >
      <el-form-item label="模块名称" prop="name">
        <el-input v-model="newModule.name" placeholder="请输入" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogModuleVisible = false">取消</el-button>
        <el-button type="primary" @click="saveModule(ruleModuleFormRef)"
          >确定</el-button
        >
      </div>
    </template>
  </el-dialog>

  <Segments v-if="segmentsObj.status" v-model="segmentsObj"></Segments>
  <Devices v-if="devicesObj.status" v-model="devicesObj"></Devices>
  <Controls v-if="controlsObj.status" v-model="controlsObj"></Controls>
  <Resources v-if="resourcesObj.status" v-model="resourcesObj"></Resources>
  <ResourceFuncs
    v-if="resourcefuncsObj.status"
    v-model="resourcefuncsObj"
  ></ResourceFuncs>
  <GenericFunc
    v-if="genericfuncsObj.status"
    v-model="genericfuncsObj"
  ></GenericFunc>
</template>

<script setup>
//import { useRouter, useRoute } from "vue-router";
import sysApi from "@/api/sysApi";
import { pagetagsStore } from "@/store/pageTags.js";
import { algorithmDS } from "@/jslib/dataStructure.js";
import { codeLanguage } from "@/jslib/common.js";
import { ElNotification } from "element-plus";
import {
  getCurrentObj,
  changeData,
  removeCurrentModuleByCache,
} from "@/utils/cache/common";
import cache from "@/plugins/cache.ts";
import { reactive, ref } from "vue";
import { commonStore } from "@/store/commonStore.js";
import Segments from "@/components/systemSet/Segments.vue";
import Devices from "@/components/systemSet/Devices.vue";
import Controls from "@/components/systemSet/Controls.vue";
import Resources from "@/components/systemSet/Resources.vue";
import ResourceFuncs from "@/components/systemSet/ResourceFuncs.vue";
import GenericFunc from "@/components/systemSet/GenericFunc.vue";
import {
  useDeploymentMenuStore,
  useDeploymentNodeIDStore,
} from "@/store/deploymentStore.js";

const deploymentMenuStore = useDeploymentMenuStore();
const deploymentNodeIDStore = useDeploymentNodeIDStore();
const commonstore = commonStore();
const tagsStore = pagetagsStore();

let popStatus = ref(false);
let dialogVisible = ref(false);
let dialogModuleVisible = ref(false);
let isEdit = ref(false);
let currentData = reactive({ funcLevelId: 0 });
let newAlgorithm = reactive(JSON.parse(JSON.stringify(algorithmDS)));
const router = useRouter();
const route = useRoute();
let currentModule = ref(route.params.id);
const reg = /^[A-Za-z]\w+$/;
const ruleFormRef = ref();
const ruleModuleFormRef = ref();
const isAutoFocus = ref(null);
const newModule = ref({
  id: 0,
  name: "",
});
const validateName = (rule, value, callback) => {
  if (!reg.test(value)) {
    callback(new Error("使用字母数字和下划线,首个字符必须是字母"));
  } else {
    let moduleJson = getCurrentObj(project, currentModule.value);
    let tmp = moduleJson.algorithms.filter((item) => {
      return item.text === value;
    });
    if (tmp.length === 0) callback();
    else callback(new Error("同一个模块中算法名称不可重复"));
  }
};
const rules = reactive({
  text: [
    { required: true, message: "算法名称不能为空", trigger: "blur" },
    { validator: validateName, trigger: "blur" },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  type: [
    {
      required: true,
      message: "语言类型必选",
      trigger: "change",
    },
  ],
});
const validateModuleName = (rule, value, callback) => {
  if (value !== "") {
    let params = {
      name: value,
      pid: currentData.id,
    };
    sysApi.validateModule(params).then(async (res) => {
      if (res.data) {
        await callback();
      } else {
        await callback(new Error("模块名称已存在"));
      }
    });
  } else {
    callback(new Error("请输入模块名称"));
  }
};
const rulesModule = reactive({
  name: [
    { required: true, message: "请输入模块名称", trigger: "blur" },
    { validator: validateModuleName, trigger: "blur" },
  ],
});

const dyStyle = reactive({
  rightPop: {
    position: "absolute",
    width: "80px",
    background: "#fff",
    border: "1px solid #aaa",
    borderRadius: "5px",
    color: "#000",
    zIndex: 10,
    left: "0px",
    top: "0px",
  },
});
//const curFuncList = JSON.parse(sessionStorage.getItem("curFuncList"));
const curFuncList = ref([]);
const listOneFuncList = ref([]);
const project = "project1";
const cacheKey = "json";
let segmentsObj = ref({
  status: false,
});
let devicesObj = ref({
  status: false,
});
let resourcesObj = ref({
  status: false,
});
let controlsObj = ref({
  status: false,
});
let resourcefuncsObj = ref({
  status: false,
});
let genericfuncsObj = ref({
  status: false,
});
const customNodeClass = (data, node) => {
  //console.log("cusNodeClass:::", data);
  if (data.isPenultimate) {
    return "is-penultimate";
  }
  return null;
};
const defaultProps = {
  children: "child",
  label: "funcName",
  class: customNodeClass,
};

const processMenuData = (list) => {
  list.forEach((l) => {
    //let curLevel = l.funcLevelId + 1;
    // if (l.funcUrl != "" && l.funcParentId) {
    //   l.funcUrl = `${l.funcUrl}/${l.funcParentId}/${l.id}`;
    // }
    let isExistFlag = curFuncList.value.some(
      (t) => t.funcParentId == l.id //&& t.funcLevelId == curLevel
    );
    if (isExistFlag) {
      //defaultOpeneds.value.push(l.funcUrl);
      let childList = curFuncList.value.filter((obj) => {
        return obj.funcParentId == l.id; //&& obj.funcLevelId == l.funcLevelId + 1;
      });
      if (childList) {
        l.child = childList;
        processMenuData(childList);
      }
    }
    // else {
    //   l.flag = Menu;
    // }
  });
};
let curNode = ref();
let curData = ref();

const handleNodeClick = async (data) => {
  //console.log("handleNodeClick******", data);
  queryData(listOneFuncList.value);
  if (data.funcName == "网络段管理") {
    segmentsObj.value.status = true;
  } else if (data.funcName == "终端设备管理") {
    devicesObj.value.status = true;
  } else if (data.funcName == "控制器管理") {
    controlsObj.value.status = true;
  } else if (data.funcName == "控制器资源管理") {
    resourcesObj.value.status = true;
  } else if (data.funcName == "控制器资源功能块管理") {
    resourcefuncsObj.value.status = true;
  } else if (data.funcName == "通用功能块") {
    genericfuncsObj.value.status = true;
  } else if (data.funcUrl) {
    data.isPenultimate = true;
    const curFuncList = JSON.parse(sessionStorage.getItem("curFuncLists"));
    let path = data.funcUrl;
    let pathArrays = path.split("/");
    let id = "";
    let name = "";
    if (pathArrays.length <= 4) {
      let objFunc = curFuncList.find((l) => l.funcUrl == path);
      id = objFunc.id;
      name = objFunc.funcName;
    }
    if (pathArrays.length > 4) {
      id = pathArrays[3];
      let cObj = curFuncList.find((l) => l.id == id);
      path = cObj.funcUrl;
      name = cObj.funcName;
    }
    let model = {
      id,
      path,
      name,
      effect: "dark",
    };
    //cPath = `${cObj.funcUrl}/${cObj.funcParentId}/${cObj.id}`;
    tagsStore.AddTag(model);
    if (pathArrays.length > 4) {
      getModuleData(id, data.funcUrl);
    } else {
      //router.push({ path: data.funcUrl });
      //console.log("data.funcUrl", data.funcUrl);
      router.push(data.funcUrl);
    }
  }
  // 仅右键打开时用到
  popStatus.value = false;
};

const queryData = (list) => {
  list.forEach((obj) => {
    obj.isPenultimate = false;
    if (obj.child) {
      queryData(obj.child);
    }
  });
};

const showContextMenu = (e, data, node, n) => {
  e.preventDefault();
  // if (
  //   data.funcLevelId === 2 ||
  //   data.funcName === "算法" ||
  //   data.funcLevelId === 3 ||
  //   data.funcLevelId === 5
  // )
  //{
  dyStyle.rightPop.top = e.y + "px";
  dyStyle.rightPop.left = e.x + "px";
  popStatus.value = true;
  currentData = data;
  //console.log("currentData:::", currentData);
  let url = currentData.funcUrl;
  if (url === "") {
    var ppObj = curFuncList.value.find((x) => x.id == data.funcParentId);
    url = `${ppObj.funcUrl}`;
  }
  currentModule.value = url?.split("/")[3];
  // console.log(currentModule.value)
  curData.value = data;
  curNode.value = node;
  //}
};

const onSubmit = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      dialogVisible.value = false;
      let moduleJson = getCurrentObj(project, currentModule.value);
      moduleJson.algorithms.push(newAlgorithm);
      changeData(project, currentModule.value, moduleJson);
      addTreeAlgorithm(newAlgorithm);
      // console.log(newAlgorithm);
    } else {
      // console.log('error submit!', fields)
    }
  });
};

const delAlgorithm = (data) => {
  ElMessageBox.confirm(`确定要删除${data.funcName}?`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      //处理逻辑
      delTree();
      popStatus.value = false;
      // 暂时不作关联判断
      let moduleJson = getCurrentObj(project, currentModule.value);
      moduleJson.algorithms = moduleJson.algorithms.filter((item) => {
        return item.text !== data.funcName;
      });
      changeData(project, currentModule.value, moduleJson);
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {});
};

const renameName = (data) => {
  data.isEdit = true;
  isEdit.value = true;
  popStatus.value = false;
  // 临时保留老名字
  data.oldFuncName = data.funcName;
};
const saveName = (data) => {
  //console.log("savaName---:", data);
  data.isEdit = false;
  isEdit.value = false;
  if (data.funcName === data.oldFuncName) return;
  if (data.operationType.includes("algorithm")) {
    if (!reg.test(data.funcName)) {
      ElNotification({
        title: "算法" + data.oldFuncName + "重命名错误",
        message: "使用字母数字和下划线,首个字符必须是字母",
        position: "bottom-left",
        type: "error",
      });
    } else {
      let moduleJson = getCurrentObj(project, currentModule.value);
      for (let item of moduleJson.algorithms) {
        if (item.text === data.oldFuncName) {
          item.text = data.funcName;
          break;
        }
      }
      // console.log(moduleJson);
      changeData(project, currentModule.value, moduleJson);
      RenameTree(data.funcName);
    }
  } else if (data.operationType.includes("module")) {
    let params = {
      name: data.funcName,
      id: data.id,
      pid: data.funcParentId,
    };
    sysApi.renameModule(params).then((res) => {
      //console.log("renameModule:", res);
      if (res) {
        ElMessage({
          message: "保存成功",
          type: "success",
        });
        sysApi.getFuncList().then((res) => {
          let list = res;
          sessionStorage.setItem("curFuncLists", JSON.stringify(list));
          loadData(list);
        });
      } else {
        ElNotification({
          title: "提示信息",
          message: data.funcName + "名称已存在",
          position: "bottom-left",
          type: "error",
        });
        //data.isEdit = true;
        //isEdit.value = true;
        RenameTree(data.oldFuncName);
      }
    });
  }
};

const saveModule = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      let addModule = {
        id: 0,
        funcName: newModule.value.name,
        funcParentId: currentData.id,
        funcLevelId: currentData.funcLevelId + 1,
        funcUrl: "/module",
        isEdit: false,
        operation: "right,del,rename,open",
        operationType: "module",
      };
      sysApi.addModule(addModule).then((res) => {
        ElMessage({
          message: "保存成功",
          type: "success",
        });
        newModule.value.name = "";
        sysApi.getFuncList().then((res) => {
          let list = res;
          sessionStorage.setItem("curFuncLists", JSON.stringify(list));
          loadData(list);
          dialogModuleVisible.value = false;
        });
      });
    }
  });
};

const addTreeAlgorithm = (newAlgorithm) => {
  let curLevel = curData.value.funcLevelId;
  let curFuncName = curData.value.funcName;

  var newObj = {
    id: 0,
    funcName: "",
    funcUrl: "",
    funcParentId: 0,
    funcLevelId: 0,
    isEdit: false,
    type: newAlgorithm.type,
  };
  if (curFuncName == "算法") {
    newObj.funcName = newAlgorithm.text;
    newObj.funcLevelId = curLevel + 1;
    var ppObj = curFuncList.value.find(
      (x) => x.id == curData.value.funcParentId
    );
    newObj.funcUrl = `${ppObj.funcUrl}/algorithm/${newAlgorithm.text}`;
    let newId = Math.max(...curFuncList.value.map((obj) => obj.id)) + 1;
    newObj.id = newId;
    newObj.funcParentId = curData.value.id;
    newObj.operation = "right,del,open,rename";
    newObj.operationType = "algorithm";
    if (curData.value.child) {
      curData.value.child.push(newObj);
    } else {
      curData.value.child = [];
      curData.value.child.push(newObj);
    }
    listOneFuncList.value = [...listOneFuncList.value];
  }
  handleNodeClick(newObj);
  // router.push(newObj.funcUrl);
  //console.log("curLevel:::", curLevel);
  //console.log("curFuncName:::", curFuncName);
};

const addTree = (id, newArray) => {
  getTreeObj(listOneFuncList.value, id);
  currentData.child = newArray;
  listOneFuncList.value = [...listOneFuncList.value];
};

const getTreeObj = (list, id) => {
  for (let i = 0; i < list.length; i++) {
    let obj = list[i];
    if (obj.id == id) {
      currentData = obj;
      break;
    }
    if (obj.child) {
      getTreeObj(obj.child, id);
    }
  }
};

const delTree = () => {
  const parent = curNode.value.parent;
  const children = parent.data.child;
  const index = children.findIndex((d) => d.id === curData.value.id);
  children.splice(index, 1);
  listOneFuncList.value = [...listOneFuncList.value];
  // console.log('children:',children);
  // console.log('parent',parent.data);
  if (children.length > 0) handleNodeClick(children[0]);
  else {
    var ppObj = curFuncList.value.find((x) => x.id == parent.data.funcParentId);
    handleNodeClick(ppObj);
  }
  // let path = `${ppObj.funcUrl}`;
  // let moduleJson = getCurrentObj(project, currentModule.value);
  // console.log(moduleJson)
  // if (moduleJson.algorithms.length > 0) {
  //   path = path + '/algorithm/' + moduleJson.algorithms[0].text;
  // }
  // console.log(path)
  // router.push(path);
};
const delModule = (data) => {
  ElMessageBox.confirm(`确定要删除${data.funcName}?`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      //处理逻辑
      delTree();
      popStatus.value = false;
      console.log("curData.id", data.id);
      removeCurrentModuleByCache(project, data.id);
      let params = {
        id: data.id,
      };
      sysApi.delModule(params).then((res) => {
        sysApi.getFuncList().then((res) => {
          let list = res;
          sessionStorage.setItem("curFuncLists", JSON.stringify(list));
          loadData(list);
          ElMessage({
            type: "success",
            message: "删除成功",
          });
        });
      });
    })
    .catch(() => {});
};

const RenameTree = (newName) => {
  curData.value.funcName = newName;
  let url = "";
  let arr = curData.value.funcUrl.split("/");
  arr.splice(-1);
  arr.forEach((item) => {
    url = url + item + "/";
  });
  curData.value.funcUrl = url + newName;
  // console.log(curData.value.funcUrl);
  listOneFuncList.value = [...listOneFuncList.value];
  if (route.params.algorithms) handleNodeClick(curData.value);
};
const getCacheFuncList = () => {
  let newTempFuncList = [];
  let maxId = Math.max(...curFuncList.value.map((obj) => obj.id)) + 1;
  let cacheJson = cache.local.getJSON("json");
  if (cacheJson && cacheJson.length > 0) {
    cacheJson.forEach((c) => {
      let moduleId = c.id;
      let name = "";
      let type = "";
      if (c.algorithms && c.algorithms.length > 0) {
        c.algorithms.forEach((el) => {
          name = el.text;
          type = el.type.toLowerCase();
          newTempFuncList.push({ moduleId, name, type });
        });
      }
    });
  }

  if (newTempFuncList.length > 0) {
    newTempFuncList.forEach((e) => {
      var ppObj = curFuncList.value.find((x) => x.id == e.moduleId);
      var pObj = curFuncList.value.find(
        (x) => x.funcParentId == e.moduleId && x.funcName == "算法"
      );
      var newObj = {
        id: maxId,
        funcName: e.name,
        funcUrl: `${ppObj?.funcUrl}/algorithm/${e.name}`,
        funcParentId: pObj?.id,
        funcLevelId: pObj?.funcLevelId + 1,
        isEdit: false,
        type: e.type,
        operation: "right,del,open,rename",
        operationType: "algorithm",
      };
      //console.log("e.name", e.name, maxId, pObj.id, newObj.funcUrl);
      //console.log("e.name,obj", newObj);
      var isExistobj = curFuncList.value.find(
        (x) =>
          x.funcName == newObj.funcName && x.funcParentId == newObj.funcParentId
        // && x.funcLevelId == newObj.funcLevelId
      );
      if (!isExistobj) {
        curFuncList.value.push(newObj);
        maxId++;
      }
    });
  }
};

const loadData = (list) => {
  //console.log(4);
  curFuncList.value = list; //JSON.parse(sessionStorage.getItem("curFuncLists"));
  //console.log("curFuncList:::111---", curFuncList.value);
  getCacheFuncList();
  //console.log("curFuncList:::222---", curFuncList.value);
  listOneFuncList.value = curFuncList.value?.filter((obj) => {
    return obj.funcParentId == 0;
  });
  processMenuData(listOneFuncList.value);
};

onBeforeMount(() => {
  var curFuncList = sessionStorage.getItem("curFuncLists");
  if (!curFuncList) {
    sysApi.getFuncList().then((res) => {
      let list = res;
      sessionStorage.setItem("curFuncLists", JSON.stringify(list));
      loadData(list);
    });
  } else {
    let list = JSON.parse(sessionStorage.getItem("curFuncLists"));
    loadData(list);
  }
});

const getModuleData = (id, path) => {
  let jsonAll = cache.local.getJSON(cacheKey);
  //如果连缓存都没有，直接[]值
  if (!jsonAll) {
    jsonAll = [];
    cache.local.setJSON(cacheKey, jsonAll);
  }
  let rlt = jsonAll?.find((x) => x.project == project && x.id == id);
  if (!rlt) {
    let params = { id };
    sysApi.getModule(params).then((res) => {
      if (res) {
        let newObj = {
          project: project,
          namespace: "",
          folder: "",
          type: "",
          properties: {},
          interface: {},
          ecc: {},
          algorithms: [],
          id: "",
        };
        newObj.id = res.id;
        newObj.namespace = res.namespace;
        newObj.type = res.type;
        newObj.interface = JSON.parse(res.interface);
        newObj.properties = JSON.parse(res.properties);
        newObj.ecc = JSON.parse(res.ecc);
        newObj.algorithms = JSON.parse(res.algorithms);
        jsonAll.push(newObj); //再把模块新JSON加进去
        cache.local.setJSON(cacheKey, jsonAll);
        router.push({ path });
      }
    });
  } else {
    router.push({ path });
  }
};

watch(isEdit, (newValue, oldValue) => {
  if (newValue) {
    nextTick(() => {
      //console.log(isAutoFocus.value);
      isAutoFocus.value.focus();
    });
  }
});

const externalTriggerTree = (curTreeNodeObj) => {
  queryTriggerData(listOneFuncList.value, curTreeNodeObj);
};
const queryTriggerData = (list, curTreeNodeObj) => {
  let id = curTreeNodeObj.id;
  let name = curTreeNodeObj.name;
  let algorithmName = curTreeNodeObj.algorithmName;
  list.forEach((obj) => {
    obj.isPenultimate = false;
    if (name == "") {
      if (obj.id == id) {
        obj.isPenultimate = true;
      }
    } else if (name != "" && algorithmName == "") {
      if (obj.funcParentId == id && obj.funcName == name) {
        obj.isPenultimate = true;
      }
    } else if (name != "" && algorithmName != "") {
      var pObj = curFuncList.value.find(
        (v) => v.funcParentId == id && v.funcName == name
      );
      if (obj.funcParentId == pObj.id && obj.funcName == algorithmName) {
        obj.isPenultimate = true;
      }
    }
    if (obj.child) {
      queryTriggerData(obj.child, curTreeNodeObj);
    }
  });
};
const curTreeNode = computed(() => {
  return commonstore.curTreeNode;
});
watch(curTreeNode, (n, o) => {
  if (n.id != o.id || n.name != o.name || n.algorithmName != o.algorithmName) {
    externalTriggerTree(n);
  }
});
const asideTreeStyle = reactive({
  asideTree: {
    width: "212px",
  },
});
let isShowTree = ref(true);
let treeTitle = ref("单击隐藏菜单");
const showOrHidden = () => {
  isShowTree.value = !isShowTree.value;
  if (asideTreeStyle.asideTree.width == "212px") {
    asideTreeStyle.asideTree.width = "7px";
    treeTitle.value = "单击显示菜单";
  } else {
    asideTreeStyle.asideTree.width = "212px";

    treeTitle.value = "单击隐藏菜单";
  }
};
deploymentMenuStore.$subscribe((mutate, state) => {
  console.log("subscribe", state, listOneFuncList.value);
});
</script> 

<style scope>
#leftTree.asideTree {
  color: #000;
  height: 100%;
  width: 212px;
  overflow: hidden;
}

#navTree {
  width: 205px;
  height: calc(100vh - 60px);
  overflow-y: auto;
}
#navTree > .el-tree {
  /* padding-right: 15px; */
}

#navTree .is-penultimate > .el-tree-node__content {
  /* color: #fff; */
  color: #4290f7;
  font-weight: bold;
}
#navTree .is-penultimate > .el-tree-node__content .el-tree-node__label {
  /* padding: 5px;
  background: #4290f7; */
}

/* #navTree .el-tree-node__content {
  margin: 10px 0 20px 5px;
  width: 100% !important;
} */

/* #navTree .el-tree-node__content > .el-tree-node__expand-icon {
  font-size: 18px;
} */

/* #navTree .el-tree-node.is-penultimate > .el-tree-node__children {
  display: flex;
  flex-direction: row;
}
#navTree .is-penultimate > .el-tree-node__children > div {
  width: 25%;
} */

.sp {
  width: 7px;
  height: 100%;
  float: left;
  overflow: hidden;
  background: url(@/assets/img/verticalLineBg.gif) repeat-y;
}

.arrowLeft {
  margin-top: 50vh;
  width: 5px;
  height: 35px;
  background: url(@/assets/img/arrowLeft.gif) no-repeat;
}

.arrowRight {
  margin-top: 50vh;
  width: 5px;
  height: 35px;
  background: url(@/assets/img/arrowRight.gif) no-repeat;
}

.algorithm-icon {
  background-color: #eee;
  padding-right: 2px;
  /* font-size: large; */
  color: #169bd5;
  /* height: 80%; */
  border-radius: 5px;
  font-size: 12px;
  margin-left: -12px;
}
</style>