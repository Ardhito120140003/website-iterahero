import React, { useState, useEffect } from 'react';
import {
  Text, Image, Flex, Wrap, WrapItem, Center, Box
} from '@chakra-ui/react';
import axios from 'axios';
// import { paginationMonitoring } from '../../Utility/api_link';
import Loading from '../loading/loading';

import './card_sensor.css';
import { selectUrl } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';


// import ValueSensorOperator from '../value_sensor/value_sensor_operator';
import Pagination from '../pagination/Pagination';

function CardSensorOperator(props) {
  const idApi = props.data.id;
  const route = props.data.alat;
  const base_url = useSelector(selectUrl);
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const header = localStorage.getItem('token');
  const [sensorRealtime, setSensorRealtime] = useState([])
  const [trigger, setTrigger] = useState(true)
  const [cursor, setCursor] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [updateTime, setUpdateTime] = useState(0)

  const getPagination = async () => {
    // let url = `${base_url}${paginationMonitoring}${idApi}&&size=100`;
    let url = `${base_url}api/v1/${route}/${idApi}/sensor`;
    axios.get(url, {
      params: {
        cursor: page === 1 ? null : cursor,
        // size: 50
      },
      headers: {
        Authorization: `Bearer ${header}`,
      },
    })
      .then((response) => {
        setCursor(response.data.cursor);
        setDataTable(response.data.data);
        setTotalPage(response.data.totalPage);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false))
  };

  // Fetch sensor
  useEffect(() => {
    getPagination()
  }, [page]);

  // Bacaan sensor
  useEffect(() => {
    const params = {
      [`id_${route === 'tandonUtama' ? 'tandon' : 'greenhouse'}`]: idApi
    }
    axios.get(`${base_url}api/v1/logging`, {
      params,
      headers: {
        Authorization: `Bearer ${header}`
      }
    })
    .then((response) => {
      setSensorRealtime(response.data.data)
      setUpdateTime(Date.now())
    })
    .catch(err => console.error(err))
    .finally(() => setTimeout(() => setTrigger(!trigger), 2000))
  }, [trigger])

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
          {dataTable.map((item, index) => {
            const matchedData = sensorRealtime.find(obj => obj.channel === item.channel || obj.gpio === item.GPIO);
            const sensorValue = matchedData ? matchedData.nilai : null
            return (
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
              w={{ base:'100%', sm: '100%', md: "100%", lg: "48%", xl: '48.5%', "2xl": "48.5%" }}

            >
              <Center
                justifyContent="center"
                flexDir="column"
                data={{ data: idApi }}
              >
                <Flex flexDir="row" justify="space-between">
                  <Image
                    w={'20px'}
                    src={`${item.icon.logo}`}
                    color={item.color}
                  />
                  <Text color={`${item.color}`}>{item.name}</Text>
                </Flex>

                <Flex my={"20px"} justifyContent={'space-around'} alignItems={"center"}>
                  <Text fontSize={'3xl'} color={sensorValue ? 'black' : 'red'} textAlign={"right"}>
                    {sensorValue ?? '?'}
                  </Text>
                  <Text fontSize={'3xl'} textAlign={"left"}>
                    {item.unit_measurement}
                  </Text>
                </Flex>
                <Flex flexDir="column" justifyContent="flex-start" mx={'40px'}>
                  <Text fontSize="var(--caption)">Diperbarui : </Text>
                  <Text fontSize="var(--caption)">
                    {moment(updateTime).format('MMMM Do YYYY, h:mm:ss a')}
                  </Text>
                </Flex>
              </Center>
            </WrapItem>
            // </Link>
            )
          })}
        </Wrap>
      )}
      {totalPage > 1 &&
        <Box position={"sticky"}>
          <Pagination currentPage={page} setPage={(halaman) => setPage(halaman)} totalPage={totalPage} />
        </Box>
      }
    </>
  );
}
export default CardSensorOperator;
