<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router"; //导入路由
const router = useRouter();
//---------------------------注册------------------------------------------
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false);

const registerData = ref({
  username: "",
  password: "",
  rePassword: "",
});

//检验密码函数
const checkRePassword = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次确认密码"));
  } else if (value !== registerData.value.password) {
    callback(new Error("确认密码是否一致"));
  } else {
    callback();
  }
};

//定义表单校验规则
const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 5, max: 16, message: "用户名为5-16位", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 5, max: 16, message: "用户名为5-16位", trigger: "blur" },
  ],
  rePassword: [{ validator: checkRePassword, trigger: "blur" }],
};

//调用后台接口，完成注册
import { userRegisterService, userLoginService } from "@/api/user.js";
const register = async () => {
  let result = await userRegisterService(registerData.value);

  ElMessage({
    message: "注册成功",
    type: "success",
  });
};

//------------------------------登录---------------------------------------
import { useTokenStore } from "@/stores/token.js";
import { useUserInfoStore } from "@/stores/user.js";
const tokenStore = useTokenStore(); //得到token的存储
//存储用户信息
const userInfoStore = useUserInfoStore();

const login = async () => {
  const result = await userLoginService(registerData.value);
  //把得到的token存储到pinia中
  console.log("result:", result);
  tokenStore.setToken(result.data);
  console.log("data:", result.data);
  console.log("token:", tokenStore.token);

  ElMessage({
    message: "登录成功",
    type: "success",
  });
  //使用路由跳转到首页
  router.push("/ceshi");
};

//清空表单函数
const clearForm = () => {
  registerData.value = {
    username: "",
    password: "",
    rePassword: "",
  };
};
</script>

<template>
  <el-row class="login-page">
    <el-col :span="6" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册表单 -->
      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
        :model="registerData"
        :rules="rules"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="registerData.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="registerData.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="rePassword">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
            v-model="registerData.rePassword"
          ></el-input>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            @click="register"
            auto-insert-space
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link
            type="info"
            :underline="false"
            style="color: #FFF;" 
            @click="
              isRegister = false;
              clearForm();
            "
          >
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录表单 -->
      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        :model="registerData"
        :rules="rules"
        v-else
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="registerData.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="registerData.password"
            
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            @click="login"
            auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <div style="display: flex; justify-content: center; width: 100%;">
  <span style="color: black;">没有账号</span> 
  <el-link
    type="info"
    :underline="false"
    style="color: #3366FF;" 
    @click="
      isRegister = true;
      clearForm();
    "
  >
    去注册 →
  </el-link>
</div>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="6" class="bg"></el-col>
  </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
body{
  
}

.login-page {
  background: url("@/assets/beijin.png");
  background-size: 100%, 100%;
  background-color: #fff;
  display: flex; // 使用 flex 布局
    justify-content: center; // 子元素在容器中水平居中
    align-items: center; // 子元素在容器中垂直居中
    height: 90vh; // 父容器高度设置为视口高度
    

  .bg {
    // background: url("@/assets/beijin.png") no-repeat 60% center / 240px auto,
    //   url("@/assets/login_bg.jpg") no-repeat center / cover;
    // border-radius: 0 20px 20px 0;
  }

  .form {
    backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    height: 60%;
    .title {
      margin: 0 auto;
    }
    h1{
      width: 100%;
    }
    .button {
      margin: 0 auto; // 将按钮居中
      border-radius: 50px; // 添加圆角样式
      width: 90%;
      background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
    }
    .el-input{
      margin-left: 5%;
      width: 90%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin: 10px;
    }
  }
}
</style>
