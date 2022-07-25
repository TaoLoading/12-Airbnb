import { createApp } from './main'
import airbnb from './db/index'

const { app, router, store } = createApp()

if ((window as any).__INITIAL_STATE__) {
  store.replaceState((window as any).__INITIAL_STATE__)
}

// 路由守卫
router.beforeEach((to, from, next) => {
  // 初始化store仓库
  airbnb.airbnbDB.openStore({
    ...airbnb.userObjectStore,
    ...airbnb.languageObjectStore,
    ...airbnb.orderObjectStore,
    ...airbnb.historyObjectStore
  }).then(() => {
    // 当userId存在时证明用户已登录，更新UserStatus状态为1，即已登录
    if (localStorage.getItem('userId')) {
      store.commit('setUserStatus', 1)
    }
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

// 在路由守卫中对meta中的信息进行更新
router.afterEach((to, from, next) => {
  const { roomDetail } = store.state
  const { title: roomTitle = '', owner } = roomDetail || {}
  const { introduce = '' } = owner || {}
  const { meta } = to
  const { title, keywords, description } = meta

  if (title) {
    document.title = `${title}${roomTitle}`
  } else {
    document.title = ''
  }

  const keywordsMeta = document.querySelector('meta[name="keywords"]')
  keywordsMeta && keywordsMeta.setAttribute('content', `${keywords}${introduce}`)

  const descriptionMeta = document.querySelector('meta[name="description"]')
  descriptionMeta?.setAttribute('content', `${description}${introduce}`)

})
