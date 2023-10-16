import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Box,
  CircularProgress,
  Grid,
  GridItem,
  Image,
  Center,
  Wrap,
  Button,
  FormLabel,
  Select,
  FormControl,
} from "@chakra-ui/react";
import { TabTitle } from "../../Utility/utility";
import { selectUrl } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import Loading from "../../component/loading/loading";
import { AiOutlineControl } from "react-icons/ai";
import { GiGreenhouse } from "react-icons/gi";
import { MdMonitor } from "react-icons/md";
import CardDashboard from "../../component/card_dashboard/card_dashboard";
import { Field, Form, Formik } from "formik";
import CardSensorOperator from "../../component/card_sensor/card_sensor_operator";
import {MdOutlineMoreTime} from "react-icons/md";

const DashboardOperator = () => {
  TabTitle("Dashboard - ITERA Hero");
  const base_url = useSelector(selectUrl);
  const [dataApiDashboard, setDataApiDashboard] = useState([]);
  const [dataApiPenjadwalan, setDataApiPenjadwalan] = useState([]);
  const [firstFilter, setFirstFilter] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const [action, setAction] = useState(false);
  const headers = localStorage.getItem("token");

  const getApiPenjadwalan = () => {
    axios
      .get(base_url + "api/v1/penjadwalan", {
        headers: {
          Authorization: `Bearer ${headers}`,
        },
      })
      .then((response) => {
        console.log("data yang di get :", response.data.data);
        setDataApiPenjadwalan(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getApiDashboard = async () => {
    axios
      .get(base_url + "api/v1/dashboard", {
        headers: {
          Authorization: `Bearer ${headers}`,
        },
      })
      .then((response) => {
        const data = [];
        for (const item in response.data.data) {
          const obj = {};
          let key = item.replace(/([A-Z])/g, ' $1');
          key = key.charAt(0).toUpperCase() + key.slice(1);
          obj[key] = response.data.data[item];
          data.push(obj);
        }
        setDataApiDashboard(data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    if (firstFilter) {
      axios
        .get(base_url + "api/v1/" + firstFilter, {
          headers: {
            Authorization: "Bearer " + headers,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          setFilterData(response.data.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [firstFilter]);

  useEffect(() => {
    getApiDashboard()
      .then(() => {
        getApiPenjadwalan().then(() =>
          setIsLoading(false))
      });
  }, [action]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Flex flexDirection={"column"}>
          <Image
            width={"20%"}
            height={"auto"}
            src="https://res.cloudinary.com/diyu8lkwy/image/upload/v1663542541/itera%20herro%20icon/Frame_181_fmtxbh.png"
            alignSelf={"center"}
          />
          <Flex alignItems={"center"}>
            <Wrap mt={8} justify={{ md: "center", sm: "center" }} spacing={30}>
              {dataApiDashboard.map((item, index) => (
                <CardDashboard
                  data={{
                    value: Object.values(item),
                    icon: GiGreenhouse,
                    name: Object.keys(item),
                  }}
                  key={index}
                />
              ))}
            </Wrap>
          </Flex>
          <Grid templateColumns={{ md: 'repeat(3, 1fr)', base: 'repeat(1, 1fr)' }} gap={6} mt={5}>
            <GridItem colSpan={2} >
              <Formik
                initialValues={{
                  filter1: "",
                  filter2: "",
                }}
                onSubmit={(values) => {
                  alert(JSON.stringify(values.filter2));
                }}
              >
                {({ values, setFieldValue, resetForm }) => (
                  <Form>
                    <Flex alignItems={"space-between"}>
                      <Select
                        size={"lg"}
                        name="filter1"
                        as={Select}
                        borderRadius={"10"}
                        placeholder="Pilih Filter"
                        width={"100%"}
                        height={"5vh"}
                        bg={"white"}
                        _active={{ bg: "white" }}
                        borderColor={"var(--color-border)"}
                        fontSize={"var(--header-5)"}
                        fontWeight={"normal"}
                        color={"var(--color-primer)"}
                        _hover={{ borderColor: "var(--color-border)" }}
                        _focusWithin={{ borderColor: "var(--color-border)" }}
                        mr={5}
                        value={values.filter1}
                        onChange={(e) => {
                          resetForm({ filter1: e.target.value, filter2: "" });
                          setFieldValue("filter1", e.target.value);
                          setFirstFilter(e.target.value);
                        }}
                      >
                        <option value="greenhouse">Greenhouse</option>
                        <option value="tandonUtama">Tandon</option>
                      </Select>
                      <Select
                        name="filter2"
                        as={Select}
                        borderRadius={"10"}
                        width={"100%"}
                        height={"5vh"}
                        placeholder={
                          values.filter1 ? "Pilih " + values.filter1 : "--"
                        }
                        bg={"white"}
                        _active={{ bg: "white" }}
                        borderColor={"var(--color-border)"}
                        fontSize={"var(--header-5)"}
                        fontWeight={"normal"}
                        color={"var(--color-primer)"}
                        _hover={{ borderColor: "var(--color-border)" }}
                        _focusWithin={{ borderColor: "var(--color-border)" }}
                        value={values.filter2}
                        disabled={values.filter1 === ""}
                        onChange={async (e) => {
                          setFieldValue("filter2", e.target.value);
                          axios
                            .get(
                              base_url +
                              "api/v1/" +
                              values.filter1 +
                              "/" +
                              e.target.value +
                              "/sensor",
                              {
                                headers: {
                                  Authorization: "Bearer " + headers,
                                },
                              }
                            )
                            .then((response) => {
                              console.log(response.data);
                              setData(response.data.data);
                            })
                            .catch((err) => console.error(err));
                        }}
                      >
                        {filterData.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.id}
                          </option>
                        ))}
                      </Select>
                    </Flex>
                    <Flex border={'3px solid #d9d9d9'} borderRadius={15} alignItems={"center"} justifyContent={"center"} padding={"20px"} mt={'20px'}>
                    {values.filter2 !== "" ? (
                      <CardSensorOperator 
                        data={{ alat: values.filter1, id: values.filter2 }}
                      />
                    ) : null}
                    </Flex>
                  </Form>
                )}
              </Formik>
            </GridItem>
            <Flex flexDir={'column'} border={'3px solid #d9d9d9'} borderRadius={15} alignItems={"center"} justifyContent={"center"} minH={'100px'}>
              {dataApiPenjadwalan.length < 1 && isLoading ? (
                <Loading />
              ) : dataApiPenjadwalan.length < 1 ? (
                <Text>Tidak Ada data Penjadwalan</Text>
              ) : (
                dataApiPenjadwalan.map((item, index) => (
                  // <Box color={'black'} key={index}>{JSON.stringify(item)}</Box>
                  <Flex
                    key={index}
                    borderRadius="10px"
                    border="1px solid #E2E8F0"
                    marginY="8px"
                    marginX="20px"
                    paddingY="0px"
                    paddingX="20px"
                    justifyContent="space-around"
                  >
                    {/* <Icon as={MdOutlineMoreTime} color="#14453E" w="50px" h="50px" alignSelf="center" /> */}

                    <Flex flexDir="column" marginRight="50px" marginY="20px">
                      <Text align="left">
                        Formula :
                      </Text>
                      <Text align="left">
                        Jam :
                      </Text>
                      <Text align="Left">
                        Durasi Penyiraman :
                      </Text>
                    </Flex>
                  </Flex>
                )
                ))
              }
            </Flex>
          </Grid>
        </Flex>
      )}
    </>
  );
};

export default DashboardOperator;