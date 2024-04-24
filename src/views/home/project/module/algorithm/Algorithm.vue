<template>
  <div class="editor-container">
    <div>
      <el-button class="func" @click="drawer = !drawer;tabIndex=2">函数库</el-button>
      <el-button class="func" @click="test">test</el-button>
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
        :data="tsModel"
        :props="defaultProps"
        accordion
        :filter-node-method="filterNode"
        @node-drag-end="handleDragEnd"
      >
      <template #default="{ node, data }">
        <el-tooltip v-if="data.children === undefined" :content="data['zh-hans-tip']" placement="top" effect="light">
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
import { tsModel } from "@/jslib/ts_model.js";
// import type Node from 'element-plus/es/components/tree/src/model/node'
// import type { DragEvents } from 'element-plus/es/components/tree/src/model/useDragNode'
const tagsStore = pagetagsStore();
//const store = useStore();
const router = useRouter();
const route = useRoute();
const drawer = ref(false)
let pid = ref("");
let id = ref("");

const editor = ref();
let monacoEditor = ref();
const intervalId = ref();
let tabIndex = ref(inject('changeTabIndex'));
let finalResultFormat = ref({
		"key": "cafe10f0-951a-4c24-b5bf-15d7b78cf4a2",
		"text": "INIT",
		"comment": "",
		"content": "",
		"type": "ST",
		"lines": [{
			"branches": [{
				"comps": []
			}],
			"comment": ""
		}]
	});

const filterText = ref('');
const treeRef = ref();
const defaultProps = {
  children: 'children',
  label: 'name',
}

const handleDragEnd = (node) => {
  // console.log('tree drag end:', node.data)
  // console.log(monacoEditor.getPosition());
  insertByPos(node.data.snippet, monacoEditor.getPosition())
}

function insertByPos (test, pos) {
  // 2 插入
  monacoEditor.executeEdits('', [
    {
        range: new monaco.Range(pos.lineNumber, 
          pos.column, 
          pos.lineNumber, 
          pos.column),
        text: test
    }
  ])
  // 3 设置新的光标位置
  monacoEditor.setPosition(pos.lineNumber, pos.column + insertText.length)
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
  // 暂时这样取，目前暂定为.模块名的方式获取
  let cacheJson = cache.local.getJSON('json');
  let vals = cacheJson[0].interface;
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
  monaco.languages.setMonarchTokensProvider('st', {
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
    value: '',
    // 设置语言为自定义语言
    language: 'st',
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
  let tmp = getAlgorithmByKey(finalResultFormat.value.key, cacheJson[0].algorithms);
  monacoEditor.setValue(tmp.content);
  tmp = cache.local.getJSON('monaco_cursor_pos')
  if (tmp) {
    monacoEditor.setPosition(tmp);
  }
  monacoEditor.focus();
  // console.log(monacoEditor.getValue())
  intervalId.value = setInterval(() => {
    saveCache();
  }, 60000);
  tabIndex.value = 0
}

const test = () => {
  tabIndex.value = 2
}

const getAlgorithmByKey = (key, arr) => {
  for (let item of arr) {
    if (item.key === key) {
      return item;
    }
  }
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

const customizeShortcuts = () => {
  console.log('ok');
}

const saveCache = () => {
  // 当前光比位置存入monaco_cursor_pos
  cache.local.setJSON('monaco_cursor_pos', monacoEditor.getPosition());
  // 代码内容存入最终存入数据库的json
  // 新建时直接插入json内，这里只判定编辑修改
  let tmp = cache.local.getJSON('json');
  for (let item of tmp[0].algorithms) {
    if (item.key === finalResultFormat.value.key) {
      item.content = monacoEditor.getValue();
      break;
    }
  }
  // console.log(tmp);
  cache.local.setJSON('json', tmp);
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