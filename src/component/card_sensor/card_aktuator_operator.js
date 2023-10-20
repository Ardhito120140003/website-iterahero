import React, { useState, useEffect } from 'react';
import {
  Text, Image, Flex, Wrap, WrapItem, Center, Button, Switch
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { paginationMonitoring } from '../../Utility/api_link';
import Loading from '../loading/loading';

import './card_sensor.css';
import { selectUrl } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import ValueSensorOperator from '../value_sensor/value_sensor_operator';
import ValueAktuatorOperator from '../value_aktuator/value_aktuator_operator';

function CardAktuatorOperator(props) {
  const idApi = props.data.id;
  const route = props.data.alat;
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
      url = `${base_url}api/v1/${route}/${idApi}/actuator`;
    }
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${header}`,
      },
    })
      .then((response) => {
        // console.log(response.data.data)
        setDataTable(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getPagination();
    setIsLoading(false);
  }, [idApi]);

  const handleswitch = async (id) => {
    console.log({ header, id })
    axios.post(base_url + "api/v1/kontrol", {}, {
      params: {
        id: parseInt(id)
      },
      headers: {
        Authorization: `Bearer ${header}`
      }
    })
    .then(response => {
      console.log(response.data.data)
    })
    .catch(err => {
      console.error(err);
    })
  }

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
                px={'20px'}
                w={'48.5%'}
              >
                <Center
                  justifyContent="center"
                  flexDir="column"
                  data={{ data: idApi }}
                >
                  <Flex flexDir="row" justify="space-between">
                    <Image
                      src={`${item.icon}`}
                      color={item.color}
                    />
                    {/* <Text color={`${item.color}`}>{item.name}</Text> */}
                    <Text color={'black'}>{item.name}</Text>
                  </Flex>
                  {item.id === '' ? (
                    <></>
                  ) : (
                    <ValueAktuatorOperator
                      data={{
                        id: item.id,
                        color: item.color,
                        category: item.name,
                        unit: item.unit_measurement,
                        max: item.range_max,
                        min: item.range_min,
                        isAvailable: item.status
                      }}
                    />
                  )}

                <Switch mt={'20px'} onChange={() => handleswitch(item.id)}/>

                </Center>
              </WrapItem>
            // </Link>
          ))}
        </Wrap>
      )}
    </>
  );
}
export default CardAktuatorOperator;
