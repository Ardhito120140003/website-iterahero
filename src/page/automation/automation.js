import React, { useState, useEffect } from "react";
import { Text, Button, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../component/loading/loading";
import { TabTitle } from "../../Utility/utility";
import { useNavigate } from "react-router";
import { getActuatorDetail } from "../../Utility/api_link";
import dashboardControlMenu from "../../Utility/dashboard_control_menu";
import CardLogActuator from "../../component/card_log_actuator/card_log_act";
import CardAutomation from "../../component/card Automation/card_automation";
import AutomationList from "./automation_list";
import { useDispatch } from "react-redux";
import { routePageName } from "../../redux/action";

const Automation = () => {
  TabTitle("Detail Actuator - ITERA Hero");
  const [data, setData] = useState("");
  const [dataApi, setDataApi] = useState(null);
  const [selected, setSelected] = useState(1);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const getActuator = async () => {
    setIsLoading(true);
    const header = localStorage.getItem("token");
    await axios
      .get(`${getActuatorDetail}${id}`, {
        headers: {
          Authorization: "Bearer " + header,
        },
      })
      .then((response) => {
        setDataApi(response.data.data.name);
        setIsLoading(false);
      })
      .catch((error) => {
        localStorage.clear();
        navigate("/login");
      });
  };
  const dispatch = useDispatch();

  useEffect(() => {
    getActuator();
    dispatch(routePageName(`Automation`));
  }, [id, data]);

  return (
    <>
      {dataApi == null ? (
        <Loading />
      ) : (
        <>
          <Flex
            bg="white"
            borderRadius="10px"
            p="10px"
            alignItems={"center"}
            justifyContent={"start"}
          >
            <Flex alignItems={"center"}>
              <Link to="/unit/dashboard/2">
                <Text
                  fontSize={{ base: "15px", md: "20px" }}
                  fontWeight="bold"
                  mr="10px"
                >
                  Dashboard
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
              {"Aktuator " + dataApi}
            </Text>
          </Flex>
          <Flex>
            <Flex width={"100%"}>
              <Wrap>
                {dashboardControlMenu.map((item, index) => {
                  return (
                    <WrapItem key={index} width={"169px"} height={"44px"}>
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
                    </WrapItem>
                  );
                })}
              </Wrap>
            </Flex>
          </Flex>
          <Flex w={["100%"]} h={["100%"]}>
            <Wrap
              justify={"center"}
              mt={"30px"}
              w={["100%"]}
              h={["fit-content"]}
            >
              {selected === 1 ? (
                <AutomationList data={{ id: id }} />
              ) : (
                <CardLogActuator data={{ id: id }} />
              )}
            </Wrap>
          </Flex>
        </>
      )}
    </>
  );
};
export default Automation;
