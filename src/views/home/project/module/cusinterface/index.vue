<template>
  <div>
    <eventVariAntv ref="eventVariAntvChild"/>
  </div>
</template>

<script setup lang="ts">
import { pagetagsStore } from "@/store/pageTags.js";
import  eventVariAntv  from "@/components/antv/eventvari/index.vue";
import interInputUtil from "@/utils/cache/inter";
const tagsStore = pagetagsStore();
//const store = useStore();
const router = useRouter();
const route = useRoute();
const module=route.params.pid;
const project="project1";
const eventVariAntvChild=ref();
const initLoad = () => {
  //store.commit("ChangeTagModuleStatus", route.path);
  tagsStore.ChangeTagModuleStatus(route.path);
};
let graphData = {
  nodes: [
    {
      id: "node1",
      x: 150,
      y: 200,
      type: "myShape",
      color: "red",
      // eventInput: [],
      // eventOutput: ["EOut1", "EOut2", "EOut3", "EOut4"],
      // paramInput: ["ParamReq1", "ParamReq2", "ParamReq3", "ParamReq4"],
      // paramOutput: ["ParOut1", "ParOut2"],
      centerText: "Test.BFB1\nv0.1",
    },
  ],
};
onMounted(() => {
  initLoad();
  let data=interInputUtil.getInputEvents(project,module);
  let nameList=[];
  data.forEach(element => {
    nameList.push(element.text);
  });
  graphData.nodes[0].eventInput=nameList;
  if(eventVariAntvChild.value){
    eventVariAntvChild.value.reRender(graphData);
  }
});
const convertToAntvData=(data)=>{

}
watch(
  () => router.currentRoute.value,
  (newValue) => {
    initLoad();
  }
);
</script>

<style lang="scss" scoped>
</style>
