import {
    Box,
    Button,
    Heading,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Portal
} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../lib/hooks/reducer'
import { RouteNames } from '../../lib/router'
import { userSelector } from '../../lib/store/reducer/userSlice'
import LoginAndPassword from '../common/LoginAndPassword'

const NavbarNoAuth = () => {
    const { isLoading, isAuth } = useAppSelector(userSelector)

    return (
        <>
            <Popover>
                {/* @ts-ignore */}
                <PopoverTrigger>
                    <Button isLoading={isLoading} colorScheme={'orange'}>
                        Авторизоваться
                    </Button>
                </PopoverTrigger>
                <Portal>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader textAlign={'center'}>
                            <Heading>Войти</Heading>
                        </PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody>
                            <LoginAndPassword />
                        </PopoverBody>
                    </PopoverContent>
                </Portal>
            </Popover>
            <Box display={'inline-block'} ml={3}>
                <Link to={RouteNames.REGISTRATION}>Зарегистрироваться</Link>
            </Box>
        </>
    )
}

export default NavbarNoAuth
