<template>
  <div v-if="roomDetail && roomDetail.info && roomDetail.owner">
    <!-- 照片墙 -->
    <el-carousel v-if="roomDetail.imgs && roomDetail.imgs.length > 0" class="imgWall" trigger="click" height="380px"
      :interval="3000" indicator-position="none" type="card">
      <el-carousel-item v-for="(item, index) in roomDetail.imgs" :key="index">
        <img :src="item" />
      </el-carousel-item>
    </el-carousel>

    <!-- 房屋相关信息 -->
    <div class="mainWrapper">
      <!-- 房屋详情信息 -->
      <div class="roomDetail">
        <div class="detailPart">
          <h2>{{ roomDetail.title }}</h2>
          <!-- 房屋信息 -->
          <div class="info">
            <span class="room">{{ roomDetail.info.room }} {{ t('detail.rooms') }}</span>
            <span class="bed">{{ roomDetail.info.bed }} {{ t('detail.beds') }}</span>
            <span class="toilet">{{ roomDetail.info.toilet }} {{ t('detail.bathrooms') }}</span>
            <span class="liveNumber">{{ t('detail.living') }} {{ roomDetail.info.liveNumber }} {{
                t('detail.personNumber')
            }}</span>
          </div>
          <div class="tags">
            <el-tag size="small">{{ roomDetail.info.remarks }} {{ t('detail.remarks') }}</el-tag>
            <el-tag size="small" class="ml-10" type="danger" v-if="roomDetail.info.metro">{{ t('detail.nearSubway') }}
            </el-tag>
            <el-tag size="small" class="ml-10" type="warning" v-if="roomDetail.info.parking">{{ t('detail.freeParking')
            }}</el-tag>
            <el-tag size="small" class="ml-10" type="success" v-if="roomDetail.info.luggage">{{ t('detail.luggage') }}
            </el-tag>
          </div>
          <hr />
          <!-- 房东信息 -->
          <div class="ownerDetail">
            <img :src="roomDetail.owner.avatar" />
            <div class="info">
              <p>{{ t('detail.landlord') }}：{{ roomDetail.owner.name }}</p>
              <p>
                <span v-if="roomDetail.owner.certify">{{ t('detail.authenticated') }}</span>
                <span v-if="roomDetail.info.goodOwner">{{ t('detail.greatLandlord') }}</span>
              </p>
            </div>
          </div>
          <!-- 基本介绍 -->
          <div class="introduce">{{ roomDetail.owner.introduce }}</div>
        </div>
        <el-affix :offset="15">
          <div class="formPart">
            <p class="price">
              <span>¥{{ roomDetail.price }}</span>
              / {{ t('detail.night') }}
            </p>
            <!-- 表单 -->
            <el-form ref="ruleForm" :model="orderForm" label-position="top" class="orderRuleForm">
              <el-form-item prop="personNumber" :label="t('detail.personNumber')">
                <select v-model="orderForm.personNumber">
                  <option v-for="item in 3" :value="item" :key="item">{{ item }}</option>
                </select>
              </el-form-item>
              <el-form-item>
                <el-button class="btnPrimary" type="primary" @click="submitForm">{{ t('detail.order') }}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-affix>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref, getCurrentInstance, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import { saveOrderApi } from '@/api/order'

const { t } = useI18n()
const store = useStore()
const router = useRouter()
const roomDetail = computed(() => store.state.roomDetail)
const orderForm = reactive({
  personNumber: 1
})
const ruleForm = ref()
const route = useRoute()
const { proxy }: any = getCurrentInstance()

// 提交按钮
function submitForm() {
  // 检查是否已登录
  if (store.state.userStatus) {
    recordRoom()
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
}

// 预定房间
function recordRoom() {
  const { id: recordId } = route.params
  const {
    title,
    price,
    imgs
  } = roomDetail.value
  const personNumber = orderForm.personNumber
  const params = {
    recordId,
    title,
    price,
    personNumber,
    pictureUrl: imgs[0]
  }
  saveOrderApi(params).then((res) => {
    const { success, message } = res
    if (success) {
      proxy.$message.success('预定成功')
    } else {
      proxy.$message.error(message)
    }
  })
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/detail/index.scss";
</style>
