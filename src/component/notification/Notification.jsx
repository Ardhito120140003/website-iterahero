import React, { useEffect, useState } from 'react'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    useDisclosure,
    Button,
    Icon,
    Flex,
    Text,
    Badge
} from '@chakra-ui/react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectToken, selectUrl } from '../../features/auth/authSlice';
import Loading from '../loading/loading';
import { IoNotificationsOutline, IoRefreshOutline } from 'react-icons/io5';
import moment from "moment";
import { Link, useNavigate } from 'react-router-dom';


const Notification = () => {
    const { isOpen, onClose, onToggle } = useDisclosure()
    const navigate = useNavigate()
    const token = useSelector(selectToken)
    const base_url = useSelector(selectUrl)
    const [refresh, setRefresh] = useState(false);
    const [notification, setNotification] = useState([])
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchNotification = async () => {
            axios.get(base_url + "api/v1/notification", {
                params: {
                    size: 10
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(({ data }) => setNotification(data.data))
                .catch(({ response }) => {
                    if (response.status === 401) {
                        dispatch(logout())
                        navigate("/login")
                    }
                })
                .finally(() => setLoading(false))
        }
        fetchNotification()

        const interval = setInterval(() => {
            fetchNotification()
        }, 2500)

        return (() => clearInterval(interval))
    }, [refresh])

    return (
        <Popover placement='bottom-start' isOpen={isOpen} onClose={onClose} isLazy colorScheme='whatsapp'>
            <PopoverTrigger>
                <Button bgColor={'white'} onClick={onToggle}>
                    <Icon cursor="pointer"
                        as={IoNotificationsOutline}
                        color="var(--color-primer)"
                        fontSize={{ base: "x-large", sm: "x-large", md: "xx-large", lg: "xx-large", xl: "xx-large" }}
                    />
                    {notification.filter(item => !item.read).length > 0 ? (
                        <Badge
                            position="absolute"
                            top="-1"
                            right="-1"
                            fontSize="sm"
                            colorScheme="red"
                        >
                            {notification.filter((item) => !item.read).length}
                        </Badge>
                    ) : null}
                </Button>
            </PopoverTrigger>
            <PopoverContent w={"30vw"}>
                <PopoverArrow />
                {/* <PopoverCloseButton /> */}
                <PopoverHeader>
                    <Flex alignItems={"center"} justifyContent={"space-between"}>
                        <Flex alignItems={"center"}>
                            <Button>
                                <Icon
                                    cursor={"pointer"}
                                    as={IoRefreshOutline}
                                    color={"var(--color-primer)"}
                                    fontSize={{ base: "medium", sm: "medium", md: "large", lg: "large", xl: "large" }}
                                    onClick={() => {
                                        setLoading(true)
                                        setRefresh(!refresh)
                                    }}
                                    size={'md'}
                                    />
                            </Button>
                            <Text>Notification</Text>
                        </Flex>
                        <Flex>
                            <Button onClick={async () => {
                                const setRead = async () => {
                                    const id = notification.filter(item => !item.read).map(item => item.id)
                                    if (id.length > 1) {
                                        axios.patch(base_url + "api/v1/notification", {
                                            id
                                        }, {
                                            headers: {
                                                Authorization: "Bearer " + token
                                            }
                                        })
                                            .then(({ data }) => {
                                                setRefresh(!refresh)
                                                console.log(data)
                                            })
                                            .catch(({ response }) => console.error(response))
                                    }
                                }
                                await setRead();
                            }}
                            colorScheme='whatsapp'
                            size={'xs'}>
                                Mark all as read
                            </Button>
                        </Flex>
                    </Flex>
                </PopoverHeader>
                <PopoverBody>
                    {loading ? (
                        <Loading />
                    ) : notification.length < 1 ? (
                        <Flex>
                            <Text color={"gray.400"}>Tidak ada notifikasi</Text>
                        </Flex>
                    ) : (
                        <Flex direction={"column"} overflowY={"auto"} maxH={"30vh"}>
                            {notification.map((item, index) => (
                                <Flex flex={1} key={index} bgColor={!item.read ? 'blue.200' : null} p={3} justifyContent={"space-between"} alignItems={"center"} borderBottomWidth={index === notification.length - 1 ? 0 : 2}>
                                    <Text flex={3} textAlign={"left"}>{item.message}</Text>
                                    <Text flex={2} textAlign={"right"} color="gray.400" fontSize={'2xs'}>{moment(item["created_at"]).format('HH:mm YYYY-MM-DD')}</Text>
                                </Flex>))}
                        </Flex>
                    )}
                </PopoverBody>
                <PopoverFooter>
                    <Button color={"var(--color-primer)"} w={'100%'} onClick={() => {
                        onToggle()
                        navigate("/unit/historynotifikasi")
                    }}>
                        Show All
                    </Button>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    )
}

export default Notification;