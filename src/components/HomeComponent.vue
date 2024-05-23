<template>
  <div>
    <div id="userface">
      <el-avatar :src="user.picture"></el-avatar>
      <div class="userInfo">
        <div class="userPicture">{{ user.picture }}</div>
        <div class="userName">{{ user.username }}</div>
        <div class="userNickname">{{ user.nickname }}</div>
        <div class="userPhone">{{ user.phone }}</div>
        <div class="userSignature">{{ user.signature }}</div>
        <div class="userEmail">{{ user.email }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
let user = ref({
  id: "",
  nickname: "test",
  username: "",
  phone: 123456,
  signature: "这是个啥",
  picture: "testurl",
  email: "",
  create_time: null,
  update_time: null,
});
onMounted(() => {
  axios.get("http://localhost:8080/user/userinfo?id=" + "1").then((result) => {
    console.log(result.data.data);
    user.value = result.data.data;
    console.log("user:" + user);
  });
});
</script>

<style scoped></style>
