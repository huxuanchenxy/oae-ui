<template>
  <div
    id="echarsMain-Line"
    :style="{ width: lineWidth + 'px', height: lineHeight + 'px' }"
  ></div>
</template>
<script setup>
import * as echarts from "echarts";
import api from "@/api/reportApi";
import { onMounted, ref, watch } from "vue";
import { CusElLoading } from "@/jslib/common";
let lineHeight = ref(1);
let lineWidth = ref(1);
let xData = ref([]);
let yData = ref([]);
let allData = ref([]);
const getPageSize = () => {
  lineHeight.value =
    (window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight) - 300;
  lineWidth.value =
    (window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth) - 100;
};

onMounted(async () => {
  let cusLoading = CusElLoading("数据加载中……");
  getPageSize();
  let objListReq = {
    currentYear: "2022",
    salesUnit: "",
    projectName: "",
    pageSize: 15,
    pageIndex: 1,
    isExport: 2,
  };
  let strRequest = JSON.stringify(objListReq);
  let params = {
    strRequest,
  };
  await api.getTHLQHJTList(params).then((res) => {
    //console.log("list--res----0---", res);
    allData.value = res;
    res.forEach((obj) => {
      xData.value.push(obj.salesUnit ? obj.salesUnit : 0);
      yData.value.push(obj.completedAmount ? obj.completedAmount : 0);
    });
    cusLoading.close();
  });

  window.onresize = () => {
    return (() => {
      getPageSize();
      myChart.resize({
        width: lineWidth.value,
        height: lineHeight.value,
      });
    })();
  };
  var chartDom = document.getElementById("echarsMain-Line");
  var myChart = echarts.init(chartDom);

  myChart.resize({
    width: lineWidth.value,
    height: lineHeight.value,
  });

  const option = {
    title: {
      text: "江苏通和沥青混凝土有限公司-2022年度应收款明细",
      left: 1,
    },
    toolbox: {
      show: true,
      orient: "horizontal", //工具栏 icon 的布局朝向'horizontal' 'vertical'
      itemSize: 12, //工具栏 icon 的大小
      //itemGap: 10, //工具栏 icon 每项之间的间隔
      showTitle: true,
      feature: {
        //dataView: { show: true, readOnly: false },
        mark: {
          // '辅助线开关'
          show: true,
        },
        // dataView: {
        //   //数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新
        //   show: true, //是否显示该工具。
        //   title: "数据视图",
        //   readOnly: false, //是否不可编辑（只读）
        //   lang: ["数据视图", "关闭", "刷新"], //数据视图上有三个话术，默认是['数据视图', '关闭', '刷新']
        //   backgroundColor: "#fff", //数据视图浮层背景色。
        //   textareaColor: "#fff", //数据视图浮层文本输入区背景色
        //   textareaBorderColor: "#333", //数据视图浮层文本输入区边框颜色
        //   textColor: "#000", //文本颜色。
        //   buttonColor: "#c23531", //按钮颜色。
        //   buttonTextColor: "#fff", //按钮文本颜色。
        // },
        magicType: { show: true, type: ["line", "bar"] },
        //restore: { show: true },
        saveAsImage: { show: true },
      },
      zlevel: 0, //所属图形的Canvas分层，zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
      z: 2, //所属组件的z分层，z值小的图形会被z值大的图形覆盖
      //left: "center", //组件离容器左侧的距离,'left', 'center', 'right','20%'
      //top: "top", //组件离容器上侧的距离,'top', 'middle', 'bottom','20%'
      right: "10%", //组件离容器右侧的距离,'20%'
      bottom: "auto", //组件离容器下侧的距离,'20%'
      width: "auto", //图例宽度
      height: "auto", //图例高度
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params) {
        //console.log(params);
        var result = "";
        var existArray = allData.value.filter((obj) => {
          return (
            obj.salesUnit == params[0].axisValue &&
            obj.completedAmount == params[0].data
          );
        });
        //console.log("existArray,", existArray);

        let payAmount =
          existArray != null && existArray.length > 0
            ? existArray[0].payAmount
            : 0;
        let payNoAmount =
          existArray != null && existArray.length > 0
            ? existArray[0].payNoAmount
            : 0;
        var dotHtml =
          '<span style="display:inline-block;padding:5px; margin:0 0 0 15px;  height:30px; line-height:30px; ">  '; // 定义第一个数据前的圆点颜色
        var dotHtml2 =
          '<span style="display:inline-block;padding:5px;margin:5px 0 5px 15px;  height:30px; line-height:30px; ">'; // 定义第二个数据前的圆点颜色

        result +=
          '<span style="display:inline-block;padding:5px;  height:30px; line-height:30px;font-weight:bold;">' +
          params[0].axisValue +
          "</span></br>" +
          dotHtml +
          "已完成金额:<b style='font-size:16px;color:#67C23A'>" +
          params[0].data +
          "￥</b></span></br>" +
          dotHtml2 +
          " 已收款:<b style='font-size:16px;color:#67C23A'>" +
          payAmount +
          "￥</b></span></br>" +
          dotHtml +
          "欠款:<b style='font-size:16px;color:#F56C6C;'>" +
          payNoAmount +
          "￥</b></span><br/>";
        return result;
      },
    },
    grid: {
      bottom: 70,
    },
    xAxis: {
      type: "category",

      silent: false,
      // splitLine: {
      //   show: true,
      // },
      // splitArea: {
      //   show: true,
      // },
      inside: false,
      data: xData.value,
      // axisLabel: {
      //   interval: 0,
      // },
    },
    yAxis: {
      type: "value",
      //inverse: false,
      //type: "category",
      name: "已完成金额（元）",
      position: "left",
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: "#000",
        },
      },
      axisLabel: {
        show: true,
        fontSize: 12,
        //formatter: "{value} 元",
        //align: "center",
        // rich: {
        //   flag: {
        //     fontSize: 25,
        //     padding: 5,
        //   },
        // },
      },

      splitLine: { show: true },
    },
    series: [
      {
        // data: [
        //   120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130, 120,
        //   200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130,
        // ],
        data: yData.value,
        type: "bar",
        //showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
    dataZoom: [
      {
        type: "inside",
        start: 0, // 数据窗口范围的起始百分比。范围是：0~100, 表示0%~100%同下
        end: 5, // 数据窗口范围的结束百分比。范围是：0~100
        startValue: "", // 范围的起始数值，若设置了inside.start则失效
        endValue: "", // 范围的结束数值，若设置了inside.end则失效
      },
      {
        type: "slider",
      },
    ],
  };
  // 绘制图表
  option && myChart.setOption(option);
});

watch(
  () => lineHeight,
  (val) => {
    lineHeight.value = val;
  },
  () => lineWidth,
  (val) => {
    lineWidth.value = val;
  },
  () => xData,
  (val) => {
    xData.value = val;
  },
  () => yData,
  (val) => {
    yData.value = val;
  }
);
</script>
