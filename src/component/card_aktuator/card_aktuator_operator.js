import React, { useState, useEffect } from 'react';
import {
  Text, Image, Flex, Wrap, WrapItem, Center, Switch
} from '@chakra-ui/react';
import axios from 'axios';
// import { paginationMonitoring } from '../../Utility/api_link';
import Loading from '../loading/loading';

import './card_aktuator.css';
import { selectUrl, selectUser } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';

import ValueAktuatorOperator from '../value_aktuator/value_aktuator_operator';

function CardAktuatorOperator(props) {
  const idApi = props.data.id;
  const route = props.data.alat;
  const base_url = useSelector(selectUrl);
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const header = localStorage.getItem('token');
  const [cursor, setCursor] = useState(null)
  const [totalPage, setTotalPage] = useState(0)
  const [page, setPage] = useState(1)
  const [kontrol, setKontrol] = useState(false)
  const [trigger, setTrigger] = useState(false)
  
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
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    getPagination();
    setTimeout(() => setTrigger(!trigger), 3000)
  }, [trigger, kontrol, idApi, route]);

  const handleswitch = async (id) => {
    axios.post(base_url + "api/v1/kontrol", {}, {
      params: {
        id: parseInt(id)
      },
      headers: {
        Authorization: `Bearer ${header}`
      }
    })
      .then(response => {
        console.log(response.data.message)
      })
      .catch(err => {
        console.error(err);
      })
  }

  return (<>
    {dataTable.length < 1 && isLoading ? (
      <Loading />
    ) : (
      <Wrap
        justify={'start'}
        mt="20px"
      >
        {dataTable.length < 1 ? (
          <Text>Tidak ada aktuator</Text>
        ) : (
          dataTable.map((item, index) => (
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
              w={{ base: '100%', sm: '100%', md: "100%", lg: "48%", xl: '48.5%', "2xl": "48.5%" }}
            >
              <Center
                justifyContent="center"
                flexDir="column"
                data={{ data: idApi }}
              >
                <Flex flexDir="row" justify="space-between">
                  <Image
                    src={`${item.icon.logo}`}
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

                <Switch mt={'20px'} onChange={async () => {
                  await handleswitch(item.id)
                  setKontrol(!kontrol)
                }} isChecked={item.status} />

              </Center>
            </WrapItem>
            // </Link>
          ))
        )}
      </Wrap>
    )}
  </>
  );
}
export default CardAktuatorOperator;
