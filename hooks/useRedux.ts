import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '@/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export const selectUserInfo = (state: AppState) => state.user.userInfo
