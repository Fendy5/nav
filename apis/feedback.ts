import { request } from '@/lib/request'
import { FeedbackProp } from '@/interfaces'

// 保存Feedback
export const storeFeedbackApi = (data: FeedbackProp) => {
  return request.post(`/api/v1/feedback`, data)
}
