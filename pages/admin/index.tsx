/**
 * @Author fendy
 * @CreateTime 2023/3/17 11:07
 * @Description
 */
import React from 'react'
import Head from 'next/head'
import { Button } from 'antd'
import useTool from '../../hooks/useTool'
import AddTool from './AddTool'
import { ToolList } from './ToolList'
import { Expand } from '../../components/motions/Expand'

export default function AdminPage() {
  const { submitLoading, imageUrl, setImageUrl, loading, setOpen, open, dataSource, onDelete, showEdit, form, fileList, setFileList, onFinish, showAdd, toolId } = useTool()

  return <>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <title>导航管理</title>
    </Head>
    <div className='p-4'>
      <Button type='primary' onClick={showAdd} className='mb-4'>新增</Button>
      <Expand>
        <ToolList loading={loading} showEdit={showEdit} onDelete={onDelete} dataSource={dataSource} />
      </Expand>
      <AddTool submitLoading={submitLoading} imageUrl={imageUrl} setImageUrl={setImageUrl} onFinish={onFinish} form={form} setOpen={setOpen} open={open} fileList={fileList} setFileList={setFileList} toolId={toolId} />
    </div>
  </>
}
