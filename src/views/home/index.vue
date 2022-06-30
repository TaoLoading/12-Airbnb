<template>
  <el-date-picker type="date" placeholder="Pick a day" />
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { h, getCurrentInstance } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * 国际化相关
 */
const { t } = useI18n() // i18n提供t方法，通过t方法包裹变量实现值的显示

</script>

<style lang="scss">
@import "@/assets/scss/home/index.scss";
</style>
