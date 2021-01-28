import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/robot",
      component: () => import(/* webpackChunkName: 'home' */ "@/views/home"),
      children: [
        {
          path: "/robot",
          name: "robot",
          component: () =>
            import(/* webpackChunkName: 'robot' */ "@/views/robotCenter")
        },
        {
          path: "/information", //机器人概览
          name: "information",
          component: () =>
            import(/* webpackChunkName: 'myKnowledge' */ "@/views/information"),
          redirect: "/information/overview",
          children: [
            {

              path: "overview",
              name: "overview",
              component: () =>
                import(
                  /* webpackChunkName: 'myKnowledge' */ "../views/information/overview.vue"
                )
            },
            {
              path: "custom",
              name: "custom",
              component: () =>
                import(
                  /* webpackChunkName: 'myKnowledge' */ "../views/information/custom.vue"
                )
            }
          ]
        },
        {
          path: "/product",
          name: "product",
          component: () =>
            import(/* webpackChunkName: 'product' */ "@/views/productLibrary")
        },
        {
          path: "/knowledge",
          name: "knowledge",
          component: () =>
            import(/* webpackChunkName: 'knowledge' */ "@/views/knowledgeBase"),
          redirect: "/knowledge/myKnowledge",
          children: [
            {
              path: 'myKnowledge',//我的知识库
              name: 'myKnowledge',
              component: () => import( /* webpackChunkName: 'myKnowledge' */ "@/views/knowledgeBase/myKnowledge.vue"),
            },
            {
              path: 'thirdPartyKnowledge',//第三方知识库
              name: 'thirdPartyKnowledge',
              component: () => import( /* webpackChunkName: 'thirdPartyKnowledge' */ "@/views/knowledgeBase/thirdPartyKnowledge.vue"),
            },
            {
              path: 'officialKnowledge',//官方知识库
              name: 'officialKnowledge',
              component: () => import( /* webpackChunkName: 'officialKnowledge' */ "@/views/knowledgeBase/officialKnowledge.vue"),
            },
          ]
        },
        {
          path: '/createContent',//创建知识库
          name: 'createContent',
          component: () => import( /* webpackChunkName: 'officialKnowledge' */ "@/views/knowledgeBase/createContent.vue"),
        },
        {
          path: "/systemManage",//系统管理
          name: "systemManage",
          component: () =>
            import(/* webpackChunkName: 'systemManage' */ "@/views/systemManage"),
          redirect: '/userManage',
          children: [
            {
              path: '/userManage',//用户管理
              name: 'userManage',
              component: () => import( /* webpackChunkName: 'userManage' */ "@/views/systemManage/userManage.vue"),
            },
            {
              path: '/joleManage',//角色管理
              name: 'joleManage',
              component: () => import( /* webpackChunkName: 'joleManage' */ "@/views/systemManage/joleManage.vue"),
            },
            {
              path: '/authorityManage',//权限管理
              name: 'authorityManage',
              component: () => import( /* webpackChunkName: 'authorityManage' */ "@/views/systemManage/authorityManage.vue"),
            },
          ]
        },
        {
          path: '/chatRoom',//聊天室
          name: 'chatRoom',
          component: () => import( /* webpackChunkName: 'chatRoom' */ "@/components/ChatRoom.vue"),
        },
      ]
    },
    {
      path: "/login",
      name: "login",
      userManage: () => import(/* webpackChunkName: 'login' */ "@/views/login")
    }
  ]
});
