<template>
    <div>
      <div class="header">
        <div class="title">
          <h2>软件杯小队名</h2>
        </div>
        <nav class="navbar">
          <ul>
            <li>
              <a href="#"
                ><span>用户：{{ nickname }}</span></a
              >
            </li>
            <li><a href="#">退出</a></li>
          </ul>
        </nav>
      </div>
      <div class="split-screen">
        
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  
  </script>
  
  <style scoped>
  .header {
    position: fixed; /* 将header位置固定 */
    top: 0; /* 固定在顶部 */
    left: 0; /* 固定在左边 */
    width: 100%; /* 占据整个宽度 */
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    box-sizing: border-box; /* 确保内边距包含在总宽度内 */
    z-index: 1000; /* 确保header在最上层 */
  }
  
  .title {
    margin-right: 20px;
    white-space: nowrap; /* 防止标题换行 */
  }
  
  .navbar {
    margin-left: auto; /* 将navbar推到右边 */
    display: flex;
    align-items: center; /* 确保垂直居中对齐 */
  }
  
  .navbar ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
  }
  
  .navbar li {
    margin-left: 15px;
    white-space: nowrap; /* 防止用户和退出换行 */
  }
  
  .navbar li a {
    color: #18183f;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    padding: 5px; /* 减小padding */
  }
  
  .navbar li a:hover {
    color: aqua;
  }
  
  .split-screen {
    display: flex;
    height: calc(100vh - 90px); /* 100vh 减去 header 高度 */
    padding-top: 60px; /* 确保内容不被header遮挡 */
  }
  
  
  </style>
  