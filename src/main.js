// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
// 引入css
import "./assets/css/reset.css";
// 引入UI组件样式
import "element-ui/lib/theme-chalk/index.css";
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
