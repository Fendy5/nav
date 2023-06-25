import { request } from '@/lib/request'
import * as process from 'process'

export const getHomeApi = () => request.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/home`)
