import { Box, Container } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../lib/hooks/reducer'
import { RouteNames } from '../../lib/router'
import { adminSelector } from '../../lib/store/reducer/adminSlice'

const Footer = () => {
    const { isAuth } = useAppSelector(adminSelector)
    return (
        <Box py={3} bgColor={'white'} position={'fixed'} bottom={0} w={'100%'}>
            <Container maxW={'container.xl'}>
                {!isAuth ? (
                    <Link to={RouteNames.ADMIN_LOGIN}>Войти как администратор</Link>
                ) : (
                    <Link to={RouteNames.ADMIN}>Админ-панель</Link>
                )}
            </Container>
        </Box>
    )
}

export default Footer
