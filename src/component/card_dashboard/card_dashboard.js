import React, { useState } from "react";
import { Flex, Text, Icon, Box } from "@chakra-ui/react";
import "./card_dashboard.css";

const CardDashboard = (props) => {
  let data = props.data;

  return (
    <Flex
      bg={"#ffff"}
      borderRadius="30"
      borderWidth="3px"
      borderColor={"#D9D9D9"}
      boxShadow={"0px 0.1px 2px rgba(0, 0, 0, 0.25)"}
      p={10}
      w={"30%"}
      h={{ base: "100px", md: "120px" }}
      align={"center"}
      justifyContent={"center"}
    >
      <Flex
        padding={5}
        borderRadius={"10px"}
        bg={"#319795"}
        justify="center"
        align={"center"}
      >
        <Icon as={data.icon} color={"white"} w={6} h={6} />
      </Flex>
      <Flex direction={"column"}>
        <Text
          color={"black"}
          fontWeight={"semibold"}
          fontSize={"var( --header-1)"}
          fontFamily={"var(--font-family-secondary)"}
        >
          {data.value}
        </Text>
        
        <Text
          color={"black"}
          fontWeight={"semibold"}
          fontSize={"var( --header-4)"}
          fontFamily={"var(--font-family-secondary)"}
        >
          {data.name}
        </Text>
      </Flex>
    </Flex>
  );
};
export default CardDashboard;
