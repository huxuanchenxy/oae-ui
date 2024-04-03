<template>
  <el-aside class="aside" width="collapse">
    <el-menu
      router
      :default-active="getActive(route.path, route.meta.group)"
      :collapse="props.isCollapse"
      :default-openeds="defaultOpeneds"
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
//console.log("full--funcList", curFuncList);
const listOneFuncList = curFuncList?.filter((obj) => {
  return obj.funcLevel == 1 && obj.isShowMenu;
});

listOneFuncList?.map((entity) => {
  entity.flag = RemoveFilled; //CirclePlusFilled;
  console.log("entity.funcName == ", entity.funcName);
  if (entity.funcName == "项目测试") {
    console.log("value.push", entity.funcUrl);
    defaultOpeneds.value.push(entity.funcUrl);
  }
  entity.child = curFuncList.filter((obj) => {
    return (
      obj.funcParentId == entity.funcId && obj.funcLevel == 2 && obj.isShowMenu
    );
  });
  entity.child.map((o) => {
    //console.log("o.icon:::", o.icon);
    console.log("--o--", o.funcName, o);
    o.flag = Menu;
    if (o.funcName == "自定义模块") {
      o.child = curFuncList.filter((obj) => {
        if (obj.funcParentId == "zdymk") {
          console.log("obj.funcParentId", obj.funcParentId);
          defaultOpeneds.value.push(obj.funcUrl);
          obj.flag = Menu;
        }
        return (
          obj.funcParentId == o.funcId && obj.funcLevel == 3 && obj.isShowMenu
        );
      });
    }
  });
  //console.log("----entiy child----", entity);
});
listOneFuncList?.push({
  funcId: "13232217443471",
  funcOrderNum: 0.47,
  funcShowName: "首页",
  funcName: "首页",
  funcUrl: "/main",
  flag: House,
});
listOneFuncList?.push({
  funcId: "13232217443472",
  funcOrderNum: 0.48,
  funcShowName: "接口",
  funcName: "接口",
  funcUrl: "/inter",
});
//console.log(" menu:listOneFuncList", listOneFuncList);
const handleOpen = (key) => {
  changeIcon(key, RemoveFilled);
  //console.log("handleOpen", key);
};
const handleClose = (key) => {
  changeIcon(key, CirclePlusFilled);
  //console.log("handleClose", key);
};
const changeIcon = (key, iconType) => {
  if (key != "/main") {
    let selectObj = listOneFuncList.filter((o) => {
      return o.funcUrl == key;
    });
    if (selectObj) {
      selectObj[0].flag = iconType;
    }
  }
};

const getActive = (a, b) => {
  //console.log("a,b", a, b);
  return b;
};
</script>

<style>
#module #leftMenu.aside {
  color: #000;
  height: 100%;
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
  font-size: 24px;
}

#module .el-container .el-sub-menu.is-active.is-opened,
#module .el-container .el-sub-menu.is-active.is-opened .el-sub-menu__title {
  color: #000;
  background: #fff;
}
</style>