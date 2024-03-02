import React, { useState, useEffect } from 'react';
import {
  Text, Image, Flex, Wrap, WrapItem, Center, Switch, Spinner
} from '@chakra-ui/react';
import axios from 'axios';
// import { paginationMonitoring } from '../../Utility/api_link';
import Loading from '../loading/loading';

import './card_aktuator.css';
import { selectUrl, selectUser } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { selectToken } from '../../features/auth/authSlice';
import ValueAktuatorOperator from '../value_aktuator/value_aktuator_operator';

function CardAktuatorOperator(props) {
  const idApi = props.data.id;
  const route = props.data.alat;
  const base_url = useSelector(selectUrl);
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const header = useSelector(selectToken)
  const [cursor, setCursor] = useState(null)
  const [totalPage, setTotalPage] = useState(0)
  const [page, setPage] = useState(1)
  const [kontrol, setKontrol] = useState(false)
  const [sliderClick, setSliderClick] = useState(0)

  const getPagination = async () => {
    let url = `${base_url}api/v1/${route}/${idApi}/actuator`;
    await axios.get(url, {
      params: {
        cursor: page === 1 ? null : cursor,
        // size: 50
      },
      headers: {
        Authorization: `Bearer ${header}`,
      },
    })
      .then((response) => {
        setCursor(response.data.cursor)
        setTotalPage(response.data.totalPage);
        setDataTable(response.data.data);
      })
      .catch((error) => {
        // console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getPagination();

    const interval = setInterval(() => {
      getPagination()
    }, 1000)

    return (() => clearInterval(interval))
  }, [kontrol, idApi, route]);

  const handleswitch = async (id) => {
    setSliderClick(id)
    axios.post(base_url + "api/v1/kontrol", {}, {
      params: {
        id: parseInt(id)
      },
      headers: {
        Authorization: `Bearer ${header}`
      }
    })
      .then(response => {
        // console.log(response.data.message)
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setKontrol(!kontrol)
        setTimeout(() => {
          setSliderClick(0)
        }, 500);
      })
  }

  return (<>
    {dataTable.length < 1 && isLoading ? (
      <Loading />
    ) : (
      <Wrap
        justify={dataTable.length % 2 === 0 && dataTable.length !== 0 ? 'center' : 'left'}
        my="15px"
        h={"100%"}
        overflowY={"scroll"}
        className='dashboard-data'
        display={dataTable.length > 1 ? "flex" : "block"}
        justifyContent={"center"}
      >
        {dataTable.length < 1 ? (
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Text>Tidak ada aktuator</Text>
          </Flex>
        ) : (
          dataTable.map((item, index) => (
            <WrapItem
              key={index}
              bg="#ffff"
              borderRadius="10px"
              border="1px solid #E2E8F0"
              paddingTop="20px"
              paddingBottom="20px"
              px={'20px'}
              w={{ base: '100%', sm: '100%', md: "100%", lg: "48%", xl: '48.5%', "2xl": "48.5%" }}
            >
              <Center
                justifyContent="center"
                flexDir="column"
                data={{ data: idApi }}
              >
                <Flex flexDir="row" justifyContent={"space-around"} alignItems={"center"}>
                  <Image
                    src={`${item.category.logo}`}
                    color={item.category.color}
                    w={"30px"}
                    objectFit={"contain"}
                  />
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
                      isAvailable: item.microcontroller.status,
                      automation: item.AutomationSchedule || item.AutomationSensor,
                      isActive: item.isActive,
                      route
                    }}
                  />
                )}
                {sliderClick === item.id ? (
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='lg'
                  />
                ) : (
                  <Switch
                    colorScheme="green"
                    size="lg"
                    onChange={async () => {
                      await handleswitch(item.id)
                    }} isChecked={item.isActive}
                    // disabled={!item.microcontroller.status}
                  />
                )}

              </Center>
            </WrapItem>
          ))
        )}
      </Wrap>
    )}
  </>
  );
}
export default CardAktuatorOperator;
