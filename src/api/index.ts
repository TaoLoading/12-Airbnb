// https://service-ase3oocp-1302839645.sh.apigw.tencentcs.com/api/room/room/getRoomList?pageNo=1&pageSize=3

import { http } from '../utils/http'
import IndexedDB from '../utils/indexedBD'
const airbnb = new IndexedDB('airbnb')

// 真实接口
export function fetchRoomList() {
  return http.httpRequestGet('https://service-ase3oocp-1302839645.sh.apigw.tencentcs.com/api/room/room/getRoomList?pageNo=1&pageSize=3', {})
}

// Mock接口
export async function MockElephant() {
  // indexedDB存在异步问题，这种写法会导致先getList再openStore
  /* airbnb.openStore('elephant', 'id', ['nose', 'ear'])
  airbnb.getList('elephant') */

  // 处理异步
  await airbnb.openStore('elephant', 'id', ['nose', 'ear'])
  const result = await airbnb.getList('elephant').then(res => { // 通过.then的形式使页面可以通过.then拿到返回的数据
    return { code: '000000', message: '操作成功', result: res, success: true }
  })
  return result
}
