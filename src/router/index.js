import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/robot",
      component: () => import(/* webpackChunkName: 'home' */ "@/views/home")
    },
    {
      path: "/login",
      name: "login",
      component: () => import(/* webpackChunkName: 'home' */ "@/views/login")
    },
    {
      path: "/robot",
      name: "robot",
      component: () =>
        import(/* webpackChunkName: 'robot' */ "@/views/robotCenter")
    },
    {
      path: "/information",
      name: "information",
      component: () =>
        import(
          /* webpackChunkName: 'knowledge' */ "@/views/robotCenter/information"
        )
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
      children: [
        {
          path: "addKnowledge",
          name: "addKnowledge",
          component: () =>
            import(
              /* webpackChunkName: 'knowledge' */ "@/views/knowledgeBase/addKnowledge"
            )
        }
      ]
    }
  ]
});
