<template>
  <div>
    <div id="userface">
      <el-avatar :src="user.url"></el-avatar>
      <div class="userinfo">
        <div class="username">{{ user.name }}</div>
        <div class="useraccount">{{ user.account }}</div>
        <div class="usersignature">{{ user.signature }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const user = reactive({
  name: "test",
  account: 123456,
  signature: "这是个啥",
  url: "testurl",
});
</script>

<style scoped></style>
