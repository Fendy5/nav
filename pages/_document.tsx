import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'

const MyDocument = () => {
  return (
    <Html lang='en'>
      <Head>
        <meta charSet='utf-8' />
        <meta name='robots' content='follow, index' />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
      </Head>
      <body className='bg-main antialiased text-sm'>
      <Main />
      <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const cache = createCache()
  const originalRenderPage = ctx.renderPage
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => (
        <StyleProvider cache={cache}>
          <App {...props} />
        </StyleProvider>
      )
    })

  const initialProps = await Document.getInitialProps(ctx)
  const style = extractStyle(cache, true)
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    )
  }
}

export default MyDocument
