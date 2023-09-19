import React, { useState, useEffect } from "react";
import { Text, Image, Flex, Wrap, WrapItem, Center } from "@chakra-ui/react";
import axios from "axios";
import { paginationAktuator } from "../..//Utility/api_link";
import Loading from "../../component/loading/loading";
import { useNavigate } from "react-router-dom";
import "./card_aktuator.css";
import ValueAktuator from "../value_aktuator/value_aktuator";

const CardAktuator = (props) => {
  const idApi = props.data.id;
  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getPagination = async () => {
    setIsLoading(true);

    const header = localStorage.getItem("token");
    await axios
      .get(`${paginationAktuator}${idApi}&&size=100`, {
        headers: {
          Authorization: "Bearer " + header,
        },
      })
      .then((response) => {
        setDataTable(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        localStorage.clear();
        navigate("/login");
      });
  };

  useEffect(() => {
    getPagination();
    setIsLoading(true);
  }, [idApi]);
  return (
    <>
      {dataTable == null || isLoading ? (
        <Loading />
      ) : (
        <Flex>
          <Flex align={"center"} justify={"center"} mt={"20px"}>
            <Wrap className="center-ul" align={"center"} spacing={"30px"}>
              {dataTable.map((item, index) => (
                <WrapItem
                  className="hiya"
                  key={index}
                  w={{ base: "90vw", md: "sm" }}
                  h={"100%"}
                  minH={"450px"}
                  bg={"#ffff"}
                  borderRadius={"10px"}
                  border={"1px solid #E2E8F0"}
                  paddingTop={"30px"}
                  paddingBottom={"30px"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDir={"row"}
                >
                  <Center data={{ data: idApi }} flexDir={"column"}>
                    <Flex
                      flexDir={"row"}
                      justify={"space-between"}
                      alignItems={"center"}
                    >
                      <Image
                        w={"24px"}
                        h={"24px"}
                        src={`${item.icon}`}
                        color={item.color}
                      />
                      <Text color={`${item.color}`}>{item.name}</Text>
                    </Flex>
                    <Flex
                      flexDir={"column"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <ValueAktuator
                        data={{
                          id: item.id,
                          life_cycle: item.status_lifecycle,
                          automation: item.automation,
                        }}
                      />
                    </Flex>
                  </Center>
                </WrapItem>
              ))}
            </Wrap>
          </Flex>
        </Flex>
      )}
    </>
  );
};
export default CardAktuator;
