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
import { reactive } from "vue"

const user = reactive({
  name: "test",
  account: 123456,
  signature: "这是个啥",
  url: "testurl"
})

</script>

<style scoped>
#userface {
    background-color: lightgray;
    /* 设置背景色为浅灰色 */
    padding: 10px;
    /* 添加一些内边距 */
    padding-left: 0;
    /* 去掉左边的padding */
    display: flex;
    /* 使用flex布局 */
    align-items: center;
    /* 垂直居中 */
}

.el-avatar {
    border-radius: 4px;
    /* 设置边框半径为4px，使其为矩形，带有稍微圆角 */
    width: 100px;
    /* 设置头像的宽度 */
    height: 100px;
    /* 设置头像的高度 */
    overflow: hidden;
    /* 确保头像内容保持在定义的形状内 */
    margin-left: 10px;
    /* 将头像框移动到userface左边界10px处 */
}


/* 如果您需要完全没有圆角的矩形头像，将border-radius设置为0 */
.el-avatar {
    border-radius: 0;
}

.userinfo {
    display: flex;
    flex-direction: column;
    /* 垂直排列子元素 */
    justify-content: center;
    /* 垂直居中对齐 */
}

.username,
.useraccount,
.usersignature {
    margin: 2px 0;
    /* 每个信息项之间添加一些间距 */
}
</style>  