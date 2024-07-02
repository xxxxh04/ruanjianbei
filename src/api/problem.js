//导入request.js请求工具
import request from "@/utils/request.js";

export const problemFindAllService = () => {
  return request.get("/problem/findall");
};

export const problemSearchService = (params) => {
  return request.post("/problem/search", params);
};

//根据id查找题目
export const findProblemService = (id) => {
  return request.get("/problem/findByid/" + id);
};

//评测代码
export const problemTestService = (formData) => {
  const params = new URLSearchParams();
  for (let key in formData) {
    params.append(key, formData[key]);
  }
  return request.post("/problem/sendQuestion", params);
};
