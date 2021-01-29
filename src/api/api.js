import axios from '@/utils/request'
/* 第一种请求方式 */
/* export const update = (data) => {
    return axios.request({
        url: '/update',
        method: 'post',
        data
    })
}
export const getList = (params) => {
    return axios.request({
        url: '/getList',
        method: 'get',
        params
    })
} */
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