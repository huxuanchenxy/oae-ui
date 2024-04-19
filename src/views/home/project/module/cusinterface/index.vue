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
import useVariInputStore from "@/store/modules/variInput.ts";
import useVariOutputStore from "@/store/modules/variOutput.ts";
import {getInputEvents,getOutputEvents} from "@/api/inter/event";
import {getInputVaris,getOutputVaris} from "@/api/inter/vari";
import inVariApi from "@/api/inter/invari";
import tempVariApi from "@/api/inter/tempvari";
const eveInputStore=useEveInputStore();
const eveOutputStore=useEveOutputStore();
const variInputStore=useVariInputStore();
const variOutputStore=useVariOutputStore();
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
  graphData.nodes[0].eventInput=getCurrentDataEventInput();
  graphData.nodes[0].eventOutput=getCurrentDataEventOutput();
  graphData.nodes[0].paramInput=getCurrentDataVariInput();
  graphData.nodes[0].paramOutput=getCurrentDataVariOutput();
  if(eventVariAntvChild.value){
    eventVariAntvChild.value.reRender(graphData);
  }
});
const getCurrentDataEventInput=()=>{
  let data=getInputEvents(project,module);
  let nameList=[];
  data?.forEach(element => {
    nameList.push(element.text);
  });
  return nameList;
}
const getCurrentDataEventOutput=()=>{
  let data=getOutputEvents(project,module);
  let nameList=[];
  data?.forEach(element => {
    nameList.push(element.text);
  });
  return nameList;
}
const getCurrentDataVariInput=()=>{
  let data=getInputVaris(project,module);
  let nameList=[];
  data?.forEach(element => {
    nameList.push(element.text);
  });
  return nameList;
}
const getCurrentDataVariOutput=()=>{
  let data=getOutputVaris(project,module);
  let nameList=[];
  data?.forEach(element => {
    nameList.push(element.text);
  });
  return nameList;
}
eveInputStore.$subscribe((mutate,state)=>{
  graphData.nodes[0].eventInput=getCurrentDataEventInput();
  if(eventVariAntvChild.value){
    eventVariAntvChild.value.reRender(graphData);
  }
})
eveOutputStore.$subscribe((mutate,state)=>{
  graphData.nodes[0].eventOutput=getCurrentDataEventOutput();
  if(eventVariAntvChild.value){
    eventVariAntvChild.value.reRender(graphData);
  }
})
variInputStore.$subscribe((mutate,state)=>{
  graphData.nodes[0].paramInput=getCurrentDataVariInput();
  if(eventVariAntvChild.value){
    eventVariAntvChild.value.reRender(graphData);
  }
})
variOutputStore.$subscribe((mutate,state)=>{
  graphData.nodes[0].paramOutput=getCurrentDataVariOutput();
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
