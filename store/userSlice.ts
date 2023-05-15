import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/**
 * @Author fendy
 * @CreateTime 2023/5/15 12:54
 * @Description
 */
export interface UserInfoProp {
  nickname: string
  avatar: string
  openid: string
}

const initialState:{ userInfo: UserInfoProp, token: string } = {
  userInfo: {
    nickname: '',
    avatar: '',
    openid: ''
  },
  token: ''
}

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfoProp>) => {
      state.userInfo = action.payload
    }
  }
})

export const { setUserInfo } = userSlice.actions

export default userSlice.reducer
