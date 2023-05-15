import { configureStore } from '@reduxjs/toolkit'

import userInfo from './userSlice'

export const store = configureStore({
  reducer: {
    userInfo
  }
})

export type AppDispatch = typeof store.dispatch
