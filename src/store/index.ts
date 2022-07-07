import { saveLanguageApi } from '@/api/layout'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { IRoomListParams, IRoomDetailParams } from '@/api/interface'
import { fetchRoomList } from '@/api/home'

// 为 store state 声明类型
export interface AllStateTypes {
  locale: any,
  userStatus: number
  roomList: Array<any>,
  pageNo: number,
  pageSize: number,
  total: number,
  cityCode: string,
  roomDetail: any,
  roomId: null,
  orderVisible: boolean
}

/* 此部分代码为vue增加ts支持所用到的变量 */
// 定义 injection key
export const key: InjectionKey<Store<AllStateTypes>> = Symbol()

export function useStore() {
  return baseUseStore(key)
}

// 用于创建store
export function createSSRStore() {
  return createStore<AllStateTypes>({
    state: {
      // 语言
      locale: null,
      // 登陆状态
      userStatus: 0,
      // 房屋列表数据
      roomList: [],
      pageNo: 1,
      pageSize: 6,
      total: 0,
      cityCode: 'hz',
      roomDetail: {},
      roomId: null,
      orderVisible: false
    },
    actions: {
      // 保存语言包
      saveLanguage({ commit, state }, language) {
        saveLanguageApi(language.name).then(res => {
          const { success } = res
          if (success) {
            commit('setLanguage', language)
          } else {
            console.log('保存语言包失败')
          }
        })
      },
      // 获取房屋列表数据
      getRoomList({ commit, state }, payload) {
        return new Promise(resolve => {
          fetchRoomList().then(res => {
            const { success, result } = res
            const orders = result.orders
            if (success) {
              commit('setRoomList', orders.data)
            }
            resolve(true)
          }).catch(err => {
            console.log('请求出错', err)
          })
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
      },
      // 设置房屋列表数据
      setRoomList(state, payload) {
        state.roomList = payload
        return state.roomList
      }
    }
  })
}