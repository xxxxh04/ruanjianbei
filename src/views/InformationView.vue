<template>
    <div id="title">
        <h2>学生信息</h2>
    </div>
    <div class="search-form">
      <el-form :inline="true">
        <el-form-item label="学生名称:">
          <el-input
            v-model="form.nickname"
            placeholder="请输入学生名称"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="学生id:">
          <el-input
            v-model="form.id"
            placeholder="请输入学生id"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="学生电话:">
          <el-input
            v-model="form.phone"
            placeholder="请输入学生电话"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="学生邮箱:">
          <el-input
            v-model="form.email"
            placeholder="请输入学生邮箱"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="search-table">
      <el-table :data="students" style="width: 100%">
        <el-table-column label="头像" width="200">
        </el-table-column>
        <el-table-column prop="id" label="学生id" width="200"></el-table-column>
        <el-table-column
          prop="nickname"
          label="学生名称"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码"
          width="200"
        ></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          width="200"
        ></el-table-column>
        <el-table-column prop="update_time" label="上线时间"></el-table-column>
      </el-table>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  interface Form {
    nickname: string;
    id: number | null;
    phone: string;
    email: string;
  }
  
  interface Student {
    nickname: string;
    id: number;
    phone: string;
    email: string;
    picture: string;
    create_time: Date;
    update_time: Date;
  }
  
  const form = ref<Form>({
    nickname: "",
    id: null,
    phone: "",
    email: "",
  });
  
  const students = ref<Student[]>([
    {
      id: 1,
      nickname: "John",
      phone: "123456789",
      email: "john@example.com",
      create_time: new Date("2024-07-06"),
      update_time: new Date("2024-07-07"),
      picture: "path_to_avatar1.jpg",
    },
  ]);
  
  const fetchStudents = async (queryParams: Record<string, any> = {}) => {
    try {
      const response = await axios.get("http://localhost:8080/students", {
        params: queryParams,
      });
      students.value = response.data;
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching students data:", error);
    }
  };
  
  const onSearch = async () => {
    const queryParams: Record<string, any> = {};
  
    if (form.value.nickname) {
      queryParams.nickname = form.value.nickname;
    }
    if (form.value.id) {
      queryParams.id = form.value.id;
    }
    if (form.value.phone) {
      queryParams.phone = form.value.phone;
    }
    if (form.value.email) {
      queryParams.email = form.value.email;
    }
  
    await fetchStudents(queryParams);
  };
  
  onMounted(async () => {
    await fetchStudents();
  });
  </script>
  
  <style scoped>
  #title{
    padding: 10px;
  /* 添加一些内边距 */
  padding-left: 0;
  /* 去掉左边的padding */
  display: flex;
  /* 使用flex布局 */
  align-items: center;
  /* 垂直居中 */
  }
  
  .search-form {
    margin: 20px;
    margin-top:0; 
  border: 1px solid black; /* 黑色边框 */
  padding: 10px; /* 给表单一些内边距，让内容不贴边 */
  padding-top: 20px;
  }
  .search-table {
    margin: 20px;
  border: 1px solid black; /* 黑色边框 */
  padding: 10px; /* 给表单一些内边距，让内容不贴边 */
  padding-top: 20px;
}
  </style>
  