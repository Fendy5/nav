import { request } from '../lib/request'

/**
 * @Author fendy
 * @CreateTime 2023/5/7 00:26
 * @Description
 */
export const loginApi = () => request.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/getUserInfo`)

export const getUserInfoApi = (code: string) => request.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/getUserInfo`, { code })
