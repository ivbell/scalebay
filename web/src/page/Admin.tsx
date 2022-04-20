import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, useToast, Wrap, WrapItem } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Pagination from '../components/admin/Pagination'
import UserItem from '../components/admin/UserItem'
import MainLayout from '../components/layouts/MainLayout'
import { getCookie } from '../lib/hooks/cookies/getCookie'
import { useAppDispatch } from '../lib/hooks/reducer'
import { adminLogout } from '../lib/store/actions/adminAction'

const Admin = () => {
    const token = getCookie('admin_access_token')
    const toast = useToast()
    const dispatch = useAppDispatch()

    const initialUsersState: UserState = []

    const initialQueryState = {
        take: 10,
        skip: 0,
    }

    const [users, setUsers] = useState(initialUsersState)
    const [count, setCount] = useState<number>(0)
    const [query, setQuery] = useState(initialQueryState)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [currentSort, setCurrentSort] = useState<Sort>(undefined)

    useEffect(() => {
        const url = `${import.meta.env.VITE_SERVER}/admin/user/?take=${query.take}&skip=${
            query.skip
        }`

        axios
            .get<DataLoading>(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                const data = res.data.data
                const count = res.data.count
                setCount(+count)
                setUsers(data)
            })
            .catch((err) => {
                toast({
                    status: 'error',
                    description: 'При загрузке пользователей произошла ошибка',
                })
            })
        setCurrentSort(undefined)
    }, [query.skip])

    const sortUsers = (type: Sort) => {
        switch (type) {
            case 'al-down':
                setUsers(
                    users.sort((a, b) => (a.login.toLowerCase() > b.login.toLowerCase() ? 1 : -1))
                )
                setCurrentSort('al-down')
                break
            case 'al-up':
                setUsers(
                    users.sort((a, b) => (a.login.toLowerCase() < b.login.toLowerCase() ? 1 : -1))
                )
                setCurrentSort('al-up')
                break

            case 'e-down':
                setUsers(
                    users.sort((a, b) => (a.email.toLowerCase() > b.email.toLowerCase() ? 1 : -1))
                )
                setCurrentSort('e-down')
                break
            case 'e-up':
                setUsers(
                    users.sort((a, b) => (a.email.toLowerCase() < b.email.toLowerCase() ? 1 : -1))
                )
                setCurrentSort('e-up')
                break
            default:
                break
        }
    }

    const UsersList = users.map((el) => <UserItem {...el} key={el.id} />)

    const nextPage = () => {
        const allPage = Math.ceil(count / query.take)
        if (currentPage === allPage) {
            setCurrentPage(allPage)
            setQuery({ ...query, skip: query.take * allPage - 1 })
        } else {
            setCurrentPage(currentPage + 1)
            setQuery({ ...query, skip: query.skip + query.take })
        }
    }
    const prevPage = () => {
        const allPage = Math.ceil(count / query.take)
        if (currentPage === 1) {
            setCurrentPage(1)
            setQuery({ ...query, skip: 0 })
        } else {
            setCurrentPage(currentPage - 1)
            setQuery({ ...query, skip: query.skip - query.take })
        }
    }

    return (
        <MainLayout>
            <Wrap align={'center'}>
                <WrapItem>
                    <Heading py={3}>Список пользователей</Heading>
                </WrapItem>
                <WrapItem>
                    <Button onClick={() => dispatch(adminLogout())} colorScheme={'orange'}>
                        Закончить сеанс
                    </Button>
                </WrapItem>
            </Wrap>
            <Pagination
                next={nextPage}
                prev={prevPage}
                allPage={Math.ceil(count / query.take)}
                currentPage={currentPage}
            />
            <Box py={3}>
                <Wrap align='center'>
                    <WrapItem>Сортировка - </WrapItem>
                    <WrapItem>
                        <Wrap align={'center'}>
                            <WrapItem>По логину:</WrapItem>
                            <WrapItem>
                                <Wrap>
                                    <WrapItem>
                                        <Button
                                            isActive={currentSort === 'al-down'}
                                            onClick={() => sortUsers('al-down')}
                                            colorScheme={'telegram'}
                                            size={'xs'}>
                                            <ArrowDownIcon />
                                        </Button>
                                    </WrapItem>
                                    <WrapItem>
                                        <Button
                                            isActive={currentSort === 'al-up'}
                                            onClick={() => sortUsers('al-up')}
                                            colorScheme={'telegram'}
                                            size={'xs'}>
                                            <ArrowUpIcon />
                                        </Button>
                                    </WrapItem>
                                </Wrap>
                            </WrapItem>
                        </Wrap>
                    </WrapItem>
                    <WrapItem>
                        <Wrap align={'center'}>
                            <WrapItem>По email:</WrapItem>
                            <WrapItem>
                                <Wrap>
                                    <WrapItem>
                                        <Button
                                            isActive={currentSort === 'e-down'}
                                            onClick={() => sortUsers('e-down')}
                                            colorScheme={'telegram'}
                                            size={'xs'}>
                                            <ArrowDownIcon />
                                        </Button>
                                    </WrapItem>
                                    <WrapItem>
                                        <Button
                                            isActive={currentSort === 'e-up'}
                                            onClick={() => sortUsers('e-up')}
                                            colorScheme={'telegram'}
                                            size={'xs'}>
                                            <ArrowUpIcon />
                                        </Button>
                                    </WrapItem>
                                </Wrap>
                            </WrapItem>
                        </Wrap>
                    </WrapItem>
                </Wrap>
            </Box>
            {UsersList}
        </MainLayout>
    )
}

export type User = {
    id: number
    login: string
    email: string
    confirm: boolean
}

type UserState = User[]

type DataLoading = {
    data: User[]
    count: number
}

type Sort = 'al-up' | 'al-down' | 'e-up' | 'e-down' | undefined

export default Admin
