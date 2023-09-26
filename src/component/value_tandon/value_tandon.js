import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, CircularProgressLabel, CircularProgress, Text, Flex, Center } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectUrl } from "../../features/auth/authSlice";

const ValueTandon = () => {
    const base_url = useSelector(selectUrl);
    const min = 20;
    const [ValueSensor,setValueSensor]=useState[' ']
    const header = localStorage.getItem("token");

    const getValueTandon = async () => {
        await axios
            .get(`${base_url}////`, {
                headers: {
                    Authorization: "Bearer " + header,
                },
            })
            .then((response) => {
                setValueSensor(response.data.data)
            })
            .catch((error) => {
                console.log('data gaada')
            });
    };

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
                        <CircularProgress value={ValueSensor.nutrisiA} color={ValueSensor.nutrisiA <= min ? 'var(--color-error)' : `#41BF06`} size='70px'>
                            <CircularProgressLabel color={'black'}>{ValueSensor.nutrisiA}%</CircularProgressLabel>
                        </CircularProgress>
                        <Text>
                            Nutrisi A
                        </Text>
                    </Flex>
                    <Flex flexDirection={"column"} marginX={'20px'}>
                        <CircularProgress value={ValueSensor.nutrisiB} color={ValueSensor <= min ? 'var(--color-error)' : `#41BF06`} size='70px'>
                            <CircularProgressLabel color={'black'}>{ValueSensor}%</CircularProgressLabel>
                        </CircularProgress>
                        <Text>
                            Nutrisi B
                        </Text>
                    </Flex>
                    <Flex flexDirection={"column"} marginX={'20px'}>
                        <CircularProgress value={ValueSensor.asam} color={ValueSensor < min ? 'var(--color-error)' : `#41BF06`} size='70px'>
                            <CircularProgressLabel color={'black'}>{ValueSensor}%</CircularProgressLabel>
                        </CircularProgress>
                        <Text>
                            Asam
                        </Text>
                    </Flex>
                    <Flex flexDirection={"column"} marginX={'20px'}>
                        <CircularProgress value={ValueSensor} color={ValueSensor < min ? 'var(--color-error)' : `#41BF06`} size='70px'>
                            <CircularProgressLabel color={'black'}>{ValueSensor}%</CircularProgressLabel>
                        </CircularProgress>
                        <Text>
                            Basa
                        </Text>
                    </Flex>
                    <Flex flexDirection={"column"} marginX={'20px'}>
                        <CircularProgress value={ValueSensor} color={ValueSensor < min ? 'var(--color-error)' : `#41BF06`} size='70px'>
                            <CircularProgressLabel color={'black'}>{ValueSensor}%</CircularProgressLabel>
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