<template>
  <el-config-provider :locale="store.state.locale">
    <!-- 头部 -->
    <Header v-show="route.fullPath.indexOf('login') === -1"></Header>
    <!-- 主体 -->
    <div class="container">
      <router-view />
    </div>
    <!-- 底部 -->
    <Footer v-show="route.fullPath.indexOf('login') === -1"></Footer>
  </el-config-provider>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import { useStore } from '@/store/index'

const route = useRoute()
const store = useStore()
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
