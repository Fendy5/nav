import { request } from '@/lib/request'
import { UserInfoProp } from '@/store/userSlice'

export const loginApi = () => request.get(`/api/v1/getUserInfo`)

export const getUserInfoApi = (params: { code: string }) => request.get<UserInfoProp>(`/api/v1/getUserInfo`, { params } )

export const getTokenApi = (params: { code: string }) => request.get(`/api/v1/login`, { params })
