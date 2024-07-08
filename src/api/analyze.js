//导入request.js请求工具
import request from "@/utils/request.js";

export const queryErrors = (id) => {
  return request.get("/user/errors", { params: { id } });
};

export const queryCondition = (id) => {
  return request.get("/user/condition", { params: { id } });
};
