<template>
  <div class="home-page">
    <!-- banner -->
    <div class="banner"></div>
    <!-- 房屋列表 -->
    <div class="mainWrapper">
      <h2 class="title">{{ t('home.h2Title') }}</h2>
      <p class="subTitle">{{ t('home.subTitle') }}</p>
      <!-- 首页列表 -->
      <HomeList />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import HomeList from './component/homeList.vue'
import { IRoomListParams } from '@/api/interface'

export default defineComponent({
  components: {
    HomeList
  },
  setup() {
    const { t } = useI18n()
    return {
      t
    }
  },
  asyncData({ store, route }: any) {
    const { pageNo } = store.state
    return store.dispatch('getRoomList', { pageNo } as IRoomListParams)
  }
})
</script>

<style lang="scss">
@import "@/assets/scss/home/index.scss";
</style>
