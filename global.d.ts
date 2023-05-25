import { Axios, AxiosPromise, AxiosRequestConfig } from 'axios'
import { UserInfoProp } from '@/store/userSlice'

export interface ResponseDataProp<T = any> {
  code: 0 | 1 | -1 // code(1),请求成功；code(-1)，未登录；code(0),服务器返回失败信息
  data: T
  message: string | null
}

declare module 'axios' {
  export interface AxiosInstance extends Axios {
    (config: AxiosRequestConfig): AxiosPromise
    <T>(url: string, config?: AxiosRequestConfig): ResponseDataProp<T>
    get<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<ResponseDataProp<T>>
    post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<ResponseDataProp<T>>
    put<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<ResponseDataProp<T>>
    delete<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<ResponseDataProp<T>>
  }
}

import { ISODateString } from 'next-auth/src/core/types'
import { DefaultUser } from 'next-auth'

declare module "next-auth" {
  type User = UserInfoProp
  interface Session {
    user?: DefaultUser & User
    expires: ISODateString
  }
}
