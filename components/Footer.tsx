/**
 * @Author fendy
 * @CreateTime 2023/4/26 16:24
 * @Description
 */
import React, { useState } from 'react'
import footerCSS from '../styles/footer.module.css'
import { Button, Tooltip } from 'antd'
import { addBookmark } from '../utils'
import { dialogTypeProp, FooterDialog } from './FooterDialog'

export const Footer = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState<dialogTypeProp>('follow')
  const showModal = (type) => {
    setModalType(type)
    setModalOpen(true)
  }
  return <>
    <FooterDialog show={isModalOpen} close={() => { setModalOpen(false) }} type={modalType}  />
    <footer className={'bg-black text-white grid grid-cols-4 text-center py-12'}>
      <section className={footerCSS.section}>
        <h2>鸣谢</h2>
        <div>Fendy</div>
        <div>陈狗娜</div>
      </section>
      <section className={footerCSS.section}>
        <h2>支持我们</h2>
        <div className={footerCSS.footerItem}>
          <Button onClick={() => { addBookmark() }} type="link">一键收藏</Button>
          <Button onClick={() => { showModal('follow') }} type="link">关注我们</Button>
          <Button type="link">优化建议</Button>
          <Button onClick={() => { showModal('coffee') }} type="link">请喝咖啡</Button>
        </div>
      </section>
      <section className={footerCSS.section}>
        <h2>加入我们</h2>
        <div className={footerCSS.footerItem}>
          <Button onClick={() => { showModal('wechat') }} type="link">WeChat</Button>
          <Tooltip placement="bottom" title={'zf@fendy5.cn'}>
            <Button type="link">Email</Button>
          </Tooltip>
        </div>
      </section>
      <section className={footerCSS.section}>
        <h2>更多产品</h2>
        <div className={footerCSS.footerItem}>
          <Button target={'_blank'} href={'https://todo.fendy5.cn'} type="link">TodoList</Button>
          <Button target={'_blank'} href={'https://tool.fendy5.cn'}  type="link">开发者工具集</Button>
          <Button target={'_blank'} href={'https://blog.fendy5.cn'}  type="link">个人博客</Button>
        </div>
      </section>
    </footer>
  </>
}
