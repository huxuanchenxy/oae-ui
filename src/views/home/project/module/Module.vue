<template>
  <div>
    <TagsModule :key="path"></TagsModule>
    <h1>Module</h1>
    <router-view class="routerView" />
  </div>
</template>

<script setup>
import TagsModule from "@/components/TagsModule.vue";
const route = useRoute();
const router = useRouter();
let path = ref("");
path.value = route.path;
onMounted(() => {
  //console.log("abcde");
});


</script>

<style lang="scss" scoped>
</style>