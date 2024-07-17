<template>
  <div class="modif">
    <div id="title">
      <h3>修改信息</h3>
    </div>
    <div class="modif_form">
      <el-form :model="form" label-width="100px" style="max-width: 100%">
        <div class="form-row">
          <el-form-item label="头像">
            <el-input
              class="custom-input"
              v-model="form.picture"
              placeholder="Enter picture URL"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input
              class="custom-input"
              v-model="form.username"
              placeholder="Enter username"
            ></el-input>
          </el-form-item>
        </div>
        <div class="form-row">
          <el-form-item label="电话">
            <el-input
              class="custom-input"
              v-model="form.phone"
              placeholder="Enter phone number"
            ></el-input>
          </el-form-item>
        </div>
        <div class="form-row">
          <el-form-item label="邮箱">
            <el-input
              class="custom-input"
              v-model="form.email"
              placeholder="Enter email"
            ></el-input>
          </el-form-item>
        </div>
        <div class="form-row">
          <el-form-item label="个人简介">
            <el-input
              class="custom-input"
              v-model="form.signature"
              placeholder="Enter signature"
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" class="custom-button" @click="handleSubmit"
            >修改个人信息</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="changepassword">
      <h3>修改密码</h3>
      <el-form
        :model="passwordForm"
        label-width="100px"
        style="max-width: 100%"
      >
        <div class="form-row">
          <el-form-item label="原密码">
            <el-input
              type="password"
              class="custom-input"
              v-model="passwordForm.currentPassword"
              placeholder="输入原密码"
            ></el-input>
          </el-form-item>
        </div>
        <div class="form-row">
          <el-form-item label="新密码">
            <el-input
              type="password"
              class="custom-input"
              v-model="passwordForm.newPassword"
              placeholder="输入新密码"
            ></el-input>
          </el-form-item>
        </div>
        <div class="form-row">
          <el-form-item label="确认新密码">
            <el-input
              type="password"
              class="custom-input"
              v-model="passwordForm.confirmPassword"
              placeholder="确认新密码"
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button
            type="primary"
            class="custom-button"
            @click="handleChangePassword"
            >修改密码</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useUserInfoStore } from "@/stores/user";
import { updateInfo, userInfoService, userChangePassword } from "@/api/user";
import { ElMessage } from "element-plus";
import { classFindService } from "@/api/class.js";
const form = ref({
  picture: "",
  username: "",
  password: "",
  phone: "",
  email: "",
  signature: "",
});
// 创建响应式数据对象，用于存储修改密码的信息
const passwordForm = ref({
  currentPassword: "", // 当前密码
  newPassword: "", // 新密码
  confirmPassword: "", // 确认新密码
});
const userInfoStore = useUserInfoStore();

const fetchUserInfo = async () => {
  form.value = userInfoStore.info;
};

const handleSubmit = async () => {
  await updateInfo(form.value);
  const result = ref(null);
  console.log("修改前：", userInfoStore.info);
  if (userInfoStore.info.cid === null) {
    result.value = await userInfoService();
  } else {
    result.value = await classFindService();
  }
  ElMessage({
    message: "修改成功",
    type: "success",
  });
  console.log("修改后：", result.value.data);
  userInfoStore.setInfo(result.value.data);
  await fetchUserInfo();
};
const handleChangePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    ElMessage({
      message: "新密码不一致！",
      type: "error",
    });
  } else {
    await userChangePassword(passwordForm.value);
    ElMessage({
      message: "密码修改成功",
      type: "success",
    });
  }
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
