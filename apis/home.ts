import { request } from '@/lib/request'

export const getHomeApi = () => request.get('/api/v1/home')

// 更新阅读量
export const submitAmountApi = (data: { id: number }) => request.post('/api/v1/submitAmount', data)
