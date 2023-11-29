import React, { useEffect, useState } from 'react';
import './monitoring.css';
import {
  Text, Flex, Image, Wrap,
} from '@chakra-ui/react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { routePageName, selectUrl } from '../../features/auth/authSlice';
import { TabTitle } from '../../Utility/utility';
import Loading from '../../component/loading/loading';
import axios from 'axios';

function MonitoringDetail() {
  const base_url = useSelector(selectUrl);
  TabTitle('Monitoring - ITERA Hero');
  const navigate = useNavigate();
  const header = localStorage.getItem('token');
  const { id } = useParams();
  const dispatch = useDispatch();
  const [sensor, setSensor] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const getSensorDetail = async () => {
    axios.get(base_url + "api/v1/sensor", {
      params: {
        id
      },
      headers: {
        Authorization: `Bearer ${header}`
      }
    })
    .then(({ data }) => {
      console.log(data)
      setSensor(data.data)
    })
    .catch(({ response }) => console.error(response))
    .finally(() => setIsLoading(false))
  };

  useEffect(() => {
    dispatch(routePageName('Monitoring Detail'));
    getSensorDetail()
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Flex gap="30px" width="100%" flexDir="column">
          <Flex
            bg="white"
            borderRadius="10px"
            p="10px"
            alignItems="center"
            justifyContent="start"
          >
            <Flex alignItems="center">
              <Link to="/unit/monitoring">
                <Text
                  fontSize={{ base: '15px', md: '20px' }}
                  fontWeight="bold"
                  mr="10px"
                >
                  Monitoring
                </Text>
              </Link>
            </Flex>
            <Flex alignItems="center">
              <Text
                fontSize={{ base: '15px', md: '20px' }}
                fontWeight="bold"
                mr="10px"
              >
                {'>'}
              </Text>
            </Flex>
            <Text fontSize={{ base: '15px', md: '20px' }} fontWeight="bold">
              {`Detail Sensor ${sensor.name}`}
            </Text>
          </Flex>
          <Flex
            direction="column"
            justifyContent="start"
            alignItems="start"
          >
            <Text
              fontSize={{ base: '15px', md: '20px' }}
              fontWeight="bold"
              width={{ base: '100%', lg: '80px' }}
            >
              Detail
            </Text>
            <Flex
              mt="20px"
              direction={{ base: 'column', lg: 'row-reverse' }}
              justifyContent="center"
              alignItems="start"
            >
              <Wrap width={{ base: '100%', lg: '30%' }}>
                <Flex
                  width="100%"
                  direction="column"
                  justifyContent={{ base: 'center', lg: 'start' }}
                  alignItems={{ base: 'center', lg: 'start' }}
                >
                  <Text>Gambar Sensor</Text>
                  <Image
                    width="100%"
                    maxWidth="600px"
                    marginLeft="10px"
                    src={sensor.sensor_image}
                  />
                </Flex>
                <Flex
                  direction="column"
                  justifyContent={{ base: 'center', lg: 'start' }}
                  alignItems={{ base: 'center', lg: 'start' }}
                  width="100%"
                >
                  <Text>Posisi Sensor</Text>
                  <Image
                    maxWidth="600px"
                    width="100%"
                    src={sensor.posisition}
                    marginLeft="10px"
                  />
                </Flex>
              </Wrap>
              <Flex
                width={{ base: '100%', lg: '70%' }}
                direction="column"
                mt={{ base: '20px', lg: '0px' }}
                justifyContent="start"
                alignItems="start"
              >
                <Text>
                  Nama : {sensor.name}
                </Text>
                <Text>
                  Brand : {sensor.brand}
                </Text>
                <Text>
                  Range Max : {sensor.range_max}
                </Text>
                <Text>
                  Range Max : {sensor.range_min}
                </Text>
                <Text>
                  Unit Measurement : {sensor.unit_measurement}
                </Text>
                <Text>
                  Deskripsi : {sensor.detail}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
}
export default MonitoringDetail;
