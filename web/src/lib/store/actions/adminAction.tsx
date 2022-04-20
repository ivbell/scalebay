import axios from 'axios'
import { AppDispatch } from '..'
import { setCookie } from '../../hooks/cookies/setCookie'
import history from '../../hooks/history'
import { RouteNames } from '../../router'
import { adminSlice } from '../reducer/adminSlice'

export type JwtAdmin = {
    admin_access_token: string
}

export const adminAuth = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(adminSlice.actions.authAdminStart())
        const url = `${import.meta.env.VITE_SERVER}/admin`
        axios
            .post<JwtAdmin>(url, { email: email, password: password })
            .then((res) => {
                dispatch(adminSlice.actions.authAdminSuccess())
                setCookie('admin_access_token', res.data.admin_access_token)
                history.push(RouteNames.ADMIN)
            })
            .catch((err) => {
                dispatch(adminSlice.actions.authAdminError())
            })
    } catch (error) {
        dispatch(adminSlice.actions.authAdminError())
    }
}

export const adminLogout = () => (dispatch: AppDispatch) => {
    try {
        dispatch(adminSlice.actions.logoutAdmin())
        setCookie('admin_access_token', '')
        history.push(RouteNames.ADMIN_LOGIN)
    } catch (error) {
        dispatch(adminSlice.actions.authAdminError())
    }
}
