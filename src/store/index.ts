import { saveLanguageApi } from '@/api/layout'
import { createStore } from 'vuex'

export const store = createStore({
  state: {
    // 语言
    locale: null,
    // 登陆状态
    userStatus: 0
  },
  actions: {
    // 保存语言包
    saveLanguage({ commit, state }, language) {
      saveLanguageApi(language.name).then(res => {
        const { success } = res
        if (success) {
          commit('setLanguage', language)
          console.log('保存语言包成功')
        } else {
          console.log('保存语言包失败')
        }
      })
    }
  },
  mutations: {
    // 设置语言包
    setLanguage(state, payload) {
      state.locale = payload
      return state.locale
    },
    // 设置登录状态
    setUserStatus(state, payload) {
      state.userStatus = payload
      return state.userStatus
    }
  }
})
