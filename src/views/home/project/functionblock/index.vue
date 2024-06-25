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
      <div class="g6-tooltip" ref ="tooltip"></div>
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
      if (data.jsonContent && data.jsonContent !== "") {
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
const tooltip = ref()
const anchorAttr = {
    toTopAndBottom: 5,
    size: [10,10],
    spacing: 5, //间距，包括锚点之间和锚点与文字之间
    textSpacing: 5  //并排时文字之间的最小间距
}
const moveEdgeIconSize = [10,10]
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
let sourceAnchor,targetAnchor,lastPos,curGraphItemBegin,anchorDes;
// node刷新前input输入框的位置
let preInputCursorPos = 0
// 为了利用内置的undo和redo
const toolbar = new G6.ToolBar({ className: "g6-toolbar-display" });
G6.registerEdge('polyline-more',{
  getControlPoints(cfg) {
    // console.log(cfg)
    if (cfg.controlPoints && cfg.controlPoints.length>0) return cfg.controlPoints
    if (cfg.targetNode && cfg.targetAnchor !== undefined) {
      let sNode = cfg.sourceNode;
      let tNode = cfg.targetNode;
      let sModel = sNode.get('model');
      let tModel = tNode.get('model');
      // console.log(sModel,cfg)
      const startPoint = cfg.startPoint;
      const endPoint = cfg.endPoint;
      if (cfg.target !== cfg.source) {
        // 左node右输出连接右node左输出
        if ((sModel.x+sNode.get('group').getBBox().width)<=(tModel.x)) {
          // 只有一条线段（两个控制点）可以拖拽移动
          cfg.canMove = 1
          return [
            {x:endPoint.x / 2 + startPoint.x/2, y:startPoint.y},
            {x:endPoint.x / 2 + startPoint.x/2,y:endPoint.y}
          ]
        } else {
          // 三条线段（四个控制点）可以拖拽移动
          cfg.canMove = 3
          let sy = sModel.y+sNode.get('group').getBBox().height
          let ty = tModel.y+tNode.get('group').getBBox().height
          // 两个node接近（垂直方向），从上下绕
          if ((sy+edgeOffX*2)>=tModel.y && (ty+edgeOffX*2)>=sModel.y) {
            // 事件连事件，从上绕
            if (sModel.anchorsInfo[cfg.sourceAnchor].evtVar === 'evt') {
              let y = sModel.y < tModel.y ? sModel.y: tModel.y
              return [
                {x:startPoint.x+anchorAttr.size[0]+edgeOffX,y:startPoint.y},
                {x:startPoint.x+anchorAttr.size[0]+edgeOffX, y:y - edgeOffX},
                {x:endPoint.x-edgeOffX,y:y-edgeOffX},
                {x:endPoint.x-edgeOffX,y:endPoint.y}
              ]
            } else if (sModel.anchorsInfo[cfg.sourceAnchor].evtVar === 'var') {
              let y = sy > ty ? sy: ty
              return [
                {x:startPoint.x+anchorAttr.size[0]+edgeOffX,y:startPoint.y},
                {x:startPoint.x+anchorAttr.size[0]+edgeOffX, y:y},
                {x:endPoint.x-edgeOffX,y:y},
                {x:endPoint.x-edgeOffX,y:endPoint.y}
              ]
            }
          } else {// 两个node距离远（垂直方向），从中间穿过去
            let y =sy + (tModel.y-sy-edgeOffX)/2
            if (ty<sModel.y) y = ty+(sModel.y-ty)/2
            return [
              {x:startPoint.x+anchorAttr.size[0]+edgeOffX,y:startPoint.y},
              {x:startPoint.x+anchorAttr.size[0]+edgeOffX, y:y},
              {x:endPoint.x-edgeOffX,y:y},
              {x:endPoint.x-edgeOffX,y:endPoint.y}
            ]
          }
        }
      } else if (cfg.canMove === 2) {
        // console.log('getControlPoints2',cfg)
        if (sModel.anchorsInfo[cfg.sourceAnchor].evtVar === 'evt') {
          return [
            {x:startPoint.x+anchorAttr.size[0]+edgeOffX,y:startPoint.y},
            {x:startPoint.x+anchorAttr.size[0]+edgeOffX, y:sModel.y - edgeOffX},
            {x:endPoint.x-edgeOffX,y:sModel.y-edgeOffX},
            {x:endPoint.x-edgeOffX,y:endPoint.y}
          ]
        } else if (sModel.anchorsInfo[cfg.sourceAnchor].evtVar === 'var') {
          let y = sModel.y+sNode.get('group').getBBox().height
          return [
            {x:startPoint.x+anchorAttr.size[0]+edgeOffX,y:startPoint.y},
            {x:startPoint.x+anchorAttr.size[0]+edgeOffX, y:y},
            {x:endPoint.x-edgeOffX,y:y},
            {x:endPoint.x-edgeOffX,y:endPoint.y}
          ]
        }
      }
    }
  }
},
'polyline')
G6.registerNode("functionBlock", {
  draw(cfg, group) {
    // 为了根据title长度获取bbox
    let tmpShape1 = cfg.outputEvt.length > cfg.inputEvt.length ? addTmpShape(cfg.outputEvt,cfg.inputEvt,group):addTmpShape(cfg.inputEvt,cfg.outputEvt,group)
    let tmpShape2 = cfg.outputVar.length > cfg.inputVar.length ? addTmpShape(cfg.outputVar,cfg.inputVar,group):addTmpShape(cfg.inputVar,cfg.outputVar,group)
    let tmpShape = tmpShape1.concat(tmpShape2)
    tmpShape1 = group.addShape('text', {
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
    tmpShape.push(tmpShape1)
    tmpShape1 = group.addShape("text", {
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
    tmpShape.push(tmpShape1)
    // console.log(tmpShape[0].getBBox().width)
    // let bboxTitle = textTitle.getBBox();
    // let bboxRes = textRes.getBBox();
    // let realWidth = Math.max(...[bboxTitle.width,bboxRes.width,minSize[0]]);
    let w = group.getBBox().width
    // console.log(w)
    tmpShape.forEach(el=>{group.removeChild(el)})
    let realWidth = w > minSize[0] ? w : minSize[0]
    // console.log(realWidth,group.getBBox())
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
        y: htmlHeight+realEvtHeight+initCenterLack[1]*1.5,
        width: realWidth - lineWidthIn,
        height: initLabelHeight+lineWidthIn*4,
        textAlign:'center',
        textBaseline:'top',
        fontSize: 14,
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
      let isLeft = cfg.anchorsInfo[i].inOut === 'in'
      let leftSpacing = lineWidthIn+anchorAttr.size[0]+anchorAttr.spacing
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
      group.addShape("text", {
        attrs: {
          x: isLeft ? leftSpacing : realWidth - leftSpacing,
          y: y - anchorAttr.size[1]/3,
          textAlign: isLeft ? 'left' : 'right',
          textBaseline: 'top',
          // fontSize: 20,
          // fontFamily: 'Arial',
          text: cfg.anchorsInfo[i].name,
          fill: '#000',
        },
        draggable: true,
        name: "rect-label-anchor-"+i,
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
      cfg.anchorsInfo.push({name:cfg.inputEvt[i].name,inOut:"in",evtVar:"evt",order:i})
    }
    for (let i = 0; i < cfg.outputEvt.length; i++) {
      anchorPointsArr.push([(realWidth - anchorAttr.size[0] - lineWidthIn / 2) / realWidth, (htmlHeight + anchorAttr.toTopAndBottom+i*(anchorAttr.size[1]+anchorAttr.spacing) + anchorAttr.size[1]/2) / allHeight]);
      cfg.anchorsInfo.push({name:cfg.outputEvt[i].name,inOut:"out",evtVar:"evt",order:i})
    }
    for (let i = 0; i < cfg.inputVar.length; i++) {
      anchorPointsArr.push([lineWidthIn / 2 / realWidth, (varStartHeight + anchorAttr.toTopAndBottom*2+i*(anchorAttr.size[1]+anchorAttr.spacing) + anchorAttr.size[1]/2) / allHeight]);
      let obj = cfg.inputVar[i]
      cfg.anchorsInfo.push({name:obj.name,type:obj.type,arrSize:obj.arrSize,inOut:"in",evtVar:"var",order:i})
    }
    for (let i = 0; i < cfg.outputVar.length; i++) {
      anchorPointsArr.push([(realWidth - anchorAttr.size[0] - lineWidthIn / 2) / realWidth, (varStartHeight + anchorAttr.toTopAndBottom*2+i*(anchorAttr.size[1]+anchorAttr.spacing) + anchorAttr.size[1]/2) / allHeight]);
      let obj = cfg.inputVar[i]
      cfg.anchorsInfo.push({name:obj.name,type:obj.type,arrSize:obj.arrSize,inOut:"out",evtVar:"var",order:i})
    }
    // console.log('anchorPointsArr',anchorPointsArr)
    return anchorPointsArr;
  },
  afterDraw(cfg, group) {
    
  },
  setState(name, value, item) {
    // console.log(name, value, item)
    // item.get('model').anchorDes = value
    // const group = item.getContainer();
    // const shapes = group.get("children");
    // const shape = shapes[0];
    // if (name === "selected" || name === "highlight") {
    //   if (value) {
    //     // 选中样式
    //     shape.attr({ stroke: "#1E90FF", lineWidth: clickWidth });
    //   } else {
    //     shape.attr({ stroke: "#808080", lineWidth: 1 });
    //   }
    // } else if (name === "dark") {
    //   // 为了挡住中心线，外围框不透明
    //   if (value) {
    //     // 选中样式
    //     shapes[1].attr({ opacity: 0.2 });
    //     shapes[2].attr({ opacity: 0.2 });
    //     // shapes.forEach((el) => {el.attr({'opacity': 0.2})})
    //   } else {
    //     // shapes.forEach((el) => {el.attr({'opacity': 1})})
    //     shapes[1].attr({ opacity: 1 });
    //     shapes[2].attr({ opacity: 1 });
    //   }
    // }
  },
});
const addTmpShape = (arr1,arr2,group) => {
  let ret = []
  arr1.forEach((el,i)=>{
    let shape = group.addShape('text',{
      attrs: {
        y:htmlHeight,
        textAlign:'left',
        // fontSize: 14,
        // fontFamily: 'Arial',
        text: el,
        // textBaseline: 'middle',
        fill: '#000'
      },
      name: 'text-tmp'
    })
    ret.push(shape)
    if (i<arr2.length) {
      shape = group.addShape('text',{
        attrs: {
          x:(lineWidthIn+anchorAttr.size[0]+anchorAttr.spacing)*2+anchorAttr.textSpacing + shape.getBBox().width,
          y:htmlHeight,
          textAlign:'left',
          // fontSize: 14,
          // fontFamily: 'Arial',
          text: arr2[i],
          // textBaseline: 'middle',
          fill: '#000'
        },
        name: 'text-tmp'
      })
      ret.push(shape)
    }
  })
  return ret
}
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
        // "drag-node",
        {
          type: "drag-node",
          // enableDelegate: true,
          // enableDragOnItem: false, // 禁止在节点/边上拖拽
          // enableDebounce: true, // 启用拖拽缓冲
          // debounceStep: 10, // 拖拽缓冲步长
          // direction: 'horizontal', // 设置拖拽方向为水平方向
          shouldUpdate: (e) => {
            let y1,y2
            let point = graph.getPointByCanvas(e.canvasX, e.canvasY)
            let newX = point.x
            let newY = point.y
            let model = e.item.get('model')
            if (model.id === 'line1' || model.id === 'line2' || model.id === 'line3') {
              // console.log('before',model.id)
              let edge = graph.findById(model.mapEdge)
              let eModel = edge.get('model')
              // let edgeShape = edge.get('keyShape')
              let path = edge.get('keyShape').attrs.path;
              let i = parseInt(model.id.slice(4))
              // x1 = path[i][1]
              y1 = path[i][2]
              // x2 = path[i+1][1]
              y2 = path[i+1][2]
              let edgeStartX = eModel.startPoint.x + (anchorAttr.size[0]+edgeOffX)
              let edgeEndX = eModel.endPoint.x - edgeOffX
              if (eModel.canMove === 1) {
                if (edgeStartX > newX) newX = edgeStartX
                else if (edgeEndX < newX) newX = edgeEndX
                path[i][1] = newX
                path[i+1][1] = newX
                lastPos = {x:newX,y:y1+(y2-y1)/2}
                // 能更新边位置，但是无法撤销,graph.save()拿不到keyShape数据，必须舍弃
                // edgeShape.attr('path',path)
                // 原本为了撤销，转为controlPoints,再更新，但是结果无效
                // 不过解决了graph.save()的问题
                // 其实好像graph.save()的问题很好解决，把需要的数据存入model，重新渲染时，拿出来再赋值即可
                graph.updateItem(edge,{controlPoints:pathToControlPoints(path)},true)
                // console.log(graph.save())
                // graph.data(graph.save())
                // graph.render()
                // e.updatePosition({x:newX,y:(y1+(y2-y1)/2)})
                // console.log('pos',model.x,model.y,(y1+(y2-y1)/2))
                // graph.pushStack('update',graph.save())
              } else if (eModel.canMove === 3 || eModel.canMove === 2) {
                switch (i) {
                  case 1:
                    if (edgeStartX > newX) newX = edgeStartX
                    path[i][1] = newX
                    path[i+1][1] = newX
                    graph.findById('line2').updatePosition({x:path[3][1]+(newX-path[3][1])/2})
                    lastPos = {x:newX,y:y1+(y2-y1)/2}
                    graph.updateItem(edge,{controlPoints:pathToControlPoints(path)},true)
                    break
                  case 3:
                    if (edgeEndX < newX) newX = edgeEndX
                    path[i][1] = newX
                    path[i+1][1] = newX
                    graph.findById('line2').updatePosition({x:newX+(path[2][1]-newX)/2})
                    lastPos = {x:newX,y:y1+(y2-y1)/2}
                    graph.updateItem(edge,{controlPoints:pathToControlPoints(path)},true)
                    break;
                  case 2:
                    // if (edgeEndX < newX) newX = edgeEndX
                    path[i][2] = newY
                    path[i+1][2] = newY
                    graph.findById('line1').updatePosition({y:path[1][2]+(newY-path[1][2])/2})
                    graph.findById('line3').updatePosition({y:path[4][2]+(newY-path[4][2])/2})
                    lastPos = {x:path[3][1]+(path[2][1]-path[3][1])/2,y:newY}
                    graph.updateItem(edge,{controlPoints:pathToControlPoints(path)},true)
                    break;
                  default:
                    break;
                }
              }
              // console.log(newX,path)
              // graph.update(e.item,{x:newX,y:y1+(y2-y1)/2})
              // const { x, y } = model;
              // // console.log(e.dx)
              // // 只能水平拖拽
              // if (x && !y) return e.x !== 0;
              // // 只能垂直拖拽
              // // if (y && !x) return e.dy !== 0;
              // e.canvasY = graph.getCanvasByPoint(lastPos.x, lastPos.y).y
              // e.canvasX = graph.getCanvasByPoint(lastPos.x, lastPos.y).x
              // console.log('after',newX,model.x,e)
              // return false
            }
            return true
          }
        },
        // formatText无法动态获取数据
        // {
        //   type: 'tooltip',
        //   formatText(model) {
        //       // console.log('formatText',model.anchorDes)
        //       // return '<div>'+anchorDes+'</div>';
        //     return model.anchorDes
        //   },
        //   offset: 10,
        //   shouldBegin: (e) => {
        //     let tooltip = document.getElementsByClassName('g6-tooltip')
        //     const target = e.target;
        //     if (target.get('name') === 'anchor-point') {
        //       let index = e.target.get("anchorPointIdx");
        //       let model = e.item.get('model')
        //       let anchor = model.anchorsInfo[index]
        //       if (anchor.evtVar === 'var') {
        //         anchorDes = anchor.type+'_'+anchor.arrSize
        //         graph.setItemState(e.item,'anchorDes',true)
        //         graph.setItemState(e.item,'anchorDes',anchorDes)
        //         // e.item.set('anchorDes',anchorDes)
        //         // graph.setItemState(e.item, 'anchorDes', anchorDes)
        //         // tooltip[0].hidden=false
        //         // tooltip.style={display:'block'}
        //         console.log('shouldBegin',e.item)
        //         return true;
        //       }
        //     }
        //     tooltip[0].hidden=true
        //     return false;
        //   }
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
              let model=e.item.get('model')
              curGraphItemBegin = {
                model:model,
                target:e.target
              }
              sourceAnchor = e.target.get("anchorPointIdx");
              // 改变边颜色
              if (model.anchorsInfo[sourceAnchor].evtVar === 'var') {
                graph.edge(()=>{return {style:{stroke:'#ff9800'}}})
              } else {
                graph.edge(()=>{return {style:{stroke:'#4CAF50'}}})
              }
              return true
            }
            return false;
          },
          shouldEnd: (e) => {
            if (e.target && e.target.get("name") === "anchor-point") {
              targetAnchor = e.target.get("anchorPointIdx");
              let sModel = curGraphItemBegin.model
              let tModel=e.item.get('model')
              let sTarget = curGraphItemBegin.target
              let tTarget = e.target
              let sAnchor = sModel.anchorsInfo[sourceAnchor]
              let tAnchor = sModel.anchorsInfo[targetAnchor]
              // 自己不能连自己
              if (sModel.id === tModel.id && sourceAnchor === targetAnchor) return false
              // 输入不能连输入，输出不能连输出
              if (sAnchor.inOut === tAnchor.inOut) return false
              // 变量和事件不能互连
              if (sAnchor.evtVar !== tAnchor.evtVar) return false
              // 类型、长度一致的输入输出变量才能互连，且输出和输入是一对多关系
              // 事件多对多，无限制
              // if (sAnchor)
              sTarget.set("links", tTarget.get("links") + 1)
              tTarget.set("links", tTarget.get("links") + 1);
              // console.log(e)
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
        lineAppendWidth: 10
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
    // edge.toFront()
    let sModel = edge.get('sourceNode').get('model');
    let model = edge.get('model');
    let newModel = {
      sourceAnchor: sourceAnchor,
      targetAnchor: targetAnchor
    }
    // 方向必须是输出到输入，否则纠正
    if (sModel.anchorsInfo[sourceAnchor].inOut === 'in') {
      newModel = {
        sourceAnchor: targetAnchor,
        targetAnchor: sourceAnchor,
        source: model.target,
        target: model.source
      }
    }
    // 自循环
    if (model.type === 'loop') {
      newModel.type = 'polyline-more'
      newModel.canMove = 2
    }
    graph.updateItem(edge, newModel);
    // console.log(edge);
  });
  graph.on('afteritemrefresh',(e) => {
    // console.log('afteritemrefresh',e)
    let model = e.item.get('model')
    listener(model.id,model.isFocus)
  })
  graph.on('wheelzoom',(e) => {
    // console.log('wheelzoom',e)
    // e.stopPropagation();
    if (tooltip.value.style.display === 'block') tooltip.value.style.transform = `scale(${graph.getZoom()})`;
    graph.getNodes().forEach(el => {
      listener(el.get('id'))
    });
  })
  graph.on("node:mousedown", (evt) => {
    let id = evt.item.get('id');
    if (id !== 'line1' && id !== 'line2' && id !== 'line3') removeEdgeNode()
    if (evt.originalEvent.shiftKey) {
      evt.originalEvent.preventDefault()
      // console.log('node:mousedown')
      evt.item?.lock();
    }
    // isLeaveCanvas = false;
  });
  graph.on("node:dragstart", (evt) => {
    let id = evt.item.get('id');
    // console.log('dragStart',evt)
    if (id !== 'line1' && id !== 'line2' && id !== 'line3') {
      evt.item.get('edges').forEach(el=>{
        el.update({controlPoints:[]})
        // console.log('dragStart')
      })
    }
  });
  graph.on('node:drag',(e) => {
    e.stopPropagation();
    e.originalEvent.preventDefault()
  })
  graph.on('node:dragend',(e) => {
    e.originalEvent.preventDefault()
    // console.log(e)
    let model = e.item.get('model')
    if (lastPos && (model.id === 'line1' || model.id === 'line2' || model.id === 'line3')) {
      e.item.updatePosition(lastPos)
    }
  })
  graph.on("node:mouseup", (evt) => {
    if (evt.originalEvent.shiftKey) {
      evt.originalEvent.preventDefault()
      evt.item?.unlock();
    }

    // isLeaveCanvas = false;
  });
  graph.on('node:mouseenter',e => {
    // console.log('node:mouseenter',e)
    const target = e.target;
    if (target.get('name') === 'anchor-point') {
      let index = target.get("anchorPointIdx");
      let model = e.item.get('model')
      let anchor = model.anchorsInfo[index]
      if (anchor.evtVar === 'var') {
        // tooltip
        // let tooltipBox = document.getElementsByClassName('g6-tooltip');
        tooltip.value.innerHTML = anchor.type+'_'+anchor.arrSize
        let point = graph.getPointByCanvas(e.canvasX, e.canvasY)
        console.log(tooltip)
        tooltip.value.style.left = point.x + 'px';
        tooltip.value.style.top = (point.y+20) + 'px';
        tooltip.value.style.display = "block";
      }
    } else {
      console.log('mouseenter:none')
      // let tooltipBox = document.getElementsByClassName('g6-tooltip')
      tooltip.value.style.display = 'none'
    }
    let id = e.item.get('id')
    if (id === 'line1' || id === 'line2' || id === 'line3') {
      graph.update(id, {
        // 节点的样式
        style: {
          cursor: id === 'line2' ? 'n-resize' : 'w-resize'
        },
      });
    }
  })
  graph.on('node:mouseout',e => {
    // console.log('node:mouseout')
    // let tooltipBox = document.getElementsByClassName('g6-tooltip')
    // tooltip.value.style.display = 'none'
    let id = e.item.get('id')
    if (id === 'line1' || id === 'line2' || id === 'line3') {
      graph.update(id, {
        // 节点的样式
        style: {
          cursor: 'default'
        },
      });
    }
  })
  graph.on('node:mousemove',e => {
    // console.log('node:mouseenter',e)
    const target = e.target;
    if (target.get('name') === 'anchor-point') {
      let index = target.get("anchorPointIdx");
      let model = e.item.get('model')
      let anchor = model.anchorsInfo[index]
      if (anchor.evtVar === 'var') {
        // tooltip
        tooltip.value.innerHTML = anchor.type+'_'+anchor.arrSize
        let point = graph.getPointByCanvas(e.canvasX, e.canvasY)
        // console.log(tooltip)
        tooltip.value.style.left = point.x + 'px';
        tooltip.value.style.top = (point.y+20) + 'px';
        tooltip.value.style.display = "block";
      }
    } else {
      // console.log('mouseenter:none')
      tooltip.value.style.display = 'none'
    }
  })
  graph.on('node:dblclick',e => {
    // console.log('node:doubleclick',e)
  })
  graph.on('edge:click',(e) => {
    // console.log(e.item)
    let model = e.item.get('model')
    removeEdgeNode()
    if (model.canMove === 1) {
      addEdgeNode(e.item,1)
    } else if (model.canMove === 3 || model.canMove === 2) {
      addEdgeNode(e.item,1)
      addEdgeNode(e.item,2)
      addEdgeNode(e.item,3)
    }
  })
  graph.on('canvas:dragend',() => {
    // console.log('canvas:dragend')
    graph.getNodes().forEach(el => {
      listener(el.get('id'))
    });
  })
  graph.on("canvas:click", (evt) => {
    removeEdgeNode()
    // console.log(graph.getNodes())
  });
}
const pathToControlPoints = (path) => {
  let ret = []
  path.pop()
  path.shift()
  path.forEach(el => {
    ret.push({x:el[1],y:el[2]})
  })
  // console.log(ret)
  return ret
}
const removeEdgeNode = () => {
  if (graph.findById('line1')) graph.removeItem('line1')
  if (graph.findById('line2')) graph.removeItem('line2')
  if (graph.findById('line3')) graph.removeItem('line3')
}
const addEdgeNode = (edge,i) => {
  let path = edge.get('keyShape').attrs.path;
  let x,y,cursor
  switch (i) {
    case 1:
    case 3:
      x = path[i][1]
      y = path[i][2]+ (path[i+1][2]-path[i][2]) / 2
      cursor = 'w-resize'
      break;
    case 2:
      x = path[i][1]+ (path[i+1][1]-path[i][1]) / 2
      y = path[i][2]
      cursor = 'n-resize'
      break;
    default:
      break;
  }
  let node = {
    id:'line'+i,
    x:x,
    y:y,
    size: moveEdgeIconSize,
    type: 'rect',
    style: {
      fill:'#1E90FF',
      lineWidth:0,
      cursor: cursor
    },
    mapEdge: edge.get('id')
  }
  graph.addItem('node',node);
  // console.log(node)
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
    label: data.name,
    controlPoints: [],
    anchorDes:''
  };
  switch (data.type) {
    case 'project':
      node.inputEvt = getAnchorsName(data.info['input_events'],'text')
      node.outputEvt = getAnchorsName(data.info['output_events'],'text')
      node.inputVar = getAnchorsName(data.info.inputs,'text','type','arrayLength')
      node.outputVar = getAnchorsName(data.info.outputs,'text','type','arrayLength')
      break;
    case 'generic':
      node.inputEvt = getAnchorsName(data.info.InterfaceList.EventInputs?.Event,'Name')
      node.outputEvt = getAnchorsName(data.info.InterfaceList.EventOutputs?.Event,'Name')
      node.inputVar = getAnchorsName(data.info.InterfaceList.InputVars?.VarDeclaration,'Name','Type','ArraySize')
      node.outputVar = getAnchorsName(data.info.InterfaceList.OutputVars?.VarDeclaration,'Name','Type','ArraySize')
      break;
    default:
      break;
  }
  // console.log(node)
  graph.addItem("node", node);
  listener(node.id)
  dialogVisible_title.value = false;
}
const getAnchorsName = (arr,attr1,attr2,attr3) => {
  let ret = []
  if (arr != '' && arr != undefined) {
    arr.forEach(el => {
      let obj = {name:el[attr1]}
      if (attr2) {
        obj.type = el[attr2]
        obj.arrSize = el[attr3]
      }
      ret.push(obj)
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
    // graph.getContainer().style.cursor='n-resize'
    // graph.getContainer().style.setProperty('cursor','n-resize')
    // graph.getContainer().setAttribute("style", "cursor: n-resize;")
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
  .g6-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
    position: absolute;
    display: none
  }
  </style>