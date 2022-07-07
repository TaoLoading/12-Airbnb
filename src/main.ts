import { createSSRApp } from 'vue'
import ElementPlus, { ElMessage } from 'element-plus'
import { sync } from 'vuex-router-sync'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { createSSRRouter } from './router'
import { createSSRi18n } from './language/i18n'
// import airbnb from './db/index'
import { createSSRStore, key } from './store/index'

// 初始化store仓库
/* router.beforeEach((to, from, next) => {
  airbnb.airbnbDB.openStore({
    ...airbnb.languageObjectStore,
    ...airbnb.orderObjectStore,
    ...airbnb.recordObjectStore,
    ...airbnb.userObjectStore
  }).then(() => {
    next()
  })
}) */

export const createApp = () => {
  const app = createSSRApp(App)
  const store = createSSRStore()
  const router = createSSRRouter()
  const i18n = createSSRi18n()

  // 使用vuex-router-sync获取路由中的数据并同步到vuex中
  sync(store, router)

  app.config.globalProperties.$message = ElMessage
  app.use(router)
  app.use(ElementPlus)
  app.use(i18n)
  app.use(store, key)
  // app.mount('#app')
  return { app, router, store }
}
