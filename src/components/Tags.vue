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
      @contextmenu.native.prevent="handleClickContextMenu($event,tag)"
    >
      <el-link :underline="false"
        ><span :class="tag.effect == 'dark' ? 'tagName' : ''">{{
          tag.name
        }}</span></el-link
      >
    </el-tag>
  </div>
  <div
    :style="dyStyle.rightPop"
    v-show="tagContextMenuVisible"
    @mouseleave="tagContextMenuVisible = false"
  >
    <div style="text-align: center">
      <el-link
        style="padding: 10px"
        type="primary"
        @click="closeCurTag()"
        >关闭标签</el-link
      >
    </div>

    <div v-show="tagContextMenuVisible" style="text-align: center; padding: 10px">
      <el-link type="primary" @click="closeAllTags()">关闭全部标签</el-link>
    </div>
    <div
      style="text-align: center"
      v-show="tagContextMenuVisible"
    >
      <el-link
        type="primary"
        style="padding: 10px"
        @click="closeOtherTags()"
        >关闭其他标签</el-link
      >
    </div>
  </div>
</template> 

<script setup>
import { ref, onMounted, onUpdated } from "vue";
import { useRouter, useRoute } from "vue-router";
import { pagetagsStore } from "@/store/pageTags.js";
import { commonStore } from "@/store/commonStore.js";
import sysApi from "@/api/sysApi";
import cache from "@/plugins/cache.ts";
const commonstore = commonStore();
const tagsStore = pagetagsStore();
const router = useRouter();
const curRouteObj = useRoute();
const dynamicTags = ref(tagsStore.TagArrs);
//const dynamicTags = reactive(tagsStore.TagArrs);
const cacheKey = "tags";
let tagContextMenuVisible = ref(false);
 let curTag= ref(tagsStore.CurTag);
 let contextClickTag = ref({});

 const dyStyle = reactive({
  rightPop: {
    position: "absolute",
    width: "120px",
    background: "#fff",
    border: "1px solid #aaa",
    borderRadius: "5px",
    color: "#000",
    zIndex: 10,
    left: "0px",
    top: "0px",
  },
});
const handleClose = (tag) => {
  var index = dynamicTags.value.indexOf(tag);
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
  if (tag.effect == "dark") {
    if (index == 0) index = 1;
    var tagPrev = dynamicTags.value[index - 1];
    var path = tagPrev.path;
    tagPrev.effect = "dark";
    tagPrev.selected =1;
    tagsStore.SetTags(dynamicTags.value);
    // commonstore.changeCurTreeNode(tagPrev.id, "", "");
    // router.push({ path });
  }
};

const goToPath = (tag) => {

  if (dynamicTags.value.length > 0) {
    dynamicTags.value.forEach((e) => {
      if (e.path == tag.path) {
        e.effect = "dark";
        e.selected = 1;
  
      } else {
        e.effect = "plain";
        e.selected = 0;
      }
    });
  }
  tagsStore.SetTags(dynamicTags.value);

};

const OnTagsChanged = () => {


 dynamicTags.value = tagsStore.TagArrs;
 console.log(dynamicTags.value );
 cache.session.setJSON(cacheKey, JSON.stringify(tagsStore.TagArrs));

};
const OnTagsCleared = () => {
  dynamicTags.value = tagsStore.TagArrs;
  cache.session.setJSON(cacheKey, "");
};

const OnCurTagChanged = () => {

  let path = "";
  curTag.value = tagsStore.CurTag;
  path =  curTag.value.path;
  commonstore.changeCurTreeNode(curTag.value.id, "", "");
  router.push({ path });
};

onMounted(() => {

  window.addEventListener('beforeunload', handleBeforeUnload);
  if (tagsStore.TagArrs.length == 0) {
     let curFuncList = JSON.parse(sessionStorage.getItem("curFuncLists"));

     let tagCache = cache.session.getJSON(cacheKey);
     if(tagCache !== undefined)
     {
        dynamicTags.value = JSON.parse(cache.session.getJSON(cacheKey));

        tagsStore.TagArrs = dynamicTags.value;
        if(dynamicTags.value !== undefined)
        {

          if(dynamicTags.value?.length >0)
          {
            let defaultIndex = Math.max(...dynamicTags.value.map((obj) => obj.index));
            // console.log(defaultIndex);
            let curItem = dynamicTags.value.find(item => item.selected == 1);
            if(curItem !== undefined)
            {
              curTag.value= curItem;
            }
            else
            {
              if(defaultIndex >0)
              {
                curTag.value= dynamicTags.value[defaultIndex-1];
              }
              
            }
          }    
        }
     }


    if (curFuncList) {
      loadTagData(curFuncList);
    } 
    else {
      sysApi.getFuncList().then((res) => {
        let list = res;
        loadTagData(list);
      });
    }
  }
  if(curTag !== undefined)
    {
      // console.log(curTag.value);
      goToPath(curTag.value);
    }

    tagsStore.TagsChanged.push(OnTagsChanged); 
    tagsStore.TagsCleared.push(OnTagsCleared); 
    tagsStore.CurTagChanged.push(OnCurTagChanged); 
});


// onUpdated(() => {
//   // console.log("enter again");
//   //commonstore.changeCurTreeNode(curTag.value.id, "", "");
//     });
    
onUnmounted(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
  });    

watch(dynamicTags.value, (newValue, oldValue) => {
  // if (newValue.length>0 && newValue.length !== oldValue.length) 
  {   
     console.log("changed");

    tagsStore.SetTags(newValue);

  }
});


const loadTagData = (curFuncList) => {
  if (curFuncList) {
    if(curRouteObj){
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

  }
};
const handleBeforeUnload = ($event) => {

  cache.session.setJSON(cacheKey, JSON.stringify(tagsStore.TagArrs));
}
const handleClickContextMenu = ($event,tag) => {

  const e = $event || window.event;

  contextClickTag = tag;
  dyStyle.rightPop.left = e.x + 'px';
  dyStyle.rightPop.top = e.y  + 'px';
  tagContextMenuVisible.value = true;
}

const closeCurTag = () => {
  if(dynamicTags.value.length >1)
  {
    handleClose(contextClickTag);
  }

  tagContextMenuVisible.value = false;

}
const closeOtherTags = () => {

  console.log(contextClickTag);
 
  contextClickTag.index =1;
  contextClickTag.effect = "dark";
  var path = contextClickTag.path;
  //router.push({ path });
  var index = dynamicTags.value.indexOf(contextClickTag);
  let items = dynamicTags.value.splice(index, 1);
  tagsStore.SetTags(items);
  tagContextMenuVisible.value = false;
}
const closeAllTags = () => {

  let id = "";
  let name = "";
  let path = "";
  let curFuncList = JSON.parse(sessionStorage.getItem("curFuncLists"));
  if (curFuncList) {
      var objFunc = curFuncList.find((obj) => obj.id == 1);
        id = objFunc?.id;
        name = objFunc?.funcName;
        path = objFunc?.funcUrl;

        let model = {
          id,
          path,
          name,
          effect: "dark",
        };
        tagsStore.SetTags("");
        tagsStore.AddTag(model);
    }

  tagContextMenuVisible.value = false;
}
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