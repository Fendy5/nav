/**
 * @Author fendy
 * @CreateTime 2023/3/20 11:30
 * @Description
 */
import { useEffect, useState } from 'react'
import { Form } from 'antd'
import { addCategoriesApi, deleteCategoryApi, getCategoriesApi, updateCategoriesApi } from '@/apis/category'

export default function useCategory() {
  const [open, setOpen] = useState(false)
  const [uuid, setUUID] = useState('')
  const [name, setName] = useState('')
  const [dataSource, setDataSource] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [logoUrl, setLogoUrl] = useState('')
  const [form] = Form.useForm()
  const [imageUrl, setImageUrl] = useState('')
  const [fileList, setFileList] = useState([])

  // 新增弹窗
  const showModal = () => {
    setName('')
    setUUID('')
    setOpen(true)
    form.resetFields()
  }

  // 编辑弹窗
  const showEdit = (i) => {
    setOpen(true)
    setUUID(i.uuid)
    form.setFieldsValue({ name: i.name })
    setName(i.name)
    if (i.logo_url) {
      i.url = i.logo_url
      setFileList([i])
    } else {
      setFileList([])
    }
  }

  const hideModal = () => {
    setOpen(false)
  }

  const getList = async () => {
    setLoading(true)
    const { data } = await getCategoriesApi()
    setDataSource(data)
    setLoading(false)
  }

  const submitData = async () => {
    const { code } = uuid ? await updateCategoriesApi(uuid, { name, logoUrl }): await addCategoriesApi({ name })
    if (code === 1) {
      setOpen(false)
      getList()
    }
  }

  const onDelete = async (id: string) => {
    await deleteCategoryApi(id)
    getList()
  }

  const onFinish = () => {
    submitData()
  }

  useEffect(() => {
    getList()
  }, [])

  return { fileList, setFileList, imageUrl, setImageUrl, isLoading, setName, showEdit, showModal, dataSource, hideModal, onDelete, onFinish, form, open, uuid, logoUrl, setLogoUrl }
}
