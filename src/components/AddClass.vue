<template>
    <div class="ceshi">
      <div id="title">
        <h3>加入班级</h3>
      </div>
      <div id="classmeau">
        <el-table :data="classmeau" style="width: 80%; margin-left: 10%;">
          <el-table-column prop="c_id" label="班级ID" width="180"></el-table-column>
          <el-table-column prop="c_name" label="班级名称" width="600"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button class="add_button" @click="joinClass(scope.row)" type="primary" size="small">加入班级</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive, onMounted } from "vue";
  
  let classmeau = reactive([
    {
      c_id: '1',
      c_name: '计算机',
    }
  ]);
  
  const joinClass = (row: any) => {
    // 处理加入班级的逻辑
    console.log("加入班级: ", row);
  };
  
  onMounted(() => {
    // 可以在这里获取数据
  });
  </script>
  
  <style scoped>
  #title {
    padding: 10px;
    padding-left: 0;
    display: flex;
    align-items: center;
    margin-left: 10%;
  }
  
  #title h3 {
    margin-top: 10px;
    margin-left: 9%;
  }
  
  #classmeau {
    width: 80%;
    margin-left: 10%;
  }
  
  #classmeau ::v-deep .el-table th {
    background-color: #EEEEEE;
  }
  
  .add_button {
    background-color: #ff7f50; /* 设置按钮的背景颜色 */
    border-color: #ff7f50; /* 设置按钮的边框颜色 */
    color: white; /* 设置按钮的文本颜色 */
  }
  
  .add_button:hover {
    background-color: #ff6347; /* 设置按钮在悬停时的背景颜色 */
    border-color: #ff6347; /* 设置按钮在悬停时的边框颜色 */
  }
  </style>
  