<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <button @click="() => router.push({ path: '/home' })">首页</button>
  <button @click="() => router.push({ path: '/mine' })">我的</button>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
