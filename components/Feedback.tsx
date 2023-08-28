/**
 * @Author fendy
 * @CreateTime 2023/4/28 09:49
 * @Description
 */
import React, { useState } from 'react'
import { Button, Form, Input, message, Modal, Space } from 'antd'
import { FeedbackProp } from '@/interfaces'
import { storeFeedbackApi } from '@/apis/feedback'

export interface FeedbackFormDataProp {
  contact: string | undefined
  feedback: string
}
export const Feedback = ({ show, setShowModal }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const onFinish = async (formData: FeedbackProp) => {
    setLoading(true)
    const { code, message: msg } = await storeFeedbackApi(formData)
    setLoading(false)
    if (code === 1) {
      form.resetFields()
    }
  }
  return <Modal title={'优化建议'} footer={null} open={show} onCancel={() => { setShowModal(false) }}>
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      form={form}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item label="联系方式" name="contact">
        <Input placeholder={'请输入您的联系方式（选填）'} />
      </Form.Item>

      <Form.Item name="feedback" label="优化建议" rules={[{ required: true, message: '请填写你的优化建议' }]}>
        <Input.TextArea rows={4} placeholder={'请输入您的优化建议'} showCount maxLength={300} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4 }}>
        <Space>
          <Button loading={loading} type="primary" htmlType="submit">提交</Button>
          <Button onClick={() => { setShowModal(false) }} htmlType="reset">取消</Button>
        </Space>
      </Form.Item>
    </Form>
  </Modal>
}
