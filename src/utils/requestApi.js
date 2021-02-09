import { MessageBox, Message } from "@/utils/importFile";
/**
 * 列表数据请求封装
 * @param requestApi    @/api/api中的请求后台数据的函数名
 * @param data          请求数据传递的参数
 * @param callback      对调函数，请求成功后，做的操作
 */
// 获取列表
export const _getList = async (requestApi, data, callback) => {
    try {
        const res = await requestApi(data);
        if (res.code !== 200) return Message.error(res.msg);
        callback(res)
    } catch (error) {
        console.log(error);
    }
}
/**
 * 删除列表数据
 * @param requestApi    @/api/api中的请求后台数据的函数名
 * @param pages         分页对象，里面有pageNum,pageSize,total
 * @param id            要删除的那个 tableItem 的 ID
 * @param callback      对调函数，请求成功后，做的操作
 */
export const _delete = async (requestApi, pages, id, callback) => {
    const { pageSize, total } = pages;
    try {
        const res = await requestApi(id);
        if (res.code !== 200) return Message.error(res.msg);
        Message.success("删除成功");
        let flag = (total - 1) % pageSize == 0
        callback(flag)
    } catch (error) {
        console.log(error);
    }
}
/**
 * 获取列表某一项数据
 * @param requestApi    @/api/api中的请求后台数据的函数名

 * @param id            要获取的那个 tableItem 的 ID
 * @param callback      对调函数，请求成功后，做的操作
 */
export const _getInfo = async (requestApi, id, callback) => {
    try {
        const res = await requestApi(id);
        if (res.code !== 200) return Message.error(res.msg);
        callback(res)
    } catch (error) {
        console.log(error);
    }
}
/**
 * 修改状态
 * @param requestApi    @/api/api中的请求后台数据的函数名
 * @param data          请求时要传的参数
 * @param callback      对调函数，请求成功后，做的操作
 */
export const _editStatus = async (requestApi, data, callback) => {
    try {
        const res = await requestApi(data);
        if (res.code !== 200) return Message.error(res.msg);
        Message.success("修改成功");
        callback()
    } catch (error) {
        console.log(error);
    }
}
/**
 * 获取用户可选角色  获取全部角色
 * @param requestApi    @/api/api中的请求后台数据的函数名
 * @param data          请求时要传的参数
 * @param callback      对调函数，请求成功后，做的操作
 */
export const _getSelect = async (requestApi, data, callback) => {
    try {
        const res = await requestApi(data);
        if (res.code !== 200) return Message.error(res.msg);
        callback(res)
    } catch (error) {
        console.log(error);
    }
}
/**
 * 获取用户可选角色  获取全部角色
 * @param requestApi    @/api/api中的请求后台数据的函数名
 * @param data          请求时要传的参数
 * @param callback      对调函数，请求成功后，做的操作
 */
export const _addItem = async (requestApi, data, callback) => {
    try {
        // creatOrEditId :  0 创建 1 修改
        const res = await requestApi(data);
        if (res.code !== 200) return Message.error(res.msg);
        callback()
    } catch (error) {
        console.log(error);
    }
}
// 删除前提问
export const deleteItem = function (callback) {
    MessageBox.confirm("此操作将删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            // this.deleteUser(row.userId);
            callback()
        })
        .catch(() => {
            Message.info("已取消删除");
        });
};
