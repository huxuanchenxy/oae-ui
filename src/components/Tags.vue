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
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
//import { funcList } from "@/jslib/common.js";
const router = useRouter();
const store = useStore();
const curRouteObj = useRoute();
const dynamicTags = ref(store.state.TagArrs);

const handleClose = (tag) => {
  var index = dynamicTags.value.indexOf(tag);
  console.log("tag:::", tag.effect, index);
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
  if (tag.effect == "dark") {
    if (index == 0) index= 1;
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
  // var pathArrays = path.split("/");
  // if (pathArrays.length == 4) {
  //   let funcList = JSON.parse(sessionStorage.getItem("curFuncList"));
  //   let childList = funcList.filter((obj) => obj.funcParentId == pathArrays[3]);
  //   if (childList.length > 0) {
  //     var childFirst = childList[0];
  //     path = `${childFirst.funcUrl}/${pathArrays[3]}/${childFirst.funcId}`;
  //   }
  // }
  router.push({ path });
};
onMounted(() => {
  //console.log("onMounted tags");
  //页面初始化时，vuex没有值，则这里使用默认的路由当做第一个tag页
  if (store.state.TagArrs.length == 0) {
    var path = curRouteObj.path;
    //console.log("path--", path);
    var pathArrays = path.split("/");
    var funcUrl = "/" + pathArrays[1];
    let curFuncList = JSON.parse(sessionStorage.getItem("curFuncList"));

    var objFunc = curFuncList.find((obj) => obj.funcUrl == funcUrl);
    let id = objFunc.funcId;
    let name = objFunc.funcName;
    let addPath = objFunc.funcUrl;
    if (objFunc?.funcLevel > 2) {
      if (pathArrays.length == 4) {
        //let cId = pathArrays[3];
        let pId = "";
        let urlPath = "";
        if (objFunc.funcLevel == 3) {
          urlPath = path;
        } else if (objFunc.funcLevel == 4) {
          pId = pathArrays[2];
          let parentObj = curFuncList.find((l) => l.funcId == pId);
          urlPath = `${parentObj.funcUrl}/${parentObj.funcParentId}/${parentObj.funcId}`;
          //console.log(pId, urlPath);
          name = parentObj.funcName;
          id = pId;
        }
        let model = {
          id,
          path: urlPath,
          name,
          effect: "dark",
        };
        store.commit("AddTag", model);
      }
    } else {
      let info = {
        id: id,
        path: addPath,
        name: name,
        effect: "dark",
      };
      store.commit("AddTag", info);
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