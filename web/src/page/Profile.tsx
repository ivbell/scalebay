import React, { useEffect, useState } from 'react'
import MainLayout from '../components/layouts/MainLayout'
import { useAppDispatch, useAppSelector } from '../lib/hooks/reducer'
import { userSelector } from '../lib/store/reducer/userSlice'
import ProfileInfo from '../components/profile/ProfileInfo'
import { Box, Button, Heading, Stack, Wrap, WrapItem } from '@chakra-ui/react'
import { getCookie } from '../lib/hooks/cookies/getCookie'
import axios from 'axios'
import { cancelSeasonUser } from '../lib/store/actions/userAction'

type User = {
    id?: number
    login?: string
    email?: string
    confirm?: boolean
}

const Profile = () => {
    const token = getCookie('access_token')
    const [user, setUser] = useState<User>()
    const dispatch = useAppDispatch()

    useEffect(() => {
        const url = `${import.meta.env.VITE_SERVER}/user`
        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUser(res.data)
            })
    }, [])

    return (
        <MainLayout>
            <Wrap align={'center'}>
                <WrapItem>
                    <Heading py={3}>Профиль</Heading>
                </WrapItem>
                <WrapItem>
                    <Button onClick={() => dispatch(cancelSeasonUser())} colorScheme={'orange'}>
                        Закончить сеанс
                    </Button>
                </WrapItem>
            </Wrap>
            <Stack>
                <Box>Логин: {user?.login}</Box>
                <Box>Почта: {user?.email}</Box>
                <Box>
                    Учётная запись подтверждена:{' '}
                    {user?.confirm ? (
                        <Box color='green.300' display='inline-block'>
                            Да
                        </Box>
                    ) : (
                        <Box color='red.300' display='inline-block'>
                            Нет
                        </Box>
                    )}
                </Box>
            </Stack>
        </MainLayout>
    )
}

export default Profile
