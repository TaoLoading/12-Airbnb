// https://service-ase3oocp-1302839645.sh.apigw.tencentcs.com/api/room/room/getRoomList?pageNo=1&pageSize=3

import { http } from '../utils/http'
import IndexedDB from '../utils/indexedDB'
const airbnb = new IndexedDB('airbnb')

// 真实接口
export function fetchRoomList() {
  return http.httpRequestGet('https://service-ase3oocp-1302839645.sh.apigw.tencentcs.com/api/room/room/getRoomList?pageNo=1&pageSize=3', {})
}
