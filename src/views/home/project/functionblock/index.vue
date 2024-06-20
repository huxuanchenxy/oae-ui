<template>
    <div style="background-color: #def4fd">
      <div style="padding: 10px; display: inline">
        <el-dropdown>
          <el-button class="el-dropdown-link" text size="large" disabled>
            校验
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>全部</el-dropdown-item>
              <el-dropdown-item>应用1</el-dropdown-item>
              <el-dropdown-item>应用2</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown>
          <el-button class="el-dropdown-link" text size="large" disabled>
            部署
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>全部</el-dropdown-item>
              <el-dropdown-item>应用1</el-dropdown-item>
              <el-dropdown-item>应用2</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button text size="large" disabled>编译</el-button>
        <span style="margin-left: 10px; margin-right: 30px">|</span>
        <el-button-group>
          <el-tooltip effect="light" content="开始" placement="bottom">
            <el-button icon="VideoPlay" disabled />
          </el-tooltip>
          <el-tooltip effect="light" content="暂停" placement="bottom">
            <el-button icon="VideoPause" disabled />
          </el-tooltip>
          <el-tooltip effect="light" content="终止" placement="bottom">
            <el-button icon="Failed" disabled />
          </el-tooltip>
          <el-tooltip effect="light" content="刷新" placement="bottom">
            <el-button icon="RefreshRight" disabled />
          </el-tooltip>
          <el-tooltip effect="light" content="清缓存" placement="bottom">
            <el-button icon="Failed" disabled />
          </el-tooltip>
          <el-tooltip effect="light" content="部署状态" placement="bottom">
            <el-button icon="Failed" disabled />
          </el-tooltip>
          <el-tooltip effect="light" content="在线设备" placement="bottom">
            <el-button icon="Failed" disabled />
          </el-tooltip>
        </el-button-group>
        <span style="margin-left: 30px; margin-right: 30px">|</span>
        <el-button-group>
          <el-tooltip effect="light" content="保存" placement="bottom">
            <el-button @click="saveAllClick"
              ><span class="iconfont">&#xe6a2;</span></el-button
            >
          </el-tooltip>
          <el-tooltip effect="light" content="刷新" placement="bottom">
            <el-button icon="Refresh" @click="initData" />
          </el-tooltip>
          <el-tooltip effect="light" content="撤销" placement="bottom">
            <el-button icon="Back" @click="toolbar.undo()" />
          </el-tooltip>
          <el-tooltip effect="light" content="回退" placement="bottom">
            <el-button icon="Right" @click="toolbar.redo()" />
          </el-tooltip>
        </el-button-group>
      </div>
    </div>
    <div class="wrapper">
      <div
        style="position: relative; height: 100%; flex-grow: 2; overflow: hidden"
      >
      <div><select style="text-align: center;width:100px;appearance:none;border:0;" selectedIndex=-1 placeholder="Select"><option label="text1" value="1"/><option label="text2" value="2"/></select></div>
      <div id="container" ref="container"></div>
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
          >设备库
        </el-button>
        <!-- <div class="right"> -->
        <el-card>
          <el-input v-model="filterText" placeholder="Filter keyword" />
          <el-tree
            ref="treeRef"
            style="max-height: 840px; overflow-y: auto"
            accordion
            draggable
            :data="devices"
            :props="defaultProps"
            :filter-node-method="filterNode"
            @node-drag-end="handleDragEnd"
            :allow-drag="allowdrag"
            :allow-drop="
              () => {
                return false;
              }
            "
          >
            <template #default="{ node, data }">
              <img
                v-if="data.images&&data.images !== '' && data.images.indexOf('.') > 0"
                :src="iconPath + data.images"
                class="icon-tree"
              />
              <span>{{ node.label }}</span>
            </template>
          </el-tree>
        </el-card>
      </div>
    </div>
    <div>
      <el-dialog
        v-model="dialogVisible_title"
        width="300"
        :show-close="false"
      >
      <div>名称</div>
      <div><el-input v-model="addNodeBefore.title"></el-input></div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible_title = false">取消</el-button>
          <el-button type="primary" @click="addNode"
            >确认</el-button
          >
          </span>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script setup>
  import cache from "@/plugins/cache.ts";
  import sysApi from "@/api/sysApi";
  import G6 from "@antv/g6";
  import { v4 as uuidv4 } from "uuid";
  import { baseUrl } from "@/api/baseUrl";
  import { ref } from "vue";
  import { toRaw } from "@vue/reactivity";
  import { ElMessage } from "element-plus";
  
  let cacheKey = 'functionBlock';
  let functionBlockJson = {};
  
  // 设备库变量
  let devices = ref([]);
  const projectID = useRoute().params.pid;
  const procedureID = useRoute().params.id;
  const iconPath = baseUrl + "/devimgs/";
  // const iconPath = 'http://10.89.34.70:8081/devimgs/';
  const drawer = ref(true);
  let funcTitle = ref("隐藏设备库");
  const filterText = ref("");
  const treeRef = ref();
  const defaultProps = {
    children: "children",
    label: (data, node) => {
      // console.log(data)
      if (data.jsonContent&&data.jsonContent !== "") {
        data.info = JSON.parse(data.jsonContent);
        // console.log(data.info)
        // return data.info.DisplayName;
      }
      return data.name;
    },
  };
  // 设备库函数
  const showOrHidden = () => {
    //monacoEditor.layout();
    drawer.value = !drawer.value;
    funcTitle.value = drawer.value ? "隐藏设备库" : "显示设备库";
  };
  watch(filterText, (val) => {
    treeRef.value.filter(val);
  });
  const filterNode = (value, data) => {
    if (!value) return true;
    // value = value.toUpperCase();
    // return data.name.includes(value);
    return data.label.includes(value);
  };
  const allowdrag = (node) => {
    if (node.data.jsonContent === "") return false;
    else return true;
  };
  const handleDragEnd = (draggingNode, dropNode, dropType, e) => {
    // console.log('屏幕坐标',{x:e.x,y:e.y})
    // console.log('屏幕坐标',{x:e.x - leftTreeWidth,y:e.y - topTitleWidth})
    let viewPos = graph.getPointByClient(e.x, e.y);
    // console.log('视口坐标',viewPos)
    // let canvasPos = graph.getCanvasByPoint(viewPos.x,viewPos.y)
    // console.log('画布坐标',canvasPos)
    addNodeBefore.value.x=viewPos.x;
    addNodeBefore.value.y=viewPos.y;
    addNodeBefore.value.data=draggingNode.data;
    // dialogVisible_title.value = true;
    addNodeBefore.value.title = 'test'
    addNode()
  };
