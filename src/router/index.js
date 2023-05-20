import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import Layout from '../views/AdminView.vue'
import store from "@/store";

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: () =>import('../views/RegisterView.vue')
  },
  {
    path: '/adminLogin',
    name:'adminLogin',
    component: ()=>import('../views/AdminLoginView.vue')
  },
  {
    path: '/admin',
    name: 'AdminView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue'),
    meta: {
      showDashboard: true
    },
    children: [

      // user
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/UserView.vue'),
        meta: {
          showDashboard: false
        },
      },
      {
        path: '/file',
        name: 'file',
        component: () => import('../views/FileView.vue'),
        meta: {
          showDashboard: false
        },
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   if((to.path === '/login') || store.state.userInfo) {
//     next()
//     return
//   }
//  // next('/login')
// })

export default router
