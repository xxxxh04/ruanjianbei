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
        <div id="title">
          <h1>{{ name }}</h1>
        </div>
        <div id="questionAsk">
          <p><span>题号:</span>{{ number }}</p>
          <p><span>时间限制：</span>C/C++ 1秒，其他语言2秒</p>
          <p><span>空间限制：</span>C/C++ 262144K，其他语言524288K</p>
          <p><span>64bit IO Format:</span> %lld</p>
        </div>
        <div id="questionDescribe">
          <h3>题目描述</h3>
          <div id="questionDescribeShow">
            <p>{{ questions.describe }}</p>
          </div>
          <h4>输入描述</h4>
          <div id="questionInputDescribeShow">
            <p>{{ questions.inputDescribe }}</p>
          </div>
          <h4>输出描述</h4>
          <div id="questionOutDescribeShow">
            <p>{{ questions.outputDescribe }}</p>
          </div>
          <h4>样例</h4>
          <h5>样例输入</h5>
          <div id="questionInputTextShow">
            <p>{{ questions.inText }}</p>
          </div>
          <h5>样例输出</h5>
          <div id="questionOutTextShow">
            <p>{{ questions.outText }}</p>
          </div>
        </div>
      </div>
      <div class="right-half">
        <!-- 右半部分内容 -->
        <h2>右半部分</h2>
        <button @click="navigateTo('/success')">测试跳转</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const questions = {
  describe: "rtfgyhftyguh",
  inputDescribe: "dtrfyghuzzzzzzzzz",
  outputDescribe: "zzzzzzzzzzzzz",
  inText: "1 1 1",
  outText: "1",
}

function navigateTo(path) {
  const router = useRouter()
  router.push(path)
}

const props = defineProps({
  number: Number,
  name: String
})
</script>


<style scoped>
@import "../CSS/QuestiobView.css";
@import "../CSS/TitleAndNavigationBar.css";
</style>
