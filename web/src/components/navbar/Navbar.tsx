import { Box, Container } from '@chakra-ui/react'
import React from 'react'
import { useAppSelector } from '../../lib/hooks/reducer'
import { userSelector } from '../../lib/store/reducer/userSlice'
import NavbarAuth from './NavbarAuth'
import NavbarNoAuth from './NavbarNoAuth'

const Navbar = () => {
    const { isAuth } = useAppSelector(userSelector)
    
    return (
        <Box py={3} bgColor={'slateblue'} color={'white'}>
            <Container maxW={'container.xl'}>
                {isAuth ? <NavbarAuth /> : <NavbarNoAuth />}
            </Container>
        </Box>
    )
}

export default Navbar
