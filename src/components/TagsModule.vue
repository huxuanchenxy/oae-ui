<template>
  <div id="elContentTag">
    <el-tag
      v-for="tag in list"
      :key="tag.funcUrl"
      class="mx-1"
      :disable-transitions="false"
      :type="tag.funcStatus == 'plain' ? 'info' : ''"
      :effect="tag.funcStatus"
      @click="goToPath(tag.funcUrl)"
      size="default"
    >
      <el-link :underline="false"
        ><span :class="tag.funcStatus == 'dark' ? 'tagName' : ''">{{
          tag.funcName
        }}</span></el-link
      >
    </el-tag>
  </div>
</template>

<script setup>
//import { ref, onMounted, watch } from "vue";
//import { useRouter, useRoute } from "vue-router";
//import { useStore } from "vuex";
import { pagetagsStore } from "@/store/pageTags.js";
const tagsStore = pagetagsStore();
const goToPath = (path) => {
  router.push({ path });
};
const router = useRouter();
const route = useRoute();
//const store = useStore();
const list = ref([]);
const pid = ref([""]);
onMounted(() => {
  pid.value = route.params.pid;
  let id = route.params.id;
  //store.commit("GetTagModule", { pid: pid.value, id, path: route.path });
  tagsStore.GetTagModule({ pid: pid.value, id, path: route.path });
  list.value = tagsStore.TagModuleArrs; //store.state.TagModuleArrs;
});
watch(
  () => router.currentRoute.value,
  (newValue) => {
    //newValue.value;
    var newPaths = newValue.fullPath;
    var pathArrays = newPaths.split("/");
    if (pathArrays.length == 4) {
      let cPid = pathArrays[2];
      //console.log("pathArrays:", pathArrays, cPid, pid.value);
      if (cPid != pid.value) {
        pid.value = cPid;
        // store.commit("GetTagModule", {
        //   pid: pid.value,
        //   id: pathArrays[3],
        //   path: newPaths,
        // });
        tagsStore.GetTagModule({
          pid: pid.value,
          id: pathArrays[3],
          path: newPaths,
        });
        list.value = tagsStore.TagModuleArrs; //store.state.TagModuleArrs;
      }
    }
  }
);
</script>

<style   scoped>
#elContentTag {
  margin: 5px 0 0 5px;
}
#elContentTag .el-tag {
  margin-left: 5px;
  /* border-bottom: none; */
  border-radius: 0;
}

#elContentTag .tagName {
  color: #fff !important;
  /* font-weight: bold !important; */
}
</style>