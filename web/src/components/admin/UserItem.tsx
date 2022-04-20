import { Box, Heading, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { User } from '../../page/Admin'

const UserItem: FC<User> = (props) => {
    return (
        <Box py={2}>
            <Heading size={'md'}>{props.login}</Heading>
            <Text>{props.email}</Text>
            <Box>
                {props.confirm ? (
                    <Box color={'green.300'}>Да</Box>
                ) : (
                    <Box color={'red.300'}>Нет</Box>
                )}
            </Box>
        </Box>
    )
}

export default UserItem
