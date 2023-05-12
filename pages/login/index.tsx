/**
 * @Author fendy
 * @CreateTime 2023/5/7 01:07
 * @Description
 */
import React, { useEffect } from 'react'
import { withRouter } from 'next/router'
import { getUserInfoApi } from '../../apis/user'
import qs from 'qs'

// interface LoginUrlProp {
//   code: string
//   state: string
// }
const Login:React.FC = ({ router }:{ router: { asPath: string } }) => {
  const getUserInfo = async () => {
    const { code } = qs.parse((router.asPath as string).split('?')[1])
    if (typeof code === 'string') {
      console.log(code)
      const userInfo = await getUserInfoApi(code)
      console.log(userInfo)
    }
  }
  useEffect(() => {
    getUserInfo()
  }, [])
  return null
}

export default withRouter(Login)
