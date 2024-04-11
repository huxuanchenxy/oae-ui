<template>
  <div class="divBottom">
    <el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item, i) in editableTabs"
        :key="item.index"
        :label="item.title"
        :name="item.index"
        :closable="i != 0"
      >
        <AttributeContent v-show="item.index == 0"></AttributeContent>
        <EventVariContent v-show="item.index == 1"></EventVariContent>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AttributeContent from "@/components/bottomContent/AttributeContent.vue";
import EventVariContent from "@/components/bottomContent/EventVariContent.vue";

const editableTabsValue = ref("0");
const editableTabs = ref([
  {
    index: "0",
    title: "属性",
  },
  {
    index: "1",
    title: "事件及变量",
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
  let activeName = editableTabsValue.value;
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.name;
        }
      }
    });
  }

  editableTabsValue.value = activeName;
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
};
onMounted(() => {
  console.log("bottomContent onMounted");
});
</script>

<style >
.divBottom {
  width: 98%;
  height: 250px;
  border: 1px solid #409eff;
  background: #fff;
}
</style>