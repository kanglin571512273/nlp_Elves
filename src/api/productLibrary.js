import axios from "@/utils/request";
// 获取产品库列表
export const getList = data => {
  return axios.request({
    url: "/library/list",
    method: "post",
    data
  });
};
// 创建机器人
export const addrobotts = params => {
  return axios.request({
    url: "/v1/robot",
    method: "get",
    params
  });
};
