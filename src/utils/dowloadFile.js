
// // 下载文件， 二进制流转换
// /**
//  *
//  * @param {*} data 需要下载的流
//  * @param {*} fileName 下载的文件名
//  */
// export function downFile(data, fileName) {
//     if (!data) {
//         return
//     }
//     const BLOB = new Blob([data], {
//         type: 'application/json'
//     })
//     // 查看blob中是否有返回异常
//     new Promise((resolve, reject) => {
//         const fileReader = new FileReader()
//         fileReader.readAsText(BLOB)
//         fileReader.onload = function () {
//             try {
//                 const result = JSON.parse(this.result)
//                 console.log(result);
//                 if (result && result.code && result.code !== 0) {
//                     reject(result.message)
//                 } else {
//                     resolve(BLOB)
//                 }
//             } catch (e) {
//                 // TODO handle the exception
//                 resolve(BLOB)
//             }
//         }
//     })
//         .then(res => {
//             doExport(res)
//         })
//         .catch(error => {
//             Message.closeAll()
//             Message({
//                 message: error || 'Error',
//                 type: 'error',
//                 duration: 2 * 1000
//             })
//         })

    //使用
    // async downloadExcel() {
    //     const res = await downloadRegionExcel(this.searchForm);
    //     downFile(res, "总案件详情.xlsx");
    // },