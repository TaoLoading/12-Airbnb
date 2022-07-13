<template>
  123
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const count = ref(0)
function fetchApi() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      count.value = 6
      resolve(true)
    }, 20000)
  })
}
fetchApi()
</script>

<style lang="scss" scoped>
ul {
  @include placeholderOrder;
}

li {
  @include flex-layout(row, space-between, center);
  border-bottom: 1px solid #eee;
  padding: 10px 0;

  &:last-child {
    border-bottom: none;
  }

  img {
    width: 65px;
    height: 45px;
    border-radius: 4px;
    margin-right: 5px;
    object-fit: cover;
  }

  .mess {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 5px;
    width: 100px;
    overflow: hidden;

    p {
      line-height: 16px;
      font-weight: normal;
      margin: 5px 0;
      max-width: 100px;
    }

    .title {
      font-weight: bold;
      color: #333;
      font-size: 14px;
      display: inline-block;
      @include lineTextOverflow;
    }

    .info {
      color: #666;
      font-size: 12px;
    }
  }
}
</style>
