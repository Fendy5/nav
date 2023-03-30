import 'tailwindcss/tailwind.css'
import '../styles/index.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Auth0Provider } from '@auth0/auth0-react'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <Auth0Provider
    //   clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
    //   domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    // >
    //   <Head>
    //     <meta name="viewport" content="width=device-width, initial-scale=1" />
    //     <meta
    //       name="description"
    //       content="Clone and deploy your own Next.js portfolio in minutes."
    //     />
    //     <title>My awesome blog</title>
    //   </Head>
    //
    //   <main className="py-14">
    //     <Component {...pageProps} />
    //   </main>
    // </Auth0Provider>
    <Auth0Provider clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID} domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="设计导航、前端导航、产品经理导航"
        />
        <title>互联网人的导航</title>
      </Head>

      {/*<Header />*/}
      {/*<div className='layout'>*/}
      {/*  <SideBar />*/}
      {/*  <main className="main-app">*/}
      {/*    <Component {...pageProps} />*/}
      {/*  </main>*/}
      {/*</div>*/}
      <Component {...pageProps} />
    </Auth0Provider>
  )
}
