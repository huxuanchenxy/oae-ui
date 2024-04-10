<template>
  <el-aside class="aside">
    <!-- width="collapse" -->
    <div
      style="
        text-align: center;
        height: 48px;
        line-height: 48px;
        border: 1px solid #bbb;
        border-right: none;
        border-top: none;
      "
    >
      Logo待定
    </div>
    <!--  -->
    <el-menu
      :collapse="props.isCollapse"
      :default-openeds="defaultOpeneds"
      router
      :default-active="getActive(route.path, route.meta.group)"
      @open="handleOpen"
      @close="handleClose"
    >
      <NavItem
        v-for="v in listOneFuncList"
        :key="v.funcId"
        :item="v"
        :basePath="v.funcUrl"
      />
    </el-menu>
  </el-aside>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router"; //导入路由
import NavItem from "./NavItem.vue"; //子组件
import { funcList } from "@/jslib/common.js";
import {
  Menu,
  CirclePlusFilled,
  RemoveFilled,
  House,
} from "@element-plus/icons-vue";
//import axios from "@/api";
let defaultOpeneds = ref([]);
const props = defineProps({
  isCollapse: Boolean,
});
const route = useRoute();
const curFuncList = JSON.parse(sessionStorage.getItem("curFuncList"));

 
const listOneFuncList = curFuncList?.filter((obj) => {
  return obj.funcLevel == 1 && obj.isShowMenu;
});
 
const processMenuData = (list) => {
  
  list.forEach((l) => {
    let curLevel = l.funcLevel + 1;
    if (l.funcParentId) {
      l.funcUrl = `${l.funcUrl}/${l.funcParentId}/${l.funcId}`;
    }
    let isExistFlag = curFuncList.some(
      (t) =>
        t.funcParentId == l.funcId && t.isShowMenu && t.funcLevel == curLevel
    );
    if (isExistFlag) {
      //list?.map((entity) => {
      //entity.flag = RemoveFilled;
      defaultOpeneds.value.push(l.funcUrl);
      //});
      let childList = curFuncList.filter((obj) => {
        return (
          obj.funcParentId == l.funcId &&
          obj.funcLevel == l.funcLevel + 1 &&
          obj.isShowMenu
        );
      });
      if (childList) {
        l.child = childList;
        processMenuData(childList);
      }
    } else {
      l.flag = Menu;
      //if (l.funcParentId) {
      //l.funcUrl = `${l.funcUrl}/${l.funcParentId}`;
      //`${l.funcUrl}?pid=${l.funcParentId}`;
      //}
    }
  });
};
processMenuData(listOneFuncList);

// listOneFuncList?.push({
//   funcId: "1323275243471",
//   funcOrderNum: 0.28,
//   funcShowName: "首页",
//   funcName: "首页",
//   funcUrl: "/main",
//   flag: House,
// });
listOneFuncList?.push({
  funcId: "13232217443472",
  funcOrderNum: 0.48,
  funcShowName: "接口",
  funcName: "接口",
  funcUrl: "/inter",
});

const handleOpen = (key) => {
  changeIcon(listOneFuncList, key, RemoveFilled);
};
const handleClose = (key) => {
  changeIcon(listOneFuncList, key, CirclePlusFilled);
};

const changeIcon = (list, key, iconType) => {
  if (key != "/main") {
    for (var i = 0; i < list.length; i++) {
      var obj = list[i];
      if (obj.funcUrl == key) {
        obj.flag = iconType;
        break;
      } else if (obj.child && obj.child.length > 0) {
        changeIcon(obj.child, key, iconType);
      }
    }
  }
};

const getActive = (a, b) => {
  //console.log("a,b", a, b);
  return a;
};
</script>

<style scope>
#module #leftMenu.aside {
  color: #000;
  height: 100%;
  width: 180px;
}

#module #leftMenu.aside .el-menu {
  height: calc(100vh-60px);
  border-right: none;
  color: #000;
  background-color: #fff;
}
#module .el-container #leftMenu .el-menu-item,
#module .el-container .el-sub-menu__title {
  border-bottom: 1px solid #bbb;
  height: 35px;
  font-size: 12px;
}

#module .el-container #leftMenu .el-sub-menu__title span {
  font-size: 14px;
}

#module .el-container #leftMenu .el-menu-item:hover,
#module .el-container .el-sub-menu .el-sub-menu__title:hover {
  color: #0079ec;
  background-color: #fff;
}

#module .el-container #leftMenu .el-menu-item.is-active
/* #module .el-sub-menu.is-active */ {
  color: #fff;
  background-color: #0079ec;
}

#module .el-container #leftMenu .el-sub-menu .el-icon.expand {
  font-size: 16px;
  color: #666;
}

#module .el-container .el-sub-menu.is-active.is-opened,
#module .el-container .el-sub-menu.is-active.is-opened .el-sub-menu__title {
  color: #000;
  background: #fff;
}
</style>