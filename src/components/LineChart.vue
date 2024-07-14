<template>
    <!-- 图表容器 -->
    <div>
      <!-- 使用 vue-echarts 的 v-chart 组件来渲染 ECharts 图表 -->
      <v-chart :option="chartOption" style="width: 100%; height: 400px;"></v-chart>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  // 引入 ECharts 核心包
  import * as echarts from 'echarts';
  // 引入必要的 ECharts 组件
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { LineChart } from 'echarts/charts';
  import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
  // 引入 vue-echarts 组件
  import VChart from 'vue-echarts';
  
  // 注册 ECharts 需要的组件
  use([
    CanvasRenderer,
    LineChart,
    GridComponent,
    TooltipComponent,
    LegendComponent
  ]);
  
  // 定义图表配置选项
  const chartOption = ref({
    title: {
      text: '学习记录', // 图表标题
      left: '10%' ,// 设置标题的左边距为 20%
      top:'2%',
    },
    tooltip: {
      trigger: 'axis' // 设置提示框触发类型为坐标轴触发
    },
    legend: {
      data: ['销量'] // 图例数据
    },
    xAxis: {
      type: 'category', // x 轴类型为类目型
      data: ['2024-1', '2024-2', '2024-3', '2024-4', '2024-5','2024-6','2024-7'] // x 轴数据
    },
    yAxis: {
      type: 'value', // y 轴类型为数值型
      min: 0, // y 轴最小值
    max: 5, // y 轴最大值
    interval: 1 // y 轴刻度间隔
    },
    series: [
      {
        name: '数量', // 系列名称
        type: 'line', // 系列类型为折线图
        data: [0, 0, 0, 0, 0, 0, 3] // 系列数据
      }
    ]
  });
  </script>
  
  <style scoped>
  /* 样式可以根据需要进行调整 */
  </style>
  