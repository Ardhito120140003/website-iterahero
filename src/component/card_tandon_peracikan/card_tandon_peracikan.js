import React, { useState, useEffect } from "react";
import { Icon, Flex, Image, Text, Select, Wrap, Button, Menu, Box, Input, FormControl, CircularProgressLabel, CircularProgress, WrapItem } from "@chakra-ui/react";
import { GiWaterGallon, GiWaterTower, GiWaterTank, GiWaterBottle, GiWatermelon } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUrl } from "../../features/auth/authSlice";

const CardStatusPeracikan = ({ id, isOnline, sensor, status }) => {    

    return (
        <>
            <Box borderRadius={'10px'}
                width={'100%'}
                border={'1px solid #E2E8F0'}
                paddingX={'30px'}
                height={"100%"}
            >
                <Flex justifyContent={'center'} paddingTop={"30px"}>
                    <Text>Tandon Peracikan</Text>
                </Flex >
                <Flex justifyContent={'center'} marginY={'30px'}>
                    {
                        status == "Idle" ?
                        (<Icon as={GiWaterTower} w={'300px'} h={'200px'} color='#14453E' />):
                        (<CircularProgress value={30} size='150px' isIndeterminate color='green.300' />)
                    }
                </Flex>
                <Flex justifyContent={'center'} marginY={'30px'}>
                    {
                        status == null ?
                        (<Text color={'grey'} fontSize={'12px'}>Tandon Kosong</Text>) :
                        (<Text color={'grey'} fontSize={'12px'}>Sedang Melakukan Peracikan...</Text>)
                                
                    }
                </Flex>
                <Flex>
                    <Flex flexDirection={'column'} gap={"20px"} marginY={'30px'}>
                        {sensor.map(item => (
                            <Text color={'black'} textAlign={'left'} key={item.id}>
                                {item.nama}
                            </Text>
                        ))}
                        <Text color={'black'} textAlign={'left'}>
                            Status Tandon
                        </Text>
                    </Flex>
                    <Flex flexDirection={'column'} gap={"20px"} marginY={'30px'}>
                        <Text color={'black'} textAlign={'left'}>: </Text>
                        <Text color={'black'} textAlign={'left'}>: </Text>
                        <Text color={'black'} textAlign={'left'}>: </Text>
                        <Text color={'black'} textAlign={'left'}>: </Text>
                    </Flex>
                    <Flex flexDirection={'column'} gap={"20px"} marginY={'30px'}>
                        {sensor.map(item => (
                            <Text color={'black'} textAlign={'left'} key={item.id}>{item.nilai} {item.satuan}</Text>
                        ))}
                        {
                            isOnline == null ?
                                (<Text color={'red'} textAlign={'left'}>Offline</Text>) :
                                (<Text color={'green'} textAlign={'left'}>Online</Text>)
                        }
                    </Flex>
                </Flex>
            </Box>
        </>
    );
};

export default CardStatusPeracikan