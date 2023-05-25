import { configureStore } from '@reduxjs/toolkit'

import userInfo from './userSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      user: userInfo
    }
  })
}

export const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
