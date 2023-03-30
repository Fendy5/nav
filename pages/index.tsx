import Container from '../components/container'
import React, { useEffect, useState } from 'react'
import { getHomeApi } from '../apis/home'
import Head from 'next/head'
import Link from 'next/link'
import { Tag, Tooltip } from 'antd'
import SideBar from '../components/sideBar'

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
export default function HomePage({ toolList }: { toolList: toolsItem[] }) {

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
    return () => { window.removeEventListener('scroll', handleScroll) }
  }, [])

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>互联网人必备网站导航</title>
        <meta name="description" content="互联网人必备网站导航" />
      </Head>
      <div className='layout'>
        <SideBar activeKey={activeKey} categories={toolList} />
        <div id={'app'} className='main-app'>
          <Container>
            {
              toolList.map(i => {
                return (
                  <div key={i.uuid} className='space-y-6 mb-12'>
                    <h2 id={i.uuid} className='text-xl font-bold'>{ i.name }</h2>
                    <div className='grid gap-x-8 gap-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5'>
                      {
                        i.tools.map(j => {
                          return <Link key={ j.id }  prefetch={false} target={'_blank'} href={j.url} className='card'>
                            <div className='flex items-center'>
                              <img className='w-8 h-8 rounded-full object-cover' src={ j.logo } alt='' />
                            </div>
                            <div className='pl-2 w-desc'>
                              {/*<h3 className='text-lg font-bold cursor-pointer truncate'>*/}
                              {/*  <Tooltip placement="top" title={j.name} arrow={true}>*/}
                              {/*    { j.name }*/}
                              {/*  </Tooltip>*/}
                              {/*  <Tag className={'ml-2'} color="default">{ j.tag }</Tag>*/}
                              {/*  <Tag color="default">{ j.country }</Tag>*/}
                              {/*</h3>*/}
                              <div className={'flex'}>
                                <Tooltip placement="top" title={j.name} arrow={true}>
                                  <h3 className='text-lg font-bold cursor-pointer truncate'>{ j.name }</h3>
                                </Tooltip>
                                <div className={'flex items-center'}>
                                  <Tag className={'ml-2'} color="default">{ j.tag }</Tag>
                                  <Tag color="default">{ j.country }</Tag>
                                </div>
                              </div>
                              <div className='h-10'>
                            <span className='text-gray-500 truncate-2'>
                            <Tooltip placement="bottom" title={j.desc} arrow={true}>
                              { j.desc }
                            </Tooltip>
                            </span>
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
