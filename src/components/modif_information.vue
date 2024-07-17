<template>
    <div class="modif">
      <div id="title">
        <h3>修改信息</h3>
      </div>
      <div class="modif_form">
        <el-form :model="form" label-width="100px" style="max-width: 100%">
          <div class="form-row">
            <el-form-item label="头像">
              <el-input class="custom-input" v-model="form.picture" placeholder="Enter picture URL"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input class="custom-input" v-model="form.username" placeholder="Enter username"></el-input>
            </el-form-item>
          </div>
          <div class="form-row">
            <el-form-item label="密码">
              <el-input class="custom-input" v-model="form.password" placeholder="Enter password"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input class="custom-input" v-model="form.phone" placeholder="Enter phone number"></el-input>
            </el-form-item>
          </div>
          <div class="form-row">
            <el-form-item label="邮箱">
              <el-input class="custom-input" v-model="form.email" placeholder="Enter email"></el-input>
            </el-form-item>

          </div>
          <div class="form-row">
            <el-form-item label="个人简介">
              <el-input class="custom-input" v-model="form.signature" placeholder="Enter signature"></el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">Submit</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { reactive, onMounted } from 'vue';
  import { useUserInfoStore } from "@/stores/user";
  import { userInfoService } from "@/api/user";
  import LineChart from './LineChart.vue';
  
  const form = reactive({
    picture: '',
    username: '',
    password: '',
    phone: '',
    email: '',
    signature: '',
  });
  
  const userInfoStore = useUserInfoStore();
  
  const fetchUserInfo = async () => {
    const userInfo = await userInfoService.getUserInfo();
    Object.assign(form, userInfo);
  };
  
  const handleSubmit = async () => {
    await userInfoService.updateUserInfo(form);
    userInfoStore.setUserInfo(form);
  };
  
  onMounted(() => {
    fetchUserInfo();
  });
  </script>
  
  <style scoped>
  .modif {
  }
  
  #title {
    padding: 10px;
    padding-left: 0;
    display: flex;
    align-items: center;
    margin-left: 10%;
    top: 10px;
  }
  
  .modif_form {
    width: 80%;
    margin-left: 10%;
  }
  
  .form-row {
    display: flex;
    justify-content: space-between;
  }
  
  .form-row .el-form-item {
    flex: 1;
  }
  
  .form-row .el-form-item:not(:last-child) {
    margin-right: 20px; /* 调整表单项之间的间距 */
  }
  </style>
  