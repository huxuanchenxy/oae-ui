<template>
  <div class="editor-container">
    <div>
      <el-button class="func" @click="drawer = !drawer;">函数库</el-button>
      <!-- <el-button class="func" @click="test">test</el-button> -->
    </div>
    <!-- 将编辑器容器绑定到 ref -->
    <div id="editor" ref="editor"></div>
  </div>
  <div :class="[drawer ? 'right' : 'right1']">
  <!-- <div class="right"> -->
    <el-card class="box-card">
      <el-input
        v-model="filterText"
        style="width: 160px"
        placeholder="Filter keyword"
      />
      <!-- icon="fold" -->
      <el-tree
        ref="treeRef"
        style="max-width: 180px"
        class="filter-tree"
        draggable
        :data="funcDB"
        :props="defaultProps"
        accordion
        :filter-node-method="filterNode"
        @node-drag-end="handleDragEnd"
      >
      <template #default="{ node, data }">
        <el-tooltip v-if="data.children === undefined" :content="data['desc']" placement="top" effect="light">
          <span>{{data.name}}</span>
        </el-tooltip>
        <span v-else>{{data.name}}</span>
      </template>
    </el-tree>
    </el-card>
    <div class="val-color">
      <el-card style="background-color: transparent;border:none;" shadow="never">
        <div><p style="width: 15px;height: 10px;background-color: #169BD5;display: inline-block;margin-right: 5px;"/>命令</div>
        <div><p style="width: 15px;height: 10px;background-color: #EC808D;display: inline-block;margin-right: 5px;"/>输入变量</div>
        <div><p style="width: 15px;height: 10px;background-color: #8400FF;display: inline-block;margin-right: 5px;"/>输出变量</div>
        <div><p style="width: 15px;height: 10px;background-color: #880014;display: inline-block;margin-right: 5px;"/>内部变量</div>
        <div><p style="width: 15px;height: 10px;background-color: #F59A23;display: inline-block;margin-right: 5px;"/>临时变量</div>
      </el-card>
  </div>
  </div>
</template>

<script setup>
// import { ref, onMounted } from "vue";
// import { useRoute } from "vue-router";
// import { useStore } from "vuex";
import { pagetagsStore } from "@/store/pageTags.js";
import  cache  from "@/plugins/cache.ts";
import * as monaco from 'monaco-editor'
import { ElTree } from 'element-plus'
// import { tsModel } from "@/jslib/ts_model.js";
import api from "@/api/commonApi";
import { getCurrentObj, changeData } from "@/utils/cache/common";
// import type Node from 'element-plus/es/components/tree/src/model/node'
// import type { DragEvents } from 'element-plus/es/components/tree/src/model/useDragNode'
const tagsStore = pagetagsStore();
//const store = useStore();
const router = useRouter();
const route = useRoute();
const currentProject = 'project1';
const currentModule = route.params.id;
let currentAlgorithm = ref(route.params.algorithms);
const drawer = ref(false);
let funcDB = ref();
const emit = defineEmits(["getName"]);

let pid = ref("");
let id = ref("");

const editor = ref();
let monacoEditor = ref();
const intervalId = ref();
let tabIndex = ref(inject('changeTabIndex'));

const filterText = ref('');
const treeRef = ref();
const defaultProps = {
  children: 'children',
  label: 'name',
}

const handleDragEnd = (node) => {
  // console.log('tree drag end:', node.data.content)
  // console.log(monacoEditor.getPosition());
  insertByPos(node.data.content, monacoEditor.getPosition())
}

function insertByPos (text, pos) {
  // 2 插入
  monacoEditor.executeEdits('', [
    {
      range: new monaco.Range(pos.lineNumber, 
      pos.column, 
      pos.lineNumber, 
      pos.column),
      text: text
    }
  ])
  pos.column = pos.column + text.length;
  // 3 设置新的光标位置
  monacoEditor.setPosition(pos)
  // 4 聚焦
  monacoEditor.focus()
}

