<template>
  <div class = "ceshi">
    <div id="title">
      <h3>题目列表</h3>
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
          <el-dialog
            title="选择希望筛选的标签"
            v-model="dialogVisible"
            width="30%"
          >
            <div id="selectLabel" class="select-label-container">
              <div class="label-group">
                <span class="selectLabelSpan">基础</span>
                <el-button
                  v-for="laberOption in laberOptions1"
                  :key="laberOption.value"
                  :type="isChecked(laberOption.label) ? 'success' : 'default'"
                  @click="toggleLaber(laberOption.label)"
                >
                  {{ laberOption.label }}
                </el-button>
              </div>
              <div class="label-group">
                <span class="selectLabelSpan">算法</span>
                <el-button
                  v-for="laberOption in laberOptions2"
                  :key="laberOption.value"
                  :type="isChecked(laberOption.label) ? 'success' : 'default'"
                  @click="toggleLaber(laberOption.label)"
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
        <span v-if="checkedLabers.length === 0 && !selectedDiffculty"
          >无信息</span
        >
        <el-button
          class="showSelectButton"
          v-if="selectedDiffculty"
          @click="resetDifficulty"
          >{{ selectDiffculty }}<span class="close-icon">x</span></el-button
        >
        <el-button
          class="showSelectButton"
          v-for="(checkedLaber, index) in checkedLabers"
          :key="checkedLaber"
          @click="removeCheckedLaber(index)"
        >
          {{ checkedLaber }}<span class="close-icon">x</span>
        </el-button>
      </div>
    </div>
    <div id="questionMenu">
      <el-table :data="questionData">
        <el-table-column prop="state" label="状态" width="150">
        </el-table-column>
        <el-table-column prop="pid" label="题号" width="150"> </el-table-column>
        <el-table-column prop="pname" label="题目名称" width="600">
          <template v-slot="scope">
            <router-link
            class="hover-link"
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
        <el-table-column prop="difficulty" label="难度" width="150">
        </el-table-column>
        <el-table-column prop="acNum" label="通过数" width="115">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref, onMounted, watch } from "vue";
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
    outTest: null,
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

// 监听selectDiffculty的变化,显示选择的难度
watch(selectDiffculty, (newVal) => {
  if (newVal) {
    selectedDiffculty.value = true;
  }
});

function toggleLaber(Laber: string) {
  const index = checkedLabers.indexOf(Laber);
  if (index === -1) {
    checkedLabers.push(Laber);
  } else {
    checkedLabers.splice(index, 1);
  }
}

function isChecked(Laber) {
  return checkedLabers.includes(Laber);
}

function handleConfirm() {
  console.log("选中的标签：", checkedLabers);
  dialogVisible.value = false;
}
const resetDifficulty = () => {
  selectedDiffculty.value = false;
  selectDiffculty.value = "";
};

const removeCheckedLaber = (index: number) => {
  checkedLabers.splice(index, 1);
};

import { problemSearchService, problemFindAllService } from "@/api/problem.js";

const findAllProblems = async () => {
  const result = await problemFindAllService();
  Object.assign(questionData, result.data);
  questionData.forEach((question) => {
    // 初始化 lnames 数组
    question.lnames = question.labels.map((label) => label.lname);
  });
  console.log(result.data.data);
  console.log(questionData);
};
const searchProblem = async () => {
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
  const result = await problemSearchService(params);
  //清空questionData
  questionData.splice(0, questionData.length);
  Object.assign(questionData, result.data);
  questionData.forEach((question) => {
    // 初始化 lnames 数组
    question.lnames = question.labels.map((label) => label.lname);
  });
  console.log("所有结果：", questionData);
};

//加载所有题目
onMounted(() => {
  findAllProblems();
});
</script>

<style scoped>

.ceshi{
  
}

a {
  color: black;
  text-decoration: none; /* 去除下划线 */
  cursor: pointer; /* 鼠标悬停时显示手型光标 */
}
#title {
  padding: 10px;
  /* 添加一些内边距 */
  padding-left: 0;
  /* 去掉左边的padding */
  display: flex;
  /* 使用flex布局 */
  align-items: center;
  /* 垂直居中 */
  margin-left: 10%;
}

#title h2 {
  margin-top: 0;
  margin-left: 10px;
  /* 将 h2 移动到距离左边框 10px 处 */
}

#selectFace {
  padding: 10px;
  /* 添加一些内边距 */
  padding-left: 0;
  /* 去掉左边的padding */
  align-items: center;
  /* 垂直居中 */
  /* border: 1px solid #000; */
  margin-left: 10%;
  width: 80%;
  background-color: #EEEEEE;
}

#selectmenu {
  padding: 10px;
  /* 添加一些内边距 */
  padding-left: 0;
  /* 去掉左边的padding */
  display: flex;
  /* 使用flex布局 */
  align-items: center;
  /* 垂直居中 */
  margin-left: 10px;
  
}

#selectmenu span {
  margin-left: 10px;
}

#selectdiffculty {
  margin-left: 20px;
  width: 100px;
}

#laberShowbutton {
  margin-left: 20px;
  width: 100px;
  /* background-color: transparent !important; */
  border-color: #dcdfe6 !important;
  /* 设置边框颜色 */
  color: inherit !important;
  background-color: #fff;
}

.select-label-container {
  display: flex;
  flex-wrap: wrap;
}

.label-group {
  display: flex;
  align-items: center;
  margin-right: 10px;
  /* 调整标签组之间的间距 */
}

.selectLabelSpan {
  margin-right: 5px;
  /* 调整标签和按钮之间的间距 */
}

#searchInput {
  display: flex;
  align-items: center;
}

#searchInputText {
  margin-left: 20px;
  /* 间隔 20px */
}

#showSelect {
  padding: 10px;
  /* 添加一些内边距 */
  padding-left: 0;
  /* 去掉左边的padding */
  display: flex;
  /* 使用flex布局 */
  align-items: center;
  /* 垂直居中 */
  margin-left: 10px;
}

#showSelect span {
  margin-left: 10px;
  margin-right: 10px;
}

.showSelectButton {
  transition: background-color 0.3s;
  margin-right: 10px;
  background-color: blue; /* 按钮背景色为蓝色 */
  color: white; /* 按钮文字颜色为白色 */
}

.showSelectButton:hover {
  background-color: red;
  color: white;
}
#close-icon {
}

#questionMenu {
  padding: 10px;
  /* 添加一些内边距 */
  padding-left: 0;
  /* 去掉左边的padding */
  align-items: center;
  /* 垂直居中 */
  /* border: 1px solid #000; */
  width: 80%;
  margin-left: 10%;
  margin-top: 10px;
}
#questionMenu ::v-deep .el-table th {
  background-color: #EEEEEE;
}
.hover-link {
  color: black;
  text-decoration: none; /* 移除下划线 */
}

.hover-link:hover {
  color: #3366FF;
}
</style>


