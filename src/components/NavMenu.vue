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
  //console.log("value.push", entity.funcUrl);
  defaultOpeneds.value.push(entity.funcUrl);
  entity.child = curFuncList.filter((obj) => {
    return (
      obj.funcParentId == entity.funcId && obj.funcLevel == 2 && obj.isShowMenu
    );
  });
  entity.child.map((o) => {
    //console.log("o.icon:::", o.icon);
    o.flag = Menu;
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

<style></style>