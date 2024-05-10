<template>
  <div class="wrapper" style="">
    <!-- 将编辑器容器绑定到 ref -->
    <div
      style="
        position: relative;
        height: 100%;
        flex-grow: 2;
        width: 1000px;
        overflow: hidden;
      "
    >
      <div id="editor" ref="editor" class="cusEditor"></div>
      <div class="val-color">
        <el-card
          style="background-color: transparent; border: none"
          shadow="never"
        >
          <div>
            <p
              style="
                width: 15px;
                height: 10px;
                background-color: #169bd5;
                display: inline-block;
                margin-right: 5px;
              "
            />
            命令
          </div>
          <div>
            <p
              style="
                width: 15px;
                height: 10px;
                background-color: #ec808d;
                display: inline-block;
                margin-right: 5px;
              "
            />
            输入变量
          </div>
          <div>
            <p
              style="
                width: 15px;
                height: 10px;
                background-color: #8400ff;
                display: inline-block;
                margin-right: 5px;
              "
            />
            输出变量
          </div>
          <div>
            <p
              style="
                width: 15px;
                height: 10px;
                background-color: #880014;
                display: inline-block;
                margin-right: 5px;
              "
            />
            内部变量
          </div>
          <div>
            <p
              style="
                width: 15px;
                height: 10px;
                background-color: #f59a23;
                display: inline-block;
                margin-right: 5px;
              "
            />
            临时变量
          </div>
        </el-card>
      </div>
    </div>

    <div :class="{ rightShow: drawer, rightHidden: !drawer }">
      <el-button
        type="primary"
        :title="funcTitle"
        size="small"
        class="func"
        @click="showOrHidden"
      >
        <el-icon v-show="drawer" style="font-size: 14px"
          ><CaretRight
        /></el-icon>
        <el-icon v-show="!drawer" style="font-size: 14px"><CaretLeft /></el-icon
        >函数库
      </el-button>
      <!-- <div class="right"> -->
      <el-card class="box-card">
        <el-input v-model="filterText" placeholder="Filter keyword" />
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
          :allow-drop="
            () => {
              return false;
            }
          "
        >
          <template #default="{ node, data }">
            <el-tooltip
              v-if="data.children.length === 0"
              :content="data['desc']"
              placement="top"
              effect="light"
            >
              <span>{{ data.name }}</span>
            </el-tooltip>
            <span v-else>{{ data.name }}</span>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script setup>
// import { ref, onMounted } from "vue";
// import { useRoute } from "vue-router";
// import { useStore } from "vuex";
//import { pagetagsStore } from "@/store/pageTags.js";
import useVariInputStore from "@/store/modules/variInput.ts";
import useVariOutputStore from "@/store/modules/variOutput.ts";
import useInVariStore from "@/store/modules/inVari.ts";
import useTempVariStore from "@/store/modules/tempVari.ts";
import cache from "@/plugins/cache.ts";
import * as monaco from "monaco-editor";
import { cpp, cppLen } from "@/jslib/language/cpp.js";
import { st, stLen } from "@/jslib/language/st.js";
import { ElTree } from "element-plus";
// import { tsModel } from "@/jslib/ts_model.js";
import api from "@/api/commonApi";
import { getCurrentObj, changeData } from "@/utils/cache/common";
import { reactive } from "vue";
// import type Node from 'element-plus/es/components/tree/src/model/node'
// import type { DragEvents } from 'element-plus/es/components/tree/src/model/useDragNode'
//const tagsStore = pagetagsStore();
//const store = useStore();
const router = useRouter();
const route = useRoute();
const variInputStore = useVariInputStore();
const variOutputStore = useVariOutputStore();
const inVariStore = useInVariStore();
const tempVariStore = useTempVariStore();
const currentProject = "project1";
let currentModule = ref(route.params.id);
let currentAlgorithm = ref(route.params.algorithms);
let currentLanguage;
const drawer = ref(true);
let funcDB = ref();
const emit = defineEmits(["getName"]);
let funcTitle = ref("隐藏函数库");
let pid = ref("");
let id = ref("");

