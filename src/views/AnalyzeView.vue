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
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 30%;
  width: 110%;
}
.chart {
  width: 85%;
  height: 500px;
  margin-top: 3%;
}
</style>
