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
      <Algorithm v-if="showType == 'algorithm'"></Algorithm>
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
const route = useRoute();
const router = useRouter();
// let path = ref("");
// path.value = route.path;
let pid = ref(0);
let cid = ref(0);
let showType = ref("");
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

const goToTag = (tag) => {
  tagList.value.forEach((t) => {
    t.funcStatus = "plain";
  });
  tag.funcStatus = "dark";

  showType.value = tag.showType;
};

const initLoad = () => {
  pid.value = route.params.pid;
  cid.value = route.params.id;

  showType.value = route.params?.type?.toLowerCase() ?? "";
};
const footTabIndex = ref(0);
provide("changeTabIndex",footTabIndex);
onMounted(() => {
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
  height: calc(100vh - 345px);
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