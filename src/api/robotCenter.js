import axios from "@/utils/request";

// 登录
export const postlogin = data => {
  return axios.request({
    url: "/login",
    method: "post",
    data
  });
};

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
    url: "/v1/robot/" + params,
    method: "delete"
  });
};
// 列表详情
export const detailsList = params => {
  return axios.request({
    url: "/v1/robot/" + params,
    method: "get"
  });
};
// 编辑列表
export const editList = data => {
  return axios.request({
    url: "/v1/robot",
    method: "put",
    data
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
// 获取知识库列表
export const getrobotLibrary = params => {
  return axios.request({
    url: "/v1/robotLibrary/list",
    method: "get",
    params
  });
};
// 获取已配置知识库列表
export const getconfiguredList = params => {
  return axios.request({
    url: "/v1/robotLibrary/configuredList",
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

// 添加知识库配置
export const addConfiguration = params => {
  return axios.request({
    url: "/v1/robotLibrary/addConfiguration",
    method: "get",
    params
  });
};
// 个性化配置列表
export const problemList = params => {
  return axios.request({
    url: "/v1/question/list",
    method: "get",
    params
  });
};
// 新增问题
export const addquestion = data => {
  return axios.request({
    url: "/v1/question",
    method: "post",
    data
  });
};
// 获取问题详情
export const getquestion = params => {
  return axios.request({
    url: "/v1/question/" + params,
    method: "get"
  });
};
// 删除列表
export const deleteQuestion = params => {
  return axios.request({
    url: "/v1/question/" + params,
    method: "delete"
  });
};