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
    Text
} from '@chakra-ui/react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectToken, selectUrl } from '../../features/auth/authSlice';
import Loading from '../loading/loading';
import { IoNotificationsOutline, IoRefreshOutline } from 'react-icons/io5';
import moment from "moment";
import { useNavigate } from 'react-router-dom';


const Notification = () => {
    const { isOpen, onClose, onToggle } = useDisclosure()
    const navigate = useNavigate()
    const token = useSelector(selectToken)
    const base_url = useSelector(selectUrl)
    const [refresh, setRefresh] = useState(false);
    const [notification, setNotification] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(base_url + "api/v1/notification", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => setNotification(response.data.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }, [refresh])

    return (
        <Popover placement='bottom-start' isOpen={isOpen} onClose={onClose} isLazy>
            <PopoverTrigger>
                <Button bgColor={'white'} onClick={onToggle}>
                    <Icon cursor="pointer"
                        as={IoNotificationsOutline}
                        color="var(--color-primer)"
                        fontSize={{ base: "x-large", sm: "x-large", md: "xx-large", lg: "xx-large", xl: "xx-large" }}
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent w={"30vw"}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>
                    <Flex justify={"flex-start"} alignItems={"center"}>
                        <Button>
                            <Icon
                                cursor={"pointer"}
                                as={IoRefreshOutline}
                                color={"var(--color-primer)"}
                                fontSize={{ base: "medium", sm: "medium", md: "large", lg: "large", xl: "large" }}
                                onClick={() => {
                                    setLoading(true)
                                    setRefresh(!refresh)
                                }} />
                        </Button>
                        <Text>Notification</Text>
                    </Flex>
                </PopoverHeader>
                <PopoverBody>
                    {loading ? (
                        <Loading />
                    ) : notification.length < 1 ? (<Text color={"gray.400"}>Tidak ada notifikasi</Text>) : (
                        <Flex direction={"column"} overflowY={"auto"} maxH={"30vh"}>
                            {notification.filter(item => !item.read).map((item, index) => (
                                <Flex flex={1} key={index} p={3} justifyContent={"space-between"} alignItems={"center"} borderBottomWidth={index === notification.length - 1 ? 0 : 2}>
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