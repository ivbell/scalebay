import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

export interface AdminState {
    isAuth: boolean
    isLoading: boolean
    isError: boolean
}

const initialState: AdminState = {
    isAuth: false,
    isLoading: false,
    isError: false,
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        authAdminStart(state) {
            state.isLoading = true
            state.isError = false
        },
        authAdminSuccess(state) {
            state.isLoading = false
            state.isAuth = true
        },
        authAdminError(state) {
            state.isLoading = false
            state.isError = true
        },
        logoutAdmin(state) {
            state.isAuth = false
            state.isLoading = false
            state.isError = false
        },
    },
})

export const adminSelector = (state: RootState) => state.admin

export default adminSlice.reducer
