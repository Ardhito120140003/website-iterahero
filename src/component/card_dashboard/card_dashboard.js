import React, { useState } from "react";
import { Flex, Text, Icon, WrapItem } from "@chakra-ui/react";
import "./card_dashboard.css";

const CardDashboard = (props) => {
  let data = props.data;

  return (
    <WrapItem className="dont-touch" w={{ base: "100%", md: "fit-content" }}>
      <Flex
        mt={50}
        h={"245px"}
        w={{ base: "100%", md: "sm" }}
        bg={"#ffff"}
        borderRadius="30"
        borderWidth="3px"
        borderColor={"#D9D9D9"}
        justify={"space-between"}
        elevation={5}
        boxShadow={"0px 0.1px 2px rgba(0, 0, 0, 0.25)"}
        flexDir={"column"}
        alignItems="center"
        padding={35}
      >
        <Flex
          w={"100px"}
          h={"56px"}
          borderRadius={"10px"}
          bg={"#319795"}
          justify="center"
          align={"center"}
        >
          <Icon as={data.icon} color={"white"} w={6} h={6} />
        </Flex>
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
    </WrapItem>
  );
};
export default CardDashboard;
