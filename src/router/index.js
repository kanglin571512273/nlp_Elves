import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      redirect: '/login',
      component: () => import( /* webpackChunkName: 'login' */ "@/views/login")
    },
    {
      path: '/home',
      name: 'home',
      redirect: '/robot',
      component: () => import( /* webpackChunkName: 'home' */ "@/views/home"),
      children: [
        {
          path: '/robot',
          name: 'robot',
          component: () => import( /* webpackChunkName: 'robot' */ "@/views/robotCenter")
        }, {
          path: '/product',
          name: 'product',
          component: () => import( /* webpackChunkName: 'product' */ "@/views/productLibrary")

        }, {
          path: '/knowledge',
          name: 'knowledge',
          component: () => import( /* webpackChunkName: 'knowledge' */ "@/views/knowledgeBase"),
          redirect: '/knowledge/myKnowledge',
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
      ]
    },
  ]
});
