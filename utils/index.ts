import { RcFile } from 'antd/lib/upload'
import { message } from 'antd'

export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

export const addBookmark = (url = 'https://nav.fendy5.cn', title = '一点通导航') => {
  // @ts-ignore
  if (window.sidebar && window.sidebar.addPanel) { // Firefox
    // @ts-ignore
    window.sidebar.addPanel(title, url, '')
  } else if (window.external && ('AddFavorite' in window.external)) { // IE
    // @ts-ignore
    window.external.AddFavorite(url, title)
    // @ts-ignore
  } else if (window.opera && window.print) { // Opera
    const elem = document.createElement('a')
    elem.setAttribute('href', url)
    elem.setAttribute('title', title)
    elem.setAttribute('rel', 'sidebar')
    elem.click()
  } else { // Other browsers
    message.info(getPlatform() === 'macOS' ? '请使用 Cmd+D 将此页加入收藏夹！' : '请使用 Ctrl+D 将此页加入收藏夹！')
  }
}

export const getPlatform = () => {
  // @ts-ignore
  return navigator.userAgentData.platform
}
