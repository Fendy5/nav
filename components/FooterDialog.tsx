/**
 * @Author fendy
 * @CreateTime 2023/4/27 14:27
 * @Description
 */
import React, { useState } from 'react'
import { Modal } from 'antd'
import Image from 'next/image'

export type dialogTypeProp = 'follow' | 'coffee' | 'wechat'

export const FooterDialog = ({ show, close, type }:{type: dialogTypeProp, show: boolean, close: () => void}) => {
  const imgMap = new Map([
    ['follow', { text: '关注我们', img: '/images/mp.jpg' }],
    ['coffee', { text: '请我们喝杯咖啡', img: '/images/wechat-pay.jpg' }],
    ['wechat', { text: '加我们微信详聊', img: '/images/wechat.jpg' }]
  ])
  return <Modal width={250} title={imgMap.get(type).text} open={show} onCancel={close} footer={null} >
    <Image width={200} height={200} src={imgMap.get(type).img} alt={imgMap.get(type).text} />
  </Modal>
}
