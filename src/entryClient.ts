import { createApp } from './main'
import airbnb from './db/index'

const { app, router, store } = createApp()

if ((window as any).__INITIAL_STATE__) {
  store.replaceState((window as any).__INITIAL_STATE__)
}

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

router.isReady().then(() => {
  router.beforeResolve((to, from, next) => {
    const toComponents = router.resolve(to).matched.flatMap(record =>
      Object.values(record.components)
    )
    const fromComponents = router.resolve(from).matched.flatMap(record =>
      Object.values(record.components)
    )
    const actives = toComponents.filter((c, i) => {
      return fromComponents[i] !== c
    })
    if (!actives.length) {
      return next()
    }
    Promise.all(actives.map((Component: any) => {
      if (Component.asyncData) {
        return Component.asyncData({
          store,
          route: router.currentRoute
        })
      }
    })).then(() => {
      next()
    })
  })
  app.mount('#app')
})
