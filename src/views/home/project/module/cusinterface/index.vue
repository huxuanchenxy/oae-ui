<template>
  <div>
    <eventVariAntv/>
  </div>
</template>

<script setup>
import { pagetagsStore } from "@/store/pageTags.js";
import  eventVariAntv  from "@/components/antv/eventvari/index.vue";
const tagsStore = pagetagsStore();
//const store = useStore();
const router = useRouter();
const route = useRoute();
const initLoad = () => {
  //store.commit("ChangeTagModuleStatus", route.path);
  tagsStore.ChangeTagModuleStatus(route.path);
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
