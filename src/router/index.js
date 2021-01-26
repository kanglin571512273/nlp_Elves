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
              path: "overview", //我的知识库
              name: "overview",
              component: () =>
                import(
                  /* webpackChunkName: 'myKnowledge' */ "../views/information/overview.vue"
                )
            },
            {
              path: "custom", //我的知识库
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
              path: "myKnowledge", //我的知识库
              name: "myKnowledge",
              component: () =>
                import(
                  /* webpackChunkName: 'myKnowledge' */ "../views/knowledgeBase/myKnowledge.vue"
                )
            },
            {
              path: "thirdPartyKnowledge", //第三方知识库
              name: "thirdPartyKnowledge",
              component: () =>
                import(
                  /* webpackChunkName: 'thirdPartyKnowledge' */ "../views/knowledgeBase/thirdPartyKnowledge.vue"
                )
            },
            {
              path: "officialKnowledge", //官方知识库
              name: "officialKnowledge",
              component: () =>
                import(
                  /* webpackChunkName: 'officialKnowledge' */ "../views/knowledgeBase/officialKnowledge.vue"
                )
            }
          ]
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import(/* webpackChunkName: 'login' */ "@/views/login")
    }
  ]
});
