import { Box, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import LoginAndPassword from '../components/common/LoginAndPassword'
import MainLayout from '../components/layouts/MainLayout'
import { useAppSelector } from '../lib/hooks/reducer'
import { userSelector } from '../lib/store/reducer/userSlice'

const Home = () => {
    const { isLoading, isAuth } = useAppSelector(userSelector)

    return (
        <MainLayout>
            {!isAuth && (
                <Box w={'320px'}>
                    <Heading textAlign={'center'} py={3}>
                        Авторизоваться
                    </Heading>
                    <LoginAndPassword />
                </Box>
            )}
        </MainLayout>
    )
}

export default Home
