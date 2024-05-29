<template>
  <div>
    <div id="Title">
      <h1>软件杯小队名</h1>
      <nav class="navbar">
        <ul>
          <li><a href="#"><span>用户：</span>{{ username }}</a></li>
          <li><a href="#">退出</a></li>
 
        </ul>
      </nav>
    </div>
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
            <p>{{ questions.content }}</p>
          </div>
          <h4>输入描述</h4>
          <div id="questionInputDescribeShow">
            <p>{{ questions.inDetail }}</p>
          </div>
          <h4>输出描述</h4>
          <div id="questionOutDescribeShow">
            <p>{{ questions.outDetail }}</p>
          </div>
          <h4>样例</h4>
          <h5>样例输入</h5>
          <div id="questionInputTextShow">
            <p>{{ questions.inTest }}</p>
          </div>
          <h5>样例输出</h5>
          <div id="questionOutTextShow">
            <p>{{ questions.outTest }}</p>
          </div>
        </div>
      </div>
      <!-- <div class="right-half" id="right-half"></div>
      <button @click="submitCode">提交代码</button> -->
      <div class="right-half">
        <!-- 将 monaco 编辑器创建代码放入 right-half 中 -->
        <CodeEditor v-model="editorValue" />
        <!-- 提交按钮 -->
        <el-button
          type="success"
          round
          style="margin-top: 20px"
          @click="submitCode"
        >
          <el-icon><Pointer /></el-icon>提交代码</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, reactive, defineProps } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

import "../hooks/useMonacoWorker";
import CodeEditor from "@/components/CodeEditor.vue";
const value = `#include <iostream>
using namespace std;

int main() {
  cout << "Monaco editor";
  return 0;
}`;
const props = defineProps({
  number: Number,
  name: String,
});
const editorValue = ref("");


// const questions = {
//   describe: "rtfgyhftyguh",
//   inputDescribe: "dtrfyghuzzzzzzzzz",
//   outputDescribe: "zzzzzzzzzzzzz",
//   inText: "1 1 1",
//   outText: "1",
// };

const router = useRouter();

function navigateTo(path: string) {
  router.push(path);
}
function submitCode() {
  router.push({
    name: "success",
    query: { passCode: editorValue.value, name: "张三", pid: props.number },
  });
}
let questions = ref({
  state: 1,
  pid: 1,
  pname: "abc",
  difficulty: "简单",
  acnum: "1",
  content: null,
  labels: ["二分", "模拟"],
  lnames: [],
  inDetail: null,
  outDetail: null,
  inTest: null,
  OutTest: null,
});
onMounted(() => {
  const id = router.currentRoute.value.params.number;
  axios.get("http://localhost:8080/problem/findByid/" + id).then((result) => {
    questions.value = result.data.data;
    // 初始化 lnames 数组
    // questions.value.lnames = questions.value.labels.map((label) => label.lname);
    console.log("查询结果：", questions.value);
  });
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
