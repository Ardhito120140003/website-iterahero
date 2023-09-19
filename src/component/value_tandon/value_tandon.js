import React, { useState, useEffect } from "react";
import { Box, CircularProgressLabel, CircularProgress, Text, Flex, Center } from "@chakra-ui/react";

const ValueTandon = () => {
    const max = 10;
    const min = 0;
    const valueSensor = 10;
    return (
        <>
            <Flex bg={'#ffff'}
                borderRadius={'10px'}
                border={'1px solid #E2E8F0'}
                paddingTop={'30px'}
                paddingBottom={'10px'}
                paddingY={'30px'}
                paddingX={'10px'}
                alignContent={'center'}
                flexDirection={'column'}>

                <Text marginBottom={'10px'}>Ketersediaan Bahan</Text>
                <Flex fontSize={12} alignItems={"center"} justifyContent={"space-evenly"} marginY={'5px'} paddingX={'10px'} paddingY={'10px'}>

                    <Flex flexDirection={"column"} marginX={'20px'}>
                        <CircularProgress value={valueSensor} color={valueSensor > max || valueSensor < min ? 'var(--color-error)' : `#41BF06`} size='70px'>
                            <CircularProgressLabel color={'black'}>{valueSensor}%</CircularProgressLabel>
                        </CircularProgress>
                        <Text>
                            Nutrisi A
                        </Text>
                    </Flex>
                    <Flex flexDirection={"column"} marginX={'20px'}>
                        <CircularProgress value={valueSensor} color={valueSensor > max || valueSensor < min ? 'var(--color-error)' : `#41BF06`} size='70px'>
                            <CircularProgressLabel color={'black'}>{valueSensor}%</CircularProgressLabel>
                        </CircularProgress>
                        <Text>
                            Nutrisi B
                        </Text>
                    </Flex>
                    <Flex flexDirection={"column"} marginX={'20px'}>
                        <CircularProgress value={valueSensor} color={valueSensor > max || valueSensor < min ? 'var(--color-error)' : `#41BF06`} size='70px'>
                            <CircularProgressLabel color={'black'}>{valueSensor}%</CircularProgressLabel>
                        </CircularProgress>
                        <Text>
                            Asam
                        </Text>
                    </Flex>
                    <Flex flexDirection={"column"} marginX={'20px'}>
                        <CircularProgress value={valueSensor} color={valueSensor > max || valueSensor < min ? 'var(--color-error)' : `#41BF06`} size='70px'>
                            <CircularProgressLabel color={'black'}>{valueSensor}%</CircularProgressLabel>
                        </CircularProgress>
                        <Text>
                            Basa
                        </Text>
                    </Flex>
                    <Flex flexDirection={"column"} marginX={'20px'}>
                        <CircularProgress value={valueSensor} color={valueSensor > max || valueSensor < min ? 'var(--color-error)' : `#41BF06`} size='70px'>
                            <CircularProgressLabel color={'black'}>{valueSensor}%</CircularProgressLabel>
                        </CircularProgress>
                        <Text>
                            Air
                        </Text>
                    </Flex>
                </Flex>
            </Flex>

        </>
    )
}

export default ValueTandon