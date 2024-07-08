<template>
  <div class="analyzer-data-view">
    <div class="chart" id="result"></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import * as echarts from "echarts";
const count = reactive([
  { name: "timeOut", value: 123 },
  { name: "correct", value: 114 },
  { name: "outOfMem", value: 514 },
  { name: "complieErr", value: 1919 },
  { name: "other", value: 810 },
]);
function setChart() {
  type EChartsOption = echarts.EChartsOption;
  var chartDom = document.getElementById("result")!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  option = {
    title: {
      text: "提交结果",
      subtext: "AI生成",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "提交结果",
        type: "pie",
        radius: [20, 140],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 5,
        },
        data: count,
      },
    ],
  };
  option && myChart.setOption(option);
}
onMounted(() => {
  setChart();
});
</script>

<style>
@import "../assets/AnalyzerDataComponents.css";
.chart {
  height: 500px;
  width: 500px;
}
</style>
