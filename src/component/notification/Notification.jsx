import React, { useEffect } from 'react'
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
} from '@chakra-ui/react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectToken, selectUrl } from '../../features/auth/authSlice';
import Loading from '../loading/loading';

const Notification = () => {
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
        <Popover>
            <PopoverTrigger>
                <Button>Trigger</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Confirmation!</PopoverHeader>
                <PopoverBody>
                    {loading ? (
                        <Loading />
                    ) : notification.map((item, index) => (
                        <Text key={index}>{item.message}</Text>
                    ))}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default Notification;