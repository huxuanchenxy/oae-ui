<template>
  <el-dialog
    width="90%"
    style="height: 80%; overflow: hidden"
    top="2vh"
    v-model="modelValue.status"
    :title="modelValue.id"
    show-close
    :close-on-click-modal="true"
    :close-on-press-escape="false"
  >
    {{ modelValue.id }}
  </el-dialog>
</template>

<script setup>
const { modelValue } = defineProps({
  modelValue: {
    type: Object,
    default: {},
  },
});
</script>

<style lang="scss" scoped>
</style>