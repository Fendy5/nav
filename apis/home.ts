import { request } from '../lib/request'

export const getHomeApi = () => request.get('http://127.0.0.1:7040/api/v1/home')
