import axios from "@/utils/request";
// 获取机器人中心列表
export const getList = params => {
  return axios.request({
    url: "/v1/robot/list",
    method: "get",
    params
  });
};
// 删除列表
export const deleteList = params => {
  return axios.request({
    url: "/v1/robot/",
    method: "get",
    params
  });
};
// 获取机器人中心字典
export const getdictionary = params => {
  return axios.request({
    url: "/dict/getTreeDict/robot_type",
    method: "get",
    params
  });
};
// 图片上传
export const upload = data => {
  return axios.request({
    url: "/img/upload",
    method: "post",
    data
  });
};
// 创建机器人
export const addrobotts = data => {
  return axios.request({
    url: "/v1/robot",
    method: "post",
    data
  });
};
