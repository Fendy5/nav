/**
 * @Author fendy
 * @CreateTime 2023/5/7 01:07
 * @Description
 */
import React, { useEffect } from 'react'
import { withRouter } from 'next/router'
import { getUserInfoApi } from '../../apis/user'

interface LoginUrlProp {
  code: string
  state: string
}
const Login:React.FC = ({ router }:{ router: { query: LoginUrlProp } }) => {
  const getUserInfo = async () => {
    const code = router.query.code
    const userInfo = await getUserInfoApi(code)
    console.log(userInfo)
  }
  useEffect(() => {
    getUserInfo()
  }, [])
  return null
}

export default withRouter(Login)
