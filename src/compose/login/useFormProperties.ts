/**
 * 用于存放表单对象的hook
 */

import { ref, reactive } from 'vue'

interface FormType {
  mobile: string,
  password: string
}

export default function useFormProperties(t: any) {
  const activeName = ref('login')
  const loginText = ref(t('login.loginBtn'))
  const ruleForm: FormType = reactive({
    mobile: '',
    password: ''
  })
  const ruleFormRef = ref()
  // 校验规则
  const rules = reactive({
    mobile: [
      {
        required: true,
        min: 11,
        max: 11,
        message: t('login.placeMobile'),
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: t('login.placePass'),
        trigger: 'blur'
      }
    ]
  })
  return {
    activeName,
    loginText,
    ruleForm,
    ruleFormRef,
    rules
  }
}
