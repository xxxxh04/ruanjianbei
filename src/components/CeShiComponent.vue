<template>
  <div>
    <div id="title">
      <h2>题目列表</h2>
    </div>
    <div id="selectFace">
      <div id="selectmenu">
        <span>筛选条件</span>
        <div id="selectdiffculty">
          <el-select v-model="selectDiffculty" placeholder="题目难度">
            <el-option
              v-for="item in diffcultyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div id="laberShow">
          <el-button id="laberShowbutton" type="primary" @click="showModal"
            >标签</el-button
          >
          <el-dialog title="多选按钮弹框" v-model="dialogVisible" width="30%">
            <div id="selectLabel" class="select-label-container">
              <div class="label-group">
                <span class="selectLabelSpan">基础</span>
                <el-button
                  v-for="laberOption in laberOptions1"
                  :key="laberOption.value"
                  :type="isChecked(laberOption.value) ? 'success' : 'default'"
                  @click="toggleColor(laberOption.value)"
                >
                  {{ laberOption.label }}
                </el-button>
              </div>
              <div class="label-group">
                <span class="selectLabelSpan">算法</span>
                <el-button
                  v-for="laberOption in laberOptions2"
                  :key="laberOption.value"
                  :type="isChecked(laberOption.value) ? 'success' : 'default'"
                  @click="toggleColor(laberOption.value)"
                >
                  {{ laberOption.label }}
                </el-button>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleConfirm">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <div id="searchInput">
          <span>搜索</span>
          <div id="searchInputText">
            <el-input
              v-model="searchInput"
              placeholder="请输入搜索内容"
              clearable
            />
            <!-- @input="searchProblem" -->
          </div>
        </div>
        <el-button
          type="primary"
          style="margin-left: 20px"
          @click="searchProblem()"
        >
          <el-icon style="vertical-align: middle">
            <Search />
          </el-icon>
          <span style="vertical-align: middle"> 搜索 </span>
        </el-button>
      </div>
      <div id="showSelect">
        <span>已选择</span>
        <el-button class="showSelectButton" v-if="selectedDiffculty">{{
          selectDiffculty
        }}</el-button>
        <el-button
          class="showSelectButton"
          v-for="checkedLaber in checkedLabers"
          :key="checkedLaber"
        >
          {{ checkedLaber }}
        </el-button>
      </div>
    </div>
    <div id="questionMenu">
      <el-table :data="questionData" style="width: 100%">
        <el-table-column prop="state" label="状态" width="50">
        </el-table-column>
        <el-table-column prop="pid" label="题号" width="100"> </el-table-column>
        <el-table-column prop="pname" label="题目名称" width="800">
          <template v-slot="scope">
            <router-link
              :to="{
                name: 'question',
                params: { number: scope.row.pid, name: scope.row.pname },
              }"
              target="_blank"
              >{{ scope.row.pname }}</router-link
            >
          </template>
        </el-table-column>
        <el-table-column prop="lnames" label="标签" width="200">
        </el-table-column>
        <el-table-column prop="difficulty" label="难度" width="100">
        </el-table-column>
        <el-table-column prop="acNum" label="通过数" width="100">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref, onMounted } from "vue";
import axios from "axios";
const selectDiffculty = ref(""); // 用于存储选中的难度
const selectedDiffculty = ref(false); //是否选择难度
const diffcultyOptions = reactive([
  { value: "简单", label: "简单" },
  { value: "中等", label: "中等" },
  { value: "困难", label: "困难" },
]);
const dialogVisible = ref(false);
const checkedLabers = reactive([]); // 存储选中的标签
const searchInput = ref(""); // 用于存储搜索框中的内容
let questionData = reactive([
  {
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
  },
]);

const laberOptions1 = computed(() => {
  return [
    { value: "1", label: "模拟" },
    { value: "2", label: "数学" },
    { value: "7", label: "数组" },
    { value: "10", label: "矩阵" },
  ];
});

const laberOptions2 = computed(() => {
  return [
    { value: "5", label: "动态规划" },
    { value: "11", label: "贪心" },
    { value: "4", label: "DFS" },
    { value: "6", label: "二分" },
  ];
});

function showModal() {
  dialogVisible.value = true;
}

function toggleColor(color: string) {
  const index = checkedLabers.indexOf(color);
  if (index === -1) {
    checkedLabers.push(color);
  } else {
    checkedLabers.splice(index, 1);
  }
}

function isChecked(color) {
  return checkedLabers.includes(color);
}

function handleConfirm() {
  console.log("选中的标签：", checkedLabers);
  dialogVisible.value = false;
}

function searchProblem() {
  // 执行搜索操作，这里可以根据搜索框中的内容执行相应的搜索逻辑
  console.log(
    "执行搜索操作:",
    searchInput.value,
    selectDiffculty.value,
    checkedLabers
  );
  const params = {
    dif: selectDiffculty.value,
    labels: checkedLabers,
    content: searchInput.value,
  };
  axios.post("http://localhost:8080/problem/search", params).then((result) => {
    console.log("返回结果：" + result.data.data);
    Object.assign(questionData, result.data.data);
    questionData.forEach((question) => {
      // 初始化 lnames 数组
      question.lnames = question.labels.map((label) => label.lname);
    });
    console.log(questionData);
  });
}

//加载所有题目
onMounted(() => {
  axios.get("http://localhost:8080/problem/findall").then((result) => {
    Object.assign(questionData, result.data.data);
    questionData.forEach((question) => {
      // 初始化 lnames 数组
      question.lnames = question.labels.map((label) => label.lname);
    });
    console.log(result.data.data);
    console.log(questionData);
  });
});
</script>

<style scoped>
@import "./css/CeShiComponent.css";
</style>

<style scoped>
@import "./css/CeShiComponent.css";
</style>
