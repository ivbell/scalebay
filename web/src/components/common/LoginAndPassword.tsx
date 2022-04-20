import { Button, Input, Stack, useToast } from '@chakra-ui/react'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../lib/hooks/reducer'
import { RouteNames } from '../../lib/router'
import { userAuthLoginAndPassword } from '../../lib/store/actions/userAction'
import { userSelector } from '../../lib/store/reducer/userSlice'

type UserAuth = { login: string; password: string }

const LoginAndPassword = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const toast = useToast()
    const { isLoading, isAuth } = useAppSelector(userSelector)

    const [error, setError] = useState<string[]>([])

    useEffect(() => {
        error.map((el) => {
            toast({
                status: 'error',
                isClosable: true,
                description: el,
            })
        })
    }, [error])

    const initialUserState: UserAuth = {
        login: '',
        password: '',
    }
    const [user, setUser] = useState<UserAuth>(initialUserState)

    const userHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const userAuthenticated = async () => {
        user.login == '' && setError(['Логин не может быть пустым'])
        user.password == '' && setError(['Пароль не может быть пустым'])

        if (user.login) {
            if (user.password) {
                dispatch(userAuthLoginAndPassword(user.login, user.password))
                isAuth && navigate(RouteNames.PROFILE)
            }
        }
    }
    return (
        <Stack>
            <Input
                disabled={isLoading}
                onChange={userHandler}
                value={user.login}
                name={'login'}
                placeholder='Логин'
            />
            <Input
                disabled={isLoading}
                onChange={userHandler}
                value={user.password}
                type={'password'}
                name={'password'}
                placeholder='Пароль'
            />
            <Button isLoading={isLoading} onClick={userAuthenticated} colorScheme='green'>
                Войти
            </Button>
        </Stack>
    )
}

export default LoginAndPassword
