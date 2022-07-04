<template>
  <el-config-provider :locale="store.state.locale">
    <!-- 头部 -->
    <commonHeader v-show="route.fullPath.indexOf('login') === -1"></commonHeader>
    <!-- 主体 -->
    <div class="container">
      <router-view />
    </div>
    <!-- 底部 -->
    <commonFooter v-show="route.fullPath.indexOf('login') === -1"></commonFooter>
  </el-config-provider>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import commonHeader from './components/layout/commonHeader.vue'
import commonFooter from './components/layout/commonFooter.vue'
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
