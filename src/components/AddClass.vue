<template>
  <div class="ceshi">
    <div id="title">
      <h3>加入班级</h3>
    </div>
    <div id="classmeau">
      <el-table :data="classmeau" style="width: 80%; margin-left: 10%">
        <el-table-column
          prop="cid"
          label="班级ID"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="cname"
          label="班级名称"
          width="600"
        ></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              v-if="scope.row.cid != cid"
              class="add_button"
              @click="joinClass(scope.row)"
              type="primary"
              size="small"
              >加入班级</el-button
            >
            <el-button v-else type="primary" size="small" class="joined"
              >已加入</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserInfoStore } from "@/stores/user.js";
let classmeau = ref([
  {
    cid: "1",
    cname: "计算机",
  },
]);
const userInfoStore = useUserInfoStore();
const cid = ref(userInfoStore.info.cid);
import { classJoinService } from "@/api/class.js";
import { ElMessage } from "element-plus";
import { classFindAllService, classFindService } from "@/api/class.js";
const joinClass = async (row: any) => {
  // 处理加入班级的逻辑
  console.log("加入班级: ", row.cid);
  await classJoinService(row.cid);
  ElMessage({
    message: "加入成功",
    type: "success",
  });
  const result = await classFindService();
  userInfoStore.setInfo(result.data);
  cid.value = userInfoStore.info.cid;
};
const findClass = async () => {
  const result = await classFindAllService();
  classmeau.value = result.data;
};
onMounted(() => {
  // 可以在这里获取数据
  findClass();
});
</script>

<style scoped>
#title {
  padding: 10px;
  padding-left: 0;
  display: flex;
  align-items: center;
  margin-left: 10%;
}

#title h3 {
  margin-top: 10px;
  margin-left: 9%;
}

#classmeau {
  width: 80%;
  margin-left: 10%;
}

#classmeau ::v-deep .el-table th {
  background-color: #eeeeee;
}

.add_button {
  background-color: #ff7f50; /* 设置按钮的背景颜色 */
  border-color: #ff7f50; /* 设置按钮的边框颜色 */
  color: white; /* 设置按钮的文本颜色 */
  width: 75px;
}

.joined {
  background-color: #50ff7c; /* 设置按钮的背景颜色 */
  border-color: #50ff70; /* 设置按钮的边框颜色 */
  color: white; /* 设置按钮的文本颜色 */
  width: 75px;
}

.add_button:hover {
  background-color: #ff6347; /* 设置按钮在悬停时的背景颜色 */
  border-color: #ff6347; /* 设置按钮在悬停时的边框颜色 */
}
</style>
