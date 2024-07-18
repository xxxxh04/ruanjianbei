<template>
  <div>
    <div class="header">
      <div class="title">
        <h1>AlgoEdu</h1>
      </div>
      <div class="navigation">
        <ul>
          <li>
            <router-link to="/">题库</router-link>
          </li>
          <li>
            <span v-if="!username" @click="checkLogin">个人主页</span>
            <router-link v-else to="/home">个人主页</router-link>
          </li>
          <li v-if="role === 'student'">
            <span v-if="!username" @click="checkLogin">分析</span>
            <router-link v-else to="/analyze">分析</router-link>
          </li>
          <li v-if="role === 'teacher'">
            <span
              v-show="role === 'teacher'"
              v-if="!username"
              @click="checkLogin"
              >学生信息</span
            >
            <router-link to="/information">学生信息</router-link>
          </li>
          <li>
            <span v-if="!username" @click="checkLogin">关于</span>
            <router-link v-else to="/about">关于</router-link>
          </li>
          <li>
            <span v-if="!username" @click="checkLogin">联系</span>
            <router-link v-else to="/contact">联系</router-link>
          </li>
        </ul>
      </div>
      <nav class="navbar">
        <ul>
          <li v-if="username">
            <router-link to="/home">{{ username }}</router-link>
          </li>
          <li v-if="username" @click="logOut">
            <router-link to="/login">退出</router-link>
          </li>
          <li v-else>
            <el-button type="primary" @click="goToAbout" class="loginButton"
              >登录/注册</el-button
            >
          </li>
        </ul>
      </nav>
    </div>
    <div class="split-screen">
      <div class="charts">
        <div class="chart" id="errors">
          <p
            v-if="
              errors.length === 0 || errors.every((item) => item.value === 0)
            "
          >
            没有数据
          </p>
        </div>
        <div class="chart" id="acNum">
          <p
            v-if="
              condition.length === 0 ||
              condition.every((item) => item.value === 0)
            "
          >
            没有数据
          </p>
        </div>
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  z-index: 1000;
}

.title {
  margin-right: 20px;
  white-space: nowrap;
}

.navigation {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

ul {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
}

.navigation > ul > li {
  margin: 0 10px;
  font-size: 18px;
  font-weight: 500;
  white-space: nowrap;
}

.navigation > ul > li > a,
.navigation > ul > li > span {
  color: #333;
  text-decoration: none;
  padding: 10px;
  cursor: pointer; /* 增加光标样式，显示为可点击 */
}

.navigation > ul > li > a:hover,
.navigation > ul > li > span:hover {
  color: #007bff;
  border-bottom: 2px solid #007bff;
}

.navbar {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.navbar li {
  margin-left: 15px;
  white-space: nowrap;
}

.navbar li a {
  color: #18183f;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  padding: 5px;
}

.navbar li a:hover {
  color: aqua;
}

.loginButton {
  background: linear-gradient(135deg, #00dcc2, #00dc93) !important;
}

.split-screen {
  display: flex;
  height: calc(100vh - 80px); /* 100vh 减去 header 高度 */
  padding-top: 110px; /* 确保内容不被header遮挡 */
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
