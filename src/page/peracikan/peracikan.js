import React, { useState, useEffect } from 'react';
import {
  Flex, Grid, GridItem,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { TabTitle } from '../../Utility/utility';
import ValueTandon from '../../component/value_tandon/value_tandon';
import CardFormPeracikan from '../../component/card_form_peracikan/card_form_peracikan';
import CardStatusPeracikan from '../../component/card_tandon_peracikan/card_tandon_peracikan';

import { selectUrl, routePageName } from '../../features/auth/authSlice';
import './peracikan.css';
import Loading from '../../component/loading/loading';

function Peracikan() {
  TabTitle('Peracikan - ITERA Hero');
  const base_url = useSelector(selectUrl);
  const dispatch = useDispatch();
  const [dataApi, setDataApi] = useState(null);
  const header = localStorage.getItem('token');

  const getApi = async () => {
    await axios
      .get(`${base_url}api/v1/tandonUtama`, {
        headers: {
          Authorization: `Bearer ${header}`,
        },
        params: {
          id: 1,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setDataApi(response.data.data);
      })
      .catch((error) => {
        console.log('error : ', error);
      });
  };

  useEffect(() => {
    getApi();
    dispatch(routePageName('Peracikan'));
  }, []);

  return (
    <>
      {dataApi === null ? (
        <Loading />
      ) : (
        <Grid templateColumns="repeat(2, 1fr)" gap={5}>
          <GridItem>
            {/* <CardStatusPeracikan id={dataApi.id} isOnline={dataApi.isOnline} sensor={dataApi.sensor} status={dataApi.status} /> */}
          </GridItem>
          <Flex flexDirection="column">
            {/* <ValueTandon tandonBahan={dataApi.tandonBahan} /> */}
            <CardFormPeracikan />
          </Flex>
        </Grid>
      )}
    </>
  );
}
export default Peracikan;
