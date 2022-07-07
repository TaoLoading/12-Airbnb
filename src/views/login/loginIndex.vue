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
import { useI18n } from 'vue-i18n'
import useFormProperties from '@/compose/login/useFormProperties'
import userFormOperates from '@/compose/login/userFormOperates'

const { t } = useI18n()
// 解构hook
const { activeName, loginText, ruleForm, ruleFormRef, rules } = useFormProperties(t)
const { userSign, userLogin } = userFormOperates(t)

// 切换登录注册
const handleClick = (e: any) => {
  const { name } = e.props
  loginText.value = t(`login['${name}Btn']`)
}


// 提交表单
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

</script>

<style lang="scss" scoped>
@import "@/assets/scss/login/index.scss";
</style>
