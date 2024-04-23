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
  //console.log("onMounted tags");
  //页面初始化时，vuex没有值，则这里使用默认的路由当做第一个tag页
  //if (store.state.TagArrs.length == 0) {
  if (tagsStore.TagArrs.length == 0) {
    var path = curRouteObj.path;
    var pathArrays = path.split("/");
    var funcUrl = "/" + pathArrays[1];
    let curFuncList = JSON.parse(sessionStorage.getItem("curFuncLists"));
    var objFunc = curFuncList.find((obj) => obj.funcUrl == funcUrl);
    let id = objFunc.id;
    let name = objFunc.funcName;
    let addPath = objFunc.funcUrl;
    if (objFunc?.funcLevelId > 2) {
      if (pathArrays.length == 4) {
        let pId = "";
        let urlPath = "";
        if (objFunc?.funcLevelId == 3) {
          urlPath = path;
        } else if (objFunc?.funcLevelId == 4) {
          pId = pathArrays[2];
          let parentObj = curFuncList.find((l) => l.id == pId);
          urlPath = `${parentObj.funcUrl}/${parentObj.funcParentId}/${parentObj.id}`;
          name = parentObj.funcName;
          id = pId;
        } else if (objFunc?.funcLevelId == 5) {
          pId = pathArrays[2];
          let pObj = curFuncList.find((obj) => obj.id == pId);
          let ppObj = curFuncList.find((obj) => obj.id == pObj.funcParentId);
          id = ppObj.id;
          urlPath = `${ppObj.funcUrl}/${ppObj.funcParentId}/${ppObj.id}`;
          name = ppObj.funcName;
        }

        let model = {
          id,
          path: urlPath,
          name,
          effect: "dark",
        };
        //store.commit("AddTag", model);
        tagsStore.AddTag(model);
      }
    } else {
      let info = {
        id: id,
        path: addPath,
        name: name,
        effect: "dark",
      };
      //store.commit("AddTag", info);
      tagsStore.AddTag(info);
    }
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