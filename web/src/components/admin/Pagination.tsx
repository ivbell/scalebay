import { Box, Button, Wrap } from '@chakra-ui/react'
import React, { FC } from 'react'

type Props = {
    allPage: number
    currentPage: number
    next: React.MouseEventHandler
    prev: React.MouseEventHandler
}

const Pagination: FC<Props> = (props) => {
    const { allPage, currentPage } = props

    return (
        <Wrap>
            <Button onClick={props.prev} isDisabled={currentPage === 1} size='xs'>
                Prev
            </Button>
            <Box>
                {props.currentPage} / {props.allPage}
            </Box>
            <Button onClick={props.next} isDisabled={currentPage === allPage} size='xs'>
                Next
            </Button>
        </Wrap>
    )
}

export default Pagination
