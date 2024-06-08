<template>
  <div>
    <div class="charts">
      <AnalyzeSubmitResult class="chart" />
      <AnalyzeCodeProblem class="chart" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AnalyzeSubmitResult from "@/components/AnalyzeSubmitResult.vue";
import AnalyzeCodeProblem from "@/components/AnalyzeCodeProblem.vue";
</script>

<style>
.charts {
  display: flex; /* 使用Flexbox布局 */
  justify-content: flex-start; /* 子元素在主轴上（默认是水平方向）平均分布 */
  align-items: center; /* 子元素在交叉轴上（默认是垂直方向）居中对齐 */
  /* height: 200px;
  width: 200px; */
  width: 100%;
}
.chart {
  width: 45%;
  height: 350px;
}
</style>
