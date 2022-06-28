<template>
  <!-- {{ t('message.home') }}
  <el-button @click="() => router.push({ path: '/mine', query: { id: 1 } })">跳转到我的</el-button>
  <el-date-picker type="date" placeholder="Pick a day" />
  <el-button @click="addData()">新增数据</el-button>
  <el-button @click="modifyData()">修改数据</el-button>
  <el-button @click="deleteData()">删除数据</el-button>
  <el-button @click="getAllData()">查询全部数据</el-button>
  <el-button @click="getData()">查询单条数据</el-button> -->
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { h, getCurrentInstance } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchRoomList, MockElephant } from '../../api/index'
import IndexedDB from '../../utils/indexedBD'

/**
 * 国际化相关
 */
console.log('useI18n内容：', useI18n)
const { t } = useI18n() // i18n提供t方法，通过t方法包裹变量实现值的显示

/**
 * 路由相关
 */
const router = useRouter()
const route = useRoute()
console.log('路由params参数：', route.params)

/**
 * 应用element-plus组件
 */
const { proxy }: any = getCurrentInstance()
proxy.$message({
  message: h('p', null, [
    h('span', null, 'Message can be '),
    h('i', { style: 'color: teal' }, 'VNode'),
  ]),
})

/**
 * 测试接口的调用
 */
const getRoomList = () => {
  fetchRoomList().then(res => {
    console.log('真实接口返回的数据：', res)
  })
}
getRoomList()

/**
 * IndexedDB相关
 */
const airbnb = new IndexedDB('airbnb')
// 创建存储对象
airbnb.openStore('elephant', 'id', ['nose', 'ear'])
// 新增数据
const addData = () => {
  airbnb.updateItem('elephant', {
    nose: '1m',
    ear: '0.5m'
  })
}
// 修改数据
const modifyData = () => {
  airbnb.updateItem('elephant', {
    id: 1,
    nose: '2m',
    ear: '1.5m'
  })
}
// 删除数据
const deleteData = () => {
  airbnb.deleteItem('elephant', 2)
}
// 查询全部数据
const getAllData = () => {
  airbnb.getList('elephant')
}
// 查询单条数据
const getData = () => {
  airbnb.getItem('elephant', 1)
}
// 使用indexedDB实现的Mock接口
const getElephant = () => {
  MockElephant().then(res => {
    console.log('Mock接口返回的数据：', res)
  })
}
getElephant()
</script>

<style lang="scss">
@import "@/assets/scss/home/index.scss";
</style>
