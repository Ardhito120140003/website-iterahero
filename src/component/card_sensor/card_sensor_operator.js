import React, { useState, useEffect } from 'react';
import {
  Text, Image, Flex, Wrap, WrapItem, Center, Box, Link as ChakraLink
} from '@chakra-ui/react';
import axios from 'axios';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import Loading from '../loading/loading';

import './card_sensor.css';
import { selectUrl, selectUser } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { selectToken } from '../../features/auth/authSlice';
import moment from 'moment/moment';


// import ValueSensorOperator from '../value_sensor/value_sensor_operator';
import Pagination from '../pagination/Pagination';

function CardSensorOperator(props) {
  const idApi = props.data.id;
  const route = props.data.alat;
  const base_url = useSelector(selectUrl);
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const header = useSelector(selectToken)
  const [sensorRealtime, setSensorRealtime] = useState([])
  const [trigger, setTrigger] = useState(true)
  const [cursor, setCursor] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const role = useSelector(selectUser)
  const navigate = useNavigate();

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
      .then(({ data }) => {
        setCursor(data.cursor);
        setDataTable(data.data);
        setTotalPage(data.totalPage);
        // console.log(data)
      })
      .catch((error) => {
        // console.log(error);
      })
      .finally(() => setIsLoading(false))
  };

  // Fetch sensor
  useEffect(() => {
    getPagination()
  }, [page, idApi, route]);

  // Bacaan sensor
  useEffect(() => {
    const params = {
      [`id_${route === 'tandonUtama' ? 'tandon' : 'greenhouse'}`]: idApi
    }
    const fetchData = () => {
      axios.get(`${base_url}api/v1/logging/sensor`, {
        params,
        headers: {
          Authorization: `Bearer ${header}`
        }
      })
        .then((response) => {
          console.log(response)
          setSensorRealtime(response.data.data)
        })
        .catch(err => console.error(err))
    }
    const interval = setInterval(() => {
      getPagination()
      fetchData()
    }, 1500)

    return (() => clearInterval(interval))
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Wrap
          justify={dataTable.length % 2 === 0 && dataTable.length !== 0 ? 'center' : 'left'}
          my="15px"
          h={"100%"}
          overflowY={"scroll"}
          className='dashboard-data'
          display={dataTable.length ? "block" : "inherit"}
          justifyContent={"center"}
        >
          {dataTable.length < 1 ? (
            <Flex alignItems={"Center"} justifyContent={"center"}>
              <Text align={"center"}>Tidak ada sensor</Text>
            </Flex>
          ) : (
            dataTable.map((item, index) => {
              const matchedData = sensorRealtime.find(obj => obj.channel === item.channel || obj.gpio === item.GPIO);
              const sensorValue = matchedData ? matchedData.nilai : null
              const updatedAt = matchedData ? matchedData.updatedAt : null
              return (
                <WrapItem onClick={(() => {
                  if (role === 'admin') {
                    navigate(`/unit/dashboard/sensor/${item.id}`)
                  }
                })}
                  bg="#ffff"
                  borderRadius="10px"
                  border="1px solid #E2E8F0"
                  paddingTop="20px"
                  paddingBottom="20px"
                  px={'20px'}
                  cursor={role === 'admin' ? 'pointer' : 'default'}
                  key={index}
                  w={{ base: '100%', sm: '100%', md: "100%", lg: "48.5%" }}>
                  <Center
                    justifyContent="center"
                    flexDir="column"
                    data={{ data: idApi }}
                  >
                    <Flex flexDir="row" justify="space-between">
                      <Image
                        w={'20px'}
                        src={`${item.category.logo}`}
                        color={item.color}
                      />
                      <Text color={`${item.color}`}>{item.name}</Text>
                    </Flex>

                    <Flex my={"20px"} alignItems={"center"}>
                      <Text fontSize={'3xl'} color={sensorValue ? 'black' : 'red'} >
                        {sensorValue ?? '?'}
                      </Text>
                      <Text fontSize={'3xl'}>
                        {item.unit_measurement}
                      </Text>
                    </Flex>
                    <Flex><Text fontSize={12} color={item.status ? 'var(--color-secondary-variant)' : 'var(--color-error)'}>Status: {item.status ? 'Online' : 'Offline'}</Text></Flex>
                    <Flex flexDir="column" justifyContent="flex-start" mx={'40px'}>
                      <Text fontSize="var(--caption)">Diperbarui : </Text>
                      <Text fontSize="var(--caption)">
                        {moment(updatedAt).format('D MMMM YYYY, h:mm a')}
                      </Text>
                    </Flex>
                  </Center>
                </WrapItem>
              )
            })
          )}
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
