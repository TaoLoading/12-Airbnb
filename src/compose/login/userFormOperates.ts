/**
 * 用于存放表单操作的hook
 */

import { getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { IResultOr } from '@/api/interface'
import { userSignApi, userLoginApi } from '@/api/login'
import { useStore } from '@/store'

interface FormType {
  mobile: string,
  password: string
}

export default function userFormOperates(t: any) {
  const { proxy }: any = getCurrentInstance()
  // 注册
  const userSign = (params: FormType) => {
    userSignApi(params).then((res: IResultOr) => {
      const { success, message } = res
      if (success) {
        proxy.$message.success(t('login.signSuccess'))
      } else {
        proxy.$message.error(message)
      }
    })
  }

  // 登录
  const router = useRouter()
  const store = useStore()
  const route = useRoute()
  const userLogin = (params: FormType) => {
    userLoginApi(params).then((res: IResultOr) => {
      const { success, result, message } = res
      if (success) {
        const { status, userId } = result
        localStorage.setItem('userId', userId)
        store.commit('setUserStatus', status)
        proxy.$message.success(t('login.loginSuccess'))
        const { redirect }: any = route.query
        // router.push({ path: redirect || '/' })
        router.push({ name: 'home' })
      } else {
        proxy.$message.error(message)
      }
    })
  }

  return {
    userSign,
    userLogin
  }
}
