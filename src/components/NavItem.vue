<template>
  <!-- 无子级 -->
  <el-menu-item :index="basePath" v-if="!item.child">
    <el-icon v-if="!item.icon" style="margin-left: -5px">
      <component :is="item.flag"></component>
    </el-icon>
    <span
      v-else
      class="iconfont"
      v-html="item.icon"
      style="font-weight: bold; display: inline-block; margin-right: 7px"
    ></span>
    <span>{{ item.funcName }}</span>
  </el-menu-item>
  <!-- 有子级 -->
  <el-sub-menu :index="basePath" v-else>
    <template #title>
      <el-icon class="expand">
        <component :is="item.flag"></component>
      </el-icon>
      <span>{{ item.funcName }}</span>
    </template>
    <NavItem
      v-for="sub in item.child"
      :key="sub.funcId"
      :item="sub"
      :basePath="sub.funcUrl"
    />
  </el-sub-menu>
</template>

<script setup>



const { item, basePath } = defineProps({
  item: {
    type: Object,
  },
  basePath: {
    type: String,
  },
});
</script>