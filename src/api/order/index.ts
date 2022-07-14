import { ElLoading } from 'element-plus'
import { IResultOr } from '../interface'
import airbnb from '../../db'

const storeName = Object.keys(airbnb.orderObjectStore)[0]

// Mock接口：立即预定
export async function saveOrderApi(params: any) {
  const userId = localStorage.getItem('userId')
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })

  // 是否存在相同订单Id
  const hasOrderId = await new Promise((resolve, reject) => {
    airbnb.airbnbDB.getList(storeName).then((res: any) => {
      setTimeout(() => {
        loading.close()
      }, 200)
      res && res.filter((item: any) => {
        if (item.orderId === params.orderId && item.userId === userId) {
          resolve(true)
        }
      })
      resolve(false)
    })
  })
  let result: IResultOr
  if (hasOrderId) {
    result = await new Promise((resolve, reject) => {
      resolve({ code: '000001', success: false, message: '数据已存在', result: null })
    })
  } else {
    Object.assign(params, { userId })
    result = await new Promise((resolve, reject) => {
      airbnb.airbnbDB.updateItem(storeName, params).then(res => {
        setTimeout(() => {
          loading.close()
        }, 200)
        resolve({ code: '000000', success: true, message: '操作成功', result: null })
      })
    })
  }
  return result
}

// Mock接口：订单列表
export async function fetchOrderApi() {
  const userId = localStorage.getItem('userId')

  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })
  const result: IResultOr = await new Promise((resolve, reject) => {
    airbnb.airbnbDB.getList(storeName).then((res: any) => {
      setTimeout(() => {
        loading.close()
      }, 200)
      res = res.filter((item: any) => {
        return item.userId === userId
      })
      setTimeout(() => {
        resolve({ code: '000000', success: true, message: '操作成功', result: res || null })
      }, 200)
    })
  })
  return result
}
