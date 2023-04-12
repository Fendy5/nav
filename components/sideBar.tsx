/**
 * @Author fendy
 * @CreateTime 2023/3/29 15:31
 * @Description
 */
import React, { useEffect } from 'react'
import { Menu, MenuProps } from 'antd'
import Image from 'next/image'
import { CategoryProp } from '../interfaces'
import sideBar from '../styles/sideBar.module.css'

type MenuItem = Required<MenuProps>['items'][number]

export const SideBar = ({ categories, activeKey }: { categories: CategoryProp[], activeKey: string }) => {
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuProps['items'] = [
    { type: 'divider' }
  ]

  categories.forEach(i => {
    items.push(getItem(i.name, i.uuid))
  })

  const onClick: MenuProps['onClick'] = (e) => {
    const categoryElement = document.getElementById('app')
    categoryElement.scrollTo({
      top: (document.getElementById(e.key).offsetTop || 0) - 25,
      behavior: 'smooth'
    })
  }

  return <div className={'bg-inherit'}>
    <div className='flex items-center justify-center bg-inherit h-200'>
      <div className={'bg-transparent'}>
        <Image className={'mx-auto'} width={64} height={64} src={'/images/profile.png'} alt={'profile'} />
        <p className={'text-lg font-bold text-center'}>互联网人必备导航</p>
        <p className={'text-center text-gray-700'}>为创意工作者而设计</p>
      </div>
    </div>
    <Menu
      onClick={onClick}
      className={sideBar.menu}
      defaultSelectedKeys={[activeKey]}
      mode="inline"
      selectedKeys={[activeKey]}
      items={items}>
    </Menu>
  </div>
}

export default SideBar
