import { request } from '../lib/request'
import { ToolFormProp, ToolProp } from '../interfaces'

export const addToolApi = (data: ToolFormProp) => {
  return request.post(`/api/v1/tool`, data)
}

export const getToolsApi = () => request.get<ToolProp[]>('/api/v1/tool')

export const deleteToolApi = (id) => request.delete(`/api/v1/tool/${id}`)

export const updateToolApi = (id, data) => request.put(`/api/v1/tool/${id}`, data)
