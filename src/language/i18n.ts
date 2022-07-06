import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

export function createSSRi18n() {
  return createI18n({
    legacy: false,
    // 默认语言
    locale: 'zh',
    // 全部提供的语言
    messages: {
      zh,
      en
    }
  })
}
