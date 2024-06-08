<template>
  <div class="analyzer-data-view">
    <!-- <el-header>代码分析(由AI生成)</el-header>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="tag" width="180" />
      <el-table-column prop="value" label="count" width="180" />
    </el-table> -->
    <div id="codeAnalys" class="chart"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted } from "vue";
const tableData = [
  {
    name: "函数参数默认值位置错误",
    value: 114,
  },
  {
    name: "忘记添加分号",
    value: 514,
  },
  {
    name: "只声明不实现",
    value: 1919,
  },
  {
    name: "内存泄漏",
    value: 810,
  },
  {
    name: "数组越界",
    value: 467,
  },
  {
    name: "类型转换问题",
    value: 25,
  },
  {
    name: "循环条件错误",
    value: 911,
  },
  {
    name: "函数调用顺序错误",
    value: 1437,
  },
  {
    name: "占位符1",
    value: 138,
  },
];
const names = tableData.map((item) => item.name);
console.log(names);

function setChart() {
  type EChartsOption = echarts.EChartsOption;
  var chartDom = document.getElementById("codeAnalys")!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  option = {
    title: {
      text: "代码分析",
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
        name: "代码分析",
        type: "pie",
        radius: [20, 140],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 5,
        },
        data: tableData,
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
.chart {
  height: 500px;
  width: 500px;
}
</style>
