/**
 * @Author fendy
 * @CreateTime 2023/3/29 15:31
 * @Description
 */
import React, { useEffect, useRef, useState } from 'react'
import { Menu, MenuProps } from 'antd'
import { CategoryProp } from '@/interfaces'
import sideBar from '../styles/sideBar.module.css'
import { motion, useCycle } from 'framer-motion'
import { MenuToggle } from './menuToggle'
import clsx from 'clsx'

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

  const getIcon = (url) => {
    return <img className={'w-4'} src={url} alt={''} />
  }

  categories.forEach(i => {
    items.push(getItem(i.name, i.uuid, getIcon(i.logo_url)))
  })

  const onClick: MenuProps['onClick'] = (e) => {
    const categoryElement = document.getElementById('app')
    categoryElement.scrollTo({
      top: (document.getElementById(e.key).offsetTop || 0) - 75,
      behavior: 'smooth'
    })
  }

  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null)

  const sidebar = {
    open: (height = 1000) => ({
      // clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2
      }
    }),
    closed: {
      // clipPath: "circle(20px at 30px 30px)",
      transition: {
        delay: 0,
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  }


  return <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'} variants={sidebar}
                     className={clsx(isOpen ? 'w-52' : 'w-0', 'overflow-hidden md:w-52 shadow-sidebar transition-all')}>
    <div className='fixed md:hidden left-5 top-6 z-40'>
      <MenuToggle toggle={() => toggleOpen()} />
    </div>
    {/*<motion.div className={sideBar.background} variants={sidebar} />*/}
    <div className='flex items-center justify-center bg-inherit h-16 mt-8'>
      <div className={'bg-transparent'}>
        {/*<Image className={'mx-auto'} width={64} height={64} src={'/images/profile.png'} alt={'profile'} />*/}
        <p className={'text-lg font-bold text-center'}>互联网人必备导航</p>
        <p className={'text-center text-gray-700'}>为创意工作者而设计</p>
      </div>
    </div>
    <Menu
      onClick={onClick}
      className={sideBar.menu}
      // defaultSelectedKeys={[activeKey]}
      mode='inline'
      selectedKeys={[activeKey]}
      items={items}>
    </Menu>
  </motion.nav>
}

export default SideBar
