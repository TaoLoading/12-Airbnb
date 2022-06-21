<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { h, getCurrentInstance } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchRoomList } from '../../api/index'
import IndexedDB from '../../utils/indexedBD'

// 国际化相关
console.log('useI18n内容：', useI18n)
const { t } = useI18n() // i18n提供t方法，通过t方法包裹变量实现值的显示

// 路由相关
const router = useRouter()
const route = useRoute()
console.log('路由params参数：', route.params)

// 应用element-plus组件
const { proxy }: any = getCurrentInstance()
proxy.$message({
  message: h('p', null, [
    h('span', null, 'Message can be '),
    h('i', { style: 'color: teal' }, 'VNode'),
  ]),
})

// 测试接口的调用
const getRoomList = () => {
  fetchRoomList()
}
getRoomList()

// 测试IndexedDB
const airbnb = new IndexedDB('airbnb')
airbnb.openStore('elephant', 'id',['nose', 'ear'])
</script>

<template>
  {{ t('message.home') }}
  <button @click="() => router.push({ path: '/mine', query: { id: 1 } })">跳转到我的</button>
  <el-date-picker type="date" placeholder="Pick a day" />
</template>

<style lang="scss">
@import "@/assets/scss/home/index.scss";
</style>
