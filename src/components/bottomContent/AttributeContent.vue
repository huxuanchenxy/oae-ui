<template>
  <div>属性</div>
</template>

<script setup>
const router = useRouter();
onMounted(() => {
  //console.log("属性");
});

watch(
  () => router.currentRoute.value,
  (newValue) => {
    var newPaths = newValue.fullPath;
    console.log("newPaths", newPaths);
  }
);
</script>

<style   scoped>
</style>