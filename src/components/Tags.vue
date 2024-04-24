<template >
  <div id="elTag">
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag.path"
      class="mx-1"
      :closable="dynamicTags.length > 1"
      :disable-transitions="false"
      :type="tag.effect == 'plain' ? 'info' : ''"
      :effect="tag.effect"
      @close="handleClose(tag)"
      @click="goToPath(tag.path)"
      size="large"
    >
      <el-link :underline="false"
        ><span :class="tag.effect == 'dark' ? 'tagName' : ''">{{
          tag.name
        }}</span></el-link
      >
    </el-tag>
  </div>
</template> 

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { pagetagsStore } from "@/store/pageTags.js";
const tagsStore = pagetagsStore();
const router = useRouter();
const curRouteObj = useRoute();
const dynamicTags = ref(tagsStore.TagArrs);
const handleClose = (tag) => {
  var index = dynamicTags.value.indexOf(tag);
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
  if (tag.effect == "dark") {
    if (index == 0) index = 1;
    var tagPrev = dynamicTags.value[index - 1];
    var path = tagPrev.path;
    tagPrev.effect = "dark";
    router.push({ path });
  }
};

const goToPath = (path) => {
  if (dynamicTags.value.length > 0) {
    dynamicTags.value.forEach((e) => {
      if (e.path == path) {
        e.effect = "dark";
      } else {
        e.effect = "plain";
      }
    });
  }

  router.push({ path });
};
onMounted(() => {
  if (tagsStore.TagArrs.length == 0) {
    var path = curRouteObj.path;
    console.log("tags path", path, path.length);
    var pathArrays = path.split("/");
    console.log("tags path", path, pathArrays.length);
    //var funcUrl = "/" + pathArrays[1];
    let curFuncList = JSON.parse(sessionStorage.getItem("curFuncLists"));
    let id = 0;
    let name = "";
    let addPath = "";
    if (pathArrays.length == 2) {
      var objFunc = curFuncList.find((obj) => obj.funcUrl == path);
      id = objFunc.id;
      name = objFunc.funcName;
      addPath = objFunc.funcUrl;
    } else if (pathArrays.length >= 4) {
      //pId = pathArrays[2];
      id = pathArrays[3];
      let cObj = curFuncList.find((l) => l.id == id);
      addPath = cObj.funcUrl;
      name = cObj.funcName;
    }
    let info = {
      id: id,
      path: addPath,
      name: name,
      effect: "dark",
    };
    tagsStore.AddTag(info);
  }
});
</script>

<style  scoped>
#elTag {
  margin-top: 16px;
}
#elTag .el-tag {
  margin-left: 5px;
  /* border-bottom: none; */
  border-radius: 0;
}

#elTag .tagName {
  color: #fff !important;
  /* font-weight: bold !important; */
}
</style>