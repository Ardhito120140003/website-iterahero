import React, { useState, useEffect } from "react";
import { Text, Image, Flex, Wrap, WrapItem, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { paginationMonitoring } from "../..//Utility/api_link";
import Loading from "../../component/loading/loading";
import { useNavigate } from "react-router-dom";
import "./card_sensor.css";
import ValueSensor from "../value_sensor/value_sensor";

const CardSensor = (props) => {
  const idApi = props.data.id;
  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getPagination = async () => {
    setIsLoading(true);

    const header = localStorage.getItem("token");
    await axios
      .get(`${paginationMonitoring}${idApi}&&size=100`, {
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
        <Wrap
          className="center-ul"
          align={"center"}
          spacing={"30px"}
          justify={{ base: "center", lg: "start" }}
          mt={"30px"}
        >
          {dataTable.map((item, index) => (
            <Link to={`/unit/dashboard/sensor/${item.id}`}>
              <WrapItem
                key={index}
                w={{ base: "90vw", md: "sm" }}
                className="card-sensor"
                bg={"#ffff"}
                borderRadius={"10px"}
                border={"1px solid #E2E8F0"}
                paddingTop={"30px"}
                paddingBottom={"30px"}
              >
                <Center
                  justifyContent={"center"}
                  flexDir={"column"}
                  data={{ data: idApi }}
                >
                  <Flex flexDir={"row"} justify={"space-between"}>
                    <Image
                      size={"1px"}
                      src={`${item.icon}`}
                      color={item.color}
                    />
                    <Text color={`${item.color}`}>{item.name}</Text>
                  </Flex>
                  {item.id === "" ? (
                    <></>
                  ) : (
                    <ValueSensor
                      data={{
                        id: item.id,
                        color: item.color,
                        category: item.category.name,
                        unit: item.unit_measurement,
                        max: item.range_max,
                        min: item.range_min,
                      }}
                    />
                  )}
                </Center>
              </WrapItem>
            </Link>
          ))}
        </Wrap>
      )}
    </>
  );
};
export default CardSensor;
