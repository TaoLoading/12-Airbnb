import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/homeIndex.vue'),
    meta: {
      title: '爱彼迎-全球大型房屋租赁平台',
      keywords: '爱彼迎，特价房源，品质房源，租赁平台',
      description: '爱彼迎（Airbnb）是房屋租赁平台。爱彼迎（Airbnb）的房屋涉及上海、北京、杭州、苏州等60个城市，覆盖了特价房源、品质房源，帮助用户实现从线上房屋预定和浏览功能',
      keepAlive: false
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('@/views/mine/mineIndex.vue'),
    meta: {
      title: '',
      keywords: '',
      description: '',
      keepAlive: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/loginIndex.vue')
  },
  {
    path: '/roomDetail/:id',
    name: 'roomDetail',
    component: () => import('@/views/detail/detailIndex.vue')
  }
]

export function createSSRRouter() {
  return createRouter({
    // 客户端渲染时使用createWebHistory，服务端渲染时使用createMemoryHistory
    // 通过import.meta.env.SSR来区分是客户端渲染还是服务端渲染
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
}
