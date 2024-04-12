<template>
  <!-- 无子级 -->
  <el-menu-item :index="basePath" v-if="!item.child" @click="handleSelect">
    <el-icon v-if="!item.icon">
      <component :is="item.flag"></component>
    </el-icon>
    <!-- <span
      v-else
      class="iconfont"
      v-html="item.icon"
      style="font-weight: bold; display: inline-block; margin-right: 7px"
    ></span> -->
    <span>{{ item.funcName }}</span>
  </el-menu-item>
  <!-- 有子级 -->
  <el-sub-menu :index="basePath" v-else>
    <template #title>
      <!-- <el-icon class="expand">
        <component :is="item.flag"></component>
      </el-icon> -->
      <span @click="threeLevelClick(item)">{{ item.funcName }}</span>
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
// import {
//   Menu,
//   House,
// } from "@element-plus/icons-vue";

//import { useRouter } from "vue-router";
//import { useStore } from "vuex";
//import { funcList } from "@/jslib/common.js";
import { pagetagsStore } from "@/store/pageTags.js";
const { item, basePath } = defineProps({
  item: {
    type: Object,
  },
  basePath: {
    type: String,
  },
});
//const store = useStore();
const router = useRouter();

const tagsStore = pagetagsStore();
//const curRouteObj = useRoute();
const handleSelect = (e) => {
  let path = e.index;
  const funcList = JSON.parse(sessionStorage.getItem("curFuncList"));
  let pathArray = path.split("/");
  if (pathArray.length == 2) {
    let cObj = funcList.find((obj) => obj.funcUrl == path);
    let model = { id: cObj.funcId, path, name: cObj.funcName, effect: "dark" };
    //store.commit("AddTag", model);
    console.log("tarsStore:", tagsStore);
    tagsStore.AddTag(model);
    //console.log("path", path);
    router.push({ path: path });
  } else {
    let pId = pathArray[2];
    let pObj = funcList.find((obj) => obj.funcId == pId);

    if (pObj) {
      //修改vuex的值
      let parentPath = `${pObj.funcUrl}/${pObj.funcParentId}/${pObj.funcId}`;
      let model = {
        id: pObj.funcId,
        path: parentPath,
        name: pObj.funcName,
        effect: "dark",
      };
      //console.log("addtag--222", model);
      //store.commit("AddTag", model);
      tagsStore.AddTag(model);
      router.push({ path: path });
    }
  }
};
const threeLevelClick = (obj) => {
  if (obj.funcLevel == 3) {
    let model = {
      id: obj.funcId,
      path: obj.funcUrl,
      name: obj.funcName,
      effect: "dark",
    };

    //store.commit("AddTag", model);
    tagsStore.AddTag(model);
    // let childFuncList = funcList.filter((l) => l.funcParentId == obj.funcId);
    // if (childFuncList.length > 0) {
    //   let childPath = `${childFuncList[0].funcUrl}/${obj.funcId}/${childFuncList[0].funcId}`;
    //   router.push({ path: childPath });
    // }
    router.push({ path: model.path });
  }
};
</script>