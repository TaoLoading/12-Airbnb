<template>
  <!-- 首页列表数据 -->
  <div>
    <div class="home-list">
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
import { useStore } from '@/store'
import Pagination from '@/components/common/pagination.vue'
import { IRoomListParams } from '@/api/interface'
import { useRouter } from 'vue-router'

const router = useRouter()
function toDetail(item: any) {
  console.log('-----------', item)
}

const store = useStore()
function changePage(pageNo: number) {
  store.dispatch('getRoomList', { pageNo } as IRoomListParams)
}
</script>

<style scoped>
</style>
