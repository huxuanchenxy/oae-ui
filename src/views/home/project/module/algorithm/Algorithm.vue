<template>
  <div class="editor-container">
    <!-- 将编辑器容器绑定到 ref -->
    <div id="editor" ref="editor"></div>
  </div>
</template>

<script setup>
// import { ref, onMounted } from "vue";
// import { useRoute } from "vue-router";
// import { useStore } from "vuex";
import { pagetagsStore } from "@/store/pageTags.js";
const tagsStore = pagetagsStore();
//const store = useStore();
const router = useRouter();
const route = useRoute();
let pid = ref("");
let id = ref("");
const initLoad = () => {
  pid.value = route.params.pid;
  id.value = route.params.id;
  //store.commit("ChangeTagModuleStatus", route.path);
  tagsStore.ChangeTagModuleStatus( route.path)
};
function initEditor () {
  // 创建 Monaco Editor 实例
  monacoEditor = monaco.editor.create(editor.value, {
    // 设置初始代码值
    value: '',
    // 设置语言为自定义语言
    language: 'st',
    theme: 'hc-black' //官方自带三种主题vs, hc-black, or vs-dark
  })
  monacoEditor.focus();
  console.log(monacoEditor.getValue())
}

onMounted(() => {
  initLoad();
  initEditor();

});

watch(
  () => router.currentRoute.value,
  (newValue) => {
    initLoad();
  }
);
</script>

<style lang="scss" scoped>
.editor-container {
  width: 100%;
  height: 100%;
  // padding: 15px;
  background: #ffffff;
}
#editor {
  width: 100%;
  height: 100%;
}
</style>