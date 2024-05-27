<template>
  <div>
    <header>
      <h1>软件杯小队名</h1>
      <nav class="navigation">
        <a href="#" style="color: #18183f"> Home </a>
        <a href="#" style="color: #18183f"> About </a>
        <a href="#" style="color: #18183f"> Services </a>
        <a href="#" style="color: #18183f"> Contact </a>
        <button class="btnLogin-popup" style="color: #18183f">Login</button>
      </nav>
    </header>
    <div class="container">
      <div class="left-section">
        <el-menu class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="navigateTo('/')">
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>主页</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <Document />
              </el-icon>
              <span>功能</span>
            </template>
            <el-menu-item index="2-1" @click="navigateTo('/ceshi')">1.智能评测系统</el-menu-item>
            <el-menu-item index="2-2" @click="navigateTo('/analyze')">2.智能教育评价</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="3">
            <el-icon><Location /></el-icon>
            <span>关于</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><Phone /></el-icon>
            <span>联系</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right-section">
        <router-view></router-view>
      </div>
    </div>
    <footer>
      <p>&copy; 2024 软件杯小队名. 保留所有权利.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

function navigateTo(path: string) {
  router.push(path)
}
</script>


<style scoped>
@import "../assets/TitleAndNavigationBar.css";

.container {
    display: flex;
    padding-top: 20px;
    height: 800px;
}

.left-section {
    flex: 0 0 20%;

}

.right-section {
    flex: 1;
}

footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 10px;
    position: fixed;
    width: 100%;
    bottom: 0;
}
</style>