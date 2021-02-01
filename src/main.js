// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
// 引入css
import "./assets/css/reset.css";
// 引入UI组件样式
import "element-ui/lib/theme-chalk/index.css";
// 引用公共方法
import { selectDictLabel } from "@/utils/public";

// 全局方法挂载
Vue.prototype.selectDictLabel = selectDictLabel;

// import axios from 'axios'
// axios.baseURL = 'http://192.168.0.195:8089/'
// Vue.prototype.$axios = axios
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

export default { selectDictLabel };
