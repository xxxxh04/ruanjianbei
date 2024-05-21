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
          <h2>通过</h2>
        </div>
        <div id="passNameAndTime">
          <p>
            <span id="passName">{{ passData.name }}</span>提交于<span id="passTime">{{ passData.time }}</span>
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

const passData = {
  name: "name",
  time: "11:11:11",
  passTime: 15,
  passLanguage: "C++",
  passMemory: 100,
  passCode: "aaaa",
  feedback: "bbbb"
}

</script>

<style scoped>
@import "../CSS/TitleAndNavigationBar.css";
@import "../CSS/SuccessView.css";
</style>