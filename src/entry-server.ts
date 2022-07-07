import { renderToString } from 'vue/server-renderer'
import { ID_INJECTION_KEY } from 'element-plus'
import { createApp } from './main'

export async function render(url: string) {
  const { app, router, store } = createApp()
  await router.push(url)
  await router.isReady()

  // 为element plus服务端渲染提供id
  app.provide(ID_INJECTION_KEY, {
    prefix: Math.floor(Math.random() * 10000),
    current: 0,
  })

  // 获取当前路由的匹配组件
  const matchedComponents = router.currentRoute.value.matched.flatMap(record =>
    Object.values(record.components)
  )

  // 对所有匹配路由组件调用asyncData()
  await Promise.all(matchedComponents.map((Component: any) => {
    if (Component.asyncData) {
      return Component.asyncData({
        store,
        route: router.currentRoute
      })
    }
  }))

  const appHtml = await renderToString(app)
  const state = store.state
  return { appHtml, state }
}
