import { saveLanguageApi } from '@/api/layout'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'

/* 此部分代码为vue增加ts支持所用到的变量 */
// 为 store state 声明类型
export interface stateType {
  locale: any,
  userStatus: Number
}
// 定义 injection key
export const key: InjectionKey<Store<stateType>> = Symbol()

export function useStore() {
  return baseUseStore(key)
}

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
