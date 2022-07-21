<template>
  <div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { fetchHistoryApi } from '@/api/history'
import { useStore } from '@/store'

const recordData = ref()
const { t } = useI18n()
const { proxy }: any = getCurrentInstance()
const store = useStore()
const router = useRouter()
const loading = ref(true)

// 查看历史记录
function fetchRecord() {
  fetchHistoryApi().then(res => {
    const { success, message, result } = res
    // loading.value = false
    if (success) {
      recordData.value = result
    } else {
      proxy.$message.error(message)
    }
  })
}
</script>

<style lang="scss" scoped>
</style>
