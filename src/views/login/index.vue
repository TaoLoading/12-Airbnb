<template>
  <div class="login-page">
    <div class="left-part"></div>
    <div class="right-part">
      <div class="login-panel">
        <!-- tabs -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="t('login.loginTab')" name="login"></el-tab-pane>
          <el-tab-pane :label="t('login.signTab')" name="sign"></el-tab-pane>
        </el-tabs>
        <!-- 表单组件 -->
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
          <el-form-item prop="mobile">
            <el-input :placeholder="t('login.placeMobile')" v-model="ruleForm.mobile"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" :placeholder="t('login.placePass')" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary" @click="submitForm">{{ loginText }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { IResultOr } from '@/api/interface'
import { userSignApi, userLoginApi } from '@/api/login'

interface FormType {
  mobile: string,
  password: string
}

const { t } = useI18n()
const activeName = ref('login')
const ruleForm: FormType = reactive({
  mobile: '',
  password: ''
})
const { proxy }: any = getCurrentInstance()

// 切换登录注册
const loginText = ref(t('login.loginBtn'))
const handleClick = (e: any) => {
  const { name } = e.props
  if (name === 'login') {
    loginText.value = t('login.loginBtn')
  } else if (name === 'sign') {
    loginText.value = t('login.signBtn')
  }
}

// 校验规则
const ruleFormRef = ref()
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

// 提交表单
const router = useRouter()
const submitForm = () => {
  ruleFormRef.value.validate((valid: any) => {
    if (valid) {
      if (activeName.value === 'sign') {
        userSign(ruleForm)
      } else if (activeName.value === 'login') {
        userLogin(ruleForm)
      }
    } else {
      return
    }
  })
}

// 注册
const userSign = (params: FormType) => {
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
</script>

<style lang="scss" scoped>
@import "@/assets/scss/login/index.scss";
</style>
