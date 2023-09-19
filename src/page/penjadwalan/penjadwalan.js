import React, { useState, useEffect } from "react";
import { Flex, Image, Text, Select, Wrap, Button, Menu, Box, Input, FormControl, CircularProgressLabel, CircularProgress, WrapItem, border } from "@chakra-ui/react";
import { TabTitle } from "../../Utility/utility";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { greenhouseByUserId } from "../../Utility/api_link";
import { routePageName } from "../../redux/action";
import axios from "axios";
import ValueTandon from "../../component/value_tandon/value_tandon";
import CardFormPeracikan from "../../component/card_form_peracikan/card_form_peracikan";
import CardStatusPeracikan from "../../component/card_tandon_peracikan/card_tandon_utama";
import CardFormPenjadwalan from "../../component/card_form_penjadwalan/card_form_penjadwalan";

const Penjadwalan = () => {
    TabTitle("Penjadwalan - ITERA Hero")
    const navigate = useNavigate();
    const [data, setData] = useState("");
    const [dataApi, setDataApi] = useState(null);
    const header = localStorage.getItem("token");

    return (
        <>
            <Flex flexDirection={'row'} width={"100%"} height={'100%'} gap={"20px"} >
                <CardFormPenjadwalan />
                <Flex
                     flexDirection={'column'} 
                     width={"100%"} 
                     height={'100%'}
                     borderRadius={'10px'}
                     border={'1px solid #E2E8F0'}  
                >
                    <Text padding={'30px'}>
                        Jadwal Peracikan
                    </Text>
                    <Flex borderRadius={'10px'} border={'1px solid #E2E8F0'} marginY={'5px'} marginX={'10'} padding={'30px'} justifyContent={'center'}>  
                    </Flex>
                    <Flex borderRadius={'10px'} border={'1px solid #E2E8F0'} marginY={'5px'} marginX={'10'} padding={'30px'} justifyContent={'center'}>  
                    </Flex>

                </Flex>
            </Flex>
        </>
    );
};
export default Penjadwalan;
