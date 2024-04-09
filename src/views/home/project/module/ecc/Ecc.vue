<template>
  <div>
    ECC
    <h1>url参数 pid:{{ pid }}</h1>
    <h1>url参数 id:{{ id }}</h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router"; 
import { useStore } from "vuex";
const store = useStore();
const route = useRoute();
let pid = ref("");
let id = ref("");
onMounted(() => {
  pid.value = route.params.pid;
  id.value = route.params.id;
  store.commit("ChangeTagModuleStatus", route.path);
});
</script>

<style   scoped>
</style>