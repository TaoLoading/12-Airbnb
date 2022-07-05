import { renderToString } from 'vue/server-renderer'
import { ID_INJECTION_KEY } from 'element-plus'
import { createApp } from './main'

export async function render(url: string) {
  const { app, router } = createApp()

  // 为element plus服务端渲染提供id
  app.provide(ID_INJECTION_KEY, {
    prefix: Math.floor(Math.random() * 10000),
    current: 0,
  })

  await router.push(url)
  await router.isReady()
  const html = renderToString(app)
  return html
}
