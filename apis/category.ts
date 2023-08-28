/**
 * @Author fendy
 * @CreateTime 2023/3/20 12:32
 * @Description
 */
import { request } from '@/lib/request'
import { CategoryProp } from '@/interfaces'

export const getCategoriesApi = () => request.get<CategoryProp[]>('/api/v1/category')

export const updateCategoriesApi = (id, data) => {
  return request.put(`/api/v1/category/${id}`, data)
}

export const addCategoriesApi = (data) => {
  return request.post(`/api/v1/category`, data)
}

export const deleteCategoryApi = (id: string) => {
  return request.delete(`/api/v1/category/${id}`)
}
