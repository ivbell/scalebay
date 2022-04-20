import { Wrap, WrapItem } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { RouteNames } from '../../lib/router'

const NavbarAuth = () => {
    const admin = { isAuth: false }

    return (
        <Wrap align={'center'}>
            <WrapItem>
                <Link to={RouteNames.PROFILE}>Профиль</Link>
            </WrapItem>
            {admin.isAuth && (
                <WrapItem>
                    <Link to={RouteNames.ADMIN}>Список пользователей</Link>
                </WrapItem>
            )}
        </Wrap>
    )
}

export default NavbarAuth
