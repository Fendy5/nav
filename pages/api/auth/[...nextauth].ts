import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getTokenApi, getUserInfoApi } from '@/apis/user'
import { setUserInfo, UserInfoProp } from '@/store/userSlice'
import { Provider } from 'react-redux'

export default NextAuth({
  debug: true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    // {
    //   id: 'wechat',
    //   name: 'Wechat',
    //   type: 'oauth',
    //   // scope: '',  // Make sure to request the users email address
    //   profile(profile: UserInfoProp) {
    //     return profile
    //   }
    // }
    // Provider({
    //   type: "oauth",
    // })
    CredentialsProvider({
      name: 'Wechat',
      id: 'wechat',
      type: 'credentials',
      credentials: undefined,
      async authorize(credentials): Promise<UserInfoProp> {
        // const { data: token } = await getTokenApi({ code: '5555' })
        // console.log('token', token)
        // const { token } = credentials
        // const user= {
        //   image: '1111', name: '2222', nickname: '33333'
        // }
        // console.log('credentials', credentials)
        const { data: userInfo } = await getUserInfoApi({ code: credentials.code })
        console.log('userInfo', userInfo)
        // await dispatch(setUserInfo(userInfo))
        // await router.push('/')
        return userInfo ?? null
        // return user ?? null
      }
    }),
    // {
    //   name: 'Wechat',
    //   id: 'wechat',
    //   type: 'oauth',
    //   // authorization: "https://kauth.kakao.com/oauth/authorize",
    //   // token: "http://127.0.0.1:7040/api/v1/login",
    //   authorization: { params: { code: "openid email profile" } },
    //   userinfo: "http://127.0.0.1:7040/api/v1/getUserInfo",
    //   profile(profile: UserInfoProp) {
    //     console.log('profile', profile)
    //     return profile
    //   }
    // }
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // async signIn(e) {
    //   return true
    //   // const isAllowedToSignIn = true
    //   // if (isAllowedToSignIn) {
    //   //   return true
    //   // } else {
    //   //   // Return false to display a default error message
    //   //   return false
    //   //   // Or you can return a URL to redirect to:
    //   //   // return '/unauthorized'
    //   // }
    // },
    // async jwt({ token, account }) {
    //   // Persist the OAuth access_token to the token right after signin
    //   // if (account) {
    //   //   token.accessToken = account.access_token
    //   // }
    //   console.log('jwt-token', token)
    //   console.log('jwt-account', account)
    //   token.token = '7777'
    //   return token
    // },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      // console.log('session-session', session)
      // console.log('session-token', token)
      // console.log('session-user', user)
      // @ts-ignore
      session.user = token.user
      // const { data: userInfo } = await getUserInfoApi({ code: '5555' })
      // console.log('userInfo', userInfo)
      // session.user = userInfo
      // session.user = user
      return session
    },
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url
    //   return 'http://localhost:3040'
    // }
  }
})
