<template>
  <!-- 城市筛选 -->
  <HomeTabs />
  <!-- 首页列表数据 -->
  <div>
    <div class="homeList">
      <div class="item" @click="toDetail(item)" v-for="(item, index) in store.state.roomList" :key="index">
        <img :src="item.pictureUrl" :alt="item.title" />
        <p class="title">{{ item.title }}</p>
        <p class="price">¥{{ item.price }}元</p>
      </div>
    </div>
  </div>
  <!-- 分页 -->
  <Pagination @changePage="changePage" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import Pagination from '@/components/common/pagination.vue'
import { IRoomListParams } from '@/api/interface'
import HomeTabs from './homeTabs.vue'

const router = useRouter()
const store = useStore()
function toDetail(item: any) {
  const { id } = item
  router.push({ path: `/roomDetail/${id}` })
  store.commit('setRoomId', id)
}

function changePage(pageNo: number) {
  store.dispatch('getRoomList', { pageNo } as IRoomListParams)
}
</script>

<style scoped>
</style>
