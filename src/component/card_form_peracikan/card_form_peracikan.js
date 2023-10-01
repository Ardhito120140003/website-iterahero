import React, { useState, useEffect } from "react";
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
import Loading from "../loading/loading";
import { useSelector } from "react-redux";
import { selectUrl } from "../../features/auth/authSlice";

const CardFormPeracikan = ({ handleDelete }) => {
    const [namaFormula, setNamaFormula] = useState("")
    const [phValue, setPhValue] = useState("");
    const [ppmValue, setPpmValue] = useState("");
    const [formula, setFormula] = useState('');
    const [formulaData, setFormulaData] = useState([]); // Store formula data from the server
    const [newFormulaName, setNewFormulaName] = useState('')
    const base_url = useSelector(selectUrl);
    const header = localStorage.getItem("token");

    // Fetch formula data from the server when the component mounts
    useEffect(() => {
        axios.get(base_url + 'api/v1/resep', {
            headers: {
                Authorization: "Bearer " + header
            }
        })
            .then(response => {
                setFormulaData(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching formula data:", error);
            });
    }, []);


    // Function to handle formula selection change
    const handleFormulaChange = (e) => {
        const selectedFormula = e.target.value;
        setFormula(selectedFormula);
    };

    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    const handleSubmit = async () => {
        console.log("pH Value:", phValue);
        console.log("ppm Value:", ppmValue);
    };

    return (
        <>
            {formulaData.length < 1 ? (
                <Loading />
            ) : (
                <Flex flexDirection={'column'} width={"100%"} height={'100%'} >
                    <Box color={"black"} my={'20px'}>
                        <Select borderRadius={"10"} value={formula} name="formula" onChange={(e) => {
                            const idx = parseInt(e.target.value)
                            if (isNaN(idx)) {
                                setPhValue("")
                                setPpmValue("")
                                handleFormulaChange(e)
                            } else {
                                handleFormulaChange(e);
                                setPhValue(formulaData[idx].ph);
                                setPpmValue(formulaData[idx].ppm)
                            }
                        }} > 
                            <option value="">--Pilih Formula--</option>
                            {formulaData.map((data, index) => (
                                <option key={index} value={index} style={{ color: 'black' }}>
                                    {data.nama.toUpperCase()}
                                </option>
                            ))}
                            <option value="Tambah Formula">--Tambah Formula--</option>
                        </Select>
                    </Box>
                    <Box bg={'#ffff'}
                        borderRadius={'10px'}
                        border={'1px solid #E2E8F0'}
                        p={8}
                        pb={20}
                    >
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();

                            }}
                        >
                            {formula === 'Tambah Formula' && <Box marginBottom="16px">
                                <FormControl>
                                    <Text>Nama Formula</Text>
                                    <Input
                                        type="text"
                                        value={newFormulaName}
                                        onChange={(e) => setNewFormulaName(e.target.value)}
                                        style={{ color: 'black' }}
                                        placeholder="masukkan nama formula"
                                    />
                                </FormControl>
                            </Box>

                            }
                            <Box marginBottom="16px">
                                <FormControl>
                                    <Text>PH Value</Text>
                                    <Input
                                        type="number"
                                        value={phValue}
                                        onChange={(e) => setPhValue(e.target.value)}
                                        style={{ color: 'black' }}
                                        placeholder="masukkan ph value"
                                    />
                                </FormControl>
                            </Box>

                            <Box marginBottom="16px">
                                <FormControl>
                                    <Text>PPM Value</Text>
                                    <Input
                                        type="number"
                                        value={ppmValue}
                                        onChange={(e) => setPpmValue(e.target.value)}
                                        style={{ color: 'black' }}
                                        placeholder="masukkan ppm value"
                                    />
                                </FormControl>
                            </Box>

                            <Box marginTop="16px" display="flex" flexDirection="row">
                                <Button
                                    type="Submit"
                                    backgroundColor={'#09322D'}
                                    onClick={onOpen}
                                >
                                    Racik
                                </Button>
                                {formula === 'Tambah Formula' && 
                                <Button
                                    type="Submit"
                                    backgroundColor={'#09322D'}
                                    onClick={onOpen}
                                    ml="20px"
                                >
                                    Save 
                                </Button>
                     

                            }
                            </Box>

                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader alignSelf={'center'}>Proses Peracikan</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody pb={6}>
                                        <Text>Apakah anda yakin untuk memproses formula ini ?</Text>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button
                                            onClick={() => { onClose(); handleSubmit(); }}

                                            backgroundColor='#09322D'
                                            color={'white'}
                                            mr={'3'}
                                            paddingX={'30px'}
                                        >
                                            Ok
                                        </Button>
                                        <Button onClick={onClose}>Cancel</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </form>
                    </Box>
                </Flex>
            )}
        </>
    );
};

export default CardFormPeracikan;
