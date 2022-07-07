<template>
  <div class="home-page">
    <!-- banner -->
    <div class="banner"></div>
    <!-- 房屋列表 -->
    <div class="main-wrapper">
      <h2 class="title">{{ t('home.h2Title') }}</h2>
      <p class="sub-title">{{ t('home.subTitle') }}</p>
      <!-- 首页列表 -->
      <div>
        <div class="home-list">
          <div class="item" v-for="(item, index) in store.state.roomList" :key="index" @click="clickIt(item)">
            <img :src="item.pictureUrl" :alt="item.title" />
            <p class="title">{{ item.title }}</p>
            <p class="price">¥{{ item.price }}元</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script  lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { IRoomListParams } from '@/api/interface'
import { useStore } from '@/store/index'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const store = useStore()
    const clickIt = (item: any) => {
      console.log('-----------', item)
    }
    return {
      t,
      store,
      clickIt
    }
  },
  asyncData({ store, route }: any) {
    // const { pageNo } = store.state
    return store.dispatch('getRoomList')
  }
})
</script>

<style lang="scss">
@import "@/assets/scss/home/index.scss";
</style>
