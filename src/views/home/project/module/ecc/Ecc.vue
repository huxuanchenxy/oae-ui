<template>
  <div>
    <div><el-button type="primary" @click="addItem">test</el-button></div>
    <div id="mountNode"></div>
  </div>
</template>

<script setup lang="ts">
import G6 from "@antv/g6";
import { pagetagsStore } from "@/store/pageTags.js";
const tagsStore = pagetagsStore();
const router = useRouter();
const route = useRoute();
let pid = ref("");
let id = ref("");
let graph;
let sourceAnchorIdx, targetAnchorIdx;
function initNode(data) {
  graph = new G6.Graph({
    container: "mountNode",
    width: 1000,
    height: 1000,
    defaultEdge: {
      type: "quadratic",
      style: {
        stroke: "#F6BD16",
        lineWidth: 2,
      },
    },
    modes: {
      default: [
        // config the shouldBegin for drag-node to avoid node moving while dragging on the anchor-point circles
        {
          type: "drag-node",
          shouldBegin: (e) => {
            if (e.target.get("name") === "anchor-point") return false;
            return true;
          },
        },
        // config the shouldBegin and shouldEnd to make sure the create-edge is began and ended at anchor-point circles
        {
          type: "create-edge",
          trigger: "drag", // set the trigger to be drag to make the create-edge triggered by drag
          shouldBegin: (e) => {
            // avoid beginning at other shapes on the node
            if (e.target && e.target.get("name") !== "anchor-point")
              return false;
            sourceAnchorIdx = e.target.get("anchorPointIdx");
            e.target.set("links", e.target.get("links") + 1); // cache the number of edge connected to this anchor-point circle
            return true;
          },
          shouldEnd: (e) => {
            // avoid ending at other shapes on the node
            if (e.target && e.target.get("name") !== "anchor-point")
              return false;
            if (e.target) {
              targetAnchorIdx = e.target.get("anchorPointIdx");
              e.target.set("links", e.target.get("links") + 1); // cache the number of edge connected to this anchor-point circle
              return true;
            }
            targetAnchorIdx = undefined;
            return true;
          },
        },
      ],
    },
  });
  graph.data(data);
  graph.render();
  graph.on("aftercreateedge", (e) => {
    // update the sourceAnchor and targetAnchor for the newly added edge
    graph.updateItem(e.edge, {
      sourceAnchor: sourceAnchorIdx,
      targetAnchor: targetAnchorIdx,
    });
  });

  // after drag from the first node, the edge is created, update the sourceAnchor
  graph.on("afteradditem", (e) => {
    if (e.item && e.item.getType() === "edge") {
      graph.updateItem(e.item, {
        sourceAnchor: sourceAnchorIdx,
      });
    }
  });

  // if create-edge is canceled before ending, update the 'links' on the anchor-point circles
  graph.on("afterremoveitem", (e) => {
    if (e.item && e.item.source && e.item.target) {
      const sourceNode = graph.findById(e.item.source);
      const targetNode = graph.findById(e.item.target);
      const { sourceAnchor, targetAnchor } = e.item;
      if (sourceNode && !isNaN(sourceAnchor)) {
        const sourceAnchorShape = sourceNode
            .getContainer()
            .find(
                (ele) =>
                    ele.get("name") === "anchor-point" &&
                    ele.get("anchorPointIdx") === sourceAnchor
            );
        sourceAnchorShape.set("links", sourceAnchorShape.get("links") - 1);
      }
      if (targetNode && !isNaN(targetAnchor)) {
        const targetAnchorShape = targetNode
            .getContainer()
            .find(
                (ele) =>
                    ele.get("name") === "anchor-point" &&
                    ele.get("anchorPointIdx") === targetAnchor
            );
        targetAnchorShape.set("links", targetAnchorShape.get("links") - 1);
      }
    }
  });

  // some listeners to control the state of nodes to show and hide anchor-point circles
  graph.on("node:mouseenter", (e) => {
    graph.setItemState(e.item, "showAnchors", true);
  });
  graph.on("node:mouseleave", (e) => {
    graph.setItemState(e.item, "showAnchors", false);
  });
  graph.on("node:dragenter", (e) => {
    graph.setItemState(e.item, "showAnchors", true);
  });
  graph.on("node:dragleave", (e) => {
    graph.setItemState(e.item, "showAnchors", false);
  });
  graph.on("node:dragstart", (e) => {
    graph.setItemState(e.item, "showAnchors", true);
  });
  graph.on("node:dragout", (e) => {
    graph.setItemState(e.item, "showAnchors", false);
  });
}
const initLoad = () => {
  pid.value = route.params.pid;
  id.value = route.params.id;
  //store.commit("ChangeTagModuleStatus", route.path);
  tagsStore.ChangeTagModuleStatus( route.path)
};
onMounted(() => {
  let data = {
    nodes: [
      {
        id: "node1",
        x: 150,
        y: 200,
        type: "rect",
      },
    ],
  };
  initNode(data);
  initLoad();
});
let x=150;
let y=250;
const addItem=()=>{
  const model = {
    label: 'node',
    address: 'cq',
    x: x,
    y: y,
    type: "rect",
  };

  graph.addItem('node', model);
  y+=50;
}
watch(
  () => router.currentRoute.value,
  (newValue) => {
    initLoad();
  }
);
</script>

<style   scoped>
</style>