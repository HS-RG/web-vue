import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

import store from "@/store";

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path:'/myinfo',
    name:'myinfo',
    component: () =>import('../views/MyInfoView.vue'),
    children: [
      {
        path:'/myinfo',
        name:'myinfo',
        component: () =>import('../views/MyInfoView.vue'),
      },{
        path:'/homepage',
        name:'homepage',
        component: () =>import('../views/HomepageView.vue')
      }
    ]
  },
  {
    path:'/homepage',
    name:'homepage',
    component: () =>import('../views/HomepageView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () =>import('../views/RegisterView.vue')
  },
  {
    path: '/resource',
    name: 'resource',
    component: () =>import('../views/ResourceView.vue')
  },
  {
    path: '/userresource',
    name: 'userresource',
    component: () =>import('../views/UserResourceView.vue')
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
      {
        path: '/grade',
        name: 'grde',
        component: () => import('../views/GradeView.vue'),
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

router.beforeEach((to, from, next) => {
  if((to.path === '/') ||(to.path === '/adminLogin')||(to.path === '/register')|| store.state.userInfo) {
    next()
    return
  }
  if((from.path==='/user')||(from.path==='/file')||(from.path==='/admin')){
    next('/adminLogin')
    return
  }
  next('/')
})

export default router
