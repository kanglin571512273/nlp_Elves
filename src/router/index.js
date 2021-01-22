import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/robot',
      component: () => import( /* webpackChunkName: 'home' */ "@/views/home")
    }, {
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
      children: [
        {
          path: 'addKnowledge',
          name: 'addKnowledge',
          component: () => import( /* webpackChunkName: 'knowledge' */ "@/views/knowledgeBase/addKnowledge"),
        }
      ]
    }
  ]
})
