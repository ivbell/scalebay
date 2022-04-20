import { Box, Center, Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MainLayout from '../components/layouts/MainLayout'
import history from '../lib/hooks/history'
import { RouteNames } from '../lib/router'

const Confirm = () => {
    const [confirm, setConfirm] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const params = useParams()

    useEffect(() => {
        const url = `${import.meta.env.VITE_SERVER}/user/confirm/${params.id}`
        axios
            .get(url)
            .then((res) => {
                if (res.data.status === 200) {
                    setTimeout(() => setConfirm(true), 3000)
                }

                if (res.data.status === 400) {
                    setTimeout(() => setError(true), 3000)
                    setTimeout(() => history.push('/'), 8000)
                }
            })
            .catch((err) => {
                setTimeout(() => setError(true), 3000)
                setTimeout(() => history.push('/'), 8000)
            })
    })

    return (
        <MainLayout>
            {!confirm ? (
                <Center>
                    {!error && (
                        <Stack>
                            <Heading>Учётная запись подтверждается</Heading>
                            <Spinner display={'block'} m={'0 auto!important'} size='xl' />
                        </Stack>
                    )}
                    {error && (
                        <Text>
                            Произошла ошибка при подтверждении записи, перейдите в почту и
                            попробуйте снова
                        </Text>
                    )}
                </Center>
            ) : (
                <Center>
                    <Heading>Учётная запись успешно подтверждена</Heading>
                    <Text></Text>
                </Center>
            )}
        </MainLayout>
    )
}

export default Confirm
