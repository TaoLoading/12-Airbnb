import { createApp } from './main'
import airbnb from './db/index'

const { app, router } = createApp()

// 初始化store仓库
router.beforeEach((to, from, next) => {
  airbnb.airbnbDB.openStore({
    ...airbnb.languageObjectStore,
    ...airbnb.orderObjectStore,
    ...airbnb.recordObjectStore,
    ...airbnb.userObjectStore
  }).then(() => {
    next()
  })
})

/* router.isReady().then(() => {
  app.mount('#app')
}) */
