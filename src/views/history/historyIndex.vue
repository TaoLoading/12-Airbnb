<template>
  <div>
    {{ historyData }}
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { fetchHistoryApi } from '@/api/history'
import { useStore } from '@/store'

const historyData = ref()
const { t } = useI18n()
const { proxy }: any = getCurrentInstance()
const store = useStore()
const router = useRouter()
const loading = ref(true)

// 查看历史记录
function fetchHistory() {
  fetchHistoryApi().then(res => {
    const { success, message, result } = res
    // loading.value = false
    if (success) {
      historyData.value = result
    } else {
      proxy.$message.error(message)
    }
  })
}

// 保存历史记录
if (store.state.userStatus) {
  fetchHistory()
} else {
  proxy.$message.warning(t('login.loginLost'))
  const { pathname } = window.location
  router.replace({
    path: '/login',
    query: {
      redirect: pathname
    }
  })
}
</script>

<style lang="scss" scoped>
</style>
