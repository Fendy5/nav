import { request } from '@/lib/request'

export const getHomeApi = () => request.get('/api/v1/home')
