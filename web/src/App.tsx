import MainLayout from './components/layouts/MainLayout'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useAppSelector } from './lib/hooks/reducer'
import { userSelector } from './lib/store/reducer/userSlice'
import { CustomRouter } from './components/CustomRouter'
import history from './lib/hooks/history'

function App() {
    const toast = useToast()
    const { error } = useAppSelector(userSelector)

    useEffect(() => {
        if (error.length > 0) {
            error.map((el) => {
                toast({
                    status: 'error',
                    isClosable: true,
                    description: el,
                })
            })
        }
    }, [error])

    return (
        <CustomRouter history={history}>
            <AppRouter />
        </CustomRouter>
    )
}

export default App
