<template>
  <div>
    <TagsModule :key="path"></TagsModule>
    <h1>Module</h1>
    <router-view class="routerView" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import TagsModule from "@/components/TagsModule.vue";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
let path = ref("");
path.value = route.path;
console.log("path.value", path.value);
onMounted(() => {
  //console.log("abcde");
});


</script>

<style lang="scss" scoped>
</style>