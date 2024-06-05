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
      @click="goToPath(tag)"
      size="default"
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
import { commonStore } from "@/store/commonStore.js";
import sysApi from "@/api/sysApi";
const commonstore = commonStore();
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

const goToPath = (tag) => {
  if (dynamicTags.value.length > 0) {
    dynamicTags.value.forEach((e) => {
      if (e.path == tag.path) {
        e.effect = "dark";
      } else {
        e.effect = "plain";
      }
    });
  }
  commonstore.changeCurTreeNode(tag.id, "", "");
  router.push({ path: tag.path });
};
onMounted(() => {
  if (tagsStore.TagArrs.length == 0) {
    let curFuncList = JSON.parse(sessionStorage.getItem("curFuncLists"));
    if (curFuncList) {
      loadTagData(curFuncList);
    } else {
      sysApi.getFuncList().then((res) => {
        let list = res;
        loadTagData(list);
      });
    }
  }
});

const loadTagData = (curFuncList) => {
  if (curFuncList) {
    var path = curRouteObj.path;
    var pathArrays = path.split("/");
    let id = 0;
    let name = "";
    let parName = "";
    let addPath = "";
    let thirdName = "";
    if (pathArrays.length <= 4) {
      var objFunc = curFuncList.find((obj) => obj.funcUrl == path);
      id = objFunc?.id;
      name = objFunc?.funcName;
      addPath = objFunc?.funcUrl;
      commonstore.changeCurTreeNode(id, "", "");
    } else if (pathArrays.length > 4) {
      //pId = pathArrays[2];
      id = pathArrays[3];
      let cObj = curFuncList.find((l) => l.id == id);
      addPath = cObj.funcUrl;
      name = cObj.funcName;
      parName = name;
      if (pathArrays.length >= 5) {
        let types = pathArrays[4];
        switch (types) {
          case "ecc":
            parName = "ECC";
            break;
          case "interface":
            parName = "接口";
            break;
          case "algorithm":
            parName = "算法";
            break;
        }
      }
      if (pathArrays.length == 6) {
        thirdName = pathArrays[5];
      }
      commonstore.changeCurTreeNode(id, parName, thirdName);
    }
    let info = {
      id: id,
      path: addPath,
      name: name,
      effect: "dark",
    };
    tagsStore.AddTag(info);
  }
};
</script>

<style  scoped>
#elTag {
  margin-top: 36px;
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