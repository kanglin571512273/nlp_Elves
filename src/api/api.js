import axios from '@/utils/request'
/*
 用户管理
*/

// 获取用户列表
export const getUserList = (params) => {
    return axios.request({
        url: '/system/user/page',
        method: 'get',
        params
    })
}
// 获取个人信息
export const getUserInfo = (params) => {
    return axios.request({
        url: `/system/user/${params}`,
        method: 'get',
    })
}
// 修改用户状态
export const editUserState = (data) => {
    return axios.request({
        url: '/system/user/changeStatus',
        method: 'put',
        data
    })
}
// 删除用户
export const deleteUser = (params) => {
    return axios.request({
        url: `/system/user/${params}`,
        method: 'delete',
    })
}
// 获取用户可选角色
export const getUserRoleSelect = (params) => {
    return axios.request({
        url: `/system/role/userRoleSelect/${params}`,
        method: 'get',
    })
}
// 修改用户信息
export const editUserInfo = (data) => {
    return axios.request({
        url: "/system/user",
        method: 'put',
        data
    })
}
// 修改用户信息
export const addUser = (data) => {
    return axios.request({
        url: "/system/user",
        method: 'post',
        data
    })
}
// 获取所有角色列表
export const getAllRoleList = () => {
    return axios.request({
        url: "/system/role/list",
        method: 'get',
    })
}

/* 角色管理 */

// 获取角色列表
export const getRoleList = (params) => {
    return axios.request({
        url: '/system/role/page',
        method: 'get',
        params
    })
}