import React from 'react'
import { Popconfirm, Space, Table } from 'antd'
import Image from 'next/image'

export const ToolList = ({ loading, dataSource, onDelete, showEdit }) => {
  const columns = [
    {
      title: '序号',
      width: 60,
      render: (_, record, index) => (
        <span>{index + 1}</span>
      )
    },
    {
      title: 'Logo',
      dataIndex: 'logo',
      width: 80,
      render: _ => (
        <Image width={32} height={32} src={_} alt={"Logo"} />
      )
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: 150,
      ellipsis: {
        showTitle: true,
      }
    },
    {
      title: '区域',
      dataIndex: 'country',
      width: 80
    },
    {
      title: '类别',
      dataIndex: 'category',
      width: 120,
      ellipsis: {
        showTitle: true,
      }
    },
    {
      title: '版权',
      dataIndex: 'tag',
      width: 80
    },
    {
      title: '链接',
      dataIndex: 'url',
      width: 200,
      ellipsis: {
        showTitle: true,
      }
    },
    {
      title: '描述',
      width: 300,
      ellipsis: {
        showTitle: true,
      },
      dataIndex: 'desc'
    },
    {
      title: '创建时间',
      width: 180,
      render: (i) => (
        <span>{i.created_at }</span>
      )
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_) => (
        <Space size='middle'>
          <a onClick={() => showEdit(_)}>编辑</a>
          <Popconfirm
            placement='bottom'
            title='温馨提示'
            description={'你确定删除该数据吗？'}
            okText='确定'
            onConfirm={() => onDelete(_)}
            cancelText='取消'
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      )
    }
  ]
  return <div>
    <Table rowKey="id" loading={loading} dataSource={dataSource} columns={columns} />
  </div>
}

export default ToolList
