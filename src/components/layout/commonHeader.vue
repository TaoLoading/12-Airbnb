<template>
  <div class="common-header">
    <img class="logo" src="../../assets/images/layout/logo.png" alt="爱彼迎">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="orders">房屋订单中心</el-menu-item>
      <el-menu-item index="records">历史足迹</el-menu-item>
      <el-sub-menu index="2">
        <template #title>国际化切换</template>
        <el-menu-item index="zh">中文</el-menu-item>
        <el-menu-item index="en">英文</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="avatar">
        <img class="avatar" src="../../assets/images/layout/avatar.jpg" alt="个人中心">
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { saveLanguageApi } from '../../api/layout'

const activeIndex = ref('1')

// 用于更改语言的待分发事件
const emit = defineEmits<{
  (
    e: 'changeLang',
    language: any
  ): void
}>()
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  // 中文
  if (key === 'zh') {
    emit('changeLang', zhCn)
    saveLanguage(zhCn)
  } else if (key === 'en') {
    emit('changeLang', en)
    saveLanguage(en)
  }
}

// 调用接口保存当前语言包
const saveLanguage = (language: any) => {
  saveLanguageApi(language).then(res => {
    const { success } = res
    if (success) {
      console.log('保存语言包成功')
    } else {
      console.log('保存语言包失败')
    }
  })
}
</script>

<style lang="scss">
@import "@/assets/scss/layout/commonHeader.scss";
</style>

