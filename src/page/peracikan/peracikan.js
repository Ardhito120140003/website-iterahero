import React, { useState, useEffect } from 'react';
import {
  Flex, Grid, GridItem, Select, Tabs, TabList, TabPanels, Tab, TabPanel, Button, Text
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { TabTitle } from '../../Utility/utility';
import ValueTandon from '../../component/value_tandon/value_tandon';
import CardFormPeracikan from '../../component/card_form_peracikan/card_form_peracikan';
import CardFormPeracikanRasio from '../../component/card_form_peracikan/card_form_peracikam_rasio';
import CardStatusPeracikan from '../../component/card_tandon_peracikan/card_tandon_peracikan';

import { Formik, Field, Form } from 'formik';

import { selectUrl, routePageName } from '../../features/auth/authSlice';
import './peracikan.css';
import Loading from '../../component/loading/loading';

function Peracikan() {
  TabTitle('Peracikan - ITERA Hero');
  const base_url = useSelector(selectUrl);
  const dispatch = useDispatch();
  const [dataApi, setDataApi] = useState([]);
  const [data, setData] = useState([]);
  const headers = localStorage.getItem('token');

  const getApi = async () => {
    await axios
      .get(`${base_url}api/v1/tandonUtama`, {
        headers: {
          Authorization: `Bearer ${headers}`,
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
      <Formik
        initialValues={{
          tandon: ""
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values.tandon));
        }}>
        {({ setFieldValue, values }) => (
          <Form>
            <Select
              name="filter2"
              as={Select}
              borderRadius={"10"}
              width={"100%"}
              height={"5vh"}
              bg={"white"}
              _active={{ bg: "white" }}
              borderColor={"var(--color-border)"}
              fontSize={"var(--header-5)"}
              fontWeight={"normal"}
              color={"var(--color-primer)"}
              _hover={{ borderColor: "var(--color-border)" }}
              _focusWithin={{ borderColor: "var(--color-border)" }}
              value={values.tandon}
              placeholder='--Pilih Tandon Peracikan--'
              onChange={async (e) => {
                setFieldValue("tandon", e.target.value);
                axios
                  .get(
                    base_url +
                    "api/v1/tandonUtama/" +
                    e.target.value +
                    "/sensor",
                    {
                      headers: {
                        Authorization: "Bearer " + headers,
                      },
                    }
                  )
                  .then((response) => {
                    console.log(response.data.data[0]);
                    setData(response.data.data[0]);
                  })
                  .catch((err) => console.error(err));
              }}
            >
              {dataApi.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.nama}
                </option>
              ))}
            </Select>
          </Form>
        )}
      </Formik>


      {dataApi.length < 1 ? (
        <Loading />
      ) : (
        data.length < 1 ? (
          <Loading />
        ) : (
          <Grid templateColumns="repeat(2, 1fr)" gap={5} mt={'20px'}>
            
            <GridItem>
              {/* <ValueTandon tandonBahan={data.tandonBahan} /> */}
              <Flex flexDirection="column" border="1px solid #E2E8F0" borderRadius={'10px'} p={'30px'} h={'100%'}>
                <Text m={'20px'}>
                  Form Peracikan
                </Text>
                {/* <Tabs isFitted colorScheme='#09322D'>
                  <TabList mx={'20px'}>
                    <Tab color={'black'}>Besaran</Tab>
                    <Tab color={'black'}>Rasio</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <CardFormPeracikan />
                    </TabPanel>
                    <TabPanel>
                      <CardFormPeracikanRasio />
                    </TabPanel>
                  </TabPanels>
                </Tabs> */}
                <CardFormPeracikan />
              </Flex>
            </GridItem>

            <GridItem>
              <CardStatusPeracikan id={data.id} isOnline={dataApi.isOnline} sensor={data.sensor} status={dataApi[0].status} />
            </GridItem>
          </Grid>
        )
      )}
    </>
  );
}
export default Peracikan;
