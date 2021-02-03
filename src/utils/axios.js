import axios from "axios";
import qs from "qs";
import { MessageBox, Message } from "@/utils/importFile";

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.queue = {};
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        Authorization: ""
      }
    };
    return config;
  }

  destroy(url) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        //只针对get方式进行序列化
        if (config.method === "get") {
          config.paramsSerializer = function(params) {
            return qs.stringify(params, { arrayFormat: "repeat" });
          };
        }
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          // Spin.show() // 不建议开启，因为界面不友好
        }
        this.queue[url] = true;
        // 发送请求头token
        const token = localStorage.getItem("token");
        token && (config.headers.Authorization = "");
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // 响应拦截
    instance.interceptors.response.use(
      res => {
        this.destroy(url);
        const { data } = res;
        if (typeof data === "object") {
          // 自己处理
        }
        if (data.code === 401) {
          MessageBox.confirm("用户信息已过期，请重新登录~", "超时", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            callback: () => {
              localStorage.getItem("effectToken", false);
              this.$router.push(`/login`);
            }
          });
        } else {
          localStorage.getItem("effectToken", true);
        }
        return data;
      },
      error => {
        this.destroy(url);
        let errorInfo = error.response;
        if (!errorInfo) {
          const {
            request: { statusText, status },
            config
          } = JSON.parse(JSON.stringify(error));
          errorInfo = {
            statusText,
            status,
            request: { responseURL: config.url }
          };
          console.log(errorInfo);
        }
        return Promise.reject(error);
      }
    );
  }
  request(options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    /*  options = { baseUrl, header, url, methods, data}  */
    this.interceptors(instance, options.url);
    return instance(options);
  }
}
export default HttpRequest;
