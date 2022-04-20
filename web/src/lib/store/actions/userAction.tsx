import axios from 'axios'
import { setCookie } from '../../hooks/cookies/setCookie'
import history from '../../hooks/history'
import { RouteNames } from '../../router'
import { AppDispatch } from '../index'
import { userSlice } from '../reducer/userSlice'

type JwtAuthUser = {
    access_token: string
}

export const userAuthLoginAndPassword =
    (login: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(userSlice.actions.authUserStart())
            const url = `${import.meta.env.VITE_SERVER}/auth/login`
            console.log(url)
            // @ts-ignore
            const { data } = await axios
                .post<JwtAuthUser>(url, {
                    username: login,
                    password: password,
                })
                .catch((err) => {
                    dispatch(userSlice.actions.isAuthUserError([err.message]))
                })
            dispatch(userSlice.actions.isAuthUserSuccess())
            setCookie('access_token', data.access_token)
        } catch (err) {
            dispatch(userSlice.actions.isAuthUserError(['Произошла ошибка при авторизации']))
        }
    }

export const registerNewUser =
    (login: string, password: string, email: string) => async (dispatch: AppDispatch) => {
        try {
            const url = `${import.meta.env.VITE_SERVER}/user`
            dispatch(userSlice.actions.authUserStart())
            // @ts-ignore
            await axios
                .post(url, {
                    login: login,
                    password: password,
                    email: email,
                })
                .then((res) => {
                    dispatch(userSlice.actions.isAuthUserSuccess())
                    setCookie('access_token', res.data.access_token)
                    history.push(RouteNames.PROFILE)
                })
                .catch((err) =>
                    dispatch(
                        userSlice.actions.isAuthUserError(['Произошла ошибка при регистрации'])
                    )
                )
        } catch (error) {
            dispatch(userSlice.actions.isAuthUserError(['При регистрации произошла ошибка']))
        }
    }

export const cancelSeasonUser = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.isAuthUserError([]))
        dispatch(userSlice.actions.isLogout())
        setCookie('access_token', '')
    } catch (error) {
        dispatch(
            userSlice.actions.isAuthUserError(['При выходе возникли ошибки, попробуйте снова'])
        )
    }
}
