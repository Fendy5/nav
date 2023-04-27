import Container from '../components/container'
import React, { useEffect, useState } from 'react'
import { getHomeApi } from '../apis/home'
import Head from 'next/head'
import Link from 'next/link'
import { Tag, Tooltip } from 'antd'
import SideBar from '../components/sideBar'
import { Header } from '../components/Header'
import { EyeOutlined, HeartOutlined } from '@ant-design/icons'
import { Footer } from '../components/Footer'

type toolItem = {
  id: number
  name: string
  logo: string
  url: string
  tag: string
  country: string
  desc: string
}

type toolsItem = {
  name: string
  uuid: string
  tools: toolItem[]
}
export default function HomePage({ toolList }: { toolList: toolsItem[] }): JSX.Element {
  const [activeKey, setActiveKey] = useState(toolList[0].uuid)

  const handleScroll = (e) => {
    const scroll = document.getElementById('app').scrollTop
    const key = toolList.find(i => {
      const tool = document.getElementById(i.uuid).offsetTop
      const sun = tool - scroll
      return sun < 50 && sun > 0
    })
    key && setActiveKey(key.uuid)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>一点通导航 | 互联网人必备网站导航</title>
        <meta name='description' content='一点通导航、互联网人必备网站导航、新媒体必备导航、前端必备导航、设计师必备导航' />
      </Head>
      <div className='layout'>
        <Header />
        <div className='main-app'>
          <SideBar activeKey={activeKey} categories={toolList} />
          <div id={'app'} className='h-screen overflow-auto flex-1'>
            <div className='main-content'>
              <Container>
                {
                  toolList.map(i => {
                    return (
                      <div key={i.uuid} className='space-y-6 mb-12'>
                        <h2 id={i.uuid} className='text-xl font-bold'>{i.name}</h2>
                        <div className='grid gap-x-8 gap-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 xxxl:grid-cols-5'>
                          {
                            i.tools.map(j => {
                              return <Link className='card' key={j.id} prefetch={false} target={'_blank'} href={j.url}>
                                <div className='flex'>
                                  <img className='w-8 h-8 mr-2 rounded-full object-cover' src={j.logo} alt='' />
                                  <Tooltip placement='top' title={j.name} arrow={true}>
                                    <h3 className='text-lg font-bold cursor-pointer truncate'>{j.name}</h3>
                                  </Tooltip>
                                </div>
                                <div className='my-2'>
                                  {/*<h3 className='text-lg font-bold cursor-pointer truncate'>*/}
                                  {/*  <Tooltip placement="top" title={j.name} arrow={true}>*/}
                                  {/*    { j.name }*/}
                                  {/*  </Tooltip>*/}
                                  {/*  <Tag className={'ml-2'} color="default">{ j.tag }</Tag>*/}
                                  {/*  <Tag color="default">{ j.country }</Tag>*/}
                                  {/*</h3>*/}
                                  <div className='h-10 flex items-center'>
                                <span className='text-gray-500 truncate-2'>
                                  <Tooltip placement='bottom' title={j.desc} arrow={true}>
                                    <div>{j.desc}</div>
                                  </Tooltip>
                                </span>
                                  </div>
                                </div>
                                <div className={'flex justify-between'}>
                                  <div className={'flex'}>
                                  <span className={'flex'}>
                                    <HeartOutlined />
                                    <span className='ml-1'>150</span>
                                  </span>
                                    <span className={'ml-3 flex'}>
                                    <EyeOutlined />
                                    <span className={'ml-1'}>230</span>
                                  </span>
                                  </div>
                                  <div className={'flex items-center'}>
                                    <Tag className={'ml-2'} color='default'>{j.tag}</Tag>
                                    <Tag color='default'>{j.country}</Tag>
                                  </div>
                                </div>
                              </Link>
                            })
                          }
                        </div>
                      </div>
                    )
                  })
                }
              </Container>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const { data: toolList } = await getHomeApi()
  return {
    props: {
      toolList
    }
  }
}
