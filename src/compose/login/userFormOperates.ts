/**
 * 用于存放表单操作的hook
 */

import { getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { IResultOr } from '@/api/interface'
import { userSignApi, userLoginApi } from '@/api/login'

interface FormType {
  mobile: string,
  password: string
}

export default function userFormOperates(t: any) {
  const { proxy }: any = getCurrentInstance()
  // 注册
  const userSign = (params: FormType) => {
    console.log('params', params)
    userSignApi(params).then((res: IResultOr) => {
      const { success, message } = res
      if (success) {
        proxy.$message.success(t('login.signSuccess'))
      } else {
        proxy.$message.error(t('login.signError'))
      }
    })
  }

  // 登录
  const router = useRouter()
  const userLogin = (params: FormType) => {
    userLoginApi(params).then((res: IResultOr) => {
      const { success, result, message } = res
      if (success) {
        const { status } = result
        localStorage.setItem('userStatus', status)
        proxy.$message.success(t('login.loginSuccess'))
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