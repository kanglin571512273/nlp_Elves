import axios from '@/utils/request'
/* 第一种请求方式 */
export const update = (data) => {
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
}
/* 第二种请求方式 */
export const getList = (params) => {
    return axios.get('/getList', params)
}