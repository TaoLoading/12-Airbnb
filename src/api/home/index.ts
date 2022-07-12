import { http } from '../../utils/http'
import { IResultOr as IResult, IRoomListParams } from '../interface'

// 获取房屋列表
export function fetchRoomList(params: IRoomListParams): Promise<IResult> {
  console.log('进入房屋列表接口')
  return http.httpRequestGet('/api/room/room/getRoomList', params)
}
