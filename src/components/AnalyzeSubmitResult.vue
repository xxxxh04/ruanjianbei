<template>
  <div class="analyzer-data-view">
    <!-- <el-container>
      <el-header>提交结果</el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="8" class="analyzer-data-label">
            <div class="grid-content ep-bg-purple">
              <span>运行超时</span>
            </div>
          </el-col>
          <el-col :span="16" class="analyzer-data-value">
            <div class="grid-content ep-bg-purple">
              <span>{{ count.timeOut }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" class="analyzer-data-label">
            <div class="grid-content ep-bg-purple">
              <span>答案正确</span>
            </div>
          </el-col>
          <el-col :span="16" class="analyzer-data-value">
            <div class="grid-content ep-bg-purple">
              <span>{{ count.correct }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" class="analyzer-data-label">
            <div class="grid-content ep-bg-purple">
              <span>内存超限</span>
            </div>
          </el-col>
          <el-col :span="16" class="analyzer-data-value">
            <div class="grid-content ep-bg-purple">
              <span>{{ count.outOfMem }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" class="analyzer-data-label">
            <div class="grid-content ep-bg-purple">
              <span>编译错误</span>
            </div>
          </el-col>
          <el-col :span="16" class="analyzer-data-value">
            <div class="grid-content ep-bg-purple">
              <span>{{ count.complieErr }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" class="analyzer-data-label">
            <div class="grid-content ep-bg-purple">
              <span>其他</span>
            </div>
          </el-col>
          <el-col :span="16" class="analyzer-data-value">
            <div class="grid-content ep-bg-purple">
              <span>{{ count.other }}</span>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container> -->
    <div class="chart" id="result"></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import * as echarts from "echarts";
// const count = reactive({
//   timeOut: 123,
//   correct: 114,
//   outOfMem: 514,
//   complieErr: 1919,
//   other: 810,
// });

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
