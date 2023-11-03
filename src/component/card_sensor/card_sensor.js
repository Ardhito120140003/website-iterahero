import React, { useState, useEffect } from "react";
import { Text, Image, Flex, Wrap, WrapItem, Center } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { paginationMonitoring } from "../../Utility/api_link";
import Loading from "../loading/loading";

import "./card_sensor.css";
import { logout, selectUrl } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

function CardSensor(props) {
  const idApi = props.data.id;
  const base_url = useSelector(selectUrl);
  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const getPagination = async () => {
    setIsLoading(true);

    const header = localStorage.getItem("token");
    await axios
      .get(`${base_url}${paginationMonitoring}${idApi}&&size=100`, {
      // .get(`${base_url}/api/v1/greenhouse/${idApi}/sensor`, {
        headers: {
          Authorization: `Bearer ${header}`,
        },
      })
      .then((response) => {
        setDataTable(response.data.data);
        console.log(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // localStorage.clear();
        // dispatch(logout());
        // navigate("/login");
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
          align="center"
          spacing="30px"
          justify={{ base: "center", lg: "start" }}
          mt="30px"
        >
          {dataTable.map((item, index) => (
            <Link to={`/unit/dashboard/sensor/${item.id}`} key={index}>
              <WrapItem
                w={{ base: "90vw", md: "sm" }}
                className="card-sensor"
                bg="#ffff"
                borderRadius="10px"
                border="1px solid #E2E8F0"
                paddingTop="30px"
                paddingBottom="30px"
              >
                <Center
                  justifyContent="center"
                  flexDir="column"
                  data={{ data: idApi }}
                >
                  <Flex flexDir="row" justify="space-between">
                    <Image size="1px" src={`${item.icon}`} color={item.color} />
                    <Text color={`${item.color}`}>{item.name}</Text>
                  </Flex>
                  {item.id === "" ? (
                    <></>
                  ) : (
                    {
                      /* <ValueSensor
                      data={{
                        id: item.id,
                        color: item.color,
                        category: item.category.name,
                        unit: item.unit_measurement,
                        max: item.range_max,
                        min: item.range_min,
                      }}
                    /> */
                    }
                  )}
                </Center>
              </WrapItem>
            </Link>
          ))}
        </Wrap>
      )}
    </>
  );
}
export default CardSensor;
