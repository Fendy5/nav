import { request } from '../lib/request'

/**
 * @Author fendy
 * @CreateTime 2023/5/7 00:26
 * @Description
 */
export const loginApi = () => request.get('http://127.0.0.1:7040/api/v1/getUserInfo')

export const getUserInfoApi = (code: string) => request.post('http://127.0.0.1:7040/api/v1/getUserInfo', { code })
