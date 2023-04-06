/**
 * @Author fendy
 * @CreateTime 2023/3/20 16:02
 * @Description
 */
import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Modal, Select, Space, Upload, UploadProps } from 'antd'
import { RcFile } from 'antd/lib/upload'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { getBase64 } from '../../utils'
import Link from 'next/link'
import { CategoryProp, TagProp } from '../../interfaces'
import { getCategoriesApi } from '../../apis/category'
import { getTagsApi } from '../../apis/tag'
import ImgCrop from 'antd-img-crop'

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('你只可以上传 JPG/PNG 格式的图片')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('图片大小不可以超过2M')
  }
  return isJpgOrPng && isLt2M
}

export default function AddTool({ imageUrl, setImageUrl, toolId, setOpen, open, form, fileList, setFileList, onFinish }) {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<CategoryProp[]>()
  const [tagOptions, setTagOptions] = useState<TagProp[]>([])

  const handleChange: UploadProps['onChange'] = ({ file, fileList }) => {
    if (file.status) {
      setFileList(fileList)
    }
    if (file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (file.status === 'done') {
      getBase64(file.originFileObj as RcFile, (url) => {
        setLoading(false)
        setImageUrl(url)
      })
    }
    if (file.status === 'removed') {
      setImageUrl('')
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
    </div>
  )

  useEffect(() => {
    getCategoriesApi().then(i => setCategories(i.data))
    getTagsApi().then(i => setTagOptions(i.data))
  }, [])
  return <>
    <Modal
      onCancel={() => setOpen(false)}
      title={!toolId ? '新增' : '编辑'}
      footer={[]}
      open={open}>
      <div>
        {/*<h2 className='font-bold text-2xl text-center mb-10'>新增导航</h2>*/}
        <Form
          name='basic'
          form={form}
          className={'mt-10'}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
        >

          <Form.Item label='分类' name='category_id' rules={[{ required: true, message: '请选择类别' }]}>
            <Select placeholder='请选择类别'
              dropdownRender={(menu) => (
                <>
                  {menu}
                    <Link href={'/admin/category'}>
                      <Button block type="link" icon={<PlusOutlined />}>
                        添加分类
                      </Button>
                    </Link>
                </>
              )}
              options={categories?.map((i) => ({ label: i.name, value: i.uuid }))}
            />
          </Form.Item>

          <Form.Item label='名称' name='name' rules={[{ required: true, message: '请输入名称' }]}>
            <Input placeholder='请输入名称' />
          </Form.Item>

          <Form.Item label='区域' name='country_id' rules={[{ required: true, message: '请选择区域' }]}>
            <Select
              placeholder='请选择区域'
              options={[
                { value: 1, label: '国内' },
                { value: 2, label: '海外' }
              ]}
            />
          </Form.Item>

          <Form.Item label='版权' name='tag_id' rules={[{ required: true, message: '请选择版权' }]}>
            <Select
              fieldNames={{label: 'name', value: 'id'}}
              placeholder='请选择版权'
              options={tagOptions}
            />
          </Form.Item>

          <Form.Item label='链接' name='url' rules={[{ required: true, message: '请输入链接' }]}>
            <Input placeholder='请输入链接' />
          </Form.Item>

          <Form.Item name='desc' label='描述' rules={[{ required: true, message: '请输入导航描述' }]}>
            <Input.TextArea placeholder='请输入描述' />
          </Form.Item>

          <Form.Item label='Logo' name='image' rules={[{ required: true, message: '请上传导航Logo' }]}>
            <ImgCrop quality={1} modalTitle={'裁剪图片'} showGrid modalOk={'确定'} modalCancel={'取消'} rotationSlider>
              <Upload
                name='image'
                listType='picture-circle'
                fileList={fileList}
                data={
                  { '100%': true }
                }
                action='/image-api'
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {(imageUrl || fileList?.length >= 1) ? null : uploadButton}
              </Upload>
            </ImgCrop>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Button type='primary' htmlType='submit'>
              确定
            </Button>
            <Button onClick={() => setOpen(false)} className={'ml-4'}>取消</Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  </>
}
