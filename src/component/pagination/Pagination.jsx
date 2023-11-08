import { Button, ButtonGroup, Flex } from '@chakra-ui/react'
import React from 'react'

const Pagination = ({ currentPage, totalPage, setPage }) => {
    totalPage = totalPage ? totalPage : 1;
    const navigateLeft = [];
    const navigateRight = [];
    for (let i = currentPage; i <= totalPage; i++) {
        if (i - currentPage < 2 && i !== 1 && i !== totalPage) {
            navigateLeft.push(
                <Button key={i} onClick={() => setPage(i)} backgroundColor={i === currentPage ? "var(--color-primer)" : "var(--color-grey)"} disabled={currentPage === i}>
                    {i}
                </Button>
            )
        }
        if (i - currentPage > 2 && totalPage - i < 2 && i != totalPage) {
            navigateRight.push(
                <Button key={i} onClick={() => setPage(i)} backgroundColor={i === currentPage ? "var(--color-primer)" : "var(--color-grey)"} disabled={currentPage === i}>
                    {i}
                </Button>
            )
        }
    }
    return (
        <Flex justifyContent={"flex-end"}>
            <ButtonGroup spacing={2} pt={2} textAlign={"right"}>
                <Button onClick={() => setPage(1)} backgroundColor={currentPage === 1 ? "var(--color-primer)" : "var(--color-grey)"} isDisabled={currentPage === 1} _disabled={{
                    bg: "var(--color-primer)",
                    color: "white"
                }}>
                    1
                    {/* First */}
                </Button>
                {navigateLeft}
                {totalPage - currentPage > 3 && <Button backgroundColor={"var(--color-grey)"}>...</Button>}
                {navigateRight}
                <Button onClick={() => setPage(totalPage)} backgroundColor={currentPage === totalPage ? "var(--color-primer)" : "var(--color-grey)"} isDisabled={currentPage === totalPage} _disabled={{
                    bg: "var(--color-primer)",
                    color: "white"
                }}>
                    {totalPage}
                    {/* Last */}
                </Button>
            </ButtonGroup>
        </Flex>
    )
}

export default Pagination