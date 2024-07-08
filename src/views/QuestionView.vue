<template>
  <div>
    <div class="header">
      <div class="title">
        <h2>软件杯小队名</h2>
      </div>
      <nav class="navbar">
        <ul>
          <li>
            <a href="#"
              ><span>用户：{{ nickname }}</span></a
            >
          </li>
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
            <p>{{ questions.proCon }}</p>
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
import { onMounted, ref, defineProps } from "vue";
import { useRouter } from "vue-router";
import { useUserInfoStore } from "@/stores/user.js";
const userInfoStore = useUserInfoStore();
const nickname = ref(userInfoStore.info.nickname);
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
  proCon: "",
  labels: ["二分", "模拟"],
  lnames: [],
  inDetail: null,
  outDetail: null,
  inTest: null,
  OutTest: null,
});
import { findProblemService } from "@/api/problem.js";
const findProblem = async () => {
  const id = router.currentRoute.value.params.number;
  console.log("查询id：", id);
  const result = await findProblemService(id);
  questions.value = result.data;
  console.log("查询结果：", questions.value);
};
onMounted(() => {
  findProblem();
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
  padding-top: 60px; /* 确保内容不被header遮挡 */
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
  /* 没有 overflow-y 使右半部分不滚动 */
}
#submit-button {
  position: absolute; /* 绝对定位 */
  right: 50px; /* 距离右边界20px */
}
#title {
  padding-top: 0;
  margin-bottom: 20px;
  text-align: left; /* 确保文本左对齐 */
}

#questionAsk {
  background-color: #ccc;
  text-align: left; /* 确保文本左对齐 */
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
  text-align: left; /* 确保文本左对齐 */
}
</style>
