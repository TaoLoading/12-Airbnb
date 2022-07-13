<template>
  <DetailPage />
</template>

<script lang="ts">
import { IRoomDetailParams } from '@/api/interface'
import { defineComponent, onMounted } from 'vue'
import DetailPage from './component/detailPage.vue'

export default defineComponent({
  components: {
    DetailPage
  },
  setup() {
    return {
    }
  },
  asyncData({ store, route }: any) {
    // store.commit('setOrderVisible', false)
    const { roomId } = store.state
    const { id } = route.value.params
    return store.dispatch('getRoomDetail', { id: roomId || id } as IRoomDetailParams)
  },
})
</script>

<style lang="scss" scoped>
</style>