const editor = ref();
let monacoEditor = reactive();
const intervalId = ref();
let tabIndex = ref(inject("changeTabIndex"));

const filterText = ref("");
const treeRef = ref();
const defaultProps = {
  children: "children",
  label: "name",
};

const handleDragEnd = (node) => {
  // console.log('tree drag end:', node.data.content)
  // console.log(monacoEditor.getPosition());
  insertByPos(node.data.content, monacoEditor.getPosition());
};

function insertByPos(text, pos) {
  // 2 插入
  monacoEditor.executeEdits("", [
    {
      range: new monaco.Range(
        pos.lineNumber,
        pos.column,
        pos.lineNumber,
        pos.column
      ),
      text: text,
    },
  ]);
  pos.column = pos.column + text.length;
  // 3 设置新的光标位置
  monacoEditor.setPosition(pos);
  // 4 聚焦
  monacoEditor.focus();
}

const initLoad = () => {
  pid.value = route.params.pid;
  id.value = route.params.id;
  currentModule.value = route.params.id;
  currentAlgorithm.value = route.params.algorithms;
  //store.commit("ChangeTagModuleStatus", route.path);
  //tagsStore.ChangeTagModuleStatus(route.path);
};
const initRegRule = (val) => {
  let ret = "";
  for (let item of val) {
    ret = ret + item.text + "|";
  }
  // console.log(ret.slice(0,-1));
  return new RegExp(ret.slice(0, -1), "ig");
};
// 语言不同时，更新语言和规则
const updateEditor = () => {
  // currentAlgorithm.value = route.params.algorithms;
  // currentModule.value = route.params.id;
  if (currentAlgorithm.value) {
    emit("getName", currentAlgorithm.value);
    let moduleJson = getCurrentObj(currentProject, currentModule.value);
    let algorithm = moduleJson.algorithms.filter((item) => {
      return item.text === currentAlgorithm.value;
    })[0];
    monacoEditor.setValue(algorithm.content);
    if (currentLanguage !== algorithm.type.toLowerCase()) {
      currentLanguage = algorithm.type.toLowerCase();
      api.GetFunctions({ lang: currentLanguage }).then((res) => {
        funcDB.value = res;
      });
      updateRuleByLanguage(moduleJson);
      monaco.editor.setModelLanguage(
        toRaw(monacoEditor).getModel(),
        currentLanguage
      ); //toRaw(monacoEditor.value).getModel()
    }
  }
};
const resetArr = (obj, len) => {
  let arr = obj.tokenizer.root;
  let newLen = arr.length;
  if (newLen > len) arr.splice(0, newLen - len);
  return obj;
};
const updateRuleByLanguage = (moduleJson) => {
  let vals = moduleJson.interface;
  let language = "";
  switch (currentLanguage) {
    case "st":
      language = resetArr(st, stLen);
      break;
    case "cpp":
      language = resetArr(cpp, cppLen);
      break;
    default:
      break;
  }
  // console.log('init:',language.tokenizer.root)
  if (language !== "") {
    let tokenizerRoot = language.tokenizer.root;
    if (vals.inputs.length > 0) {
      tokenizerRoot.unshift([initRegRule(vals.inputs), { token: "inputs" }]);
    }
    if (vals.outputs.length > 0) {
      tokenizerRoot.unshift([initRegRule(vals.outputs), { token: "outputs" }]);
    }
    if (vals.internals.length > 0) {
      tokenizerRoot.unshift([
        initRegRule(vals.internals),
        { token: "internals" },
      ]);
    }
    if (vals.temps.length > 0) {
      tokenizerRoot.unshift([initRegRule(vals.temps), { token: "temps" }]);
    }
    // console.log(language);
    // let inputStr = new RegExp('ttt|1_2|ccc', 'ig');
    // monaco.languages.setMonarchTokensProvider(currentLanguage, {
    //   // ignoreCase: true, // 忽略大小写
    //   // defaultToken: 'source',
    //   encoding: /u|u8|U|L/,
    //   tokenizer: {
    //     // root:[
    //     //   // [/ttt|ppp|ccc/, {token: "inputs"}],
    //     //   [inputsReg, {token: "inputs"}],
    //     //   // [/-X|-H|-d/, {token: "keyword"}],
    //     //   // [/POST|GET|DELETE|PATCH|PUT/, {token: "comment.doc"}],
    //     // ],
    //     root: tokenizerRoot
    //   }
    // })
    // console.log('after:',language.tokenizer.root)
    monaco.languages.setMonarchTokensProvider(currentLanguage, language);
  }
};
const initEditor = () => {
  // console.log(currentAlgorithm.value)
  let moduleJson = getCurrentObj(currentProject, currentModule.value);
  let algorithm;
  // 点模块 再点tag算法时，路由中不含当前算法名
  if (!currentAlgorithm.value) {
    algorithm = moduleJson.algorithms[0];
    currentAlgorithm.value = algorithm.text;
  } else {
    algorithm = moduleJson.algorithms.filter((item) => {
      return item.text === currentAlgorithm.value;
    })[0];
  }
  emit("getName", currentAlgorithm.value);
  tabIndex.value = 2;
  // console.log(algorithm)
  if (!currentLanguage || currentLanguage !== algorithm.type.toLowerCase()) {
    currentLanguage = algorithm.type.toLowerCase();
    api.GetFunctions({ lang: currentLanguage }).then((res) => {
      funcDB.value = res;
      // console.log(funcDB);
    });
    // let algorithmType = 'st'
    // algorithm.key = 'cafe10f0-951a-4c24-b5bf-15d7b78cf4a2';
    monaco.editor.defineTheme("myTheme", {
      base: "vs",
      rules: [
        // 设置token颜色，
        { token: "keyword", foreground: "#169BD5" },
        { token: "inputs", foreground: "#EC808D" },
        { token: "outputs", foreground: "#8400FF" },
        { token: "internals", foreground: "#880014" },
        { token: "temps", foreground: "#F59A23" },
      ],
      inherit: true,
      // 必须有否则无法生效
      colors: {},
    });
    updateRuleByLanguage(moduleJson);
    if (monacoEditor) monacoEditor.dispose();
    // 创建 Monaco Editor 实例
    monacoEditor = monaco.editor.create(editor.value, {
      // 设置初始代码值
      value: algorithm.content,
      // 设置语言为自定义语言
      language: currentLanguage,
      theme: "myTheme", //官方自带三种主题vs, hc-black, or vs-dark
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
      //automaticLayout: true,
      autoIndent: false, //自动布局
      renderWhitespace: "all",
      colorDecorators: true,
      matchBrackets: "always",
      accessibilitySupport: "on",
      suggestions: true,
      snippetSuggestions: "top",
      automaticLayout: true, //自适应      
      minimap: { // 关闭代码缩略图
        enabled: false // 是否启用预览图
      }
    });
    setCursorPos();
    // console.log(monacoEditor.getValue())
    // 每分钟自动保存缓存
    if (!intervalId.value) {
      intervalId.value = setInterval(() => {
        saveCache();
      }, 60000);
    }
  } else monacoEditor.setValue(algorithm.content);
};

