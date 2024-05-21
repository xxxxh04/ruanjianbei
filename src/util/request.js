//定制请求实例

//导入axios
import axios from "axios";
//定义一个变量，记录公共的前缀
const baseURL = "http://localhost:8080";
const instance = axios.create({ baseURL });

//添加响应拦截器
instance.interceptors.response.use(
  (result) => {
    return result.data;
  },
  (err) => {
    console.log("请求失败");
    return Promise.reject(err); //异步的状态转化成失败的状态
  }
);

export default instance;
