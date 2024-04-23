<template>
  <router-view />
</template>
 
<script setup>
import sysApi from "@/api/sysApi";
onMounted(() => {
  sysApi.getFuncList().then((res) => {
    let list = res;
    console.log("res:::", list);
    sessionStorage.setItem("curFuncLists", JSON.stringify(list));
  });
  console.log("faddf");
});
</script>
