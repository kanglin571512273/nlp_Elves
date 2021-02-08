export default {
  // 配置显示在浏览器标签的title
  title: "nlp智能语音盒子",

  // token在Cookie中存储的天数，默认1天
  cookieExpires: 1,

  // 是否使用国际化，默认为false 如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'} 用来在菜单中显示文字
  useI18n: true,

  // api请求基础路径
  baseUrl: {
    // dev: "http://192.168.0.195:8089/",//飞哥
    // dev: "http://192.168.2.180:8089/",//刘永坤
    // dev: "http://192.168.2.119:8089/",//家乐
    dev: "/aip/",//家乐
    // dev: "http://192.168.1.27:8089/", //服务器
    pro: "http://192.168.0.195:8089/"
  },

  // 默认打开的首页的路由name值，默认为home
  homeName: "home",

  // 需要加载的插件
  plugin: {}
};
