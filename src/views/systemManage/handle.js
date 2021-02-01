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
}