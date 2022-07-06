import { ElLoading } from 'element-plus'
import { IResultOr } from '../interface'
// 引入数据库和对象仓库
import airbnb from '../../db'

// Mock接口：保存当前语言包
export async function saveLanguageApi(lang: string) {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })
  // await airbnb.airbnbDB.openStore('language', 'id', ['name'])
  const resultOr: IResultOr = await airbnb.airbnbDB.getItem('language', 1).then((res: any) => {
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
  const updateResult: IResultOr = await airbnb.airbnbDB.updateItem('language', obj).then((res: any) => {
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
  // await airbnb.airbnbDB.openStore('language', 'id', ['name'])
  const result: IResultOr = await airbnb.airbnbDB.getItem('language', 1).then((res: any) => {
    setTimeout(() => {
      loading.close()
    }, 200)
    return { code: '000000', message: '操作成功', result: res, success: true }
  })
  return result
}
