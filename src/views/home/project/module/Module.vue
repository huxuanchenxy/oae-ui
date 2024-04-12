<template>
  <div>
    <TagsModule></TagsModule>
    <div class="routerHeight">
      <router-view class="routerView"></router-view>
    </div>
    <BottomContent></BottomContent>
  </div>
</template>

<script setup>
import TagsModule from "@/components/TagsModule.vue";
// const route = useRoute();
// const router = useRouter();
// let path = ref("");
// path.value = route.path;
onMounted(() => {
  //console.log("abcde");
});
</script>

<style  scoped>
.routerHeight {
  overflow: auto;
  height: calc(100vh - 345px);
}
</style>