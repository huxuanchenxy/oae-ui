<template>
  <div>算法222</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const route = useRoute();
let pid = ref("");
let id = ref("");
const initLoad = () => {
  pid.value = route.params.pid;
  id.value = route.params.id;
  store.commit("ChangeTagModuleStatus", route.path);
};
onMounted(() => {
  initLoad();
});

watch(
  () => router.currentRoute.value,
  (newValue) => {
    initLoad();
  }
);
</script>

<style lang="scss" scoped>
</style>