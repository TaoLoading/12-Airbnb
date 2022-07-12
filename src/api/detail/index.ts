import { http } from '../../utils/http'
import { IResultOr as IResult, IRoomDetailParams } from '../interface'

// 查询房屋详情
export function fetchRoomDetail(params: IRoomDetailParams): Promise<IResult> {
  return http.httpRequestGet('/api/room/room/getRoomDetail', params)
}
