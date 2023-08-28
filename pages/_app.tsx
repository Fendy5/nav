import 'tailwindcss/tailwind.css'
import '../styles/index.css'

import Head from 'next/head'
// import { Auth0Provider } from '@auth0/auth0-react'
import { ConfigProvider } from 'antd'
import theme from '../config/antd-theme'
import { store } from '@/store'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'

export default function MyApp({ Component, pageProps: { session, ...pageProps }}) {
  return (
    // <Auth0Provider clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID} domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}>
    //   <Head>
    //     <meta name="viewport" content="width=device-width, initial-scale=1" />
    //     <meta name="description" content="设计导航、前端导航、产品经理导航" />
    //     <title>互联网人的导航</title>
    //   </Head>
    //   <ConfigProvider theme={theme}>
    //     <Component {...pageProps} />
    //   </ConfigProvider>
    // </Auth0Provider>
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="设计导航、前端导航、产品经理导航" />
        <title>互联网人的导航</title>
      </Head>
      <Provider store={store}>
        <SessionProvider session={session}>
          <ConfigProvider theme={theme}>
            <Component {...pageProps} />
          </ConfigProvider>
        </SessionProvider>
      </Provider>
    </div>
  )
}
