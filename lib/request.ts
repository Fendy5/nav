/**
 * @Author fendy
 * @CreateTime 2023/3/20 11:25
 * @Description
 */
import axios, { AxiosResponse } from 'axios'
import { message } from 'antd'

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 30000
})

// export interface ResponseDataType<T> {
//   code: 0 | 1 | -1 | undefined
//   data: T
//   message: string
// }

request.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 1) {
      res.message && message.success(res.message)
      return res
    } else {
      message.error(res.message)
      return Promise.reject(res)
    }
  },
  error => {
    // 请求错误弹窗
    // message.error(error)
    return Promise.reject(error)
  }
)

export { request }
