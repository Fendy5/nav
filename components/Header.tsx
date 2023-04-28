/**
 * @Author fendy
 * @CreateTime 2023/4/8 16:58
 * @Description
 */
import React from 'react'
import HeaderCSS from '../styles/header.module.css'
import { Button } from 'antd'
import Image from 'next/image'
import Logo from '../assets/svg/logo.svg'

export const Header = () => {
  return <div className={HeaderCSS.container}>
    <div className={'flex text-xl font-bold text-primary pl-8 md:pl-0'}>
      <Image width={32} height={32} src={Logo} alt={'Logo'} />
      <span>一点通导航</span>
    </div>
    <Button className={'text-lg mb-2'} type="link">注册/登录</Button>
  </div>
}
