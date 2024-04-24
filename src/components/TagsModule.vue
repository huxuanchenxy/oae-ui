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
      size="small"
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
import { pagetagsStore } from "@/store/pageTags.js";
const tagsStore = pagetagsStore();
const goToPath = (path) => {
  router.push({ path });
};
const router = useRouter();
const route = useRoute();
//const store = useStore();
const list = ref([]);
const pid = ref("");
const cid = ref("");
onMounted(() => {
  pid.value = route.params.pid;
  cid.value = route.params.id;
  tagsStore.GetTagModule({ pid: pid.value, id: cid.value, path: route.path });
  list.value = tagsStore.TagModuleArrs;
});
watch(
  () => router.currentRoute.value,
  (newValue, oldValue) => {
    //newValue.value;
    console.log("tagsModule.vue", newValue, oldValue);
    var newPaths = newValue.fullPath;
    var pathArrays = newPaths.split("/");
    if (pathArrays.length == 4) {
      let cPid = pathArrays[2];
      let cCid = pathArrays[3];
      if (cPid != pid.value || cCid != cid.value) {
        pid.value = cPid;
        cid.value = cCid;
        tagsStore.GetTagModule({
          pid: pid.value,
          id: cid.value,
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