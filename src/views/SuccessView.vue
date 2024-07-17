<template>
  <div>
    <div class="header">
      <div class="title">
        <h1>AlgoEdu</h1>
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
    <div class="split-screen">
      <div class="left-half">
        <!-- 左半部分内容 -->
        <div id="passState">
          <h2 v-if="modelResult.result == 1">通过</h2>
          <h2 v-else>错误</h2>
        </div>
        <div id="passNameAndTime">
          <p>
            <span id="passName">{{ passData.name }}</span
            >提交于<span id="passTime">{{ passData.time }}</span>
          </p>
        </div>
        <div id="passInformationWrapper" class="flex-container">
          <div class="flex-item">
            <!-- 第一个子元素 -->
            <div class="passInformation">
              <p>执行用时分布</p>
              <P>{{ passData.passTime }}<span>ms</span></P>
              <p>击败100%使用{{ passData.passLanguage }}的用户</p>
            </div>
          </div>
          <div class="flex-item">
            <!-- 第二个子元素内容 -->
            <div class="passInformation">
              <p>执行内存分布</p>
              <P>{{ passData.passMemory }}<span>kb</span></P>
              <p>击败100%使用{{ passData.passLanguage }}的用户</p>
            </div>
          </div>
        </div>
        <div id="passCode">
          <p><span>代码 </span>{{ passData.passLanguage }}</p>
          <div id="CodeText">
            {{ passData.passCode }}
          </div>
        </div>
        <div id="modelFeedback">
          <p>模型反馈</p>
          <div
            id="feedbackText"
            v-for="(message, index) in formattedMessages"
            :key="index"
          >
            {{ message }}
          </div>
        </div>
        <div id="modelFeedback">
          <p>资源推荐</p>
          <div id="feedbackText">
            <!-- 在这个地方改成你后端给的资源 -->
            {{ modelResult.sug }}
          </div>
        </div>
      </div>
      <div class="right-half">
        <!-- 将 monaco 编辑器创建代码放入 right-half 中 -->
        <CodeEditor v-model="editorValue" height="760px" />
        <!-- 提交按钮 -->
        <el-button
          type="success"
          round
          style="margin-top: 20px"
          @click="submitCode"
          id="submit-button"
        >
          <el-icon><Pointer /></el-icon>提交代码</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeEditor from "@/components/CodeEditor.vue";
import { useRoute } from "vue-router";
import { onMounted, ref, computed } from "vue";
import { useUserInfoStore } from "@/stores/user.js";
let passData = ref({
  result: 1,
  name: "name",
  time: "11:11:11",
  passTime: 15,
  passLanguage: "C++",
  passMemory: 100,
  passCode: "aaaa",
  pid: 1,
  // feedback: "bbbb",
});

let modelResult = ref({
  result: 1,
  sug: [],
});

//获取用户信息
const userInfoStore = useUserInfoStore();
const id = ref(userInfoStore.info.id);
const username = ref(userInfoStore.info.username);
import { problemTestService } from "@/api/problem.js";
const setMessage = async () => {
  var now = new Date();
  const route = useRoute();
  passData.value.passCode = route.query.passCode;
  passData.value.name = route.query.name;
  passData.value.pid = route.query.pid;
  passData.value.time =
    now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  const formData = ref({});
  formData.value.id = id;
  formData.value.question = passData.value.passCode;
  formData.value.pId = passData.value.pid;
  const result = await problemTestService(formData.value);
  modelResult.value = result.data;
  console.log(modelResult.value);
};
const formattedMessages = computed(() =>
  modelResult.value.sug.map((message, index) => `${index + 1}. ${message}`)
);
const goToAbout = () => {
  // 清除userinfo
  const userInfoStore = useUserInfoStore();
  userInfoStore.removeInfo();
  // 清除token
  // const tokenStore = useTokenStore();
  // tokenStore.removeToken();
  // 跳转到登录页面
  router.push("/login");
};
onMounted(() => {
  setMessage();
});
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
  padding-top: 70px; /* 确保内容不被header遮挡 */
}

/* 左半部分样式 */
.left-half {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  height: calc(100vh - 90px); /* 100vh 减去 header 高度 */
  overflow-y: auto; /* 使左半部分内容过多时可以滚动 */
}

/* 右半部分样式 */
.right-half {
  margin-top: 10px;
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  /* 使右半部分内容过多时可以滚动 */
}
#passState {
  text-align: left;
  color: rgb(15, 212, 146);
}
#passNameAndTime {
  text-align: left;
}
#passName {
  font-weight: bold;
}
#passTime {
  color: #dcdfe6;
}
.left-half {
  display: flex; /* 将左半部分设置为 Flex 容器 */
  flex-direction: column; /* 垂直排列子元素 */
}

#passInformationWrapper {
  display: flex; /* 将 passInformationWrapper 设置为 Flex 容器 */
}

.flex-item {
  flex: 1; /* 平分剩余空间 */
  border: 1px solid #ccc; /* 为了更好地显示效果，添加边框样式 */
}
.passInformation {
  text-align: left;
}
.passInformation p {
  margin-left: 20px;
}

#passCode {
  text-align: left;
  width: 99.9%;
  height: 230px;
  border: 1px solid #ccc;
  display: flex; /* 将 passCode 设置为 Flex 容器 */
  flex-direction: column; /* 垂直排列子元素 */
}
#CodeText {
  flex: 1; /* 占据剩余空间 */
  overflow: auto; /* 如果内容超过容器高度，显示滚动条 */
  background-color: #dcdfe6;
}
#modelFeedback {
  text-align: left;
  height: 200px;
  display: flex; /* 将 passCode 设置为 Flex 容器 */
  flex-direction: column; /* 垂直排列子元素 */
}
#feedbackText {
  flex: 1; /* 占据剩余空间 */
  overflow: auto; /* 如果内容超过容器高度，显示滚动条 */
  background-color: #dcdfe6;
}
#submit-button {
  position: absolute; /* 绝对定位 */
  right: 50px; /* 距离右边界20px */
}
</style>
