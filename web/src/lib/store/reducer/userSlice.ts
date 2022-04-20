import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

export type UserRole = 'user' | 'admin'

export interface UserState {
    isAuth: boolean
    isLoading: boolean
    isError: boolean
    error: string[]
}

const initialState: UserState = {
    isAuth: false,
    isLoading: false,
    isError: false,
    error: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authUserStart(state) {
            state.isLoading = true
            state.isError = false
            state.error = []
        },
        isAuthUserSuccess(state) {
            state.isAuth = true
            state.isLoading = false
        },
        isAuthUserError(state, { payload }: PayloadAction<string[]>) {
            state.isLoading = false
            state.isError = true
            state.error = payload
        },
        isLogout(state) {
            state.isError = false
            state.error = []
            state.isLoading = false
            state.isAuth = false
        },
    },
})

export const userSelector = (state: RootState) => state.user

export default userSlice.reducer