//   G6图形
const anchorAttr = {
    toTopAndBottom: 5,
    size: [10,10],
    spacing: 5, //间距
}
// minSize为最小显示大小
// 根据名字以及输入事件+输出事件或输入变量+输出变量的长度改变宽度
// 根据输入事件+输入变量或输出事件+输出变量的数量改变高度
// center和type的高度定长
const minSize = [100,60];
const initCenterLack = [20,20];
const initLabelHeight = 40;
const htmlHeight = 20;
const lineWidthOut = 2;
const lineWidthIn = 1;
// 强制连边时，从锚点x位置先偏移edgeOffX画折线，之后自动
const edgeOffX = 10;

let graph;
const container = ref();
let dialogVisible_title = ref(false);
let addNodeBefore = ref({
  title: '',
  x: 0,
  y: 0,
  data: {}
});
let sourceAnchor,targetAnchor;
// node刷新前input输入框的位置
let preInputCursorPos = 0
// 为了利用内置的undo和redo
const toolbar = new G6.ToolBar({ className: "g6-toolbar-display" });
G6.registerEdge('polyline-more',{
  getControlPoints(cfg) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;
    return [
      {x:startPoint.x+anchorAttr.size[0]+edgeOffX,y:startPoint.y},
      {x:endPoint.x / 3 + (2 / 3) * startPoint.x, y:startPoint.y},
      {x:endPoint.x / 3 + (2 / 3) * startPoint.x,y:endPoint.y},
      {x:endPoint.x-edgeOffX,y:endPoint.y}
    ]
  }
},
'polyline')
G6.registerNode("functionBlock", {
  draw(cfg, group) {
    // 为了根据title长度获取bbox
    const textTitle = group.addShape('text', {
      attrs: {
        y:htmlHeight,
        textAlign:'left',
        fontSize: 14,
        fontFamily: 'Arial',
        text: cfg.title,
        // textBaseline: 'middle',
        fill: '#000'
      },
      name: 'text-title'
    })
    const textRes = group.addShape("text", {
      attrs: {
        y:htmlHeight,
        textAlign:'left',
        fontSize: 14,
        fontFamily: 'Arial',
        text: cfg.selectedResource?.label?cfg.selectedResource.label:'',
        // textBaseline: 'middle',
        fill: '#000'
      },
      name: "text-res",
    });
    let bboxTitle = textTitle.getBBox();
    let bboxRes = textRes.getBBox();
    let realWidth = Math.max(...[bboxTitle.width,bboxRes.width,minSize[0]]);
    // console.log(realWidth)
    group.addShape("dom", {
      attrs: {
        width: realWidth,
        height: htmlHeight,
        html: '<div><input id="input-'+cfg.id+'" type="text" style="text-align: center;border:0;width:'+realWidth+'px" value="'+cfg.title+'"/></div>'
      },
      name: "dom-input-title",
    });
    let realEvtHeight = getHeight(cfg.inputEvt,cfg.outputEvt) - anchorAttr.spacing
    let realVarHeight = getHeight(cfg.inputVar,cfg.outputVar)
    const realAnchorsHeight = htmlHeight*2+realEvtHeight + realVarHeight+initCenterLack[1]+initLabelHeight
    const keyShape = group.addShape("rect", {
      attrs: {
        width: realWidth,
        height: realAnchorsHeight,
        // stroke: '#1E90FF',
        // lineWidth:lineWidthOut
      },
      // draggable: true,
      name: "rect-forAnchors",
    });
    // console.log(realEvtHeight)
    group.addShape('polygon', {
      attrs: {
        points: [
          [0, htmlHeight],
          [realWidth, htmlHeight],
          [realWidth, realEvtHeight+htmlHeight],
          [realWidth-initCenterLack[0], realEvtHeight+htmlHeight],
          [realWidth-initCenterLack[0], initCenterLack[1]+realEvtHeight+htmlHeight],
          [realWidth, initCenterLack[1]+realEvtHeight+htmlHeight],
          [realWidth, initCenterLack[1]+realEvtHeight+htmlHeight+realVarHeight+initLabelHeight],
          [0, initCenterLack[1]+realEvtHeight+htmlHeight+realVarHeight+initLabelHeight],
          [0, initCenterLack[1]+realEvtHeight+htmlHeight],
          [initCenterLack[0], initCenterLack[1]+realEvtHeight+htmlHeight],
          [initCenterLack[0], realEvtHeight+htmlHeight],
          [0, realEvtHeight+htmlHeight]
        ],
        fill: '#009688',
        stroke: '#000',
        lineWidth:lineWidthIn
      },
      draggable: true,
      name: 'polygon-block',
    });
    group.addShape("rect", {
      attrs: {
        x: lineWidthIn/2,
        y: htmlHeight+realEvtHeight + lineWidthIn/2 +initCenterLack[1],
        width: realWidth - lineWidthIn,
        height: initLabelHeight+lineWidthIn*4,
        fill: '#01579b',
      },
      draggable: true,
      name: "rect-label",
    });
    // console.log(cfg.label)
    group.addShape("text", {
      attrs: {
        x: (realWidth - lineWidthIn)/2,
        y: htmlHeight+realEvtHeight+35+initCenterLack[1],
        width: realWidth - lineWidthIn,
        height: initLabelHeight+lineWidthIn*4,
        textAlign:'center',
        fontSize: 20,
        // fontFamily: 'Arial',
        text: cfg.label,
        fill: '#000',
      },
      draggable: true,
      name: "rect-label",
    });
    group.addShape("dom", {
      attrs: {
        y:htmlHeight+realEvtHeight+initCenterLack[1]+realVarHeight+initLabelHeight,
        width: realWidth,
        height: htmlHeight,
        html: '<div><select id="select-'+cfg.id+'" style="text-align: center;width:'+realWidth+'px;appearance:none;border:0;">'+getSelectOption(cfg.resOption)+'</select></div>'
      },
      name: "dom-select-res",
    });
    group.addShape('rect', {
      attrs: {
        x:-lineWidthOut*2,
        y:-lineWidthOut*2,
        width: realWidth+lineWidthOut*4,
        height: realAnchorsHeight + lineWidthOut*4,
        // fill: '#FFF',
        stroke: '#1E90FF',
        lineWidth:lineWidthOut
      },
      name: 'rect-out',
      draggable: true
    });
    cfg.anchorParam = {
      allHeight:realAnchorsHeight,
      varStartHeight: realAnchorsHeight - realVarHeight-htmlHeight,
      realWidth:realWidth
    }
    const anchorPoints = this.getAnchorPoints(cfg);
      anchorPoints.forEach((anchorPos, i) => {
      let y = realAnchorsHeight*anchorPos[1] - anchorAttr.size[1]/2
      group.addShape("rect", {
        attrs: {
          x: realWidth*anchorPos[0],
          y: y,
          width: anchorAttr.size[0],
          height: anchorAttr.size[1],
          fill: y < (htmlHeight + realEvtHeight) ? "#4caf50" : "#ff9800" //ff9800
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: `anchor-point`, // the name, for searching by group.find(ele => ele.get('name') === 'anchor-point')
        anchorPointIdx: i, // flag the idx of the anchor-point circle
        links: 0, // cache the number of edges connected to this shape
        visible: true, // invisible by default, shows up when links > 1 or the node is in showAnchors state
        draggable: true, // allow to catch the drag events on this shape
      });
    });
    return keyShape;
  },
  getAnchorPoints(cfg) {
    let anchorPointsArr = [];
    let realWidth = cfg.anchorParam.realWidth;
    let varStartHeight = cfg.anchorParam.varStartHeight;
    let allHeight = cfg.anchorParam.allHeight;
    cfg.anchorsInfo = [];
    for (let i = 0; i < cfg.inputEvt.length; i++) {
      anchorPointsArr.push([lineWidthIn / 2 / realWidth, (htmlHeight + anchorAttr.toTopAndBottom+i*(anchorAttr.size[1]+anchorAttr.spacing) + anchorAttr.size[1]/2) / allHeight]);
      cfg.anchorsInfo.push({name:cfg.inputEvt[i],inOut:"in",evtVar:"evt",order:i})
    }
    for (let i = 0; i < cfg.outputEvt.length; i++) {
      anchorPointsArr.push([(realWidth - anchorAttr.size[0] - lineWidthIn / 2) / realWidth, (htmlHeight + anchorAttr.toTopAndBottom+i*(anchorAttr.size[1]+anchorAttr.spacing) + anchorAttr.size[1]/2) / allHeight]);
      cfg.anchorsInfo.push({name:cfg.outputEvt[i],inOut:"out",evtVar:"evt",order:i})
    }
    for (let i = 0; i < cfg.inputVar.length; i++) {
      anchorPointsArr.push([lineWidthIn / 2 / realWidth, (varStartHeight + anchorAttr.toTopAndBottom*2+i*(anchorAttr.size[1]+anchorAttr.spacing) + anchorAttr.size[1]/2) / allHeight]);
      cfg.anchorsInfo.push({name:cfg.inputVar[i],inOut:"in",evtVar:"var",order:i})
    }
    for (let i = 0; i < cfg.outputVar.length; i++) {
      anchorPointsArr.push([(realWidth - anchorAttr.size[0] - lineWidthIn / 2) / realWidth, (varStartHeight + anchorAttr.toTopAndBottom*2+i*(anchorAttr.size[1]+anchorAttr.spacing) + anchorAttr.size[1]/2) / allHeight]);
      cfg.anchorsInfo.push({name:cfg.outputVar[i],inOut:"out",evtVar:"var",order:i})
    }
    // console.log('anchorPointsArr',anchorPointsArr)
    return anchorPointsArr;
  },
  afterDraw(cfg, group) {
    
  },
  setState(name, value, item) {
    
  },
});
const getHeight = (input,output) => {
  let initHeight = 0;
  let realHeight = minSize[1];
  let inputLen = input ? input.length : 0; //输入数量
  let outputLen = output ? output.length : 0; //输出数量
  let len = inputLen > outputLen ? inputLen : outputLen; //数量取最大值，用于计算需要把整个框撑起多大
  if (len > 0) initHeight = anchorAttr.toTopAndBottom * 2+len*(anchorAttr.size[1]+anchorAttr.spacing)
  if (initHeight > minSize[1]) realHeight = initHeight
  return realHeight;
}
const getSelectOption = (arr) => {
  let html = ''
  arr.forEach(el => {
    html = html + '<option label="'+el.label+'" '
    if (el.selected) html = html + 'selected '
    html = html + 'value="'+el.id+'"/>'
  })
  return html
}
const initGraph = () => {
  let graphWidth = container.value.offsetWidth;
  let graphHeight = window.innerHeight;
  graph = new G6.Graph({
    // linkCenter: true,
    renderer: 'svg',//渲染html
    container: "container",
    width: graphWidth,
    height: graphHeight,
    plugins: [toolbar],
    enabledStack: true,
    modes: {
      default: [
        "zoom-canvas",
        "drag-canvas",
        "drag-node",
        // {
        //   type: "brush-select",
        //   trigger: "shift",
        //   onSelect: (nodes) => {
        //     isLeaveCanvas = false;
        //     isCardShow.value = false;
        //   },
        // },
        {
          type: "click-select",
          trigger: "shift",
        },
        {
          type: "create-edge",
          key: "shift",
          trigger: "drag", // 'click' by default. options: 'drag', 'click'
          shouldBegin: (e) => {
            if (e.target && e.target.get("name") === "anchor-point") {
              sourceAnchor = e.target.get("anchorPointIdx");
              e.target.set("links", e.target.get("links") + 1);
              return true
            }
            return false;
          },
          shouldEnd: (e) => {
            if (e.target && e.target.get("name") === "anchor-point") {
              targetAnchor = e.target.get("anchorPointIdx");
              e.target.set("links", e.target.get("links") + 1);
              return true
            }
            return false;
          },
        },
      ],
    },
    defaultEdge: {
      type: "polyline-more",//polyline，quadratic
      style: {
        stroke: "#4CAF50",
        lineWidth: 2,
        // endArrow: true,
      }
    },
    edgeStateStyles: {
      selected: {
        stroke: "#1E90FF",
        shadowBlur: 0,
      },
      highlight: {
        stroke: "#1E90FF",
        shadowBlur: 0,
      },
      dark: {
        opacity: 0.2,
      },
    },
  });
  
  graph.on("aftercreateedge", (e) => {
    // update the sourceAnchor and targetAnchor for the newly added edge
    let edge = e.edge;
    let sNode = edge.get('sourceNode');
    let sModel = sNode.get('model');
    let newModel = {
      sourceAnchor: sourceAnchor,
      targetAnchor: targetAnchor
    }
    // 方向必须是输出到输入，否则纠正
    if (sModel.anchorsInfo[sourceAnchor].inOut === 'in') {
      let model = edge.get('model');
      newModel = {
        sourceAnchor: targetAnchor,
        targetAnchor: sourceAnchor,
        source: model.target,
        target: model.source
      }
    }
    // console.log(edge)
    graph.updateItem(edge, newModel);
    // console.log(edge);
  });
  graph.on('afteritemrefresh',(e) => {
    let model = e.item.get('model')
    listener(model.id,model.isFocus)
  })
  graph.on('wheelzoom',() => {
    // console.log('wheelzoom',e)
    graph.getNodes().forEach(el => {
      listener(el.get('id'))
    });
  })
  graph.on("node:mousedown", (evt) => {
    if (evt.originalEvent.shiftKey) {
      evt.originalEvent.preventDefault()
      // console.log('node:mousedown')
      evt.item?.lock();
    }
    // isLeaveCanvas = false;
  });
  graph.on('node:drag',(e) => {
    e.originalEvent.preventDefault()
  })
  graph.on("node:mouseup", (evt) => {
    if (evt.originalEvent.shiftKey) {
      evt.originalEvent.preventDefault()
      evt.item?.unlock();
    }
    // isLeaveCanvas = false;
  });
  graph.on('edge:click',(e) => {
    const keyShape = e.item.get('keyShape');
    const lineWidth = keyShape.attrs.lineWidth;
    const path = keyShape.attrs.path;
    let node = {
      id:'line1',
      x:path[1][1],
      y:path[1][2],
      width: path[2][1]-path[1][1],
      height: 1,
      type: 'rect',
      style: {
        fill:'#1E90FF'
      }
    }
    graph.addItem('node',node);
    console.log(node)
  })
  graph.on('canvas:dragend',() => {
    // console.log('canvas:dragend')
    graph.getNodes().forEach(el => {
      listener(el.get('id'))
    });
  })
  graph.on("canvas:click", (evt) => {
    // console.log(graph.getNodes())
  });
}
const listener = (nodeId,isFocus = false) => {
  let input = document.getElementById('input-'+nodeId);
  input.addEventListener('keydown',inputKeyDown);
  input.addEventListener('input',inputAdaptLength);
  if (isFocus) {
    input.addEventListener('focus',(e) => {
      let input = e.target;
      let val = input.value
      input.value = val
    });
    input.focus()
    input.setSelectionRange(preInputCursorPos,preInputCursorPos)
  }
  let select = document.getElementById('select-'+nodeId);
  select.addEventListener('change',selectChange);
}
const inputAdaptLength = (e) => {
    let input = e.target;
    let node = graph.findById(input.id.slice(6));
    let model = node.get('model');
    model.title = input.value;
    model.isFocus = true
    preInputCursorPos = input.selectionStart
    graph.refreshItem(node)
}
const inputKeyDown = (e) => {
  if (e.key === 'Enter') {
    let input = e.target;
    let node = graph.findById(input.id.slice(6));
    let model = node.get('model');
    model.isFocus = true
    graph.refreshItem(node)
  }
}
const selectChange = (e) => {
  let select = e.target;
  let node = graph.findById(select.id.slice(7));
  let model = node.get('model');
  let selectedObj = select.options[select.selectedIndex];
  model.selectedResource = {label:selectedObj.label,id:selectedObj.value};
  model.resOption.forEach(el => {
    el.selected = false
  })
  model.resOption[select.selectedIndex].selected = true;
  model.isFocus = false
  graph.refreshItem(node)
  // graph.data(graph.save())
  // graph.render()
  // console.log(node)
  // select.blur();
}
const addNode = () => {
  let data = addNodeBefore.value.data
  // console.log(data)
  let node = {
    id: uuidv4(),//uuidv4()
    title: addNodeBefore.value.title,
    x: addNodeBefore.value.x,
    y: addNodeBefore.value.y,
    type: 'functionBlock',
    // backgroud:'#009688',
    isFocus: false,
    selectedResource: {id:2,label:'res2',selected:false},
    resOption: [{id:1,label:'res111111111111111111111111111111111111111111111111112',selected:false},{id:2,label:'res2',selected:true}],
    info: data.info,
    label: data.name
  };
  switch (data.type) {
    case 'project':
      node.inputEvt = getAnchorsName(data.info['input_events'],'text')
      node.outputEvt = getAnchorsName(data.info['output_events'],'text')
      node.inputVar = getAnchorsName(data.info.inputs,'text')
      node.outputVar = getAnchorsName(data.info.outputs,'text')
      break;
    case 'generic':
      node.inputEvt = getAnchorsName(data.info.InterfaceList.EventInputs.Event,'Name')
      node.outputEvt = getAnchorsName(data.info.InterfaceList.EventOutputs.Event,'Name')
      node.inputVar = getAnchorsName(data.info.InterfaceList.InputVars.VarDeclaration,'Name')
      node.outputVar = getAnchorsName(data.info.InterfaceList.OutputVars.VarDeclaration,'Name')
      break;
    default:
      break;
  }
  // console.log(node)
  graph.addItem("node", node);
  listener(node.id)
  dialogVisible_title.value = false;
}
const getAnchorsName = (arr,attr) => {
  let ret = []
  if (arr != '') {
    arr.forEach(el => {
      ret.push(el[attr])
    })
  }
  return ret
}
  const saveAll = () => {
    functionBlockJson = graph.save();
    cache.local.setJSON(cacheKey, functionBlockJson);
  };
  const saveAllClick = () => {
    saveAll();
    ElMessage({
      message: "保存成功",
      type: "success",
    });
  };
  // let isKeyDown = true;
  const handleKeyDown = (e) => {
    // if (e.key === 'Shift' && isKeyDown) {
    //   graph.setMode('createEdge')
    //   console.log('handleKeyDown')
    //   isKeyDown = false
    // }
    if (e.ctrlKey && e.key === "z" && !isLeaveCanvas) toolbar.undo();
    if (e.ctrlKey && e.key === "y" && !isLeaveCanvas) toolbar.redo();
  };
  const handleKeyUp = (e) => {
    if (e.key === "Delete") {
      
    }
  };
  onMounted(() => {
    // console.log(useRoute().params)
    initGraph();
    // initData();
    // window.addEventListener("keydown", handleKeyDown);
    // window.addEventListener("keyup", handleKeyUp);
    sysApi.getTreeForAppList({pid:projectID}).then(async (res) => {
      devices.value = res;
      // console.log('设备库：',res);
      
      // console.log(segMapDev);
    });
  });
  onUnmounted(() => {
    // window.removeEventListener("keydown", handleKeyDown);
    // window.removeEventListener("keyup", handleKeyUp);
    // saveAll();
  });
  
  </script>
  
  <style lang="scss" scoped>
  .icon-tree {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
  .my-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
  }
  .wrapper {
    height: calc(100vh - 110px);
    margin-top: 10px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
  }
  .func {
    border-radius: 0;
    position: absolute;
    // margin-left: 0;
    // margin-top: -66px;
    right: 10px;
    top: 73px;
  }
  .rightShow {
    flex-basis: 280px;
    height: 99%;
    overflow-y: auto;
    margin-right: 10px;
  }
  .rightHidden {
    flex-basis: 0;
    height: 99%;
    overflow-y: auto;
  }
  .el-dropdown-link {
    cursor: pointer;
    // color: var(--el-color-primary);
    color: #606266;
    display: flex;
    align-items: center;
  }
  </style>