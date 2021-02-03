import axios from '@/utils/request'
// 路由管理。 权限控制
// 获取用户列表
export const getRouteMenu = () => {
    return axios.request({
        url: '/getInfo',
        method: 'get',
    })
}

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
// 删除角色
export const deleteRole = (params) => {
    return axios.request({
        url: `/system/role/${params}`,
        method: 'delete',
    })
}
// 获取权限列表
export const getAuthList = (params) => {
    return axios.request({
        url: '/system/menu/list',
        method: 'get',
        params
    })
}
// 获取权限列表及选中权限
export const getAuthAndChoosed = (params) => {
    return axios.request({
        url: `/system/menu/roleMenuTreeSelect/${params}`,
        method: 'get',
    })
}
// 获取角色信息
export const getRoleInfo = (params) => {
    return axios.request({
        url: `/system/role/${params}`,
        method: 'get',
    })
}
// 新增角色信息
export const addRoleInfo = (data) => {
    return axios.request({
        url: '/system/role',
        method: 'post',
        data
    })
}
// 修改角色信息
export const editRoleInfo = (data) => {
    return axios.request({
        url: '/system/role',
        method: 'put',
        data
    })
}

/* 权限管理 */
// 获取权限列表
export const getMenuList = (params) => {
    return axios.request({
        url: `/system/menu/page`,
        method: 'get',
        params
    })
}
// 删除角色
export const deleteMenuItem = (params) => {
    return axios.request({
        url: `/system/menu/${params}`,
        method: 'delete',
    })
}
// 获取权限信息
export const getMenuInfo = (params) => {
    return axios.request({
        url: `/system/menu/${params}`,
        method: 'get',
    })
}
// 新增角色信息
export const addMenuInfo = (data) => {
    return axios.request({
        url: '/system/menu',
        method: 'post',
        data
    })
}
// 修改角色信息
export const editMenuInfo = (data) => {
    return axios.request({
        url: '/system/menu',
        method: 'put',
        data
    })
}
/* 知识库 */
// 获取知识库列表
export const getKnowList = (params) => {
    return axios.request({
        url: '/getgraph',
        method: 'get',
        params
    })
}
// 删除知识库
export const deleteKnowItem = (params) => {
    return axios.request({
        url: '/deletedomain',
        method: 'delete',
        params
    })
}
// 修改发布状态
export const editReleaseStatus = (params) => {
    return axios.request({
        url: `/knowledge/release/${params.ids}/${params.status}`,
        method: 'get',
    })
}
// 查询知识库详情
export const getKnowInfo = (params) => {
    return axios.request({
        url: `/knowledge/getKnowDetail`,
        method: 'get',
        params
    })
}
// 创建知识库
export const addKnowInfo = (params) => {
    return axios.request({
        url: `/createdomain`,
        method: 'post',
        params
    })
}
// 修改知识库
export const editKnowInfo = (data) => {
    return axios.request({
        url: `/knowledge/updateKnowledge`,
        method: 'put',
        data
    })
}
// 聊天测试
export const chatTest = (params) => {
    return axios.request({
        url: `/v1/robotLibrary/chatTest`,
        method: 'get',
        params
    })
}