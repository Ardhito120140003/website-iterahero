import React, { useState, useEffect } from 'react';
import {
  Flex,
  Text,
  Wrap,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tabs, TabList, TabPanels, Tab, TabPanel, Icon, Image
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import CardGreenhouse from '../../component/card_greenhouse/card_green';
import { routePageName, selectUrl } from '../../features/auth/authSlice';
import { TabTitle } from '../../Utility/utility';
import { listGreenhouse } from '../../Utility/api_link';
import Loading from '../../component/loading/loading';
import { useParams } from "react-router";
import CardAktuatorOperator from '../../component/card_aktuator/card_aktuator_operator';
import CardSensorOperator from '../../component/card_sensor/card_sensor_operator';
import { selectToken } from '../../features/auth/authSlice';


function DetailGreenHouse() {
  TabTitle('Detail Greenhouse - ITERA Hero');
  const { id } = useParams();

  const base_url = useSelector(selectUrl);
  const header = useSelector(selectToken)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(routePageName('Sensor dan Aktuator Greenhouse'));
  }, []);

  return (
    <>
      {id == null ? <Loading />
        : (
          <Flex border={'3px solid #d9d9d9'} borderRadius={15} px={"10px"} mt={'10px'} height={'100%'}>
            <Tabs isFitted width={'100%'} colorScheme='black'>
              <TabList>
                <Tab color={'black'}>Sensor</Tab>
                <Tab color={'black'}>Aktuator</Tab>
              </TabList>
              <TabPanels css={{
                overflowY: 'scroll',
                '&::-webkit-scrollbar': {
                  width: '0.4em',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'transparent',
                },
              }}
                width="100%"
                height={"425px"}>
       
                <TabPanel alignItems={"center"} verticalAlign={"align"} justifyContent={"center"}>
                    <CardSensorOperator
                      data={{ alat: 'greenhouse', id: id }}
                    />
                </TabPanel>
        
                <TabPanel>
                    <CardAktuatorOperator
                      data={{ alat: 'greenhouse', id: id }}
                    />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        )}
    </>
  );
}
export default DetailGreenHouse;
