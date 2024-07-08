<template>
  <div>
    <div class="header">
      <div class="title">
        <h2>软件杯小队名</h2>
      </div>
      <nav class="navbar">
        <ul>
          <li>
            <a href="http://localhost:5173/"
              ><span>用户： {{ username }}</span></a
            >
          </li>
          <div @click="logOut">
            <li><a href="http://localhost:5173/login">退出</a></li>
          </div>
        </ul>
      </nav>
    </div>
    <div class="split-screen">
      <div class="charts">
        <div class="chart" id="errors"></div>
        <div class="chart" id="acNum"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from "vue";
import { useUserInfoStore } from "@/stores/user.js";
import { useTokenStore } from "@/stores/token.js";
import * as echarts from "echarts";
const username = ref("");
const userInfoStore = useUserInfoStore();
const errors = ref([
  { name: "timeOut", value: 123 },
  { name: "correct", value: 114 },
  { name: "outOfMem", value: 514 },
  { name: "compileErr", value: 1919 },
  { name: "other", value: 810 },
]);
const setChartOne = () => {
  type EChartsOption = echarts.EChartsOption;
  var chartDom = document.getElementById("errors")!;
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
        data: errors.value,
      },
    ],
  };
  option && myChart.setOption(option);
};
const condition = ref([
  {
    name: "misingSemi",
    value: 514,
  },
  {
    name: "undefinedDeclaration",
    value: 1919,
  },
  {
    name: "memoryLeak",
    value: 810,
  },
  {
    name: "arrayOut",
    value: 467,
  },
  {
    name: "typeError",
    value: 25,
  },
]);
const setChartTwo = () => {
  type EChartsOption = echarts.EChartsOption;
  var chartDom = document.getElementById("acNum")!;
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
        data: condition.value,
      },
    ],
  };
  option && myChart.setOption(option);
};
import { queryErrors, queryCondition } from "@/api/analyze.js";
// 函数来更新数组
const updateErrors = (oldData, newData) => {
  oldData.value = oldData.value.map((dataItem) => {
    // 使用find找到对应的错误类型并更新value
    return {
      ...dataItem,
      value: newData[dataItem.name] || 0, // 如果没有对应的错误类型，默认value为0
    };
  });
};
const queryError = async () => {
  const id = location.pathname.split("/")[2];
  const result = await queryErrors(Number(id));
  updateErrors(errors, result.data);
};
const queryConditions = async () => {
  const id = location.pathname.split("/")[2];
  const result = await queryCondition(Number(id));
  updateErrors(condition, result.data);
};
onMounted(async () => {
  username.value = userInfoStore.info.username;
  watch(
    () => userInfoStore.info,
    (newInfo) => {
      userInfoStore.setInfo(newInfo);
      username.value = newInfo.username;
    }
  );
  await queryError();
  await queryConditions();
  setChartOne();
  setChartTwo();
});
//退出登录
const logOut = () => {
  //清除userinfo
  const userInfoStore = useUserInfoStore();
  userInfoStore.removeInfo();
  //清楚token
  const tokenStore = useTokenStore(); //得到token的存储
  tokenStore.removeToken(); //清除token
};
</script>

<style scoped>
.header {
  position: fixed; /* 将header位置固定 */
  top: 0; /* 固定在顶部 */
  left: 0; /* 固定在左边 */
  width: 100%; /* 占据整个宽度 */
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box; /* 确保内边距包含在总宽度内 */
  z-index: 1000; /* 确保header在最上层 */
}

.title {
  margin-right: 20px;
  white-space: nowrap; /* 防止标题换行 */
}

.navbar {
  margin-left: auto; /* 将navbar推到右边 */
  display: flex;
  align-items: center; /* 确保垂直居中对齐 */
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.navbar li {
  margin-left: 15px;
  white-space: nowrap; /* 防止用户和退出换行 */
}

.navbar li a {
  color: #18183f;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  padding: 5px; /* 减小padding */
}

.navbar li a:hover {
  color: aqua;
}

.split-screen {
  display: flex;
  height: calc(100vh - 90px); /* 100vh 减去 header 高度 */
  padding-top: 60px; /* 确保内容不被header遮挡 */
}

.charts {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 30%;
  width: 100%;
}
.chart {
  width: 85%;
  height: 500px;
  margin-top: 20%;
}
</style>
