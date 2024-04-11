<template>
  <div>
    接口
    <h1>参数：</h1>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore();
const route = useRoute();
let pid = ref("");
let id = ref("");
onMounted(() => {
  pid.value = route.params.pid;
  id.value = route.params.id;
  //console.log("interface***", pid.value, id.value);
  store.commit("ChangeTagModuleStatus", route.path);
});
</script>

<style   scoped>
</style>