import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  CircularProgressLabel,
  CircularProgress,
  Text,
  Flex,
  Center,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectUrl } from "../../features/auth/authSlice";
import Loading from "../loading/loading";

const ValueTandon = () => {
  const base_url = useSelector(selectUrl);
  const min = 20;
  const [bahan, setBahan] = useState([]);
  const [ValueSensor, setValueSensor] = useState("");
  const header = localStorage.getItem("token");

  const getValueTandon = async () => {
    await axios
      .get(`${base_url}api/v1/bahan`, {
        headers: {
          Authorization: "Bearer " + header,
        },
      })
      .then((response) => {
        // console.log(response.data.data);
        setBahan(response.data.data);
      })
      .catch((error) => {
        console.log("data gaada");
      });
  };

  useEffect(() => {
    getValueTandon();
  }, []);

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
          {bahan.map((item, index) => (
            <Flex flexDirection={"column"} marginX={"20px"} key={index}>
              <CircularProgress
                value={item.sensor[0].nilai * 2}
                color={
                  item.sensor[0].nilai <= 10 ? "var(--color-error)" : `#41BF06`
                }
                size="70px"
              >
                <CircularProgressLabel color={"black"}>
                  {item.sensor[0].nilai + " " + item.sensor[0].satuan}
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

{
  /* <CircularProgress
              value={ValueSensor.nutrisiA}
              color={
                ValueSensor.nutrisiA <= min ? "var(--color-error)" : `#41BF06`
              }
              size="70px"
            >
              <CircularProgressLabel color={"black"}>
                {ValueSensor.nutrisiA}%
              </CircularProgressLabel>
            </CircularProgress>
            <Text>Nutrisi A</Text>
          </Flex>
          <Flex flexDirection={"column"} marginX={"20px"}>
            <CircularProgress
              value={ValueSensor.nutrisiB}
              color={ValueSensor <= min ? "var(--color-error)" : `#41BF06`}
              size="70px"
            >
              <CircularProgressLabel color={"black"}>
                {ValueSensor}%
              </CircularProgressLabel>
            </CircularProgress>
            <Text>Nutrisi B</Text>
          </Flex>
          <Flex flexDirection={"column"} marginX={"20px"}>
            <CircularProgress
              value={ValueSensor.asam}
              color={ValueSensor < min ? "var(--color-error)" : `#41BF06`}
              size="70px"
            >
              <CircularProgressLabel color={"black"}>
                {ValueSensor}%
              </CircularProgressLabel>
            </CircularProgress>
            <Text>Asam</Text>
          </Flex>
          <Flex flexDirection={"column"} marginX={"20px"}>
            <CircularProgress
              value={ValueSensor}
              color={ValueSensor < min ? "var(--color-error)" : `#41BF06`}
              size="70px"
            >
              <CircularProgressLabel color={"black"}>
                {ValueSensor}%
              </CircularProgressLabel>
            </CircularProgress>
            <Text>Basa</Text>
          </Flex>
          <Flex flexDirection={"column"} marginX={"20px"}>
            <CircularProgress
              value={ValueSensor}
              color={ValueSensor < min ? "var(--color-error)" : `#41BF06`}
              size="70px"
            >
              <CircularProgressLabel color={"black"}>
                {ValueSensor}%
              </CircularProgressLabel>
            </CircularProgress>
            <Text>Air</Text>
          </Flex> */
}
