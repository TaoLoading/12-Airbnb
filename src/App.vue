<template>
  <el-config-provider :locale="locale">
    <button @click="() => router.push({ path: '/home' })">首页</button>
    <button @click="() => router.push({ path: '/mine' })">个人中心</button>
    <button @click="changeLang(zhCn)">中文</button>
    <button @click="changeLang(en)">英文</button>
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const router = useRouter()

// 切换语言
const locale = ref(zhCn)
const { locale: localeLanguage } = useI18n() // locale是当前的语言环境，为避免冲突起了localeLanguage的别名
const changeLang = (language: any) => {
  locale.value = language
  localeLanguage.value = language.name
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
