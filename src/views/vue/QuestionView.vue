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
      <div class="right-half" id="right-half">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor';
import { onMounted, ref } from 'vue';

import { useRouter } from 'vue-router'

const value = `#include <iostream>
using namespace std;

int main() {
  cout << "Monaco editor";
  return 0;
}`;

const editorValue = ref('')

let edit: monaco.editor.IStandaloneCodeEditor

function getEditorValue() {
  editorValue.value = edit.getValue()
  console.log(editorValue.value)
}

onMounted(() => {
  edit = monaco.editor.create(document.getElementById("right-half"), {
    value,
    language: "cpp",
    automaticLayout: true
  })
})

const questions = {
  describe: "rtfgyhftyguh",
  inputDescribe: "dtrfyghuzzzzzzzzz",
  outputDescribe: "zzzzzzzzzzzzz",
  inText: "1 1 1",
  outText: "1",
}

const router = useRouter()

function navigateTo(path: string) {
  router.push(path)
}

const props = defineProps({
  number: Number,
  name: String
})
</script>


<style scoped>
@import "../CSS/TitleAndNavigationBar.css";

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

#title {
    padding-top: 0;
    margin-bottom: 20px;
    text-align: left;
    /* 确保文本左对齐 */
}

#questionAsk {
    background-color: #ccc;
    text-align: left;
    /* 确保文本左对齐 */
    margin-top: 5px;
}

#questionAsk p {

    margin: 5px;
    padding: 5px 0;
}

#questionAsk span {
    font-weight: bold;
}

#questionDescribe {
    text-align: left;
    /* 确保文本左对齐 */
}
</style>
