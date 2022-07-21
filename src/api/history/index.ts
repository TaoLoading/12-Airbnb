import { ElLoading } from 'element-plus'
import { IResultOr } from '../interface'
import airbnb from '../../db'

const storeName = Object.keys(airbnb.recordObjectStore)[0]

// Mock接口：保存浏览记录
export async function saveHistoryApi(params: any) {
  const userId = localStorage.getItem('userId')
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })

  // 是否存在相同订单Id
  const hasRecordId = await new Promise((resolve, reject) => {
    airbnb.airbnbDB.getList(storeName).then((res: any) => {
      setTimeout(() => {
        loading.close()
      }, 200)
      res && res.filter((item: any) => {
        if (item.recordId === params.recordId && item.userId === userId) {
          resolve(true)
        }
      })
      resolve(false)
    })
  })
  let result: IResultOr
  if (hasRecordId) {
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

// Mock接口：浏览记录列表
export async function fetchHistoryApi() {
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
      setTimeout(() => {
        res = res.filter((item: any) => {
          return item.userId === userId
        })
        resolve({ code: '000000', success: true, message: '操作成功', result: res || null })
      }, 500)
    })
  })
  return result
}
