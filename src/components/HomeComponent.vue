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
  
<script>
export default {
  name: "HomeComponent",
  data() {
    return {
      user: [],
    };
  },
  mounted() {},
};
</script>

<style scoped>
@import "./css/HomeComponent.css";
</style>  