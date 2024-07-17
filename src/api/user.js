//导入request.js请求工具
import request from "@/utils/request.js";

//提供调用注册接口的函数
export const userRegisterService = (registerData) => {
  const params = new URLSearchParams();
  for (let key in registerData) {
    params.append(key, registerData[key]);
  }
  return request.post("/user/register", params);
};

//登录接口函数
export const userLoginService = (loginData) => {
  const params = new URLSearchParams();
  for (let key in loginData) {
    params.append(key, loginData[key]);
  }
  return request.post("/user/login", params);
};

export const userInfoService = () => {
  return request.get("/user/userInfo");
};

//查询所在班级的学生
export const queryStudentByClassId = (classId) => {
  return request.get("/user/stuList", { params: { classId } });
};

//按条件查询学生
export const searchStudent = (queryParams) => {
  const params = new URLSearchParams();
  for (let key in queryParams) {
    params.append(key, queryParams[key]);
  }
  return request.post("/user/searchStu", params);
};

//按id查询学习情况
export const queryConditon = (id) => {
  return request.get("/user/condition", { params: { id } });
};

//更新信息
export const updateInfo = (updateData) => {
  return request.put("/user/update", updateData);
};

//修改密码
export const userChangePassword = (updateData) => {
  const params = new URLSearchParams();
  for (let key in updateData) {
    params.append(key, updateData[key]);
  }
  return request.patch("/user/updatePwd", params);
};
