import axios from "@/utils/request";
// 获取产品库列表
export const getList = params => {
  return axios.request({
    url: "/library/list",
    method: "get",
    params
  });
};
// 获取字典
export const getdictionary = params => {
  return axios.request({
    url: "/dict/getTreeDict/" + params,
    method: "get"
  });
};
// 创建产品库
export const addproduct = data => {
  return axios.request({
    url: "/library",
    method: "post",
    data
  });
};
// 编辑列表
export const editList = data => {
  return axios.request({
    url: "/library",
    method: "put",
    data
  });
};
// 删除列表
export const deleteList = params => {
  return axios.request({
    url: "/library/" + params,
    method: "delete"
  });
};
// 获取产品库列表
export const getproductlists = params => {
  return axios.request({
    url: "/content/list",
    method: "get",
    params
  });
};
// 创建产品内容
export const addproductcontent = data => {
  return axios.request({
    url: "/content",
    method: "post",
    data
  });
};
// 编辑产品内容
export const editproductList = data => {
  return axios.request({
    url: "/content",
    method: "put",
    data
  });
};
// 删除列表
export const indList = params => {
  return axios.request({
    url: "/content/" + params,
    method: "get"
  });
};
// 删除列表
export const deletecontentList = params => {
  return axios.request({
    url: "/content/" + params,
    method: "delete"
  });
};
// 发布
export const release = (id, status) => {
  return axios.request({
    url: "/content/release/" + id + "/" + status,
    method: "get"
  });
};

//下载
export const getexport = params => {
  return axios.request({
    url: "/content/export/" + params,
    method: "get",
    responseType: "blob"
  });
};
// 文件上传
export const upload = data => {
  return axios.request({
    url: "/img/upload",
    method: "post",
    data
  });
};
