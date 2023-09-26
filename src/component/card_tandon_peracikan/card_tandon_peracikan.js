import React, { useState, useEffect } from "react";
import { Icon, Flex, Image, Text, Select, Wrap, Button, Menu, Box, Input, FormControl, CircularProgressLabel, CircularProgress, WrapItem } from "@chakra-ui/react";
import { GiWaterGallon, GiWaterTower, GiWaterTank, GiWaterBottle, GiWatermelon } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUrl } from "../../features/auth/authSlice";

const CardStatusPeracikan = () => {    
    const base_url = useSelector(selectUrl);
    const navigate = useNavigate();
    const [dataApi, setDataApi] = useState(null);
    const [status, setStatus] = useState(null)
    
    const [phValue, setPhValue] = useState(0)
    const [ppmValue, setPpmValue] = useState(0)
    const [suhuValue, setSuhuValue] = useState(0)
    const [statusPeracikan, setStatusPeracikan] = useState(null)
    
    const header = localStorage.getItem("token");

    const getStatusPeracikan = async () => {
    	await axios
    		.get(`${base_url}////`, {
    			headers: {
    				Authorization: "Bearer " + header,
    			},
    		})
    		.then((response) => {
                setPhValue()
                setPpmValue()
                setSuhuValue()
    		})
    		.catch((error) => {
    			localStorage.clear();
    			navigate("/login");
    		});
    };

    return (
        <>
            <Box borderRadius={'10px'}
                width={'100%'}
                border={'1px solid #E2E8F0'}
                paddingX={'30px'}
            >
                <Flex justifyContent={'center'} paddingTop={"30px"}>
                    <Text>Tandon Peracikan</Text>
                </Flex >
                <Flex justifyContent={'center'} marginY={'30px'}>
                    {/* <Icon as={GiWaterTower} w={'300px'} h={'200px'} color='#14453E' /> */}
                    <CircularProgress value={30} size='150px' isIndeterminate color='green.300' />
                </Flex>
                <Flex justifyContent={'center'} marginY={'30px'}>
                    {
                        statusPeracikan == null ?
                                (<Text color={'grey'} fontSize={'12px'}>Sedang Melakukan Peracikan...</Text>) :
                                (<Text color={'grey'} fontSize={'12px'}>Peracikan Selesai</Text>)
                    }
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
                            Suhu
                        </Text>
                        <Text color={'black'} textAlign={'left'}>
                            Status Alat
                        </Text>
                    </Flex>
                    <Flex flexDirection={'column'} gap={"20px"} marginY={'30px'}>
                        <Text color={'black'} textAlign={'left'}>: </Text>
                        <Text color={'black'} textAlign={'left'}>: </Text>
                        <Text color={'black'} textAlign={'left'}>: </Text>
                        <Text color={'black'} textAlign={'left'}>: </Text>
                    </Flex>
                    <Flex flexDirection={'column'} gap={"20px"} marginY={'30px'}>
                        <Text color={'black'} textAlign={'left'}>{phValue}</Text>
                        <Text color={'black'} textAlign={'left'}>{ppmValue}</Text>
                        <Text color={'black'} textAlign={'left'}>{suhuValue}</Text>
                        {
                            status == null ?
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