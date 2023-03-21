/**
 * @Author fendy
 * @CreateTime 2023/3/20 14:21
 * @Description
 */

import { useEffect, useState } from 'react'
import { CategoryProp, ToolFormProp, ToolProp } from '../interfaces'
import { getCategoriesApi } from '../apis/category'
import { addToolApi, deleteToolApi, getToolsApi, updateToolApi } from '../apis/nav-tool'
import { Form, UploadFile } from 'antd'

export default function() {
  const [imageUrl, setImageUrl] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<CategoryProp[]>()
  const [open, setOpen] = useState(false)
  const [dataSource, setDataSource] = useState<ToolProp[]>()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [toolId, setToolId] = useState('')
  const [form] = Form.useForm()

  const onFinish = async (formData: ToolFormProp) => {
    const rspUrl = formData.image?.fileList?.[0].response.image_url
    console.log(formData.image?.fileList?.[0])
    if (rspUrl) {
      formData.logo = rspUrl
    } else {
      if (typeof formData.image === 'string') {
        formData.logo = formData.image
      }
    }
    const { code } = toolId ? await updateToolApi(toolId, formData) : await addToolApi(formData)
    if (code === 1) {
      setOpen(false)
      getToolList()
    }
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
    getCategoriesApi().then(i => setCategories(i.data))
    getToolList()
  }, [])
  return { setImageUrl, imageUrl, loading, showAdd, categories, onFinish, setOpen, open, setDataSource, dataSource, onDelete, showEdit, form, fileList, setFileList, toolId }
}
