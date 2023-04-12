/**
 * @Author fendy
 * @CreateTime 2023/4/8 16:58
 * @Description
 */
import React from 'react'
import HeaderCSS from '../styles/header.module.css'
import { Button } from 'antd'

export const Header = () => {
  return <div className={HeaderCSS.container}>
    <div className=''>
      <Button type="link">注册/登录</Button>
    </div>
  </div>
}
