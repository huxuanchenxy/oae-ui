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

import BottomContent from "@/components/bottomContent/BottomContent.vue";


onMounted(() => {
  
});
</script>

<style  scoped>
.routerHeight {
  overflow: auto;
  height: calc(100vh - 345px);
}
</style>