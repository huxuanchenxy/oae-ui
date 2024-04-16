<template>
  <div>
    <eventVariAntv ref="eventVariAntvChild"/>
  </div>
</template>

<script setup lang="ts">
import { pagetagsStore } from "@/store/pageTags.js";
import  eventVariAntv  from "@/components/antv/eventvari/index.vue";
import interUtil from "@/utils/cache/inter";
import useEveInputStore from "@/store/modules/eveInput.ts";
import useEveOutputStore from "@/store/modules/eveOutput.ts";
const eveInputStore=useEveInputStore();
const eveOutputStore=useEveOutputStore();
const tagsStore = pagetagsStore();
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
  graphData.nodes[0].eventInput=getCurrentDataInput();
  graphData.nodes[0].eventOutput=getCurrentDataOutput();
  if(eventVariAntvChild.value){
    eventVariAntvChild.value.reRender(graphData);
  }
});
const getCurrentDataInput=()=>{
  let data=interUtil.getInputEvents(project,module);
  let nameList=[];
  data.forEach(element => {
    nameList.push(element.text);
  });
  return nameList;
}
const getCurrentDataOutput=()=>{
  let data=interUtil.getOutputEvents(project,module);
  let nameList=[];
  data.forEach(element => {
    nameList.push(element.text);
  });
  return nameList;
}
eveInputStore.$subscribe((mutate,state)=>{
  graphData.nodes[0].eventInput=getCurrentDataInput();
  if(eventVariAntvChild.value){
    eventVariAntvChild.value.reRender(graphData);
  }
})
eveOutputStore.$subscribe((mutate,state)=>{
  graphData.nodes[0].eventOutput=getCurrentDataOutput();
  if(eventVariAntvChild.value){
    eventVariAntvChild.value.reRender(graphData);
  }
})
watch(
  () => router.currentRoute.value,
  (newValue) => {
    initLoad();
  }
);


</script>

<style lang="scss" scoped>
</style>
