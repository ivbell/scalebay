import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import MainLayout from '../components/layouts/MainLayout'
import { useAppDispatch, useAppSelector } from '../lib/hooks/reducer'
import { registerNewUser } from '../lib/store/actions/userAction'
import { userSelector } from '../lib/store/reducer/userSlice'

type NewUserState = {
    login: string
    password: string
    confirm_password: string
    email: string
}

const Registration = () => {
    const toast = useToast()
    const dispatch = useAppDispatch()
    const { isLoading } = useAppSelector(userSelector)

    const initialNewUserState: NewUserState = {
        login: '',
        password: '',
        email: '',
        confirm_password: '',
    }
    const [newUser, setNewUser] = useState<NewUserState>(initialNewUserState)

    const errorToast = (str: string) => {
        toast({
            status: 'error',
            description: str,
            isClosable: true,
        })
    }

    const changeNewUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value })
    }

    const registrationNewUser = () => {
        const isEmptyUserField =
            newUser.email == '' &&
            newUser.login == '' &&
            newUser.password == '' &&
            newUser.confirm_password == ''

        if (!isEmptyUserField) {
            const passwordLength = newUser.password.length < 8
            passwordLength && errorToast('Длина пароля не может быть меньше 8 символов')

            const comparePass = newUser.password === newUser.confirm_password
            !comparePass && toast({ status: 'error', description: 'Пароли не совпадают' })

            const isEmailReg = /^.+@.+\..+$/gm
            const isEmail = isEmailReg.test(newUser.email)
            !isEmail && errorToast('введите правильный email')

            if (!passwordLength && isEmail && comparePass) {
                dispatch(registerNewUser(newUser.login, newUser.password, newUser.email))
            }
        } else {
            newUser.email == '' && errorToast('Поле email не может быть пустым')
            newUser.login == '' && errorToast('Поле логин не может быть пустым')
            newUser.password == '' && errorToast('Поле пароль не может быть пустым')
        }
    }

    return (
        <MainLayout>
            <Heading textAlign={'center'} py={3}>
                Регистрация
            </Heading>
            <Stack maxW={'320px'} m={'0 auto'}>
                <FormControl>
                    <FormLabel>Логин</FormLabel>
                    <Input
                        isDisabled={isLoading}
                        value={newUser.login}
                        onChange={changeNewUser}
                        name={'login'}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                        isDisabled={isLoading}
                        value={newUser.email}
                        onChange={changeNewUser}
                        name={'email'}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Пароль</FormLabel>
                    <Input
                        isDisabled={isLoading}
                        value={newUser.password}
                        onChange={changeNewUser}
                        name={'password'}
                        type={'password'}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Подтверждение пароля</FormLabel>
                    <Input
                        isDisabled={isLoading}
                        value={newUser.confirm_password}
                        onChange={changeNewUser}
                        name={'confirm_password'}
                        type={'password'}
                    />
                </FormControl>
                <Box display={'flex'} justifyContent={'end'}>
                    <Button
                        isLoading={isLoading}
                        onClick={registrationNewUser}
                        colorScheme={'green'}>
                        Регистрация
                    </Button>
                </Box>
            </Stack>
        </MainLayout>
    )
}

export default Registration
