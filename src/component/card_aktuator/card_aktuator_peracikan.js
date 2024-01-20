import React, { useState, useEffect } from 'react';
import {
  Text, Image, Flex, Wrap, WrapItem, Switch
} from '@chakra-ui/react';
import axios from 'axios';
import Loading from '../loading/loading';

import './card_aktuator.css';
import { selectUrl, selectUser } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { selectToken } from '../../features/auth/authSlice';
import ValueAktuatorOperator from '../value_aktuator/value_aktuator_operator';
import Timer from '../timer/Timer';
import { Spinner } from '@chakra-ui/react';

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
        setKontrol(!kontrol)
        // console.log(response.data.message)
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        // setTimeout(() => {
          setSliderClick(0)
        // }, 500);
      })
  }

  return (<>
    {dataTable.length < 1 && isLoading ? (
      <Loading />
    ) : (
      <Wrap
        justify={dataTable.length % 2 === 1 ? 'left' : 'center'}
        mt="20px"
        w={"100%"}
      >
        {dataTable.length < 1 ? (
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Text>Tidak ada aktuator pendistribusian</Text>
          </Flex>
        ) : (
          dataTable.filter(item => item.name.toLowerCase().includes('distribusi')).map((item, index) => (
            <WrapItem
              key={index}
              bg="#ffff"
              borderRadius="10px"
              border="1px solid #E2E8F0"
              paddingTop="20px"
              paddingBottom="20px"
              px={'20px'}
              w={{ base: '100%', sm: '100%', md: "100%", lg: "100%", xl: '100%', "2xl": "100%" }}
              cursor={'default'}
              flexDirection={"column"}
            >
              <Flex
                align={"center"}
                justifyContent={"space-between"}
                flexDir="row"
                data={{ data: idApi }}
                px={"20px"}
                w={'100%'}
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
                {sliderClick === item.id ? (
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='md'
                  />
                ) : (
                  <Switch
                    onChange={async () => {
                      await handleswitch(item.id)
                    }} isChecked={item.isActive} />
                )}

              </Flex>
              <Flex
                px={"20px"}
                w={'100%'}
                textColor={"gray"}
              >
                {item.isActive && <Timer aktuator={item} />}
              </Flex>
            </WrapItem>
          ))
        )}
      </Wrap>
    )}
  </>
  );
}
export default CardAktuatorOperator;
