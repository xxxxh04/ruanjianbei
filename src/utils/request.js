//定制请求的实例
import axios from "axios";
//导入element-plus
import { ElMessage } from "element-plus";
//定义一个变量,记录公共的前缀  ,  baseURL
const baseURL = "/api"; //http://localhost:5173/api
const instance = axios.create({ baseURL });

//引入token.js
import { useTokenStore } from "@/stores/token";

//引入路由
import router from "@/router";

//添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    //请求前的回调
    const tokenStore = useTokenStore();
    if (tokenStore.token) {
      config.headers.Authorization = tokenStore.token;
    }

    return config;
  },

  (err) => {
    //请求错误的回调
    Promise.reject(err);
  }
);

//添加响应拦截器
instance.interceptors.response.use(
  (result) => {
    //判断业务状态码
    if (result.data.code === 0) {
      return result.data;
    } else {
      ElMessage.error("服务异常");
    }
    //异步操作的状态转换为失败
    return Promise.reject(result.data);
  },
  (err) => {
    if (err.response.status === 401) {
      ElMessage.error("请先登录");
      router.push("/login");
    } else {
      ElMessage.error("服务异常");
    }
    return Promise.reject(err); //异步的状态转化成失败的状态
  }
);

export default instance;
