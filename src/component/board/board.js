import React from 'react';
import {
  Flex, Box,
} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SideNav from '../sidenav/sidenav';
import Header from '../header/header';
import { selectUrl } from '../../features/auth/authSlice';

function Board() {
  const routeName = useSelector(selectUrl);
  return (
    <Flex color="white" width="100%">
      <Box bg="tomato" h="100vh" overflow="hidden">
        <SideNav />
      </Box>
      <Box flex="1" w="100vh">
        <Header />
        <Flex
          padding="20px"
          pb={0}
          w="100%"
          h={{ base: '100%', lg: 'calc(100vh - 100px)' }}
          overflowY="auto"
          flexDir="column"
        >
          <Outlet />
        </Flex>
      </Box>
    </Flex>
  );
}
export default Board;
