import axios from 'axios'

class HttpRequest {

  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig() {
    const token = localStorage.getItem('token')
    const config = {
      baseURL: this.baseUrl,
      headers: {
        Authorization: token
      }
    }
    return config
  }

  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      // 发送请求头token
      const token = localStorage.getItem('token')
      token && (config.headers.Authorization = token)
      return config
    }, error => {
      return Promise.reject(error)
    })

    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data } = res
      if (typeof data === 'object') {
        // 自己处理
      }
      return data
    }, error => {
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
        console.log(errorInfo)
      }
      return Promise.reject(error)
    })
  }
  request(options) {
    const instance = axios.create()
    const token = localStorage.getItem('token')
    if (options.url == 'put') {
      return axios({
        ...options,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: token
        }
      })
    } else if (options.url == 'delete') {

    } else {

      options = Object.assign(this.getInsideConfig(), options)
      /*  options = { baseUrl, header, url, methods, data}  */
      this.interceptors(instance, options.url)
      return instance(options)
    }
  }

}
export default HttpRequest