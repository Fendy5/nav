/**
 * @Author fendy
 * @CreateTime 2023/3/20 14:21
 * @Description
 */

import { useEffect, useState } from 'react'
import { ToolFormProp, ToolProp } from '../interfaces'
import { addToolApi, deleteToolApi, getToolsApi, updateToolApi } from '../apis/nav-tool'
import { Form, message, UploadFile } from 'antd'

export default function() {
  const [imageUrl, setImageUrl] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)

  const [open, setOpen] = useState(false)
  const [dataSource, setDataSource] = useState<ToolProp[]>()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [toolId, setToolId] = useState('')

  const [form] = Form.useForm()

  const onFinish = async (formData: ToolFormProp) => {
    if (typeof formData.image === 'string') {
      formData.logo = formData.image
    }
    setSubmitLoading(true)
    try {
      const { code } = toolId ? await updateToolApi(toolId, formData) : await addToolApi(formData)
      if (code === 1) {
        setOpen(false)
        getToolList()
      }
    } catch (e) {
      await message.error('网络错误')
    }
    setSubmitLoading(false)
  }

  const onDelete = async (tool: ToolProp) => {
    const { code } = await deleteToolApi(tool.id)
    if (code === 1) {
      getToolList()
    }
  }

  const showEdit = (tool: ToolProp) => {
    setOpen(true)
    setToolId(tool.id)
    form.setFieldsValue(tool)
    form.setFieldValue('image', tool.logo)
    setFileList([
      {
        uid: tool.id,
        name: tool.name,
        status: 'done',
        url: tool.logo
      }
    ])
  }

  const showAdd = () => {
    setOpen(true)
    setToolId('')
    setImageUrl('')
    form.resetFields()
    setFileList([])
  }

  const getToolList = () => {
    setLoading(true)
    getToolsApi().then(i => {
      setLoading(false)
      setDataSource(i.data)
    })
  }

  useEffect(() => {
    getToolList()
  }, [])
  return { submitLoading, setImageUrl, imageUrl, loading, showAdd, onFinish, setOpen, open, setDataSource, dataSource, onDelete, showEdit, form, fileList, setFileList, toolId }
}
