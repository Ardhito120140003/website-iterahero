import React, { useState } from "react";
import { Flex, Image, Box, Center, Text, Icon, calc } from "@chakra-ui/react";
import SideNav from "../sidenav/sidenav";
import Header from "../header/header";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUrl } from "../../features/auth/authSlice";

const Board = () => {
  const routeName = useSelector(selectUrl);
  return (
    <Flex color="white" width="100%">
      <Box bg="tomato" h={"100vh"} overflow={"hidden"}>
        <SideNav />
      </Box>
      <Box flex="1" w={"100vh"}>
        <Header />
        <Flex
          padding={"20px"}
          pb={0}
          w="100%"
          h={{ base: "100%", lg: "calc(100vh - 100px)" }}
          overflowY={{base: 'hidden', lg: 'scroll'}}
          flexDir="column"
        >
          <Outlet/>
        </Flex>
      </Box>
    </Flex>
  );
};
export default Board;
