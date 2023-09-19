import React, { useState } from "react";
import { TabTitle } from "../../Utility/utility";
import { useNavigate } from "react-router-dom";
import {
    Flex,
    Text,
    Select,
    Button,
    Box,
    Input,
    FormControl,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";

const CardFormPenjadwalan = () => {
    TabTitle("Penjadwalan - ITERA Hero")
    const navigate = useNavigate();
    const [data, setData] = useState("");
    const [dataApi, setDataApi] = useState(null);
    const header = localStorage.getItem("token");

    return (
        <>
            <Flex 
            flexDirection={'column'} 
            width={"100%"} 
            height={'100%'}
            borderRadius={'10px'}
            border={'1px solid #E2E8F0'}
            padding={'30px'}
            >
                <Text>
                    Tambah Penjadwalan
                </Text>

                <Box color={"black"} my={'20px'}>
                    <form>
                        <Text>Formula :</Text>
                        <Select >
                            <option value="">--Pilih Formula--</option>
                            <option value="grapefruit">Melon</option>
                            <option value="lime">Lime</option>
                            <option value="coconut">Coconut</option>
                            <option value="mango">Mango</option>
                        </Select>
                    </form>
                </Box>
                <Box color={"black"} my={'20px'}>
                    <FormControl>
                        <Text>Jam Mulai :</Text>
                        <Input
                            type="number"
                            placeholder="--:--"
                        />
                    </FormControl>
                </Box >
                <Box color={"black"} my={'20px'}>
                    <FormControl>
                        <Text>Perulangan :</Text>
                        <Input
                            type="number"
                            placeholder="Masukkan perulangan.."
                        />
                    </FormControl>
                </Box>
                <Box color={"black"} my={'20px'}> 
                    <FormControl>
                        <Text>Lama waktu antar peracikan :</Text>
                        <Input
                            type="number"
                            placeholder="Masukkan interval.."
                        />
                    </FormControl>
                </Box>
                <Button my={'20px'} backgroundColor={'#09322D'}>
                    Tambah
                </Button>

            </Flex>
        </>
    );
};
export default CardFormPenjadwalan;

