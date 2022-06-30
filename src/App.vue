<template>
  <el-config-provider :locale="locale">
    <!-- 头部 -->
    <commonHeader @changeLang="changeLang" v-show="route.fullPath.indexOf('login') === -1"></commonHeader>
    <!-- 主体 -->
    <div class="container">
      <router-view />
    </div>
    <!-- 底部 -->
    <commonFooter v-show="route.fullPath.indexOf('login') === -1"></commonFooter>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import commonHeader from './components/layout/commonHeader.vue'
import commonFooter from './components/layout/commonFooter.vue'

const route = useRoute()

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
}
</style>
