import request form "@/utils/request.js"

export const userInfoService = (id)=>{
    return request.get("/user/userinfo",id);
}