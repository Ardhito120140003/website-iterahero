import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Grid,
  GridItem,
  Wrap,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tabs, TabList, TabPanels, Tab, TabPanel, Icon
} from "@chakra-ui/react";
import { TabTitle } from "../../Utility/utility";
import { selectUrl } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loading from "../../component/loading/loading";
import { GiGreenhouse } from "react-icons/gi";
import CardDashboard from "../../component/card_dashboard/card_dashboard";
import { Form, Formik } from "formik";
import CardSensorOperator from "../../component/card_sensor/card_sensor_operator";
import { MdOutlineAccessTime } from "react-icons/md";
import { useParams } from 'react-router-dom';
import CardAktuatorOperator from "../../component/card_aktuator/card_aktuator_operator";
import { logout } from "../../features/auth/authSlice";

const DashboardOperator = () => {
  TabTitle("Dashboard - ITERA Hero");
  const base_url = useSelector(selectUrl);
  const [dataApiDashboard, setDataApiDashboard] = useState([]);
  const [dataApiPenjadwalan, setDataApiPenjadwalan] = useState([]);
  const [firstFilter, setFirstFilter] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();

  const [action, setAction] = useState(false);
  const headers = localStorage.getItem("token");

  const id = parseInt(useParams().id);
  const [selected, setSelected] = useState(id);

  const getApiPenjadwalan = async () => {
    axios
      .get(base_url + "api/v1/penjadwalan", {
        headers: {
          Authorization: `Bearer ${headers}`,
        },
      })
      .then((response) => {
        const hari = new Date().getDay()
        console.log("data penjadwalan :", response.data.data);
        setDataApiPenjadwalan(response.data.data.filter((item, index) => item.hari.includes(hari)));
      })
      .catch((err) => {
        if (err.response.data.message === "Token maximum age exceeded") {
          
          console.log("Token abis waktunya")
        }
        console.error(err.response.data.message);
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
      setFilterData([]);
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
          {/* <Image
            width={"20%"}
            height={"auto"}
            src="https://res.cloudinary.com/diyu8lkwy/image/upload/v1663542541/itera%20herro%20icon/Frame_181_fmtxbh.png"
            alignSelf={"center"}
          /> */}
          <Flex alignItems={"center"}  mb={"50px"}>
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
                        // placeholder="--Pilih Filter--"
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
                          values.filter1 ? "--Pilih " + values.filter1 + "--" : "--"
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
                          // axios
                          //   .get(
                          //     base_url +
                          //     "api/v1/" +
                          //     values.filter1 +
                          //     "/" +
                          //     e.target.value +
                          //     "/sensor",
                          //     {
                          //       headers: {
                          //         Authorization: "Bearer " + headers,
                          //       },
                          //     }
                          //   )
                          //   .then((response) => {
                          //     console.log(response.data);
                          //     setData(response.data.data);
                          //   })
                          //   .catch((err) => console.error(err));
                        }}
                      >
                        {filterData.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.nama}{item.name}
                          </option>
                        ))}
                      </Select>
                    </Flex>

                    <Flex border={'3px solid #d9d9d9'} borderRadius={15} px={"10px"} mt={'20px'} minHeight={'350px'}>
                      <Tabs isFitted width={'100%'} colorScheme='black'>
                        <TabList>
                          <Tab color={'black'}>Sensor</Tab>
                          <Tab color={'black'}>Aktuator</Tab>
                        </TabList>
                        <TabPanels css={{
                          overflowY: 'scroll',
                          '&::-webkit-scrollbar': {
                            width: '0.4em',
                          },
                          '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'transparent',
                          },
                        }}  
                        width="100%"
                        height={"425px"}>
                          {/* initially mounted */}
                          <TabPanel>
                            {values.filter2 !== "" ? (
                              <CardSensorOperator
                                data={{ alat: values.filter1, id: values.filter2 }}
                              />
                            ) : null}
                          </TabPanel>
                          {/* initially not mounted */}
                          <TabPanel>
                            {values.filter2 !== "" ? (
                              <CardAktuatorOperator
                                data={{ alat: values.filter1, id: values.filter2 }}
                              />
                            ) : null}
                          </TabPanel>
                        </TabPanels>
                      </Tabs>

                    </Flex>
                  </Form>
                )}
              </Formik>

            </GridItem>


            {/* ================================ jadwal =====================================*/}
            <Flex flexDir={'column'} border={'3px solid #d9d9d9'} borderRadius={15} minH={'100px'} >

              <Flex m={'20px'} justifyContent={'center'}>
                <Text align="center">
                  Penjadwalan Hari Ini
                </Text>
              </Flex>

              <Flex css={{
                overflowY: 'scroll',
                '&::-webkit-scrollbar': {
                  width: '0.4em',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'transparent',
                },
              }}
                flexDirection="column"
                width="100%"
                height={"425px"}>

                {dataApiPenjadwalan.length < 1 && isLoading ? (
                  <Loading />
                ) : dataApiPenjadwalan.length < 1 ? (
                  <Text color={'gray'} mt={'100px'}>Tidak Ada data Penjadwalan</Text>
                ) : (
                  dataApiPenjadwalan.map((item, index) => (
                    // <Box color={'black'} key={index}>{JSON.stringify(item)}</Box>
                    <Flex
                      key={index}
                      borderRadius="10px"
                      border="1px solid #E2E8F0"
                      marginY="8px"
                      marginX="20px"
                      justifyContent="space-around"
                    >
                      {/* <Icon as={MdOutlineMoreTime} color="#14453E" w="50px" h="50px" alignSelf="center" /> */}
                      <Accordion border={'white'} color={'black'} allowToggle w={'100%'}>
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Flex flexDir={'row'} as="span" flex='1' textAlign='left'>
                                <Icon as={MdOutlineAccessTime} color="#14453E" w="35px" h="35px" alignSelf="center" />
                                {/* <Text ml={'10px'} alignSelf={'center'}>{item.waktu} - {item.resep.nama} </Text> */}
                                <Text ml={'10px'} alignSelf={'center'}>{item.waktu} - {item.resep.nama} </Text>
                              </Flex>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4} fontSize={'0.8rem'}>
                            <Flex direction={'column'}>
                              <Flex flexDir={'row'} >
                                <Flex flexDir="row">
                                  <Flex direction={'column'} alignItems={'flex-start'} >
                                    <Text color="black"> Formula </Text>
                                    <Text color="black"> Jam </Text>
                                    <Text color="black" > Durasi Siram</Text>
                                  </Flex>
                                  <Flex direction={'column'}>
                                    <Text color="black"> : </Text>
                                    <Text color="black"> : </Text>
                                    <Text color="black"> : </Text>
                                  </Flex>
                                  <Flex direction={'column'} alignItems={'flex-start'}>
                                    <Text color="black"> {item.resep.nama} </Text>
                                    <Text color="black"> {item.waktu} </Text>
                                    <Text color="black"> {item.durasi} Menit</Text>
                                  </Flex>
                                </Flex>
                              </Flex>
                            </Flex>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                    </Flex>
                  )
                  ))
                }
              </Flex>
            </Flex>
          </Grid>
        </Flex>
      )}
    </>
  );
};

export default DashboardOperator;