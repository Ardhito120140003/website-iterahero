import React, { useState, useEffect } from 'react';
import {
  Text, Image, Flex, Wrap, WrapItem, Center
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { paginationMonitoring } from '../../Utility/api_link';
import Loading from '../loading/loading';

import './card_sensor.css';
import { selectUrl } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import ValueSensorOperator from '../value_sensor/value_sensor_operator';

function CardSensorOperator(props) {
  const idApi = props.data.id;
  const route = props.data.alat;
  const base_url = useSelector(selectUrl);
  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const header = localStorage.getItem('token');
  const [sensorValue, setSensorValue] = useState([]);
  const [trigger, setTrigger] = useState(true)

  const getPagination = async () => {
    // let url = `${base_url}${paginationMonitoring}${idApi}&&size=100`;
    // if (route) {
    let url = `${base_url}api/v1/${route}/${idApi}/sensor`;
    // }
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${header}`,
      },
    })
      .then((response) => {
        console.log(response.data.data)
        setDataTable(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false))
  };

  const fetchSensor = (id) => {
    const data = id.map((item) => (Math.random() * 14).toString().slice(0, 4))
    setSensorValue(data)
  }

  useEffect(() => {
    getPagination();
    fetchSensor(dataTable.map((item, index) => item["id_sensor"]))
    setTimeout(() => setTrigger(!trigger), 2500)
  }, [trigger]);

  return (
    <>
      {isLoading ? (
        <Flex alignItems={"center"}>
          <Loading />
        </Flex>
      ) : (
        <Wrap
          justify={'start'}
          mt="20px"
        >
          {dataTable.map((item, index) => (
            // <Link to={`/unit/dashboard/sensor/${item.id}`}>
            <WrapItem
              key={index}
              // className="card-sensor"
              bg="#ffff"
              borderRadius="10px"
              border="1px solid #E2E8F0"
              paddingTop="20px"
              paddingBottom="20px"
              px={'15px'}
              // w={'48.5%'}
              w={{ sm: '100%', md: "100%", lg: "48%", xl: '48.5%', "2xl": "48.5%" }}

            >
              <Center
                justifyContent="center"
                flexDir="column"
                data={{ data: idApi }}
              >
                <Flex flexDir="row" justify="space-between">
                  <Image
                    w={'20px'}
                    src={`${item.icon}`}
                    color={item.color}
                  />
                  <Text color={`${item.color}`}>{item.name}</Text>
                </Flex>

                <Flex my={"20px"} justifyContent={'space-around'} alignItems={"center"}>
                  <Text fontSize={'3xl'} color={sensorValue[index] ? 'black' : 'red'} textAlign={"right"}>
                    {sensorValue[index] ?? '?'}
                  </Text>
                  <Text fontSize={'3xl'} textAlign={"left"}>
                    {item.unit_measurement}
                  </Text>
                </Flex>

                {item.id === '' ? (
                  <></>
                ) : (
                  <ValueSensorOperator
                    data={{
                      id: item.id,
                      color: item.color,
                      category: item.name,
                      unit: item.unit_measurement,
                      max: item.range_max,
                      min: item.range_min,
                    }}
                  />
                )}
              </Center>
            </WrapItem>
            // </Link>
          ))}
        </Wrap>
      )}
    </>
  );
}
export default CardSensorOperator;
