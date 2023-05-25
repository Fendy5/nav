/**
 * @Author fendy
 * @CreateTime 2023/5/7 01:07
 * @Description
 */
import React, { useEffect } from 'react'
import { useRouter, withRouter } from 'next/router'
import { getTokenApi, getUserInfoApi } from '@/apis/user'
import qs from 'qs'
import { SyncOutlined } from '@ant-design/icons'
import { setUserInfo, UserInfoProp } from '@/store/userSlice'
import { selectUserInfo, useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { signIn, useSession } from 'next-auth/react'
import * as process from 'process'

// interface LoginUrlProp {
//   code: string
//   state: string
// }
const Login:React.FC = ({ router }:{ router: { asPath: string } }) => {
  const dispatch = useAppDispatch()
  const { data, status } = useSession()
  const route = useRouter()

  const getUserInfo = async () => {
    const { code } = qs.parse((router.asPath as string).split('?')[1])
    if (typeof code === 'string') {
      // signIn('credentials')

      console.log('call userInfo')
      // const { data: userInfo } = await getUserInfoApi(code)
      // await dispatch(setUserInfo(userInfo))
      // await router.push('/')

      // const { data: token } = await getTokenApi({ code })
      const res = await signIn('wechat', { code, callbackUrl: process.env.NEXT_PUBLIC_BASE_URL })
      console.log('login', res)
      // console.log('userInfo', userInfo)
      // console.log('token', userInfo)
      // console.log('token', token)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      route.push('/')
    } else if (status === 'unauthenticated') {
      getUserInfo()
    }
  }, [status])

  return (<div className={'absolute-center text-center'}>
    <SyncOutlined style={{ fontSize: '24px' }} spin />
    <p className={'mt-2'}>加载中...</p>
  </div>)
}

export default withRouter(Login)
