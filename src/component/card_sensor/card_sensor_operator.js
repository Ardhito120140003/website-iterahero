import React, { useState, useEffect } from 'react';
import {
  Text, Image, Flex, Wrap, WrapItem, Center, CircularProgress, CircularProgressLabel
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { paginationMonitoring } from '../../Utility/api_link';
import Loading from '../loading/loading';

import './card_sensor.css';
import { selectUrl } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import ValueSensorOperator from '../value_sensor/value_sensor_operator';

function CardSensorOperator(props) {
  const idApi = props.data.id;
  const route = props.data.alat;
  const { filter } = props.data;
  const base_url = useSelector(selectUrl);
  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const header = localStorage.getItem('token');

  const getPagination = async () => {
    setIsLoading(true);
    let url = `${base_url}${paginationMonitoring}${idApi}&&size=100`;
    if (route) {
      url = `${base_url}api/v1/${route}/${idApi}/sensor`;
    }
    console.log(url)
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${header}`,
      },
    })
      .then((response) => {
        console.log(response.data)
        setDataTable(response.data.data[0]?.[filter]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
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
          justify={{ base: 'center', lg: 'start' }}
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

                  <Text my={"40px"} fontSize={'3xl'}>
                    0
                  </Text>

                  {/* <CircularProgress size={'80px'} m={"5px"}>
                    <CircularProgressLabel>
                      0
                    </CircularProgressLabel>
                  </CircularProgress> */}
                
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
