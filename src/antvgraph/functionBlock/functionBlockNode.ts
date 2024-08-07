import G6, {Graph} from "@antv/g6";
import type { FunctionBlock} from '@/api/functionBlock/type';
import { v4 as uuidv4 } from 'uuid';
import G6 from '@antv/g6';

// G6.Util.processParallelEdges processes the edges with same source node and target node,
// on this basis, processParallelEdgesOnAnchorPoint consider the end nodes and anchor points in the same time.
export const processParallelEdgesOnAnchorPoint = (
    edges,
    offsetDiff = 15,
    multiEdgeType = 'quadratic',
    singleEdgeType = 'quadratic',
    loopEdgeType = undefined
) => {
    const len = edges.length;
    const cod = offsetDiff * 2;
    const loopPosition = [
        'top',
        'top-right',
        'right',
        'bottom-right',
        'bottom',
        'bottom-left',
        'left',
        'top-left',
    ];
    const edgeMap = {};
    const tags = [];
    const reverses = {};
    for (let i = 0; i < len; i++) {
        const edge = edges[i];
        const { source, target, sourceAnchor, targetAnchor } = edge;
        const sourceTarget = `${source}|${sourceAnchor}-${target}|${targetAnchor}`;

        if (tags[i]) continue;
        if (!edgeMap[sourceTarget]) {
            edgeMap[sourceTarget] = [];
        }
        tags[i] = true;
        edgeMap[sourceTarget].push(edge);
        for (let j = 0; j < len; j++) {
            if (i === j) continue;
            const sedge = edges[j];
            const { source: src, target: dst, sourceAnchor: srcAnchor, targetAnchor: dstAnchor } = sedge;

            // 两个节点之间共同的边
            // 第一条的source = 第二条的target
            // 第一条的target = 第二条的source
            if (!tags[j]) {
                if (source === dst && sourceAnchor === dstAnchor
                    && target === src && targetAnchor === srcAnchor) {
                    edgeMap[sourceTarget].push(sedge);
                    tags[j] = true;
                    reverses[`${src}|${srcAnchor}|${dst}|${dstAnchor}|${edgeMap[sourceTarget].length - 1}`] = true;
                } else if (source === src && sourceAnchor === srcAnchor
                    && target === dst  && targetAnchor === dstAnchor) {
                    edgeMap[sourceTarget].push(sedge);
                    tags[j] = true;
                }
            }
        }
    }

    for (const key in edgeMap) {
        const arcEdges = edgeMap[key];
        const { length } = arcEdges;
        for (let k = 0; k < length; k++) {
            const current = arcEdges[k];
            if (current.source === current.target) {
                if (loopEdgeType) current.type = loopEdgeType;
                // 超过8条自环边，则需要重新处理
                current.loopCfg = {
                    position: loopPosition[k % 8],
                    dist: Math.floor(k / 8) * 20 + 50,
                };
                continue;
            }
            if (length === 1 && singleEdgeType && (current.source !== current.target || current.sourceAnchor !== current.targetAnchor)&&!current.target.startsWith('alg')) {
                current.type = singleEdgeType;
                continue;
            }
            current.type = multiEdgeType;
            const sign =
                (k % 2 === 0 ? 1 : -1) * (reverses[`${current.source}|${current.sourceAnchor}|${current.target}|${current.targetAnchor}|${k}`] ? -1 : 1);
            if (length % 2 === 1) {
                current.curveOffset = sign * Math.ceil(k / 2) * cod;
            } else {
                current.curveOffset = sign * (Math.floor(k / 2) * cod + offsetDiff);
            }
        }
    }
    return edges;
};


