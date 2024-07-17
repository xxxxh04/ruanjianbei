//导入request.js请求工具
import request from "@/utils/request.js";

//查询所有班级
export const classFindAllService = () => {
  return request.get("/class/findAll");
};

//加入班级
export const classJoinService = (cid) => {
  const params = new URLSearchParams();
  params.append("cid", cid);
  return request.post("/class/join", params);
};

//查询班级
export const classFindService = () => {
  return request.get("/class/findById");
};
