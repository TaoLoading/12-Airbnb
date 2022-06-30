import { ElLoading } from 'element-plus'
import DB from '../../utils/indexedBD'
import { IResultOr } from '../interface'

const airbnbDB = new DB('airbnb')

// Mock接口：保存当前语言包
export async function saveLanguageApi(lang: any) {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })
  await airbnbDB.openStore('language', 'id', ['name'])
  const resultOr: IResultOr = await airbnbDB.getItem('language', 1).then((res: any) => {
    return { code: '000000', message: '操作成功', result: res, success: true }
  })
  const { result } = resultOr
  let obj = {}
  if (result) {
    // 数据已存在，则更新数据
    obj = { name: lang, id: 1 }
  } else {
    // 数据不存在，则新增数据
    obj = { name: lang }
  }
  const updateResult: IResultOr = await airbnbDB.updateItem('language', obj).then((res: any) => {
    setTimeout(() => {
      loading.close()
    }, 200)
    return { code: '000000', message: '操作成功', result: null, success: true }
  })
  return updateResult
}

// Mock接口：获取当前语言包
export async function fetchLanguageApi() {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })
  const result: IResultOr = await airbnbDB.getItem('language', 1).then((res: any) => {
    setTimeout(() => {
      loading.close()
    }, 200)
    return { code: '000000', message: '操作成功', result: res, success: true }
  })
  return result
}
