<template>
  <router-view />
</template>
 
<script setup>
import sysApi from "@/api/sysApi";
//import { getCurrentObj, setModuleData } from "@/utils/cache/common";
onMounted(() => {
  sysApi.getFuncList().then((res) => {
    let list = res;
    sessionStorage.setItem("curFuncLists", JSON.stringify(list));
  });
  // let project = "project1";
  // let rlt = getCurrentObj(project, "4");
  // if (!rlt) {
  //   setModuleData(project, "4");
  // }
  // rlt = getCurrentObj(project, "8");
  // if (!rlt) {
  //   setModuleData(project, "8");
  // }
});
</script>
