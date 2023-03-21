/**
 * @Author fendy
 * @CreateTime 2023/3/17 22:08
 * @Description
 */
import React from 'react'
import Head from 'next/head'
import { Button, Form, Input, Modal, Popconfirm, Space, Table } from 'antd'
import useCategory from '../../hooks/useCategory'
import Link from 'next/link'

const Category: React.FC = () => {
  const { isLoading, showModal, showEdit, hideModal, onDelete, onFinish, dataSource, form, open, setName, uuid } = useCategory()

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
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item label='分类' name='name' className='mt-6' rules={[{ required: true, message: '请输入分类' }]}>
            <Input onChange={(e) => setName(e.target.value)} placeholder='请输入分类' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  </>
}

export default Category
