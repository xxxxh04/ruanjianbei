<template>
  <div>
    <div id="userface">
      <el-avatar :src="user.picture"></el-avatar>
      <div class="userInfo">
        <div class="userPicture">{{ user.picture }}</div>
        <div class="userName">{{ user.username }}</div>
        <div class="userNickname">{{ user.nickname }}</div>
        <div class="userPhone">{{ user.phone }}</div>
        <div class="userEmail">{{ user.email }}</div>
      </div>
    </div>
    <div class="student_information">
      <div class="modif_information left_section">
        <div class="userSignature">
          <span class="span_information">个人简历：</span>{{ user.signature }}
        </div>
        <el-button class="modif_button" type="primary" @click="navigateToModif"
          >修改信息</el-button
        >
      </div>
      <div class="modif_information right_section">
        <div class="userSignature">
          <span class="span_information">我的班级：</span>
          <span>{{ user.cname }}</span>
        </div>
        <el-button class="modif_button" type="primary" @click="navigateToAdd"
          >加入班级</el-button
        >
      </div>
    </div>
    <LineChart />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useUserInfoStore } from "@/stores/user.js";
import { useRouter } from "vue-router";
import LineChart from "./LineChart.vue";

const router = useRouter();

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
  role: "",
  acNum: "",
  cid: 0,
  cname: "",
});
const navigateToModif = () => {
  router.push("/modif");
};
const navigateToAdd = () => {
  router.push("/addclass");
};

onMounted(() => {
  const userInfoStore = useUserInfoStore();
  console.log("userInfo:", userInfoStore.info);
  user.value = userInfoStore.info;
  watch(
    () => userInfoStore.info,
    (newInfo) => {
      console.log("newInfo:", newInfo);
      userInfoStore.setInfo(newInfo);
      user.value = newInfo.username;
    }
  );
});
</script>

<style scoped>
#userface {
  background-color: #eeeeee;
  padding: 10px;
  padding-left: 0;
  display: flex;
  align-items: center;
  width: 80%;
  margin-left: 10%;
  margin-top: 6%;
}

.el-avatar {
  border-radius: 4px;
  width: 100px;
  height: 100px;
  overflow: hidden;
  margin-left: 10px;
}

.userinfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.username,
.useraccount,
.usersignature {
  margin: 2px 0;
}

.student_information {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-left: 10%;
  margin-top: 10px;
  background-color: #eeeeee;
  padding: 10px;
}

.modif_information {
  flex-basis: 48%;
  padding: 10px;
  padding-left: 0;
  padding-top: 2px;
  display: flex; /* 使用Flex布局 */
  flex-direction: column; /* 垂直排列内容 */
  justify-content: flex-start; /* 内容向左对齐 */
}

.modif_button {
  background: linear-gradient(135deg, #00dcc2, #00dc93) !important;
  margin-left: 0; /* 确保按钮没有左边距 */
  margin-top: 10px; /* 添加顶部间距以增加可读性 */
  width: 20%;
}

.userSignature {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.span_information {
  margin-right: 10px;
  font-weight: bold;
  color: #333;
}
</style>
