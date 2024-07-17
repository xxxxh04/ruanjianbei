<template>
  <div class="modif">
    <div class="title">
      <h3>个人信息</h3>
    </div>
    <div class="modif_form">
      <el-form :model="form" label-width="100px" style="max-width: 100%">
        <div class="form-row">
          <el-form-item label="头像">
            <el-input class="custom-input" v-model="form.picture" placeholder="输入头像URL"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input class="custom-input" v-model="form.username" placeholder="输入用户名"></el-input>
          </el-form-item>
        </div>
        <div class="form-row">
          <el-form-item label="电话">
            <el-input class="custom-input" v-model="form.phone" placeholder="输入电话号码"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input class="custom-input" v-model="form.email" placeholder="输入邮箱"></el-input>
          </el-form-item>
        </div>
        <div class="form-row">
          <el-form-item label="个人简介">
            <el-input class="custom-input" v-model="form.signature" placeholder="输入个人简介"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" class="custom-button" @click="handleSubmit">修改个人信息</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="changepassword">
      <h3>修改密码</h3>
      <el-form :model="passwordForm" label-width="100px" style="max-width: 100%">
        <div class="form-row">
          <el-form-item label="原密码">
            <el-input type="password" class="custom-input" v-model="passwordForm.currentPassword" placeholder="输入原密码"></el-input>
          </el-form-item>
        </div>
        <div class="form-row">
          <el-form-item label="新密码">
            <el-input type="password" class="custom-input" v-model="passwordForm.newPassword" placeholder="输入新密码"></el-input>
          </el-form-item>
        </div>
        <div class="form-row">
          <el-form-item label="确认新密码">
            <el-input type="password" class="custom-input" v-model="passwordForm.confirmPassword" placeholder="确认新密码"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" class="custom-button" @click="handleChangePassword">修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { useUserInfoStore } from "@/stores/user";
import { userInfoService } from "@/api/user";

// 创建响应式数据对象，用于存储用户信息
const form = reactive({
  picture: '', // 头像URL
  username: '', // 用户名
  phone: '', // 电话
  email: '', // 邮箱
  signature: '', // 个人简介
});

// 创建响应式数据对象，用于存储修改密码的信息
const passwordForm = reactive({
  currentPassword: '', // 当前密码
  newPassword: '', // 新密码
  confirmPassword: '', // 确认新密码
});

// 获取用户信息存储实例
const userInfoStore = useUserInfoStore();

// 异步函数，用于获取用户信息并更新表单
const fetchUserInfo = async () => {
  const userInfo = await userInfoService.getUserInfo();
  Object.assign(form, userInfo);
};

// 异步函数，用于提交表单以更新用户信息
const handleSubmit = async () => {
  await userInfoService.updateUserInfo(form);
  userInfoStore.setUserInfo(form);
};

// 异步函数，用于提交修改密码的表单
const handleChangePassword = async () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    return alert("新密码不一致！");
  }
  await userInfoService.changePassword(passwordForm);
  alert("密码修改成功");
};

// 在组件挂载时调用函数以获取用户信息
onMounted(() => {
  fetchUserInfo();
});
</script>

<style scoped>
.modif {
}

.title {
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

.changepassword {
  width: 80%;
  margin-left: 10%;
  margin-top: 20px;
}

.changepassword h3 {
  margin-bottom: 10px;
}


</style>
