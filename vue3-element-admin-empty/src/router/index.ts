import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import Login from '@/views/login/Login.vue'
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import store from '@/store/index.ts'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)'
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'el-icon-s-home', affix: true }
      }
    ]
  },
]

export const asyncRoutes = [
  {
    path: '/book',
    name: 'Book',
    component: Layout,
    redirect: "/book/create",
    meta: { title: '图书管理', icon: 'el-icon-notebook-1' },
    children: [
      {
        path: '/book/create',
        component: () => import('@/views/book/BookCreate.vue'),
        name: 'BookCreate',
        meta: { title: '图书创建', icon: 'el-icon-notebook-1' }
      },
      {
        path: '/book/list',
        component: () => import('@/views/book/BookList.vue'),
        name: 'BookList',
        meta: { title: '图书列表', icon: 'el-icon-notebook-1' }
      }
    ]
  },
]

// @ts-ignore
const router = createRouter({
  history: createWebHashHistory(),
  // @ts-ignore
  scrollBehavior: () => ({ y: 0 }),
  // @ts-ignore
  routes: constantRoutes
})

const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async (to, from, next) => {
  document.title = getPageTitle(to.meta.title as string)
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          debugger
          const { roles } = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          accessRoutes.forEach((route:any) => {
            router.addRoute(route)
          })
          console.log(router)
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
  }
})

export default router