const initLoad = () => {
  pid.value = route.params.pid;
  id.value = route.params.id;
  //store.commit("ChangeTagModuleStatus", route.path);
  tagsStore.ChangeTagModuleStatus( route.path)
};
const initRegRule = (val) => {
  let ret = '';
  for (let item of val) {
    ret = ret + item.text + '|';
  }
  // console.log(ret.slice(0,-1));
  return new RegExp(ret.slice(0,-1), 'ig');
}
function initEditor () {
  // console.log(currentAlgorithm.value)
  let moduleJson = getCurrentObj(currentProject,currentModule)
  let algorithm;
  // 点模块 再点tag算法时，路由中不含当前算法名
  if (!currentAlgorithm.value) {
    algorithm = moduleJson.algorithms[0];
    currentAlgorithm.value = algorithm.text;
  } else {
    algorithm = moduleJson.algorithms.filter((item) => {return item.text === currentAlgorithm.value})[0]
  }
  emit('getName', currentAlgorithm.value);
  // console.log(algorithm)
  let algorithmType = algorithm.type.toLowerCase();
  api.GetFunctions({lang: algorithmType}).then((res) => {
    funcDB.value = res;
    // console.log(funcDB);
  });
  // let algorithmType = 'st'
  // algorithm.key = 'cafe10f0-951a-4c24-b5bf-15d7b78cf4a2';
  monaco.editor.defineTheme('myTheme', {
    base: 'vs',
    rules: [
      // 设置token颜色，
      { token: 'keyword', foreground: '#169BD5' },
      { token: 'inputs', foreground: '#EC808D' },
      { token: 'outputs', foreground: '#8400FF'},
      { token: 'internals', foreground: '#880014' },
      { token: 'temps', foreground: '#F59A23' }
    ],
    inherit: true,
    // 必须有否则无法生效
    colors: {}
  });
  let vals = moduleJson.interface;
  let tokenizerRoot = [];
  if (vals.inputs.length > 0) {
    tokenizerRoot.push([initRegRule(vals.inputs), {token: 'inputs'}]);
  }
  if (vals.outputs.length > 0) {
    tokenizerRoot.push([initRegRule(vals.outputs), {token: 'outputs'}]);
  }
  if (vals.internals.length > 0) {
    tokenizerRoot.push([initRegRule(vals.internals), {token: 'internals'}]);
  }
  if (vals.temps.length > 0) {
    tokenizerRoot.push([initRegRule(vals.temps), {token: 'temps'}]);
  }
  // console.log(tokenizerRoot);
  // let inputStr = new RegExp('ttt|1_2|ccc', 'ig');
  monaco.languages.setMonarchTokensProvider(algorithmType, {
    // ignoreCase: true, // 忽略大小写
    tokenizer: {
      // root:[
      //   // [/ttt|ppp|ccc/, {token: "inputs"}],
      //   [inputsReg, {token: "inputs"}],
      //   // [/-X|-H|-d/, {token: "keyword"}],
      //   // [/POST|GET|DELETE|PATCH|PUT/, {token: "comment.doc"}],
      // ],
      root: tokenizerRoot
    }
  })
  // 创建 Monaco Editor 实例
  monacoEditor = monaco.editor.create(editor.value, {
    // 设置初始代码值
    value: algorithm.content,
    // 设置语言为自定义语言
    language: algorithmType,
    theme: 'myTheme', //官方自带三种主题vs, hc-black, or vs-dark
    // suggest: {
    //   preview: true
    //   // previewMode: 'subwordSmart',
    //   // showMethods: true,
    //   // showFunctions: true,
    //   // showVariables: true
    // },
    // inlineSuggest: {
    //   mode: 'subwordSmart'
    // },
    // accessibilitySupport: 'on',
    // automaticLayout: true
    autoIndent:false,//自动布局
    renderWhitespace: 'all',
    colorDecorators: true,
    matchBrackets: 'always',
    accessibilitySupport: 'on',
    suggestions: true,
    snippetSuggestions: 'top'
  })
  let tmp = cache.local.getJSON('monaco_cursor_pos')
  if (tmp) {
    monacoEditor.setPosition(tmp);
  }
  monacoEditor.focus();
  // console.log(monacoEditor.getValue())
  // 每分钟自动保存缓存
  intervalId.value = setInterval(() => {
    saveCache();
  }, 60000);
  tabIndex.value = 2
}

const test = () => {
  // tabIndex.value = 2
  // 将大json中module的id和路由保持一致
  let tmp = cache.local.getJSON('json');
  tmp[0].id = 4
  tmp[0].name = '模块一'
  tmp[1].id = 8
  tmp[1].name = '模块二'
  // console.log(tmp)
  cache.local.setJSON('json',tmp);
}

watch(filterText, (val) => {
  treeRef.value.filter(val)
})

const filterNode = (value, data) => {
  if (!value) return true
  value = value.toUpperCase()
  return data.name.includes(value)
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

// 想做ctrl+S快捷键，没成功，往后放
const customizeShortcuts = () => {
  console.log('ok');
}

const saveCache = () => {
  // 当前光比位置存入monaco_cursor_pos
  cache.local.setJSON('monaco_cursor_pos', monacoEditor.getPosition());
  // 代码内容存入最终存入数据库的json
  // 新建时直接插入json内，这里只判定编辑修改
  let moduleJson = getCurrentObj(currentProject,currentModule);
  for (let item of moduleJson.algorithms) {
    if (item.text === currentAlgorithm.value) {
      item.content = monacoEditor.getValue();
      break;
    }
  }
  // console.log(tmp);
  changeData(currentProject,currentModule,moduleJson);
}

onUnmounted(() => {
  saveCache();
  clearInterval(intervalId.value);
})
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
.func {
  border-radius: 0;
  position: absolute;
  margin-left: 1648px;
  margin-top: -66px;
}
.right {
  position: absolute;
  margin-top: -656px;
  margin-left: 1723px;
  z-index: 5;
  width: 0px;
  transition: all 0.2s;
}
.right1 {
  position: absolute;
  margin-top: -656px;
  margin-left: 1523px;
  z-index: 5;
  width: 200px;
  transition: all 0.2s;
}
.box-card {
  border-radius: 0;
  height: 654px;
  overflow: auto;
}
.val-color {
  position: absolute;
  width: 160px;
  margin-top: -160px;
  margin-left: -160px;
}
</style>