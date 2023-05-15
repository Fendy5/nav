/**
 * @Author fendy
 * @CreateTime 2023/5/7 01:07
 * @Description
 */
import React, { useEffect } from 'react'
import { withRouter } from 'next/router'
import { getUserInfoApi } from '@/apis/user'
import qs from 'qs'
import { SyncOutlined } from '@ant-design/icons'
import { setUserInfo, UserInfoProp } from '@/store/userSlice'
import { useAppDispatch } from '@/hooks/useRedux'

// interface LoginUrlProp {
//   code: string
//   state: string
// }
const Login:React.FC = ({ router }:{ router: { asPath: string } }) => {
  const getUserInfo = async () => {
    const { code } = qs.parse((router.asPath as string).split('?')[1])
    if (typeof code === 'string') {
      const dispatch = useAppDispatch()
      console.log(code)
      const userInfo = await getUserInfoApi(code)
      dispatch(setUserInfo())
      console.log(userInfo)
    }
  }
  useEffect(() => {
    getUserInfo()
  }, [])
  return (<div className={'absolute-center text-center'}>
    <SyncOutlined style={{ fontSize: '24px' }} spin />
    <p className={'mt-2'}>加载中...</p>
  </div>)
}

export default withRouter(Login)
