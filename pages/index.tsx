import Container from '../components/container'
import React, { useEffect } from 'react'
import { getHomeApi } from '../apis/home'
import Head from 'next/head'
import Link from 'next/link'

type toolItem = {
  id: number
  name: string
  logo: string
  url: string
  desc: string
}

type toolsItem = {
  name: string
  uuid: string
  tools: toolItem[]
}
export default function HomePage({ toolList }: { toolList: toolsItem[] }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>互联网人必备网站导航</title>
        <meta name="description" content="互联网人必备网站导航" />
      </Head>
      <Container>
        {
          toolList.map(i => {
            return (
              <div key={i.uuid} className='space-y-6 mb-12'>
                <h2 className='text-xl font-bold'>{ i.name }</h2>
                <div className='grid gap-x-8 gap-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
                  {
                    i.tools.map(j => {
                      return <div key={ j.id } className='card'>
                        <div className='flex items-center'>
                          <img className='w-8 h-8 rounded-full' src={ j.logo } alt='' />
                        </div>
                        <div className='pl-2 w-desc'>
                          <h3 className='text-lg font-bold cursor-pointer truncate'>
                            <Link prefetch={false} target={'_blank'} href={j.url}>{ j.name }</Link>
                          </h3>
                          <p className='text-gray-500 truncate-2 h-10'>{ j.desc }</p>
                        </div>
                      </div>
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const { data: toolList } = await getHomeApi()
  return {
    props: {
      toolList
    }
  }
}
