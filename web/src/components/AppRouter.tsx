import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../lib/hooks/reducer'
import { adminRoutes, privateRoutes, publicRoutes } from '../lib/router'
import { adminSelector } from '../lib/store/reducer/adminSlice'
import { userSelector } from '../lib/store/reducer/userSlice'

const AppRouter = () => {
    const user = useAppSelector(userSelector)
    const admin = useAppSelector(adminSelector)

    const publicRoutesList = publicRoutes.map((el) => (
        <Route key={el.path} path={el.path} element={el.element} />
    ))

    const adminRoutesList = adminRoutes.map((el) => (
        <Route key={el.path} path={el.path} element={el.element} />
    ))

    const privateRoutesList = privateRoutes.map((el) => (
        <Route key={el.path} path={el.path} element={el.element} />
    ))

    if (!user.isAuth) {
        return (
            <Routes>
                {publicRoutesList}
                {admin.isAuth && adminRoutesList}
                <Route path={'*'} element={<Navigate to={'/'} />} />
            </Routes>
        )
    }
    return (
        <Routes>
            {publicRoutesList}
            {privateRoutesList}
            {admin.isAuth && adminRoutesList}
            <Route path={'*'} element={<Navigate to={'/'} />} />
        </Routes>
    )
}

export default AppRouter
