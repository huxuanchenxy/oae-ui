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
      />
    </div>
  </el-aside>
  <div
    :style="dyStyle.rightPop"
    v-show="popStatus"
    @mouseleave="popStatus = false"
  >
    <div style="text-align: center; padding: 10px">
      <el-link type="primary">添加</el-link>
    </div>
    <div style="text-align: center; padding: 10px">
      <el-link type="primary">删除</el-link>
    </div>
  </div>
</template>

<script setup>
//import { useRouter, useRoute } from "vue-router";
//import sysApi from "@/api/sysApi";
import { pagetagsStore } from "@/store/pageTags.js";
const tagsStore = pagetagsStore();
//let defaultOpeneds = ref([]);
//let leftX = ref(10);
//let topY = ref(10);
let popStatus = ref(false);
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
    if (l.funcUrl != "" && l.funcParentId) {
      l.funcUrl = `${l.funcUrl}/${l.funcParentId}/${l.id}`;
    }
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
const handleNodeClick = (data) => {
  queryData(listOneFuncList.value);
  if (data.funcUrl) {
    data.isPenultimate = true;

    const funcList = JSON.parse(sessionStorage.getItem("curFuncLists"));
    let path = data.funcUrl;
    let pathArray = path.split("/");
    if (pathArray.length == 2) {
      let cObj = funcList.find((obj) => obj.funcUrl == path);
      let model = {
        id: cObj.funcId,
        path,
        name: cObj.funcName,
        effect: "dark",
      };
      tagsStore.AddTag(model);
      router.push({ path });
    } else {
      let pId = pathArray[2];
      let cId = pathArray[3];
      let cObj = funcList.find((obj) => obj.id == cId);
      let id = "";
      let path = "";
      let name = "";
      let cPath = "";
      if (cObj.funcLevelId == 4) {
        let pObj = funcList.find((obj) => obj.id == pId);
        if (pObj) {
          id = pObj.id;
          path = `${pObj.funcUrl}/${pObj.funcParentId}/${pObj.id}`;
          name = pObj.funcName;
        }
      } else if (cObj.funcLevelId == 3) {
        id = cObj.id;
        path = `${cObj.funcUrl}/${cObj.funcParentId}/${cObj.id}`;
        name = cObj.funcName;
      } else if (cObj.funcLevelId == 5) {
        let pObj = funcList.find((obj) => obj.id == pId);
        let ppObj = funcList.find((obj) => obj.id == pObj.funcParentId);
        id = ppObj.id;
        path = `${ppObj.funcUrl}/${ppObj.funcParentId}/${ppObj.id}`;
        name = ppObj.funcName;
      }

      let model = {
        id,
        path,
        name,
        effect: "dark",
      };
      cPath = `${cObj.funcUrl}/${cObj.funcParentId}/${cObj.id}`;
      tagsStore.AddTag(model);
      router.push({ path: cPath });
    }
    //router.push(data.funcUrl);
  }
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
  dyStyle.rightPop.top = e.y + "px";
  dyStyle.rightPop.left = e.x + "px";
  popStatus.value = true;
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
    return obj.funcParentId == "";
  });
  processMenuData(listOneFuncList.value);
});
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