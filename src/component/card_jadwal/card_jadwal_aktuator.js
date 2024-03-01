import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Flex,
    Text,
    Box,
    Icon,
    Wrap,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Image,
    WrapItem
} from '@chakra-ui/react'
import { Card, CardBody, CardHeader, CardFooter } from '@chakra-ui/card'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectToken, selectUrl } from '../../features/auth/authSlice'
import Loading from '../loading/loading'
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineAccessTime } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'


const CardJadwalAktuator = () => {
    const base_url = useSelector(selectUrl);
    const token = useSelector(selectToken);
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [tandon, setTandon] = useState([]);
    const [modalLoading, setModalLoading] = useState(true)
    const navigate = useNavigate();

    const modalOpen = async () => {
        onOpen();
        await axios.get(base_url + "api/v1/tandonUtama", {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(({ data }) => setTandon(data.data))
            .catch(({ response }) => console.error(response))
            .finally(() => {
                setModalLoading(false)
            })
    }

    useEffect(() => {
        const fetchData = () => {
            axios.get(base_url + "api/v1/automation", {
                params: {
                    type: "bySchedule",
                    id_automation: 0
                },
                headers: {
                    Authorization: "Bearer " + token
                }
            })
                .then(({ data }) => {
                    setData(data.data.filter((item) => item.aktuator.type === "Selenoid"))
                })
                .catch(({ response }) => {
                    console.error(response.status)
                    setIsError(true)
                })
                .finally(() => setIsLoading(false))
        }

        fetchData();
    }, [])

    function getDayName(dayValue) {
        const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        return daysOfWeek[dayValue];
    }

    return (
        <Flex
            flexDirection="column"
            width="100%"
            height="50%"
            borderRadius="10px"
            border="1px solid #E2E8F0"
            overflowY={"auto"}
        >
            {isLoading ? (
                <Loading />
            ) : (
                <Flex flexDirection="column"
                    width="100%"
                    h={"100%"}
                >
                    <Flex alignItems={"center"} justifyContent={"space-between"} px={8}>
                        <Text flex={1} textAlign={"center"} py={"30px"}>Jadwal Pendistribusian</Text>
                        <Button backgroundColor={"#09322D"} onClick={modalOpen}>+</Button>
                    </Flex>
                    <Flex
                        flexDirection="column"
                        width="100%"
                        h={"100%"}
                    >
                        {isError ? (
                            <Flex h={'100%'} alignItems={'center'} justifyContent={'center'} overflow={'auto'}>
                                <Text color={'grey'}>Error Fetching Data</Text>
                            </Flex>
                        ) : (
                            data.length < 1 ? (
                                <Flex h={'100%'} alignItems={'center'} justifyContent={'center'} overflow={'auto'}>
                                    <Text color={'grey'}>Tidak Ada Pendistribusian</Text>
                                </Flex>
                            ) : (
                                <AnimatePresence>
                                    {data.map((item, index) => {
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <Flex
                                                borderRadius="10px"
                                                border="1px solid #E2E8F0"
                                                marginY="8px"
                                                marginX="20px"
                                                paddingY="0px"
                                                paddingX="10px"
                                                justifyContent="space-around"
                                            >
                                                <Accordion border={'white'} color={"black"} allowToggle w={"100%"}>
                                                    <AccordionItem>
                                                        <h2>
                                                            <AccordionButton>
                                                                <Box
                                                                    display={"flex"}
                                                                    flexDir={"row"}
                                                                    as="span"
                                                                    flex="1"
                                                                    textAlign="left"
                                                                >
                                                                    <Icon
                                                                        as={MdOutlineAccessTime}
                                                                        color="#14453E"
                                                                        w="30px"
                                                                        h="30px"
                                                                        alignSelf="center"
                                                                    />
                                                                    <Text ml={"5px"} alignSelf={"center"}>
                                                                        {/* {item.startTime} -  */}
                                                                        {item.aktuator.name}
                                                                    </Text>
                                                                </Box>
                                                                <AccordionIcon />
                                                            </AccordionButton>
                                                        </h2>
                                                        <AccordionPanel pb={4} fontSize={"15px"}>
                                                            <Flex direction={"column"}>
                                                                <Flex flexDir={"row"}>
                                                                    <Flex flexDir="row" marginRight="5px" marginY="20px" w={'100%'} align={'left'}>
                                                                        <Flex direction={"column"} alignItems={"start"}>
                                                                            <Text color="black"> Nama </Text>
                                                                            <Text color="black"> GH Tujuan </Text>
                                                                            <Text color="black"> Durasi </Text>
                                                                            <Text color="black"> Waktu </Text>
                                                                            <Text color="black"> Interval </Text>
                                                                        </Flex>
                                                                        <Flex direction={"column"}>
                                                                            <Text color="black"> : </Text>
                                                                            <Text color="black"> : </Text>
                                                                            <Text color="black"> : </Text>
                                                                            <Text color="black"> : </Text>
                                                                            <Text color="black"> : </Text>
                                                                        </Flex>
                                                                        <Flex direction={"column"} alignItems={"start"}>
                                                                            <Text color="black"> {item.aktuator.name} </Text>
                                                                            <Text color="black"> {item.aktuator.greenhouse ? item.aktuator.greenhouse.name : '-'} </Text>
                                                                            <Text color="black"> {item.duration} Menit</Text>
                                                                            <Text color="black" align={'left'}> {item.startTime} </Text>
                                                                            <Text color="black" align={'left'}> {item.interval} Jam </Text>
                                                                        </Flex>
                                                                    </Flex>
                                                                </Flex>

                                                                <Wrap flexDir="row" alignItems="start" gap={2} >
                                                                    {item.hari.map((day) => (
                                                                        <Flex
                                                                            key={day}
                                                                            bg="#09322D"
                                                                            color="white"
                                                                            justifyContent='center' // To center the content horizontally
                                                                            alignItems='center' // To center the content vertically
                                                                            borderRadius="5"
                                                                            fontSize="sm"
                                                                            fontWeight="bold"
                                                                            width='80px'
                                                                            height='30px'
                                                                        >
                                                                            {getDayName(day)}
                                                                        </Flex>
                                                                    ))}
                                                                </Wrap>
                                                            </Flex>
                                                        </AccordionPanel>
                                                    </AccordionItem>
                                                </Accordion>
                                            </Flex>
                                        </motion.div>
                                    )})}
                                </AnimatePresence>
                            ))}
                    </Flex>
                </Flex>
            )}
            <Modal isOpen={isOpen} onClose={onClose} isCentered size={'2xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={"center"}>Pilih Greenhouse</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {modalLoading ? (
                            <Loading />
                        ) : (
                            <Wrap spacing={"10px"}>
                                {tandon.map((item, index) => (
                                    <WrapItem flexDirection={"column"} w={"30%"} h={"280px"} cursor={"default"} key={index} >
                                        <Card gap={4} boxShadow="0px 0.1px 2px rgba(0, 0, 0, 0.25)" borderRadius={8} alignItems={"center"}>
                                            <CardHeader textAlign={"center"}>{item.nama}</CardHeader>
                                            <CardBody justifyContent={"center"} display={"flex"} flexDir={"column"} gap={4}>
                                                <Image src={item.image} />
                                                <Button onClick={() => {
                                                    navigate("/unit/tandon/detail/" + item.id, { state: "aktuator" })
                                                }}>Tambah</Button>
                                            </CardBody>
                                        </Card>
                                    </WrapItem>
                                ))}
                            </Wrap>
                        )}

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => {
                            setModalLoading(true)
                            onClose()
                        }}>
                            Close
                        </Button>
                        {/* <Button variant='ghost'>Secondary Action</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}

export default CardJadwalAktuator