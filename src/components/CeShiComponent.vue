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
              @input="search"
              clearable
            />
          </div>
        </div>
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
        <el-table-column prop="number" label="题号" width="100">
        </el-table-column>
        <el-table-column prop="name" label="题目名称" width="800">
          <!-- <template slot-scope="{ row }">
            <router-link :to="{
            name: 'question',
            params: { number: row.number, name: row.name },
          }" target="_blank">{{ row.name }}</router-link>
          </template> -->
        </el-table-column>
        <el-table-column prop="laber" label="标签" width="200">
        </el-table-column>
        <el-table-column prop="difficulty" label="难度" width="100">
        </el-table-column>
        <el-table-column prop="passNumber" label="通过数" width="100">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from "vue";

const selectDiffculty = ref(""); // 用于存储选中的难度
const selectedDiffculty = ref(false); //是否选择难度
const diffcultyOptions = reactive([
  { value: "option1", label: "简单" },
  { value: "option2", label: "中等" },
  { value: "option3", label: "困难" },
]);
const dialogVisible = ref(false);
const checkedLabers = reactive([]); // 存储选中的标签
const searchInput = ref(""); // 用于存储搜索框中的内容
const questionData = reactive([
  {
    state: 1,
    number: 1,
    name: "abc",
    laber: [1, 2, 3, "sss"],
    difficulty: "简单",
    passNumber: "1",
  },
]);

const laberOptions1 = computed(() => {
  return [
    { value: "laber1-1", label: "数组" },
    { value: "laber1-2", label: "字符串" },
    { value: "laber1-3", label: "排序" },
    { value: "laber1-4", label: "矩阵" },
  ];
});

const laberOptions2 = computed(() => {
  return [
    { value: "laber2-1", label: "动态规划" },
    { value: "laber2-2", label: "贪心" },
    { value: "laber2-3", label: "dfs" },
    { value: "laber2-4", label: "二分" },
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

function search() {
  // 执行搜索操作，这里可以根据搜索框中的内容执行相应的搜索逻辑
  console.log("执行搜索操作:", searchInput);
}
</script>

<style scoped>
@import "./css/CeShiComponent.css";
</style>

<style scoped>
@import "./css/CeShiComponent.css";
</style>
