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
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../notification/Notification';


function Header() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const routeName = useSelector(selectRoute);

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
      <Flex flexDirection="row" alignItems={"center"} gap={{ base: 1, sm: 1, md: 3, lg: 5, xl: 5 }}>
       <Notification />
        <Box>
          <Button
            bgColor={"white"}
            // to="/login"
            onClick={() => {
              localStorage.clear()
              dispatch(logout())
            }}
          >
            <Icon
              cursor="pointer"
              as={IoExitOutline}
              color="var(--color-primer)"
              fontSize={{ base: "x-large", sm: "x-large", md: "xx-large", lg: "xx-large", xl: "xx-large" }}
            />
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}
export default Header;