const setCursorPos = () => {
  let tmp = cache.local.getJSON("monaco_cursor_pos");
  if (tmp && tmp[currentLanguage]) {
    monacoEditor.setPosition(tmp[currentLanguage]);
  }
  monacoEditor.focus();
};

watch(filterText, (val) => {
  treeRef.value.filter(val);
});

const filterNode = (value, data) => {
  if (!value) return true;
  value = value.toUpperCase();
  return data.name.includes(value);
};

onMounted(() => {
  // console.log(monaco.languages.getLanguages()[10].loader);
  initLoad();
  initEditor();
  // let moduleJson = getCurrentObj(currentProject,currentModule.value)
  // updateRuleByLanguage(moduleJson);
  // // console.log(monacoEditor.value)
  // monaco.editor.setModelLanguage(monacoEditor.getModel(), currentLanguage);
  // debugger
  // console.log(monaco.editor.tokenize('','cpp'))
  // console.log(monacoEditor.value)
  // console.log(language.tokenizer.root)
});

watch(
  () => router.currentRoute.value,
  // () => route.params.algorithm,
  (newValue) => {
    saveCache();
    // console.log(route.params.algorithms)
    if (route.params.algorithms) {
      // console.log(currentModule.value)
      // console.log(route.params.id)
      initLoad();
      updateEditor();
      setCursorPos();
      monacoEditor.updateOptions({ readOnly: false });
      // initEditor();
      // console.log('save')
    } else emit("getName", "");
  }
);

