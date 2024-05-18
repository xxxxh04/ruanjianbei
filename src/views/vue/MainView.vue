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
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          @select="handleSelect"
        >
          <el-menu-item index="1" @click="navigateTo('/')">
            <i class="el-icon-user-solid"></i>
            <span slot="title">主页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>功能</span>
            </template>
            <el-menu-item index="2-1" @click="navigateTo('/ceshi')"
              >1.智能评测系统</el-menu-item
            >
            <el-menu-item index="2-2">2.</el-menu-item>
          </el-submenu>
          <el-menu-item index="3">
            <i class="el-icon-location"></i>
            <span slot="title">关于</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-phone"></i>
            <span slot="title">联系</span>
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

<script>
export default {
  methods: {
    navigateTo(path) {
      if (this.$route.path !== path) {
        this.$router.push(path).catch((err) => {
          if (err.name !== "NavigationDuplicated") {
            console.error(err);
          }
        });
      }
    },
  },
};
</script>

<style scoped>
@import "../CSS/MainView.css";
@import "../CSS/TitleAndNavigationBar.css";
</style>   