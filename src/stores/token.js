//定义store
import { defineStore } from "pinia";
import { ref } from "vue";
/*
    第一个参数：名字，唯一性
    第二个参数：函数，函数内部可以定义状态的所有内容
    第三个参数：配置
    返回值：函数
*/
export const useTokenStore = defineStore(
  "token",
  () => {
    //定义状态内容

    //1. 响应式变量
    const token = ref("");

    //2. 定义setter函数
    const setToken = (newToken) => {
      token.value = newToken;
    };

    //3. 定义移除函数
    const removeToken = () => {
      token.value = "";
    };

    return { token, setToken, removeToken };
  },
  {
    persist: true, //持久化存储
  }
);
