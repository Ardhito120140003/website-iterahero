import React, { useState, useEffect } from "react";
import "./monitoring.css";
import { Text, Button, Select, Flex, Image, Wrap } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { routePageName } from "../../redux/action";
import { TabTitle } from "../../Utility/utility";
import { greenhouseByUserId } from "../../Utility/api_link";
import axios from "axios";
import Loading from "../../component/loading/loading";

const MonitoringDetail = () => {
  TabTitle("Monitoring - ITERA Hero");
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data;
  console.log(data);
  const header = localStorage.getItem("token");

  // const getSensorDetail = async () => {
  //   await axios
  //     .get(greenhouseByUserId, {
  //       headers: {
  //         Authorization: "Bearer " + header,
  //       },
  //     })
  //     .then((response) => {
  //       setDataApi(response.data.data);
  //       setData(response.data.data[0].id);
  //     });
  //   console.log(dataApi).catch((error) => {
  //     localStorage.clear();
  //     navigate("/login");
  //   });
  // };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(routePageName("Monitoring Detail"));
  }, []);
  return (
    <>
      {data == null ? (
        <Loading />
      ) : (
        <Flex gap={"30px"} width={"100%"} flexDir={"column"}>
          <Flex
            bg="white"
            borderRadius="10px"
            p="10px"
            alignItems={"center"}
            justifyContent={"start"}
          >
            <Flex alignItems={"center"}>
              <Link to="/unit/monitoring">
                <Text
                  fontSize={{ base: "15px", md: "20px" }}
                  fontWeight="bold"
                  mr="10px"
                >
                  Monitoring
                </Text>
              </Link>
            </Flex>
            <Flex alignItems={"center"}>
              <Text
                fontSize={{ base: "15px", md: "20px" }}
                fontWeight="bold"
                mr="10px"
              >
                {">"}
              </Text>
            </Flex>
            <Text fontSize={{ base: "15px", md: "20px" }} fontWeight="bold">
              {"Detail Sensor " + data.name}
            </Text>
          </Flex>
          <Flex
            direction={"column"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <Text
              fontSize={{ base: "15px", md: "20px" }}
              fontWeight="bold"
              width={{ base: "100%", lg: "80px" }}
            >
              Detail
            </Text>
            <Flex
              mt={"20px"}
              direction={{ base: "column", lg: "row-reverse" }}
              justifyContent={"center"}
              alignItems={"start"}
            >
              <Wrap width={{ base: "100%", lg: "30%" }}>
                <Flex
                  width={"100%"}
                  direction={"column"}
                  justifyContent={{ base: "center", lg: "start" }}
                  alignItems={{ base: "center", lg: "start" }}
                >
                  <Text>Gambar Sensor</Text>
                  <Image
                    width={"100%"}
                    maxWidth="600px"
                    marginLeft={"10px"}
                    src={data.sensor_image}
                  ></Image>
                </Flex>
                <Flex
                  direction={"column"}
                  justifyContent={{ base: "center", lg: "start" }}
                  alignItems={{ base: "center", lg: "start" }}
                  width="100%"
                >
                  <Text>Posisi Sensor</Text>
                  <Image
                    maxWidth="600px"
                    width="100%"
                    src={data.posisition}
                    marginLeft={"10px"}
                  ></Image>
                </Flex>
              </Wrap>
              <Flex
                width={{ base: "100%", lg: "70%" }}
                direction={"column"}
                mt={{ base: "20px", lg: "0px" }}
                justifyContent={"start"}
                alignItems={"start"}
              >
                <Text>Nama : {data.name}</Text>
                <Text>Brand : {data.brand}</Text>
                <Text>Range Max : {data.range_max}</Text>
                <Text>Range Max :{data.range_min} </Text>
                <Text>Unit Measurement : {data.unit_measurement}</Text>
                <Text>Deskripsi : {data.detail}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};
export default MonitoringDetail;
