<template>
  <div class="editor-container">
    <div>
      <el-button class="func" @click="drawer = !drawer">函数库</el-button>
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
        @node-drag-start="handleDragStart"
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
let finalResultFormat = ref({
		"key": "1",
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


const handleDragStart = (node, ev) => {
  console.log('drag start', node.data)
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
  // let vals = cache.local.get('json');
  // if (!vals || !vals.input_events) {
  //   vals.
  // }
  let inputStr = new RegExp('ttt|1_2|ccc', 'ig');
  monaco.languages.setMonarchTokensProvider('st', {
    // ignoreCase: true, // 忽略大小写
    tokenizer: {
      root:[
        // [/ttt|ppp|ccc/, {token: "inputs"}],
        [inputStr, {token: "inputs"}],
        // [/-X|-H|-d/, {token: "keyword"}],
        // [/POST|GET|DELETE|PATCH|PUT/, {token: "comment.doc"}],
      ],
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
  let tmp = cache.local.get('monaco_content');
  if (tmp === null) tmp = ''
  monacoEditor.setValue(tmp);
  tmp = cache.local.getJSON('monaco_cursor_pos')
  if (tmp) {
    monacoEditor.setPosition(tmp);
  }
  monacoEditor.focus();
  // console.log(monacoEditor.getValue())
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

onUnmounted(() => {
  let ret = monacoEditor.getValue();
  cache.local.set('monaco_content', ret);
  let pos = monacoEditor.getPosition();
  cache.local.setJSON('monaco_cursor_pos', pos);
  finalResultFormat.value.content = ret;
  // console.log(finalResultFormat);
  cache.local.setJSON('test', finalResultFormat.value);
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
</style>