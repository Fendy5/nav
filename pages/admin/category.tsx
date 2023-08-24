/**
 * @Author fendy
 * @CreateTime 2023/3/17 22:08
 * @Description
 */
import React, { useState } from 'react'
import Head from 'next/head'
import { Button, Form, Input, message, Modal, Popconfirm, Space, Table, Upload, UploadFile, UploadProps } from 'antd'
import useCategory from '../../hooks/useCategory'
import Link from 'next/link'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import { RcFile } from 'antd/lib/upload'

const getBase64 = (file: RcFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

const Category: React.FC = () => {
  const { fileList, setFileList, imageUrl, setImageUrl,setLogoUrl, isLoading, showModal, showEdit, hideModal, onDelete, onFinish, dataSource, form, open, setName, uuid } = useCategory()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')

  const columns = [
    {
      title: '序号',
      width: 100,
      render: (_, record, index) => (
        <span>{index + 1}</span>
      )
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '创建时间',
      key: 'name',
      render: (i) => (
        <span>{i.created_at }</span>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_) => (
        <Space size='middle'>
          <a onClick={() => showEdit(_)}>编辑</a>
          <Popconfirm
            placement='bottom'
            title='温馨提示'
            description={'你确定删除该数据吗？'}
            onConfirm={() => onDelete(_.uuid)}
            okText='确定'
            cancelText='取消'
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const [loading] = useState(false)

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append('files[]', file as RcFile)
    try {
      const res = await fetch('/image-api', {
        method: 'POST',
        body: formData
      })
      const { code, msg, data } = await res.json()
      if (code === 1) {
        setLogoUrl(data[0])
        message.success(msg)
      } else {
        message.error(msg)
      }
    } catch (e) {
      message.error('网络错误')
    }
  }

  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: () => {
      return false
    },
    onPreview: async (file: UploadFile) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as RcFile)
      }
      setPreviewImage(file.url || (file.preview as string))
      setPreviewOpen(true)
      setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
    },
    onChange: ({ file }) => {
      if (file.status !== 'removed') {
        file.url = URL.createObjectURL(file as unknown as Blob)
        setFileList((fileList) => [...fileList, file])
        uploadImage(file)
      }
    },
    multiple: true,
    fileList
  }

  return <>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <title>分类管理</title>
    </Head>
    <div className='p-8'>
      <Link href={'/admin'}>
        <Button className='mr-4'>返回</Button>
      </Link>
      <Button type='primary' className='mb-4' onClick={showModal}>新增</Button>
      <Table loading={isLoading} rowKey="uuid" dataSource={dataSource} columns={columns} />
      <Modal
        title={!uuid ? '新增' : '编辑'}
        open={open}
        onOk={onFinish}
        onCancel={hideModal}
        okText='确认'
        cancelText='取消'
      >
        <Form
          name='basic'
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 600 }}
          autoComplete='off'
        >
          <Form.Item label='分类' name='name' className='mt-6' rules={[{ required: true, message: '请输入分类' }]}>
            <Input onChange={(e) => setName(e.target.value)} placeholder='请输入分类' />
          </Form.Item>
          <Form.Item label='Logo' name='icon' className='mt-6' rules={[{ required: true, message: '图标' }]}>
            <ImgCrop quality={1} modalTitle={'裁剪图片'} showGrid modalOk={'确定'} modalCancel={'取消'} rotationSlider>
              <Upload { ...uploadProps } listType='picture-card'>
                {(imageUrl || fileList?.length >= 1) ? null : uploadButton}
              </Upload>
            </ImgCrop>
          </Form.Item>
        </Form>
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Modal>
    </div>
  </>
}

export default Category
