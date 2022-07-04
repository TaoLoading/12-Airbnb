<template>
  <div class="common-header">
    <img class="logo" src="../../assets/images/layout/logo.png" alt="爱彼迎">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="orders">{{ t("header.orders") }}</el-menu-item>
      <el-menu-item index="records">{{ t("header.records") }}</el-menu-item>
      <el-sub-menu index="language">
        <template #title>{{ t("header.language") }}</template>
        <el-menu-item index="zh">中文</el-menu-item>
        <el-menu-item index="en">English</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="avatar" v-if="userStatus === '1'">
        <template #title>
          <img class="avatar" src="../../assets/images/layout/avatar.jpg" alt="个人中心">
        </template>
        <el-menu-item index="logout">退出</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="login" v-else>{{ t("login.loginTab") }}/{{ t("login.signTab") }}</el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { fetchLanguageApi, saveLanguageApi } from '../../api/layout'
import { userLogoutApi } from '@/api/login'
import { IResultOr } from '@/api/interface'

// 读取用户登录状态
const userStatus = localStorage.getItem('userStatus')

const activeIndex = ref('1')
const { t } = useI18n()
const { proxy }: any = getCurrentInstance()

// 用于更改语言的待分发事件
const emit = defineEmits<{
  (
    e: 'changeLang',
    language: any
  ): void
}>()

// 菜单点击事件
const router = useRouter()
const handleSelect = (key: string) => {
  // 中文
  if (key === 'zh') {
    emit('changeLang', zhCn)
    saveLanguage('zh')
  } else if (key === 'en') {
    emit('changeLang', en)
    saveLanguage('en')
  } else if (key === 'login') {
    router.push({ name: 'login' })
  } else if (key === 'logout') {
    userLogout()
  }
}

// 保存语言包
const saveLanguage = (language: string) => {
  saveLanguageApi(language).then(res => {
    const { success } = res
    if (success) {
      console.log('保存语言包成功')
    } else {
      console.log('保存语言包失败')
    }
  })
}

// 获取语言包
const fetchLanguage = () => {
  fetchLanguageApi().then(res => {
    const { success, result } = res
    // 没有预存的语言包时，默认显示中文
    if (!result) {
      emit('changeLang', zhCn)
      return
    }
    // 获取语言包名
    const { name } = result
    if (name === 'zh') {
      emit('changeLang', zhCn)
    } else if (name === 'en') {
      emit('changeLang', en)
    }
    if (success) {
      console.log('获取语言包成功')
    } else {
      console.log('获取语言包失败')
    }
  })
}
// fetchLanguage()

// 登出
const userLogout = () => {
  userLogoutApi().then((res: IResultOr) => {
    const { success } = res
    if (success) {
      proxy.$message.success(t('login.logoutSuccess'))
      localStorage.setItem('userStatus', '0')
      router.push({ name: 'login' })
    } else {
      proxy.$message.error(t('login.logoutError'))
    }
  })
}
</script>

<style lang="scss">
@import "@/assets/scss/layout/commonHeader.scss";
</style>

