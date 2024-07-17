<template>
  <div>
    <div class="header">
      <div class="title">
        <h1>蒸!———智能化教育系统</h1>
      </div>
      <nav class="navbar">
        <ul>
          <li>
            <a href="http://localhost:5173/"
              ><span>用户： {{ username }}</span></a
            >
          </li>
          <li @click="logOut">
            <a href="http://localhost:5173/login">退出</a>
          </li>
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
import { ref, onMounted } from "vue";
import { useUserInfoStore } from "@/stores/user.js";
import { useTokenStore } from "@/stores/token.js";
import { useRouter } from "vue-router";

const username = ref("");
const userInfoStore = useUserInfoStore();
username.value = userInfoStore.info.username;
const router = useRouter();
const logOut = () => {
  // 清除userinfo
  const userInfoStore = useUserInfoStore();
  userInfoStore.removeInfo();
  // 清除token
  const tokenStore = useTokenStore();
  tokenStore.removeToken();
  // 跳转到登录页面
  router.push("/login");
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

.split-screen {
  display: flex;
  height: calc(100vh - 80px); /* 100vh 减去 header 高度 */
  padding-top: 80px; /* 确保内容不被header遮挡 */
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
