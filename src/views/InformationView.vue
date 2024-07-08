<template>
  <div id="title">
    <h2>学生信息</h2>
  </div>
  <div class="search-form">
    <el-form :inline="true">
      <el-form-item label="学生名称:" style="margin-right: 700px">
        <el-input
          v-model="form.username"
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
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="search-table">
    <el-table :data="students" style="width: 100%">
      <el-table-column label="头像" width="200"> </el-table-column>
      <el-table-column prop="id" label="学生id" width="200"></el-table-column>
      <el-table-column prop="username" label="学生名称" width="200">
        <template v-slot="scope">
          <router-link
            :to="{
              name: 'student',
              params: { id: scope.row.id },
            }"
            target="_blank"
            >{{ scope.row.username }}</router-link
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号码"
        width="200"
      ></el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="200"
      ></el-table-column>
      <el-table-column prop="updateTime" label="上线时间"></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

interface Form {
  username: string;
  id: number | null;
}

interface Student {
  username: string;
  id: number;
  phone: string;
  email: string;
  picture: string;
  createTime: Date;
  updateTime: Date;
  role: string;
  acNum: number;
  cid: number;
  cname: string;
}

const form = ref<Form>({
  username: "",
  id: null,
});
import { queryStudentByClassId, searchStudent } from "@/api/user.js";
import { useUserInfoStore } from "@/stores/user.js";
const students = ref<Student[]>([
  {
    id: 1,
    username: "John",
    phone: "123456789",
    email: "john@example.com",
    createTime: new Date("2024-07-06"),
    updateTime: new Date("2024-07-07"),
    picture: "path_to_avatar1.jpg",
    role: "",
    acNum: 0,
    cid: 0,
    cname: "",
  },
]);

const userInfoStore = useUserInfoStore();
//查询班上所有的学生
const searchAllStudent = async () => {
  const cid = userInfoStore.info.cid;
  const result = await queryStudentByClassId(cid);
  students.value = result.data;
  console.log("students:", students.value);
};
const fetchStudents = async (queryParams: Record<string, any> = {}) => {
  console.log("queryParams:", queryParams);
  const result = await searchStudent(queryParams);
  // console.log("result:", result.data);
  students.value = result.data;
  // console.log("students:", students.value);
};

const onSearch = async () => {
  const queryParams: Record<string, any> = {};

  if (form.value.username) {
    queryParams.username = form.value.username;
  }
  if (form.value.id) {
    //将id转成数字
    queryParams.id = Number(form.value.id);
  }
  queryParams.cid = Number(userInfoStore.info.cid);
  // console.log("queryParams:", queryParams);
  await fetchStudents(queryParams);
};

onMounted(() => {
  searchAllStudent();
  //遍历students,打印每个username
});
</script>

<style scoped>
#title {
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
  margin-top: 0;
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
