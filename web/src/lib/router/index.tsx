import Home from '../../page/Home'
import React from 'react'
import Registration from '../../page/Registration'
import Admin from '../../page/Admin'
import Profile from '../../page/Profile'
import AdminLogin from '../../page/AdminLogin'
import Confirm from '../../page/Confirm'

export type Router = {
    path: string
    element: React.ReactElement
}

export enum RouteNames {
    HOME = '/',
    REGISTRATION = '/reg',
    PROFILE = '/profile',
    ADMIN = '/admin',
    ADMIN_LOGIN = '/admin/login',
    CONFIRM = '/confirm/user/:id',
}

export const publicRoutes: Router[] = [
    { path: RouteNames.HOME, element: <Home /> },
    { path: RouteNames.REGISTRATION, element: <Registration /> },
    { path: RouteNames.ADMIN_LOGIN, element: <AdminLogin /> },
    { path: RouteNames.CONFIRM, element: <Confirm /> },
]

export const privateRoutes: Router[] = [{ path: RouteNames.PROFILE, element: <Profile /> }]

export const adminRoutes: Router[] = [{ path: RouteNames.ADMIN, element: <Admin /> }]
