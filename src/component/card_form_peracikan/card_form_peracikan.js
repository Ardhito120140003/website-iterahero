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

const CardFormPeracikan = () => {
    const [namaFormula, setNamaFormula] = useState("")
    const [phValue, setPhValue] = useState("");
    const [ppmValue, setPpmValue] = useState("");
    const [formula, setFormula] = useState('');
    const [formulaData, setFormulaData] = useState([]); // Store formula data from the server

    // Fetch formula data from the server when the component mounts
    useEffect(() => {
        axios.get('https://iterahero-e1a0e90da51e.herokuapp.com/api/v1/resep', {
            headers: {
                Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml0ZXJhaGVybzIwMjJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiYXVkIjoiaXRlcmFoZXJvIiwiaXNzIjoia2VkYWlyZWthIiwic3ViIjoic21hcnQtZmFybWluZyIsImlhdCI6MTY5NTYxNzc0OCwiZXhwIjoxNjk1NjYwOTQ4fQ.ztAxKKEcvG9y8VTHWZU421Bmg61ZjdLnzdyiUDw29Bs"
            }
        })
            .then(response => {
                console.log(response.data.data)
                setFormulaData(response.data.data);
                console.log(formulaData)
            })
            .catch(error => {
                console.error("Error fetching formula data:", error);
            });
    }, []);


    const fetchFormulaData = (selectedFormula) => {
        // Find the formula data for the selected formula
        const selectedFormulaData = formulaData.find(data => data.formula === selectedFormula);
        if (selectedFormulaData) {
            // setPhValue(selectedFormulaData.ph);
            // setPpmValue(selectedFormulaData.ppm);
        } else {
            // Handle the case where no data is found for the selected formula
            setPhValue("");
            setPpmValue("");
        }
    };

    // Function to handle formula selection change
    const handleFormulaChange = (e) => {
        const selectedFormula = e.target.value;
        setFormula(selectedFormula);
        fetchFormulaData(selectedFormula);
    };

    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    const handleSubmit = async () => {
        // You can send the pH and ppm values to the server here
        console.log("pH Value:", phValue);
        console.log("ppm Value:", ppmValue);
        // console.log("nama formula:", formula);
    };

    const addFormula = async () => {
        try {
            // Create a data object containing the ppm, ph, and nama values
            const data = {
                nama: newFormulaName, // Tambahkan nama formula baru
                ppm: ppmValue,
                ph: phValue
            };

            // Make an HTTP POST request to your API endpoint
            const response = await axios.post('YOUR_API_ENDPOINT', data, {
                headers: {
                    'Authorization': 'Bearer YOUR_ACCESS_TOKEN' // Add your authorization token here
                }
            });

            // Handle the response from the API
            console.log("API Response:", response.data);

            // Clear the input values after successful submission
            setNewFormulaName(""); // Reset nama formula baru
            setPpmValue("");
            setPhValue("");
        } catch (error) {
            // Handle any errors that occur during the request
            console.error("Error sending data to API:", error);
        }
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
                        }}>
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

                            <Box marginTop="16px">
                                <Button
                                    type="Submit"
                                    backgroundColor={'#09322D'}
                                    onClick={onOpen}
                                >
                                    Racik
                                </Button>
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
                                        <Button
                                            onClick={
                                                () => {
                                                    onClose();
                                                    addFormula();
                                                }
                                            }
                                            backgroundColor='#09322D'
                                            color={'white'}
                                            mr={'3'}
                                            paddingX={'30px'}
                                        >
                                            Simpan Formula
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
