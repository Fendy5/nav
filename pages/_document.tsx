import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="robots" content="follow, index" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </Head>
      <body style={{background: 'rgb(171, 82, 169)'}} className="bg-main antialiased text-sm">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
