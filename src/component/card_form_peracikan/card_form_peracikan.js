import React, { useState } from "react";
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

const CardFormPeracikan = () => {

    // State variables to store pH and ppm values
    const [phValue, setPhValue] = useState("");
    const [ppmValue, setPpmValue] = useState("");
    const [buah, setBuah] = useState('');
    // ... state variables dan fungsi handleSubmit lainnya

    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    const handleSubmit = async () => {
        // You can send the pH and ppm values to the server here
        console.log("pH Value:", phValue);
        console.log("ppm Value:", ppmValue);


        const header = localStorage.getItem('token')
        await axios.post('https://iterahero.cyclic.app/api/v1/peracikan',
            {
                ppm: ppmValue,
                ph: phValue
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml0ZXJhaGVybzIwMjJAZ21haWwuY29tIiwiaWRfdXNlciI6MSwiaWF0IjoxNjkzOTg4MTc2fQ.rpeWJnqvgdwO3wPlTeT3Pl6kPKZ4C0kGHRKJUx3URQs'
                }
            }
        )
            .then(response => {
                console.log(response); setPhValue('');
                setPpmValue('');
            })
            .catch((error) => {
                localStorage.clear()
            })
    };

    return (
        <>
            <Flex flexDirection={'column'} width={"100%"} height={'100%'} >
                <Box color={"black"} my={'20px'}>
                    <form>
                        <Select borderRadius={"10"} value={buah} name="buah" onChange={(e) => setBuah(e.target.value)}>
                            <option value="">--Pilih Formula--</option>
                            <option value="grapefruit">Melon</option>
                            <option value="lime">Lime</option>
                            <option value="coconut">Coconut</option>
                            <option value="mango">Mango</option>
                            <option value="Tambah Formula">--Tambah Formula--</option>
                        </Select>
                    </form>
                </Box>
                <Box bg={'#ffff'}
                    borderRadius={'10px'}
                    border={'1px solid #E2E8F0'}
                    p={8}
                >
                    <form
                        onSubmit={(e) => {
                            e.preventDefault(); // Prevent the default form submission behavior
                            handleSubmit(); // Call your custom handleSubmit function
                        }}
                    >
                        {buah === 'Tambah Formula' && <Box marginBottom="16px">
                            <FormControl>
                                <Text>Nama Formula:</Text>
                                <Input
                                    type="text"
                                    style={{ color: 'black' }} // Set font color to black
                                />
                            </FormControl>
                        </Box>
                        }
                        <Box marginBottom="16px">
                            <FormControl>
                                <Text>PH Value:</Text>
                                <Input
                                    type="number"
                                    value={phValue}
                                    onChange={(e) => setPhValue(e.target.value)}
                                    style={{ color: 'black' }} // Set font color to black
                                />
                            </FormControl>
                        </Box>

                        <Box marginBottom="16px">
                            <FormControl>
                                <Text>PPM Value:</Text>
                                <Input
                                    type="number"
                                    value={ppmValue}
                                    onChange={(e) => setPpmValue(e.target.value)}
                                    style={{ color: 'black' }} // Set font color to black
                                />
                            </FormControl>
                        </Box>

                        <Box marginTop="16px">
                            <Button
                                type="Submit"
                                backgroundColor={'#09322D'}
                                onClick={onOpen} // Membuka modal saat tombol Submit ditekan
                            >
                                Submit
                            </Button>
                        </Box>

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader alignSelf={'center'}>Proses Peracikan</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    {/* Isi modal */}
                                    <Text>Apakah anda yakin untuk memproses formula ini ?</Text>
                                </ModalBody>

                                <ModalFooter>
                                    <Button
                                        onClick={onClose}
                                        backgroundColor='#09322D'
                                        color={'white'}
                                        mr={'3'}
                                        paddingX={'30px'}>
                                        Ok
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>

                    </form>
                </Box >
            </Flex >
        </>
    );
};

export default CardFormPeracikan