import { request } from '@/lib/request'
import { UserInfoProp } from '@/store/userSlice'

export const loginApi = () => request.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/getUserInfo`)

export const getUserInfoApi = (code: string) => request.post<UserInfoProp>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/getUserInfo`, { code })