// const data = {
//   nodes: [
//     { id: 'node1', x: 350, y: 100 },
//     { id: 'node2', x: 350, y: 250 },
//   ],
// };
G6.registerNode('rect-node', {
    // draw anchor-point circles according to the anchorPoints in afterDraw
    afterDraw(cfg, group) {
        const bbox = group.getBBox();
        const anchorPoints = this.getAnchorPoints(cfg)
        anchorPoints.forEach((anchorPos, i) => {
            group.addShape('circle', {
                attrs: {
                    r: 5,
                    x: bbox.x + bbox.width * anchorPos[0],
                    y: bbox.y + bbox.height * anchorPos[1],
                    fill: '#fff',
                    stroke: '#5F95FF'
                },
                // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
                name: `anchor-point`, // the name, for searching by group.find(ele => ele.get('name') === 'anchor-point')
                anchorPointIdx: i, // flag the idx of the anchor-point circle
                links: 0, // cache the number of edges connected to this shape
                visible: false, // invisible by default, shows up when links > 1 or the node is in showAnchors state
            })
        })
    },
    getAnchorPoints(cfg) {
        return cfg.anchorPoints || [[0, 0.5], [0.33, 0], [0.66, 0], [1, 0.5], [0.33, 1], [0.66, 1]];
    },
    // response the state changes and show/hide the link-point circles
    // setState(name, value, item) {
    //   if (name === 'showAnchors') {
    //     const anchorPoints = item.getContainer().findAll(ele => ele.get('name') === 'anchor-point');
    //     anchorPoints.forEach(point => {
    //       if (value || point.get('links') > 0) point.show()
    //       else point.hide()
    //     })
    //   }
    // }
}, 'rect')
/**
 * 设置连接点显示隐藏
 */
export const setLinkState=((item,value)=>{
    const anchorPoints = item.getContainer().findAll(ele => ele.get('name') === 'anchor-point');
    anchorPoints.forEach(point => {
        if (value || point.get('links') > 0) point.show()
        else point.hide()
    })
});

