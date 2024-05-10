<template>
  <div>
    <!-- <TagsModule></TagsModule> -->
    <div id="elContentTag">
      <el-tag
        v-for="tag in tagList"
        :key="tag.name"
        class="mx-1"
        :disable-transitions="false"
        :type="tag.funcStatus == 'plain' ? 'info' : ''"
        :effect="tag.funcStatus"
        @click="goToTag(tag)"
        size="small"
      >
        <el-link :underline="false"
          ><span :class="tag.funcStatus == 'dark' ? 'tagName' : ''">{{
            tag.name
          }}</span></el-link
        >
      </el-tag>
    </div>
    <div class="routerHeight">
      <!-- <router-view class="routerView"></router-view> -->
      <Ecc v-if="showType == 'ecc'"></Ecc>
      <Algorithm
        v-if="showType == 'algorithm'"
        @getName="getAlgorithmName"
      ></Algorithm>
      <Cusinterface v-if="showType == 'interface'"></Cusinterface>
    </div>
    <BottomContent :editableTabsValue="footTabIndex"></BottomContent>
  </div>
</template>

<script setup>
import Algorithm from "@/views/home/project/module/algorithm/Algorithm.vue";
import Ecc from "@/views/home/project/module/ecc/index.vue";
import Cusinterface from "@/views/home/project/module/cusinterface/index.vue";
//import TagsModule from "@/components/TagsModule.vue";
import { getCurrentObj, getModuleData } from "@/utils/cache/common";
//import sysApi from "@/api/sysApi";
//import cache from "@/plugins/cache.ts";
import { commonStore } from "@/store/commonStore.js";
const route = useRoute();
const router = useRouter();
const commonstore = commonStore();
// let path = ref("");
// path.value = route.path;
let pid = ref(0);
let cid = ref(0);
let showType = ref("");
let algorithmName = ref("");
const project = "project1";
const tagList = ref([
  {
    name: "接口",
    showType: "interface",
    funcStatus: "plain",
  },
  {
    name: "算法",
    showType: "algorithm",
    funcStatus: "plain",
  },
  {
    name: "ECC",
    showType: "ecc",
    funcStatus: "plain",
  },
]);

const getAlgorithmName = (value) => {
  tagList.value[1].name = "算法" + value;
  if (showType.value === "algorithm") tagList.value[1].funcStatus = "dark";
  if (value === "") tagList.value[1].funcStatus = "plain";
  if (value != "") {
    algorithmName.value = value;
  }
};

const goToTag = (tag) => {
  tagList.value.forEach((t) => {
    t.funcStatus = "plain";
  });
  tag.funcStatus = "dark";
  showType.value = tag.showType;
  let tagName = tag.name;
  let algorithmNames = "";
  if (tagName.includes("算法") && algorithmName.value != "") {
    tagName = "算法";
    algorithmNames = algorithmName.value;
  } else {
    if (tagName.includes("算法")) {
      showType.value = "";
      tag.funcStatus = "plain";
    }
    algorithmNames = "";
  }
  commonstore.changeCurTreeNode(cid.value, tagName, algorithmNames);
};

const initLoad = () => {
  pid.value = route.params.pid;
  cid.value = route.params.id;
  showType.value = route.params?.type?.toLowerCase() ?? "";
  algorithmName.value = route.params?.algorithms ?? "";
  tagList.value.forEach((t) => (t.funcStatus = "plain"));
  var curTag = tagList.value.find((x) => x.showType == showType.value);
  if (curTag) {
    curTag.funcStatus = "dark";
  }
  if (cid.value) {
    let rlt = getCurrentObj(project, cid.value);
    if (!rlt) {
      getModuleData(project, cid.value);
      rlt = getCurrentObj(project, cid.value);
    }
    if (rlt) {
      if (rlt.algorithms && rlt.algorithms.length > 0) {
        algorithmName.value = rlt.algorithms[0].text;
        //console.log("initLoad;", algorithmName.value);
      }
    }
  }
  //console.log("rlt", rlt);
};
const footTabIndex = ref(0);
provide("changeTabIndex", footTabIndex);
onMounted(() => {
  //initLoad();
});

onBeforeMount(() => {
  //console.log("fdafasf");
  initLoad();
});

watch(
  () => router.currentRoute.value,
  (newValue, oldValue) => {
    initLoad();
  }
);
</script>

<style  scoped>
.routerHeight {
  overflow: auto;
  height: calc(100vh - 355px);
}

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