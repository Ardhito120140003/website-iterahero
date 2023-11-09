import React, { useState, useEffect } from 'react';
import {
  Flex, Text, Icon, useDisclosure, Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Box,
  PopoverFooter
} from '@chakra-ui/react';
import { IoExitOutline, IoNotificationsOutline, IoRefreshOutline } from 'react-icons/io5';
import { AiOutlineMenu } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import Draw from '../draw/draw';
import { selectRoute, logout, selectUrl, selectToken } from '../../features/auth/authSlice';
import Loading from '../loading/loading';
import axios from 'axios';
import moment from "moment";
import { Link } from 'react-router-dom';


function Header() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const routeName = useSelector(selectRoute);
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
      .then((response) => {
        if (response.data.data) {
          setNotification(response.data.data)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [refresh])

  return (
    <Flex
      height="80px"
      bg="#ffff"
      padding="20px"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="row"
      borderBottom={"2px solid rgba(0, 0, 0, 0.1)"}
    >
      <Icon
        as={AiOutlineMenu}
        fontSize="xl"
        color="#09322D"
        display={{
          lg: 'none',
        }}
        onClick={onOpen}
      />

      <Draw
        data={{
          onclose: onClose,
          isopen: isOpen,
        }}
      />

      <Text
        color="var(--color-primer)"
        fontWeight="bold"
        fontSize="var(--header-2)"
      >
        {routeName}
      </Text>
      <Flex flexDirection="row" alignItems={"center"} gap={{base:1,sm:1,md:3,lg:5,xl:5}}>
        <Popover>
          <PopoverTrigger>
            <Button bgColor={'white'}>
              <Icon cursor="pointer"
                as={IoNotificationsOutline}
                color="var(--color-primer)"
                fontSize={{base:"x-large",sm:"x-large",md:"xx-large",lg:"xx-large",xl:"xx-large"}}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              <Flex justify={"flex-start"} alignItems={"center"}>
                <Button>
                  <Icon 
                  cursor={"pointer"} 
                  as={IoRefreshOutline} 
                  color={"var(--color-primer)"} 
                  fontSize={{base:"medium",sm:"medium",md:"large",lg:"large",xl:"large"}}
                  onClick={() => setRefresh(!refresh)} />
                </Button>
                <Text>Notification</Text>
              </Flex>
            </PopoverHeader>
            <PopoverBody>
              {loading ? (
                <Loading />
              ) : notification.length < 1 ? (<Text color={"gray.400"}>Tidak ada notifikasi</Text>) : (notification.map((item, index) => (
                <Flex key={index} p={3} justifyContent={"space-between"} alignItems={"baseline"} >
                  <Text flex={3} textAlign={"left"}>{item.message}</Text>
                  <Text flex={2} color="gray.400" fontSize={'2xs'}>{moment(item["created_at"]).format('HH:mm YYYY-MM-DD')}</Text>
                </Flex>
              )))}
            </PopoverBody>
            <PopoverFooter>
              <Button color={"var(--color-primer)"} w={'100%'}>
                <Link to={"/unit/historynotifikasi"}>Show All</Link>
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
        <Box>
          <Button
            bgColor={"white"}
            // to="/login"
            onClick={() => {
              localStorage.clear();
              dispatch(logout());
            }}
          >
            <Icon
              cursor="pointer"
              as={IoExitOutline}
              color="var(--color-primer)"
              fontSize={{base:"x-large",sm:"x-large",md:"xx-large",lg:"xx-large",xl:"xx-large"}}
            />
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}
export default Header;
