import React from "react";
import {
  CircularProgressLabel,
  CircularProgress,
  Text,
  Flex,
} from "@chakra-ui/react";

const ValueTandon = ({ tandonBahan }) => {

  return (
    <>
      <Flex
        bg={"#ffff"}
        borderRadius={"10px"}
        border={"1px solid #E2E8F0"}
        paddingTop={"30px"}
        paddingBottom={"10px"}
        paddingY={"30px"}
        paddingX={"10px"}
        alignContent={"center"}
        flexDirection={"column"}
      >
        <Text marginBottom={"10px"}>Ketersediaan Bahan</Text>
        <Flex
          fontSize={12}
          alignItems={"center"}
          justifyContent={"space-evenly"}
          marginY={"5px"}
          paddingX={"10px"}
          paddingY={"10px"}
        >
        {tandonBahan.filter(item => item.sensor.length > 0).map((item, index) => (
            <Flex flexDirection={"column"} marginX={"20px"} key={index}>
              <CircularProgress
                value={item.sensor[0].range_max * 2}
                color={
                  item.sensor[0].range_max <= 10 ? "var(--color-error)" : `#41BF06`
                }
                size="70px"
              >
                <CircularProgressLabel color={"black"}>
                  {item.sensor[0].range_max + " " + item.sensor[0].unit_measurement}
                </CircularProgressLabel>
              </CircularProgress>
              <Text>{item.nama}</Text>
            </Flex>
          ))}

        </Flex>
      </Flex>
    </>
  );
};

export default ValueTandon;