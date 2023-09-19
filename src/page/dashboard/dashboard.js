import React, { useState, useEffect } from "react";
import {
  Flex,
  Image,
  Text,
  Select,
  Wrap,
  Button,
  Menu,
  Box,
} from "@chakra-ui/react";
import CardDashboard from "../../component/card_dashboard/card_dashboard";
import { GiGreenhouse } from "react-icons/gi";
import { MdMonitor } from "react-icons/md";
import { AiOutlineControl } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { routePageName } from "../../redux/action";
import { TabTitle } from "../../Utility/utility";
import axios from "axios";
import Loading from "../../component/loading/loading";
import { dashboardApi, greenhouseByUserId } from "../../Utility/api_link";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import dashboardMenu from "../../Utility/dashboard_menu";
import CardSensor from "../../component/card_sensor/card_sensor";
import CardAktuator from "../../component/card_aktuator/card_aktuator";
const Dashboard = () => {
  let id = parseInt(useParams().id);
  TabTitle("Dashboard - ITERA Hero");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState("");

  const [dataApi, setDataApi] = useState(null);
  const [selected, setSelected] = useState(id);
  const [dataGreenhouse, setDataGreenhouse] = useState(null);
  const [dataSensor, setDataSensor] = useState(null);

  const getApiDashboard = async () => {
    const header = localStorage.getItem("token");
    await axios
      .get(dashboardApi, {
        headers: {
          Authorization: "Bearer " + header,
        },
      })
      .then((response) => setDataApi(response.data.data))
      .catch((error) => {
        localStorage.clear();
        navigate("/login");
      });
  };
  const getApiGreenhouse = async () => {
    const header = localStorage.getItem("token");
    await axios
      .get(greenhouseByUserId, {
        headers: {
          Authorization: "Bearer " + header,
        },
      })
      .then((response) => {
        if (response.data.data.length > 0) {
          console.log(response.data.data);
          setDataGreenhouse(response.data.data);
          setData(response.data.data[0].id);
        } else {
          setDataGreenhouse(response.data.data);
        }
      })
      .catch((error) => {
        localStorage.clear();
        navigate("/login");
      });
  };

  useEffect(() => {
    dispatch(routePageName("Dashboard"));
    getApiGreenhouse();
    getApiDashboard();
  }, []);

  return (
    <>
      {dataApi == null || dataGreenhouse == null ? (
        <Loading />
      ) : (
        <Flex w="100%" flexDir={"column"}>
          <Flex
            w="100%"
            flexDir={"row"}
            alignContent={"center"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Image
              width={"20%"}
              height={"auto"}
              src="https://res.cloudinary.com/diyu8lkwy/image/upload/v1663542541/itera%20herro%20icon/Frame_181_fmtxbh.png"
            />
          </Flex>
          <Flex justify="center" mt={"-30px"}>
            <Wrap spacing={{ base: "5px", md: "50px" }} justify="center">
              <CardDashboard
                data={{
                  value: dataApi.greenhouse,
                  icon: GiGreenhouse,
                  name: "Jumlah GreenHouse",
                }}
              />
              <CardDashboard
                data={{
                  value: dataApi.sensor,
                  icon: MdMonitor,
                  name: "Jumlah Sensor",
                }}
              />
              <CardDashboard
                data={{
                  value: dataApi.actuator,
                  icon: AiOutlineControl,
                  name: "Jumlah Actuator",
                }}
              />
            </Wrap>
          </Flex>
          <Flex justifyContent={"flex-start"} width="100%"></Flex>
          <Wrap mt={"30px"} flexDir={"row"}>
            {dashboardMenu.map((item, index) => {
              return (
                <Flex key={index} mr={"3"} width={"169px"} height={"44px"}>
                  <Button
                    onClick={() => setSelected(item.id)}
                    w="100%"
                    height={"100%"}
                    borderRadius={"16"}
                    border={
                      selected == item.id
                        ? null
                        : "1px solid var(--color-primer)"
                    }
                    bg={
                      selected == item.id
                        ? "var(--color-primer)"
                        : "var(--color-on-primary)"
                    }
                    flexDir={"row"}
                    alignContent={"center"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Text
                      fontWeight={"semibold"}
                      color={
                        selected == item.id
                          ? "var(--color-surface)"
                          : "var(--color-on-background"
                      }
                      size={"var(--header-3)"}
                    >
                      {item.name}
                    </Text>
                  </Button>
                </Flex>
              );
            })}
          </Wrap>
          <Flex
            mt={"30px"}
            alignContent={"center"}
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <Flex width={"30%"}>
              <Formik
                initialValues={{
                  greenhouse: data,
                }}
                onSubmit={(values) => {
                  setData(values.greenhouse);
                }}
              >
                {({
                  values,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Flex
                      alignContent={"center"}
                      alignItems={"center"}
                      justify={"space-between"}
                    >
                      <Flex height={"auto"} width={"100%"}>
                        <Select
                          onChange={(e) => {
                            setFieldValue("id", e.target.value);
                            setData(e.target.value);
                          }}
                          size="xs"
                          borderRadius={"10"}
                          name="greenhouse"
                          value={values.id}
                          placeholder="Pilih Greenhouse"
                          width={"100%"}
                          bg={"white"}
                          _active={{ bg: "white" }}
                          borderColor={"var(--color-border)"}
                          fontSize={"var(--header-5)"}
                          fontWeight={"normal"}
                          color={"var(--color-primer)"}
                          _hover={{ borderColor: "var(--color-border)" }}
                          _focusWithin={{ borderColor: "var(--color-border)" }}
                        >
                          {dataGreenhouse.map((item, index) => {
                            return item.id == dataGreenhouse[0].id ? (
                              <option
                                color={"var(--color-border)"}
                                key={index}
                                value={item.id}
                                selected
                              >
                                {item.name}
                              </option>
                            ) : (
                              <option
                                color={"var(--color-border)"}
                                key={index}
                                value={item.id}
                              >
                                {item.name}
                              </option>
                            );
                          })}
                        </Select>
                      </Flex>
                    </Flex>
                  </form>
                )}
              </Formik>
            </Flex>
          </Flex>
          <Wrap>
            {selected === 1 && data !== "" ? (
              <CardSensor data={{ id: data }} />
            ) : (
              <></>
            )}
            {selected === 2 && data !== "" ? (
              <CardAktuator data={{ id: data }} />
            ) : (
              <></>
            )}
          </Wrap>
        </Flex>
      )}
    </>
  );
};
export default Dashboard;
