<template>
  <div class="commonHeader">
    <img class="logo" src="../../assets/images/layout/logo.png" alt="爱彼迎"
      @click="() => { router.push({ name: 'home' }) }">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
      :ellipsis="false">
      <el-menu-item index="orders">
        {{ t("header.orders") }}
        <template v-if="store.state.orderVisible">
          <Suspense>
            <template #default>
              <OrderPopover />
            </template>
            <template #fallback>
              <div class="loadingBlock">{{ t("common.loading") }}</div>
            </template>
          </Suspense>
        </template>
      </el-menu-item>
      <el-menu-item index="history">{{ t("header.history") }}</el-menu-item>
      <el-sub-menu index="language">
        <template #title>{{ t("header.language") }}</template>
        <el-menu-item index="zh">中文</el-menu-item>
        <el-menu-item index="en">English</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="avatar" v-if="store.state.userStatus === 1">
        <template #title>
          <img class="avatar" src="../../assets/images/layout/avatar.jpg" alt="个人中心">
        </template>
        <el-menu-item index="logout">{{ t("login.logout") }}</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="login" v-else>{{ t("login.loginTab") }}/{{ t("login.signTab") }}</el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref, defineAsyncComponent, onMounted } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { fetchLanguageApi } from '../../api/layout'
import { userLogoutApi } from '@/api/login'
import { IResultOr } from '@/api/interface'
import { useStore } from '@/store/index'

const activeIndex = ref('1')
const { t, locale: localeLanguage } = useI18n()
const { proxy }: any = getCurrentInstance()
const store = useStore()

// 使用defineAsyncComponent引入OrderPopover，目的是异步加载OrderPopover组件
const OrderPopover = defineAsyncComponent(() => import('@/views/order/orderPopover.vue'))

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
  if (key === 'zh') {
    store.dispatch('saveLanguage', zhCn)
    // 用于切换非element ui组件的语言
    localeLanguage.value = key
  } else if (key === 'en') {
    store.dispatch('saveLanguage', en)
    localeLanguage.value = key
  } else if (key === 'login') {
    router.push({ name: 'login' })
  } else if (key === 'logout') {
    userLogout()
  } else if (key === 'orders') {
    store.commit('setOrderVisible', true)
  } else if (key === 'history') {
    router.push({ name: 'history' })
  }
}

// 获取语言包
const getLanguage = () => {
  fetchLanguageApi().then(res => {
    const { success, result } = res
    const { name } = result || {}
    if (success) {
      if (name === 'zh') {
        store.dispatch('saveLanguage', zhCn)
        localeLanguage.value = name
      } else if (name === 'en') {
        store.dispatch('saveLanguage', en)
        localeLanguage.value = name
      }
      console.log('获取当前语言包成功')
    }
  })
}
onMounted(() => { // 使用onMounted区分服务端渲染和客户端渲染，仅在客户端渲染时执行getLanguage()
  getLanguage()
})


// 登出
const userLogout = () => {
  userLogoutApi().then((res: IResultOr) => {
    const { success } = res
    if (success) {
      // 清空localStorage
      localStorage.clear()
      // 修改userStatus状态
      store.commit('setUserStatus', 0)
      proxy.$message.success(t('login.logoutSuccess'))
      router.push({ name: 'login' })
    } else {
      proxy.$message.error(t('login.logoutError'))
    }
  })
}
</script>

<style lang="scss">
@import "@/assets/scss/layout/headerStyle.scss";
</style>
