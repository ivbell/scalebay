import React, { useEffect, useState } from 'react'
import MainLayout from '../components/layouts/MainLayout'
import { Box, Button, Heading, Input, Stack, useToast } from '@chakra-ui/react'
import LoginAndPassword from '../components/common/LoginAndPassword'
import { useAppDispatch, useAppSelector } from '../lib/hooks/reducer'
import { userSelector } from '../lib/store/reducer/userSlice'
import { useNavigate } from 'react-router-dom'
import { RouteNames } from '../lib/router'
import history from '../lib/hooks/history'
import { adminSelector } from '../lib/store/reducer/adminSlice'
import { adminAuth } from '../lib/store/actions/adminAction'

type AdminAuth = {
    email: string
    password: string
}

const AdminLogin = () => {
    const admin = useAppSelector(adminSelector)
    const dispatch = useAppDispatch()
    const toast = useToast()

    useEffect(() => {
        if (admin.isAuth) {
            history.push(RouteNames.ADMIN)
        }
        admin.isError && toast({ status: 'error', description: 'При входе возникла ошибка' })
    }, [admin.isAuth, admin.isError])

    const initialState: AdminAuth = {
        email: '',
        password: '',
    }
    const [user, setUser] = useState<AdminAuth>(initialState)

    const userHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const auth = () => {
        if (user.password && user.email) {
            dispatch(adminAuth(user.email, user.password))
        }
    }

    return (
        <MainLayout>
            <Heading textAlign={'center'} py={3}>
                Войти как администратор
            </Heading>
            <Box maxW={'320px'} m={'0 auto'}>
                <Stack>
                    <Box>
                        <Input
                            disabled={admin.isLoading}
                            onChange={userHandler}
                            value={user.email}
                            name={'email'}
                            placeholder={'Почта'}
                        />
                    </Box>
                    <Box>
                        <Input
                            disabled={admin.isLoading}
                            onChange={userHandler}
                            value={user.password}
                            name={'password'}
                            placeholder={'Пароль'}
                        />
                    </Box>
                    <Box>
                        <Button isLoading={admin.isLoading} onClick={auth} colorScheme={'orange'}>
                            Войти
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </MainLayout>
    )
}

export default AdminLogin
