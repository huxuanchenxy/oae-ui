<template>
  <el-aside id="leftTree" class="asideTree">
    <div
      style="
        text-align: center;
        height: 48px;
        width: 175px;
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
          <el-input
            v-model="data.funcName"
            autofocus
            v-if="data.isEdit"
            style="height: 26px"
            @keyup.enter="saveName(data)"
          ></el-input>
          <span v-else>{{ data.funcName }}</span>
        </template>
      </el-tree>
    </div>
  </el-aside>
  <div
    :style="dyStyle.rightPop"
    v-show="popStatus"
    @mouseleave="popStatus = false"
  >
    <div
      style="text-align: center; padding: 10px"
      v-show="currentData.funcLevelId === 2 || currentData.funcName === '算法'"
    >
      <el-link type="primary" @click="dialogVisible = true">新建</el-link>
    </div>
    <div
      v-show="currentData.funcLevelId === 3 || currentData.funcLevelId === 5"
    >
      <div style="text-align: center; padding: 10px">
        <el-link type="primary" @click="handleNodeClick(currentData)"
          >打开</el-link
        >
      </div>
      <div style="text-align: center; padding: 10px">
        <el-link type="primary" @click="delAlgorithm(currentData)"
          >删除</el-link
        >
      </div>
      <div style="text-align: center; padding: 10px">
        <el-link type="primary" @click="renameAlgorithm(currentData)"
          >重命名</el-link
        >
      </div>
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
</template>

<script setup>
//import { useRouter, useRoute } from "vue-router";
import sysApi from "@/api/sysApi";
import { pagetagsStore } from "@/store/pageTags.js";
import { algorithmDS } from "@/jslib/dataStructure.js";
import { codeLanguage } from "@/jslib/common.js";
import { ElNotification } from "element-plus";
// import {
//   getCurrentObj,
//   setModuleData1,
//   setServerData,
// } from "@/utils/cache/common";
import cache from "@/plugins/cache.ts";
import { reactive, ref } from "vue";
const tagsStore = pagetagsStore();
//let defaultOpeneds = ref([]);
//let leftX = ref(10);
//let topY = ref(10);
let popStatus = ref(false);
let dialogVisible = ref(false);
let currentData = reactive({ funcLevelId: 0 });
let newAlgorithm = reactive(JSON.parse(JSON.stringify(algorithmDS)));
const reg = /^[A-Za-z]\w+$/;
const ruleFormRef = ref();

const validateName = (rule, value, callback) => {
  if (!reg.test(value)) {
    callback(new Error("使用字母数字和下划线,首个字符必须是字母"));
  } else {
    let cacheJson = cache.local.getJSON("json");
    let tmp = cacheJson[0].algorithms.filter((item) => {
      return item.text === value;
    });
    if (!tmp) callback();
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
    let curLevel = l.funcLevelId + 1;
    // if (l.funcUrl != "" && l.funcParentId) {
    //   l.funcUrl = `${l.funcUrl}/${l.funcParentId}/${l.id}`;
    // }
    let isExistFlag = curFuncList.value.some(
      (t) => t.funcParentId == l.id && t.funcLevelId == curLevel
    );
    if (isExistFlag) {
      //defaultOpeneds.value.push(l.funcUrl);
      let childList = curFuncList.value.filter((obj) => {
        return obj.funcParentId == l.id && obj.funcLevelId == l.funcLevelId + 1;
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

const router = useRouter();
const route = useRoute();
const handleNodeClickOld = (data) => {
  queryData(listOneFuncList.value);
  if (data.funcUrl) {
    data.isPenultimate = true;
    const curFuncList = JSON.parse(sessionStorage.getItem("curFuncLists"));
    let path = data.funcUrl;
    let pathArrays = path.split("/");
    let id = "";
    let name = "";
    if (pathArrays.length == 2) {
      let objFunc = curFuncList.find((l) => l.funcUrl == path);
      id = objFunc.id;
      name = objFunc.funcName;
    }
    if (pathArrays.length >= 4) {
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

    tagsStore.AddTag(model);
    router.push({ path: data.funcUrl });

    router.push(data.funcUrl);
  }
  // 仅右键打开时用到
  popStatus.value = false;
};

const handleNodeClick = async (data) => {
  queryData(listOneFuncList.value);
  if (data.funcUrl) {
    data.isPenultimate = true;
    const curFuncList = JSON.parse(sessionStorage.getItem("curFuncLists"));
    let path = data.funcUrl;
    let pathArrays = path.split("/");
    let id = "";
    let name = "";
    if (pathArrays.length == 2) {
      let objFunc = curFuncList.find((l) => l.funcUrl == path);
      id = objFunc.id;
      name = objFunc.funcName;
    }
    if (pathArrays.length >= 4) {
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
    if (pathArrays.length >= 4) {
      getModuleData(id, data.funcUrl);
    } else {
      //router.push({ path: data.funcUrl });
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
  if (
    data.funcLevelId === 2 ||
    data.funcName === "算法" ||
    data.funcLevelId === 3 ||
    data.funcLevelId === 5
  ) {
    dyStyle.rightPop.top = e.y + "px";
    dyStyle.rightPop.left = e.x + "px";
    popStatus.value = true;
    currentData = data;
    // console.log(currentData)
  }
};

const onSubmit = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      dialogVisible.value = false;
      let cacheJson = cache.local.getJSON("json");
      // 暂时先默认从第一个模块里读写数据
      // cacheJson[0].algorithms.push(newAlgorithm)
      // cache.local.setJSON('json',cacheJson);
      console.log(newAlgorithm);
    } else {
      // console.log('error submit!', fields)
    }
  });
};

const delAlgorithm = (data) => {
  // 暂时不作关联判断
  let cacheJson = cache.local.getJSON("json");
  cacheJson[0].algorithms = cacheJson[0].algorithms.filter((item) => {
    return item.text !== data.funcName;
  });
  // cache.local.setJSON('json',cacheJson);
  popStatus.value = false;
  console.log(cacheJson[0].algorithms);
};

const renameAlgorithm = (data) => {
  data.isEdit = true;
  popStatus.value = false;
  // 临时保留老名字
  data.oldFuncName = data.funcName;
};
const saveName = (data) => {
  if (data.funcName === data.oldFuncName) return;
  if (!reg.test(data.funcName)) {
    ElNotification({
      title: "算法" + data.oldFuncName + "重命名错误",
      message: "使用字母数字和下划线,首个字符必须是字母",
      position: "bottom-left",
      type: "error",
    });
  } else {
    let cacheJson = cache.local.getJSON("json");
    for (let item of cacheJson[0].algorithms) {
      if (item.text === data.oldFuncName) {
        item.text = data.funcName;
        break;
      }
    }
    // console.log(cacheJson[0].algorithms)
  }
  // console.log(data)
};
onMounted(() => {
  // sysApi.getFuncList().then((res) => {
  //  console.log("sysApi--2", res);
  //   curFuncList.value = res;
  //   sessionStorage.setItem("curFuncLists", JSON.stringify(res));
  //   listOneFuncList.value = curFuncList.value?.filter((obj) => {
  //     return obj.funcParentId == "";
  //   });
  // });
  curFuncList.value = JSON.parse(sessionStorage.getItem("curFuncLists"));
  console.log("curFuncList:::", curFuncList.value);
  listOneFuncList.value = curFuncList.value?.filter((obj) => {
    return obj.funcParentId == 0;
  });
  processMenuData(listOneFuncList.value);
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
</script> 

<style scope>
#leftTree.asideTree {
  color: #000;
  height: 100%;
  width: 175px;
}

#navTree {
  width: 165px;
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
</style>