watch(
  [variInputStore, variOutputStore, inVariStore, tempVariStore],
  (newVal) => {
    let moduleJson = getCurrentObj(currentProject, currentModule.value);
    updateRuleByLanguage(moduleJson);
  }
);

// 想做ctrl+S快捷键，没成功，往后放
const customizeShortcuts = () => {
  console.log("ok");
};

const saveCache = () => {
  if (currentModule.value) {
    // 当前光比位置存入monaco_cursor_pos
    let pos = cache.local.getJSON("monaco_cursor_pos");
    if (!pos) pos = {};
    pos[currentLanguage] = monacoEditor.getPosition();
    cache.local.setJSON("monaco_cursor_pos", pos);
    // 代码内容存入最终存入数据库的json
    // 新建时直接插入json内，这里只判定编辑修改
    let moduleJson = getCurrentObj(currentProject, currentModule.value);
    for (let item of moduleJson.algorithms) {
      if (item.text === currentAlgorithm.value) {
        item.content = monacoEditor.getValue();
        break;
      }
    }
    // console.log(tmp);
    changeData(currentProject, currentModule.value, moduleJson);
  }
};
const showOrHidden = () => {
  //monacoEditor.layout();
  drawer.value = !drawer.value;
  funcTitle.value = drawer.value ? "隐藏函数库" : "显示函数库";
};

onUnmounted(() => {
  // console.log('onUnmounted')
  saveCache();
  clearInterval(intervalId.value);
});
</script>

<style lang="scss" scoped>
.wrapper {
  height: calc(100vh - 365px);
  margin-top: 10px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
}
.cusEditor {
  border: 1px solid #999;
  height: 99%;
  // width: 100%;
  // overflow-y: auto;
}
.editor-container {
  // width: 100%;
  // height: 100%;
  // padding: 15px;
  // width: 1200px;
  //height: 300px;
  background: #ffffff;
}
// #editor {
//   width: 100%;
//   height: 100%;
// }
.func {
  border-radius: 0;
  position: absolute;
  // margin-left: 0;
  // margin-top: -66px;
  right: 10px;
  top: 73px;
}
// .right {
//   position: absolute;
//   margin-top: -656px;
//   margin-left: 1723px;
//   z-index: 5;
//   width: 0px;
//   transition: all 0.2s;
// }
// .right1 {
//   position: absolute;
//   margin-top: -656px;
//   margin-left: 1523px;
//   z-index: 5;
//   width: 200px;
//   transition: all 0.2s;
// }
.box-card {
  border-radius: 0;
  // height: 654px;
  // overflow: auto;
}
.val-color {
  position: absolute;
  width: 160px;
  // margin-top: -140px;
  // margin-left: -160px;
  z-index: 10;
  right: -20px;
  bottom: 5px;
}

.rightShow {
  flex-basis: 180px;
  height: 99%;
  overflow-y: auto;
  margin-left: 8px;
}
.rightHidden {
  flex-basis: 0;
  height: 99%;
  overflow-y: auto;
}
</style>