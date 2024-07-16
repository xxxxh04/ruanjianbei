<template>
  <div>
    <div class="header">
      <div class="title">
        <h1>蒸!———智能化教育系统</h1>
      </div>
      <div class="navigation">
        <ul>
          <li>
            <router-link to="/ceshi">题库</router-link>
          </li>
          <li>
            <span v-if="!username" @click="checkLogin">个人主页</span>
            <router-link v-else to="/">个人主页</router-link>
          </li>
          <li>
            <span v-if="!username" @click="checkLogin">分析</span>
            <router-link v-else to="/analyze">分析</router-link>
          </li>
          <li>
            <span
              v-show="role === 'teacher'"
              v-if="!username"
              @click="checkLogin"
              >学生信息</span
            >
            <router-link v-else to="/information">学生信息</router-link>
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
            <a href="http://localhost:5173/"
              ><span>用户： {{ username }}</span></a
            >
          </li>
          <li v-if="username" @click="logOut">
            <a href="http://localhost:5173/login">退出</a>
          </li>
          <li v-else>
            <el-button type="primary" @click="goToAbout" class="loginButton"
              >登录/注册</el-button
            >
          </li>
        </ul>
      </nav>
    </div>
    <div class="mainview">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { useUserInfoStore } from "@/stores/user.js";
import { useTokenStore } from "@/stores/token.js";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";

const username = ref("");
const role = ref("");
const userInfoStore = useUserInfoStore();
const router = useRouter();

onMounted(() => {
  username.value = userInfoStore.info.username;
  role.value = userInfoStore.info.role;
  watch(
    () => userInfoStore.info,
    (newInfo) => {
      userInfoStore.setInfo(newInfo);
      username.value = newInfo.username;
      role.value = newInfo.role;
    }
  );
});

// 检查登录状态
const checkLogin = () => {
  if (!username.value) {
    ElMessageBox.alert("请先登录", "提示", {
      confirmButtonText: "确定",
      callback: () => {},
    });
  }
};

// 退出登录
const logOut = () => {
  userInfoStore.removeInfo();
  const tokenStore = useTokenStore();
  tokenStore.removeToken();
  router.push("/login");
};

const goToAbout = () => {
  userInfoStore.removeInfo();
  const tokenStore = useTokenStore();
  tokenStore.removeToken();
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

.mainview {
  margin-top: 90px;
}
</style>
