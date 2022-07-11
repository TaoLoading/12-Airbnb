import { renderToString } from 'vue/server-renderer'
import { ID_INJECTION_KEY } from 'element-plus'
import { createApp } from './main'

export async function render(url: string, manifest: any) {
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

  const context: any = {}
  const appHtml = await renderToString(app, context) // 通过传入context上下文拿到整个应用中自动注册的使用过组件的模块id，即context.modules
  const state = store.state

  // 判断环境，在生产环境时向外暴露preloadLinks
  if (import.meta.env.PROD) {
    const preloadLinks = renderLinks(context.modules, manifest)
    return { appHtml, state, preloadLinks }
  } else {
    return { appHtml, state }
  }

  // 用于拿到静态资源并对静态资源文件组成引入语句
  function renderLinks(modules: any, manifest: any) {
    let links = ''
    modules.forEach((id: string) => {
      const files = manifest[id]
      if (files) {
        files.forEach((file: any) => {
          links += renderPreloadLink(file)
        })
      }
    })
    return links
  }

  // 用于拼接引入语句
  function renderPreloadLink(file: any) {
    if (file.endsWith('.js')) {
      return `<link rel="modulepreload" crossorigin href="${file}">`
    } else if (file.endsWith('.css')) {
      return `<link rel="stylesheet" href="${file}">`
    } else if (file.endsWith('.woff')) {
      return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
    } else if (file.endsWith('.woff2')) {
      return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
    } else if (file.endsWith('.gif')) {
      return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
    } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
    } else if (file.endsWith('.png')) {
      return ` <link rel="preload" href="${file}" as="image" type="image/png">`
    } else {
      // 有新静态文件需求时再进行拼接
      return ''
    }
  }
}
