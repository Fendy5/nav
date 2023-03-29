import { request } from '../lib/request'

/**
 * @Author fendy
 * @CreateTime 2023/3/29 12:23
 * @Description
 */
export const getTagsApi = () => {
  return request.get('/api/v1/tag')
}