export const updateGraphNode=((functionBlock:FunctionBlock,graph:Graph)=>{

});
// let blockSide = 10;
// let sourceAnchorIdx, targetAnchorIdx;
// //得到上面事件的最大数量和下面参数的最大数量
// const getNodeIndex=(topLength,buttomLength,x,y)=>{
//
// }
// function getEventAndParamMaxNum(cfg) {
//     let eventInputNum = cfg.eventInput ? cfg.eventInput.length : 0; //输入事件数量
//     let eventOutputNum = cfg.eventOutput ? cfg.eventOutput.length : 0; //输出事件数量
//     let eventMaxNum =
//         eventInputNum > eventOutputNum ? eventInputNum : eventOutputNum; //事件数量取最大值，用于计算需要把整个框撑起多大
//     let paramInputNum = cfg.paramInput ? cfg.paramInput.length : 0; //输入参数数量
//     let paramOutputNum = cfg.paramOutput ? cfg.paramOutput.length : 0; //输出参数数量
//     let paramMaxNum =
//         paramInputNum > paramOutputNum ? paramInputNum : paramOutputNum; //参数数量取最大值，用于计算需要把整个框撑起多大
//     if (eventMaxNum <= 5) {
//         eventMaxNum = 5;
//     }
//     if (paramMaxNum <= 5) {
//         paramMaxNum = 5;
//     }
//     return { eventMaxNum, paramMaxNum };
// }
// G6.registerNode("functionBlockShape", {
//     /*
//         用req/res的正方形为一个block。初始为上面10个block,当中固定2个block。下面10个block。由于连接点是按比例算的，所以用block方式方便计算和图形的对齐,
//         高度计算必须用block，宽度随意，
//         高度计算必须从最上面向下拼，或最下面向上拼
//         上部：空一个block的高度，接一个真实block。当实际block长度大于等于5个时，需要扩展
//         下部：空一个block的高度，接一个真实block。当实际block长度大于等于5个时，需要扩展
//     */
//     draw(cfg, group) {
//         const width = 200;
//         let { eventMaxNum, paramMaxNum } = getEventAndParamMaxNum(cfg);
//         const height = (2 * (eventMaxNum + paramMaxNum) + 2) * blockSide;
//         // 如果 cfg 中定义了 style 需要同这里的属性进行融合
//         const keyShape = group.addShape("path", {
//             attrs: {
//                 path: this.getPath(cfg), // 根据配置获取路径
//                 stroke: cfg.color, // 颜色应用到描边上，如果应用到填充，则使用 fill: cfg.color
//             },
//             // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
//             name: "path-shape",
//             // 设置 draggable 以允许响应鼠标的图拽事件
//             draggable: true,
//         });
//         //这是rect底板，用于拖动和选中
//         group.addShape("rect", {
//             // attrs: style
//             attrs: {
//                 width: width,
//                 height: height,
//                 x: -width / 2 ,
//                 y:-height/2,
//                 fill: "#666",
//                 opacity:0 //要全透明，好像没有这个底板一样
//             },
//             // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
//             name: "all-shape" ,
//             // 设置 draggable 以允许响应鼠标的图拽事件
//             draggable: true,
//         });
//         group.addShape("text", {
//             // attrs: style
//             attrs: {
//                 x: 0, // 居中
//                 y: 0,
//                 textAlign: "center",
//                 textBaseline: "middle",
//                 text: cfg.centerText,
//                 fill: "#666",
//             },
//             name: "text-middle-shape",
//         });
//         cfg.eventInput?.forEach((element, index) => {
//             const eventInputHeight = -height / 2 + index * blockSide * 2 + blockSide;
//             group.addShape("rect", {
//                 attrs: {
//                     width: blockSide,
//                     height: blockSide,
//                     x: -width / 2, //输入的在最左侧，X轴不动
//                     y: eventInputHeight,
//                     fill: "#666",
//                     fontSize: 18,
//                     position: "bottom",
//                 },
//                 // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
//                 name: "rect-shape" + index,
//                 // 设置 draggable 以允许响应鼠标的图拽事件
//                 draggable: true,
//             });
//             group.addShape("text", {
//                 // attrs: style
//                 attrs: {
//                     width: 20,
//                     height: 20,
//                     x: -width / 2 + 20, //输入的在最左侧，X轴不动
//                     y: eventInputHeight + blockSide, //文字是以起始位置为开始，所以在y轴上要加上一个block的高度
//                     text: cfg.eventInput ? cfg.eventInput[index] : "",
//                     fontSize: 8,
//                     fill: "#666",
//                 },
//                 // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
//                 name: "text-shape" + index,
//                 // 设置 draggable 以允许响应鼠标的图拽事件
//                 draggable: true,
//             });
//         });
//         cfg.eventOutput?.forEach((element, index) => {
//             const eventOutputHeight = -height / 2 + index * blockSide * 2 + blockSide;
//             group.addShape("rect", {
//                 attrs: {
//                     width: blockSide,
//                     height: blockSide,
//                     x: width / 2 - blockSide, //输入的在最左侧，X轴不动
//                     y: eventOutputHeight,
//                     fill: "#666",
//                     fontSize: 18,
//                     position: "bottom",
//                 },
//                 // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
//                 name: "rect-shape" + index,
//                 // 设置 draggable 以允许响应鼠标的图拽事件
//                 draggable: true,
//             });
//             group.addShape("text", {
//                 // attrs: style
//                 attrs: {
//                     width: 20,
//                     height: 20,
//                     x: width / 2 - blockSide - 40, //输入的在最左侧，X轴不动
//                     y: eventOutputHeight + blockSide, //文字是以起始位置为开始，所以在y轴上要加上一个block的高度
//                     text: cfg.eventOutput ? cfg.eventOutput[index] : "",
//                     fontSize: 8,
//                     fill: "#666",
//                 },
//                 // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
//                 name: "text-shape" + index,
//                 // 设置 draggable 以允许响应鼠标的图拽事件
//                 draggable: true,
//             });
//         });
//         cfg.paramInput?.forEach((element, index) => {
//             const startPosition = height / 2 - paramMaxNum * blockSide * 2; //从最下面开始减去所有的参数块就是开始位置
//             const paramInputHeight =
//                 startPosition + index * blockSide * 2 + blockSide;
//             group.addShape("rect", {
//                 attrs: {
//                     width: blockSide,
//                     height: blockSide,
//                     x: -width / 2, //输入的在最左侧，X轴不动
//                     y: paramInputHeight,
//                     fill: "#666",
//                     fontSize: 18,
//                     position: "bottom",
//                 },
//                 // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
//                 name: "rect-shape" + index,
//                 // 设置 draggable 以允许响应鼠标的图拽事件
//                 draggable: true,
//             });
//             group.addShape("text", {
//                 // attrs: style
//                 attrs: {
//                     width: 20,
//                     height: 20,
//                     x: -width / 2 + 20, //输入的在最左侧，X轴不动
//                     y: paramInputHeight + blockSide, //文字是以起始位置为开始，所以在y轴上要加上一个block的高度
//                     text: cfg.paramInput ? cfg.paramInput[index] : "",
//                     fontSize: 8,
//                     fill: "#666",
//                 },
//                 // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
//                 name: "text-shape" + index,
//                 // 设置 draggable 以允许响应鼠标的图拽事件
//                 draggable: true,
//             });
//         });
//         cfg.paramOutput?.forEach((element, index) => {
//             const startPosition = height / 2 - paramMaxNum * blockSide * 2; //从最下面开始减去所有的参数块就是开始位置
//             const paramOutputHeight =
//                 startPosition + index * blockSide * 2 + blockSide;
//             group.addShape("rect", {
//                 attrs: {
//                     width: blockSide,
//                     height: blockSide,
//                     x: width / 2 - blockSide, //输入的在最左侧，X轴不动
//                     y: paramOutputHeight,
//                     fill: "#666",
//                     fontSize: 18,
//                     position: "bottom",
//                 },
//                 // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
//                 name: "rect-shape" + index,
//                 // 设置 draggable 以允许响应鼠标的图拽事件
//                 draggable: true,
//             });
//             group.addShape("text", {
//                 // attrs: style
//                 attrs: {
//                     width: 20,
//                     height: 20,
//                     x: width / 2 - blockSide - 40, //输入的在最左侧，X轴不动
//                     y: paramOutputHeight + blockSide, //文字是以起始位置为开始，所以在y轴上要加上一个block的高度
//                     text: cfg.paramOutput ? cfg.paramOutput[index] : "",
//                     fontSize: 8,
//                     fill: "#666",
//                 },
//                 // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
//                 name: "text-shape" + index,
//                 // 设置 draggable 以允许响应鼠标的图拽事件
//                 draggable: true,
//             });
//         });
//         group.addShape("text", {
//             attrs: {
//                 width: 20,
//                 height: 20,
//                 x: -width/2+80 ,
//                 y: -height/2,
//                 text:cfg.title,
//                 fill: "#666",
//                 fontSize: 12,
//             },
//             // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
//             name: "title",
//         });
//         // group.addShape("text", {
//         //     // attrs: style
//         //     attrs: {
//         //         width: 20,
//         //         height: 20,
//         //         x: -width/2+80 ,
//         //         y: height/2+30,
//         //         text:cfg.controller,
//         //         fill: "#666",
//         //         fontSize: 12,
//         //     },
//         //     // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
//         //     name: "bottom",
//         // });
//         return keyShape;
//     },
//     // 返回路径，如果事件大于等于5个，需要扩展高度，如果参数大于6个需要扩展高度。
//     getPath(cfg) {
//         let { eventMaxNum, paramMaxNum } = getEventAndParamMaxNum(cfg);
//         const width = 200;
//         const height = (2 * (eventMaxNum + paramMaxNum) + 2) * blockSide;
//         const path = [
//             ["M", -width / 2, -height / 2],
//             ["L", width / 2, -height / 2],
//             ["L", width / 2, -height / 2 + 2 * eventMaxNum * blockSide],
//             [
//                 "L",
//                 width / 2 - blockSide * 2,
//                 -height / 2 + 2 * eventMaxNum * blockSide,
//             ],
//             [
//                 "L",
//                 width / 2 - blockSide * 2,
//                 -height / 2 + 2 * eventMaxNum * blockSide + 2 * blockSide,
//             ],
//             [
//                 "L",
//                 width / 2,
//                 -height / 2 + 2 * eventMaxNum * blockSide + 2 * blockSide,
//             ],
//             ["L", width / 2, height / 2],
//             ["L", -width / 2, height / 2],
//             [
//                 "L",
//                 -width / 2,
//                 -height / 2 + 2 * eventMaxNum * blockSide + 2 * blockSide,
//             ],
//             [
//                 "L",
//                 -width / 2 + blockSide * 2,
//                 -height / 2 + 2 * eventMaxNum * blockSide + 2 * blockSide,
//             ],
//             [
//                 "L",
//                 -width / 2 + blockSide * 2,
//                 -height / 2 + 2 * eventMaxNum * blockSide,
//             ],
//             ["L", -width / 2, -height / 2 + 2 * eventMaxNum * blockSide],
//             ["Z"], // 封闭
//         ];
//         return path;
//     },
//     getAnchorPoints(cfg) {
//         let { eventMaxNum, paramMaxNum } = getEventAndParamMaxNum(cfg);
//         let partNum = 2 * (eventMaxNum + paramMaxNum) + 2; //一共多少个block
//         let eventInputNum = cfg.eventInput ? cfg.eventInput.length : 0; //输入事件数量
//         let eventOutputNum = cfg.eventOutput ? cfg.eventOutput.length : 0; //输出事件数量
//         let paramInputNum = cfg.paramInput ? cfg.paramInput.length : 0; //输入参数数量
//         let paramOutputNum = cfg.paramOutput ? cfg.paramOutput.length : 0; //输出参数数量
//         let anchorPointsArr = [];
//         let paramStart = partNum - eventMaxNum * 2;
//         for (let i = 0; i < eventInputNum; i++) {
//             //分子为2n+1，再加0.5是为了居中
//             anchorPointsArr.push([0, (2 * i + 1.5) / partNum]);
//         }
//         for (let i = 0; i < eventOutputNum; i++) {
//             anchorPointsArr.push([1, (2 * i + 1.5) / partNum]);
//         }
//         for (let i = 0; i < paramInputNum; i++) {
//             anchorPointsArr.push([0, (paramStart + 2 * i + 1.5) / partNum]);
//         }
//         for (let i = 0; i < paramOutputNum; i++) {
//             anchorPointsArr.push([1, (paramStart + 2 * i + 1.5) / partNum]);
//         }
//         return anchorPointsArr;
//     },
//     //画连接点
//     afterDraw(cfg, group) {
//         const bbox = group.getBBox();
//         const anchorPoints = this.getAnchorPoints(cfg);
//         anchorPoints.forEach((anchorPos, i) => {
//             group.addShape("circle", {
//                 attrs: {
//                     r: 5,
//                     x: bbox.x + bbox.width * anchorPos[0],
//                     y: bbox.y + bbox.height * anchorPos[1],
//                     fill: "#fff",
//                     stroke: "#5F95FF",
//                 },
//                 // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
//                 name: `anchor-point`, // the name, for searching by group.find(ele => ele.get('name') === 'anchor-point')
//                 anchorPointIdx: i, // flag the idx of the anchor-point circle
//                 links: 0, // cache the number of edges connected to this shape
//                 visible: false, // invisible by default, shows up when links > 1 or the node is in showAnchors state
//                 draggable: true, // allow to catch the drag events on this shape
//             });
//         });
//     },
//     // 显示隐藏连接点
//     setState(name, value, item) {
//         if (name === "showAnchors") {
//             const anchorPoints = item
//                 .getContainer()
//                 .findAll((ele) => ele.get("name") === "anchor-point");
//             anchorPoints.forEach((point) => {
//                 if (value || point.get("links") > 0) point.show();
//                 else point.hide();
//             });
//         }
//     },
// },
// 'single-node'
// );
//
// export const initGraph=((plugins)=> {
//     let graph = new G6.Graph({
//         container: "container",
//         width: 1300,
//         height: 1500,
//         plugins: [plugins],
//         defaultEdge: {
//             type: "quadratic",
//             style: {
//                 stroke: "#F6BD16",
//                 lineWidth: 2,
//             },
//         },
//         modes: {
//             default: [
//                 // 'drag-canvas',
//                 'click-select',
//                 'drag-edge',
//                 // config the shouldBegin for drag-node to avoid node moving while dragging on the anchor-point circles
//                 {
//                     type: "drag-node",
//                     shouldBegin: (e) => {
//                         if (e.target.get("name") === "anchor-point") return false;
//                         return true;
//                     },
//                 },
//                 // config the shouldBegin and shouldEnd to make sure the create-edge is began and ended at anchor-point circles
//                 {
//                     type: "create-edge",
//                     trigger: "drag", // set the trigger to be drag to make the create-edge triggered by drag
//                     shouldBegin: (e) => {
//                         // avoid beginning at other shapes on the node
//                         if (e.target && e.target.get("name") !== "anchor-point")
//                             return false;
//                         sourceAnchorIdx = e.target.get("anchorPointIdx");
//                         e.target.set("links", e.target.get("links") + 1); // cache the number of edge connected to this anchor-point circle
//                         return true;
//                     },
//                     shouldEnd: (e) => {
//                         // avoid ending at other shapes on the node
//                         if (e.target && e.target.get("name") !== "anchor-point")
//                             return false;
//                         if (e.target) {
//                             targetAnchorIdx = e.target.get("anchorPointIdx");
//                             e.target.set("links", e.target.get("links") + 1); // cache the number of edge connected to this anchor-point circle
//                             return true;
//                         }
//                         targetAnchorIdx = undefined;
//                         return true;
//                     },
//                 },
//             ],
//         },
//     });
//     graph.on("aftercreateedge", (e) => {
//         // update the sourceAnchor and targetAnchor for the newly added edge
//         graph.updateItem(e.edge, {
//             sourceAnchor: sourceAnchorIdx,
//             targetAnchor: targetAnchorIdx,
//         });
//     });
//     // after drag from the first node, the edge is created, update the sourceAnchor
//     graph.on("afteradditem", (e) => {
//         if (e.item && e.item.getType() === "edge") {
//             graph.updateItem(e.item, {
//                 sourceAnchor: sourceAnchorIdx,
//             });
//         }
//     });
//
//     // if create-edge is canceled before ending, update the 'links' on the anchor-point circles
//     graph.on("afterremoveitem", (e) => {
//         if (e.item && e.item.source && e.item.target) {
//             const sourceNode = graph.findById(e.item.source);
//             const targetNode = graph.findById(e.item.target);
//             const { sourceAnchor, targetAnchor } = e.item;
//             if (sourceNode && !isNaN(sourceAnchor)) {
//                 const sourceAnchorShape = sourceNode
//                     .getContainer()
//                     .find(
//                         (ele) =>
//                             ele.get("name") === "anchor-point" &&
//                             ele.get("anchorPointIdx") === sourceAnchor
//                     );
//                 sourceAnchorShape.set("links", sourceAnchorShape.get("links") - 1);
//             }
//             if (targetNode && !isNaN(targetAnchor)) {
//                 const targetAnchorShape = targetNode
//                     .getContainer()
//                     .find(
//                         (ele) =>
//                             ele.get("name") === "anchor-point" &&
//                             ele.get("anchorPointIdx") === targetAnchor
//                     );
//                 targetAnchorShape.set("links", targetAnchorShape.get("links") - 1);
//             }
//         }
//     });
//
//     // some listeners to control the state of nodes to show and hide anchor-point circles
//     graph.on("node:mouseenter", (e) => {
//         graph.setItemState(e.item, "showAnchors", true);
//     });
//     graph.on("node:mouseleave", (e) => {
//         graph.setItemState(e.item, "showAnchors", false);
//     });
//     graph.on("node:dragenter", (e) => {
//         graph.setItemState(e.item, "showAnchors", true);
//     });
//     graph.on("node:dragleave", (e) => {
//         graph.setItemState(e.item, "showAnchors", false);
//     });
//     graph.on("node:dragstart", (e) => {
//         graph.setItemState(e.item, "showAnchors", true);
//     });
//     graph.on("node:dragout", (e) => {
//         graph.setItemState(e.item, "showAnchors", false);
//     });
//     graph.get('canvas').set('localRefresh', false)
//     return graph;
// });
//
// /**
//  * 新建图形节点
//  */
// export const createGraphNode=((functionBlock:FunctionBlock,graph:Graph)=>{
//     const node={
//         id:uuidv4(),
//         type:'functionBlockShape',
//         eventInput:functionBlock.input_events,
//         eventOutput:functionBlock.output_events,
//         paramInput:functionBlock.inputs,
//         paramOutput:functionBlock.outputs,
//         x:functionBlock.x,
//         y:functionBlock.y,
//         title:functionBlock.title,
//         centerText:functionBlock.centerText,
//         device:functionBlock.device,
//         color:"red",
//     }
//     graph.addItem('node',node)
// });
// //更新图形
// export const updateGraphNode=((functionBlock:FunctionBlock,graph:Graph)=>{
//     let originNode=graph.findById(functionBlock.raw_id);
//     let originModel=originNode.getModel();
//     // graph.removeItem(originNode);
//     const node={
//         id:functionBlock.raw_id,
//         type:'functionBlockShape',
//         eventInput:functionBlock.input_events,
//         eventOutput:functionBlock.output_events,
//         paramInput:functionBlock.inputs,
//         paramOutput:functionBlock.outputs,
//         x:originModel.x,
//         y:originModel.y,
//         title:originModel.title,
//         centerText:originModel.centerText,
//         device:originModel.device,
//         color:"red",
//     }
//     const item=graph.findById(functionBlock.raw_id);
//     item.update(node)
// });
// export const updateGraphNodeController=((functionBlock:FunctionBlock,graph:Graph)=>{
//     let originNode=graph.findById(functionBlock.raw_id);
//     let originModel=originNode.getModel();
//     graph.removeItem(originNode);
//     const node={
//         id:functionBlock.raw_id,
//         type:'functionBlockShape',
//         eventInput:originModel.input_events,
//         eventOutput:originModel.output_events,
//         paramInput:originModel.inputs,
//         paramOutput:originModel.outputs,
//         x:originModel.x,
//         y:originModel.y,
//         title:originModel.title,
//         centerText:originModel.centerText,
//         device:originModel.device,
//         color:"red",
//         controller:functionBlock.controller.text
//     }
//     graph.addItem('node',node)
// });