import React, { useState, useEffect } from "react";
import { Icon, Flex, Image, Text, Select, Wrap, Button, Menu, Box, Input, FormControl, CircularProgressLabel, CircularProgress, WrapItem } from "@chakra-ui/react";
import axios from "axios";
import { GiWaterGallon, GiWaterTower, GiWaterTank, GiWaterBottle, GiWatermelon } from "react-icons/gi";

const CardStatusPeracikan = () => {

    return (
        <>
            <Box borderRadius={'10px'}
                width={'100%'}
                border={'1px solid #E2E8F0'}
                paddingX={'30px'}
            >
                <Flex justifyContent={'center'} paddingTop={"30px"}>
                    <Text>Tandon Utama</Text>
                </Flex >
                <Flex justifyContent={'center'} marginY={'30px'}>
                    <Icon as={GiWaterTower} w={'300px'} h={'200px'} color='#14453E' />
                </Flex>
                <Flex justifyContent={'center'} marginY={'30px'}>
                <Text color={'grey'} fontSize={'12px'} >Peracikan akan selesai dalam 3m 42s...</Text>
                </Flex>
                <Flex>
                    <Flex flexDirection={'column'} gap={"20px"} marginY={'30px'}>
                        <Text color={'black'} textAlign={'left'}>
                            PH
                        </Text>
                        <Text color={'black'} textAlign={'left'}>
                            PPM
                        </Text>
                        <Text color={'black'} textAlign={'left'}>
                            Status Alat
                        </Text>
                    </Flex>
                    <Flex flexDirection={'column'} gap={"20px"} marginY={'30px'}>
                        <Text color={'black'} textAlign={'left'}>
                            :  7
                        </Text>
                        <Text color={'black'} textAlign={'left'}>
                            :  1400
                        </Text>
                        <Text color={'black'} textAlign={'left'}>
                            :  Online
                        </Text>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
};

export default CardStatusPeracikan