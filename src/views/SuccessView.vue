<template>
  <div>
    <header>
      <h1>软件杯小队名</h1>
      <nav class="navigation">
        <a href="#" style="color: #18183f"> Home </a>
        <a href="#" style="color: #18183f"> About </a>
        <a href="#" style="color: #18183f"> Services </a>
        <a href="#" style="color: #18183f"> Contact </a>
        <button class="btnLogin-popup" style="color: #18183f">Login</button>
      </nav>
    </header>
    <div class="split-screen">
      <div class="left-half">
        <!-- 左半部分内容 -->
        <div id="passState">
          <h2 v-if="passData.result == 1">通过</h2>
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
          <div id="feedbackText">
            {{ passData.feedback }}
          </div>
        </div>
      </div>
      <div class="right-half">
        <!-- 右半部分内容 -->
        <h2>右半部分</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
const passData = ref({
  result: 1,
  name: "name",
  time: "11:11:11",
  passTime: 15,
  passLanguage: "C++",
  passMemory: 100,
  passCode: "aaaa",
  feedback: "bbbb",
});
onMounted(() => {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  const route = useRoute();
  passData.value.passCode = route.query.passCode;
  passData.value.name = route.query.name;
  passData.value.time = hours + ":" + minutes + ":" + seconds;
});
</script>

<style scoped>
@import "../assets/TitleAndNavigationBar.css";

.split-screen {
  display: flex;
  height: calc(100vh - 100px);
  /* 100vh 减去 header 高度 */
  overflow: auto;
  /* 使内容溢出时可以滚动 */
}

/* 左半部分样式 */
.left-half {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  /* 使左半部分内容过多时可以滚动 */
}

/* 右半部分样式 */
.right-half {
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
</style>
