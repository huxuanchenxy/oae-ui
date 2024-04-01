<template>
  <div class="card">
    <div class="left">
      <!-- <coffee-cup v-if="props.info?.icon == 'CoffeeCup'" /> -->
      <span
        class="iconfont"
        style="display: inline-block; font-size: 56px; padding-top: 12px"
        v-if="props.info?.icon == 'ProductPlan'"
        >&#xe9e9;</span
      >
      <span
        class="iconfont"
        style="display: inline-block; font-size: 56px; padding-top: 12px"
        v-if="props.info?.icon == 'ProductComplete'"
        >&#xe677;</span
      >
      <span
        class="iconfont"
        style="display: inline-block; font-size: 56px; padding-top: 12px"
        v-if="props.info?.icon == 'SalePlan'"
        >&#xe6d7;</span
      >
      <span
        class="iconfont"
        style="display: inline-block; font-size: 56px; padding-top: 12px"
        v-if="props.info?.icon == 'SaleComplete'"
        >&#xe612;</span
      >
      <!-- <apple v-if="props.info?.icon == 'Apple'" />
      <drizzling v-if="props.info?.icon == 'Drizzling'" />
      <headset v-if="props.info?.icon == 'Headset'" /> -->
    </div>
    <div class="right">
      <div>
        <span>{{ props.info?.title }}</span>
      </div>
      <div>
        <span>{{ props.info?.count }}</span>
      </div>
    </div>
  </div>
</template>

<script  setup>
import { CoffeeCup, Apple, Drizzling, Headset } from "@element-plus/icons-vue";
import { ref } from "vue";
// defineProps({
//   info,
// });
const props = defineProps({
  info: {},
});

//console.log("props", props.info);
// const info = ref({
//   icon: "",
//   title: "",
//   count: 0,
// });
</script>


<style lang="scss" scoped>
.card {
  height: 50px;
  line-height: 25px;
  color: #000;
}

.left {
  width: 50px;
  height: 50px;
  float: left;

  .el-icon {
    font-size: 50px;
  }
}

.right {
  width: 100px;
  height: 50px;
  float: right;
  margin-left: 40px;
}
</style>