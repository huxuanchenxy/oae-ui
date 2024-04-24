<template>
  <div class="divBottom">
    <el-tabs v-model="props.editableTabsValue" type="card" @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item, i) in editableTabs"
        :key="item.index"
        :label="item.title"
        :name="item.index"
        :closable="i != 0"
      >
        <AttributeContent v-show="item.index == 0"></AttributeContent>
        <EventVari v-show="item.index == 1"></EventVari>
        <LogContent v-show="item.index == 2"></LogContent>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AttributeContent from "@/components/bottomContent/AttributeContent.vue";
import LogContent from "@/components/bottomContent/LogContent.vue";
import EventVari from "@/components/event_vari/index.vue";
/*
   * 定义组件的属性
   * type 表示属性类型
   * default 表示默认值
   */
   const props = defineProps({
    editableTabsValue:{
      type:Number,
      default:0,
    }
  });
  
// 也可以通过数组方式定义属性,缺点是不能定义类型和默认值
// const props = defineProps(['footTabIdex']);
// const editableTabsValue = ref(0);
const currentTabIndex = ref([0,1,2]);
const editableTabsAll = ref([
  {
    index: 0,
    title: "属性",
  },
  {
    index: 1,
    title: "事件及变量",
  },
  {
    index: 2,
    title: "函数日志",
  },
]);
const editableTabs = ref([
  {
    index: 0,
    title: "属性",
  },
  {
    index: 1,
    title: "事件及变量",
  },
  {
    index: 2,
    title: "函数日志",
  },
]);
//let tabIndex = 2;
// const addTab = (targetName) => {
//   const newTabName = `${++tabIndex}`;
//   editableTabs.value.push({
//     title: "New Tab",
//     name: newTabName,
//     content: "New Tab content",
//   });
//   editableTabsValue.value = newTabName;
// };
const removeTab = (targetName) => {
  const tabs = editableTabs.value;
  let activeName = props.editableTabsValue;
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.index === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.index;
        }
      }
    });
  }
  props.editableTabsValue = activeName;
  editableTabs.value = tabs.filter((tab) => tab.index !== targetName);
  currentTabIndex.value = currentTabIndex.value.filter((tab) => tab !== targetName);
  // console.log(currentTabIndex.value)
};

watch(()=>props.editableTabsValue, (newVal) => {
  // if (currentTabIndex.indexOf(newVal) === -1) {
  if (currentTabIndex.value.length < 3) {
    editableTabs.value = editableTabsAll.value
    // console.log(editableTabsAll.value)
    // editableTabsAll.value.forEach((item) => {
    //   editableTabs.value.push(item)
    // })
    currentTabIndex.value = [0,1,2]
  }
})

onMounted(() => {
  //console.log("bottomContent onMounted");
});
</script>

<style >
.divBottom {
  width: 99%;
  height: 250px;
  border: 1px solid #409eff;
  background: #fff;
}
</style>