import { Container } from '@chakra-ui/react'
import React, { FC } from 'react'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'

type Props = {
    children?: React.ReactNode
}

const MainLayout: FC<Props> = (props) => {
    return (
        <>
            <Navbar />
            <Container pb={'100px'} maxW={'container.xl'}>
                {props.children}
            </Container>
            <Footer />
        </>
    )
}

export default MainLayout
