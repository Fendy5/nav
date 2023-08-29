/**
 * @Author fendy
 * @CreateTime 2023/4/8 16:58
 * @Description
 */
import React from 'react'
import HeaderCSS from '../styles/header.module.css'
import { Dropdown, MenuProps, Space } from 'antd'
import Image from 'next/image'
import Logo from '../assets/svg/logo.svg'
import { selectUserInfo, useAppSelector } from '@/hooks/useRedux'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import { useSession, signOut } from 'next-auth/react'
import * as process from 'process'
import Link from 'next/link'

const items: MenuProps['items'] = [
  { key: '1', label: '个人中心' },
  { key: '2', label: '退出', danger: true }
]

export const Header = () => {
  const userInfo = useAppSelector(selectUserInfo)
  const { data, status } = useSession()

  const handleLogin = async (e) => {
    e.preventDefault()
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/getUserInfo`
    // try {
    //   // const userInfo = await loginApi()
    //   // console.log('userInfo', userInfo)
    //   const res = await signIn('wechat', { redirect: false, code: '4444' })
    //   console.log('signIn', res)
    //   // debugger
    // } catch (e) {
    //   const url = e.data
    //   if (url) {
    //     console.log(e)
    //     window.location.href = url
    //   }
    // }
  }

  const Logout = () => {
    signOut({ redirect: false, callbackUrl: process.env.NEXT_PUBLIC_BASE_URL })
  }

  const userCenter = () => {
    console.log('userCenter')
  }

  const functionMap = {
    '1': userCenter,
    '2': Logout
  }

  const onDropdownClick = ({ key }) => {
    functionMap[key]()
  }

  const goToHome = () => {
    const categoryElement = document.getElementById('app')
    categoryElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return <div className={HeaderCSS.container}>
    <Link onClick={goToHome} href={''} className={'flex text-xl font-bold text-primary pl-8 md:pl-0'}>
      <Image className={HeaderCSS.logoImg} width={32} height={32} src={Logo} alt={'Logo'} />
      <span>一点通导航</span>
    </Link>
    {
      status === 'authenticated' ? (
        <Dropdown menu={{ items, onClick: onDropdownClick }} className={'mr-4'}>
          <a className={'flex cursor-pointer'} onClick={(e) => e.preventDefault()}>
            <img src={data.user.avatar} className={'rounded-full ml-auto mr-auto w-8 h-8'} alt={'avatar'} />
            <Space className={'ml-2'}>
              <span className={'text-black'}>{ data.user.nickname }</span>
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      ) : (
        <UserOutlined style={{ fontSize: '18px' }} className={'mr-4'} onClick={handleLogin} />
      )
    }
  </div>
}
