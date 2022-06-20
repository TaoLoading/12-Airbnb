<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
console.log(route.params)
</script>

<template>
  首页
  <button @click="() => router.push({ path: '/mine', query: { id: 1 } })">跳转到我的</button>
</template>

<style>
</style>
