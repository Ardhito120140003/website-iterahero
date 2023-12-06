import React, { useState, useEffect } from 'react';
import {
  Text,
  Image,
  Flex,
  Wrap,
  Box,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { actuatorLogToday } from '../../Utility/api_link';

import { logout, selectUrl } from '../../features/auth/authSlice';

function CardLogActuatorToday(props) {
  const logs = props.data.log;
  const base_url = useSelector(selectUrl);

  return (
    <Wrap className="center-ul" align="center" spacing="10px" mt="30px" width={['100%']}>
      <Flex direction={{ base: 'column', md: 'row' }} mt="30px" justifyContent="space-between" w={['100%']}>
        <Box
          w={['100%', '40%']}
          className="card-sensor"
          bg="#ffff"
          borderRadius="10px"
          border="1px solid #E2E8F0"
          padding="10px"
        >
          <Flex w={['100%']} alignItems="center" justifyContent="center" direction={{ base: 'column', md: 'row' }}>
            <Wrap padding="10px" w="60px">
              <Image className="Image" w={['100%']} h={['100%']} src="/on_log.png" alt="image" />
            </Wrap>
            <Flex direction="column" alignItems="start" justifyContent="center">
              <Text>Jumlah Actuator Nyala Hari ini</Text>
            </Flex>
            <Wrap>
              <Text width="100%" fontWeight="bold" color="var(--color-secondary-variant)">{logs.on ?? 0}</Text>
            </Wrap>
          </Flex>
        </Box>
        <Box
          w={['100%', '40%']}
          className="card-sensor"
          bg="#ffff"
          borderRadius="10px"
          border="1px solid #E2E8F0"
          padding="10px"
        >
          <Flex w={['100%']} alignItems="center" justifyContent="center" direction={{ base: 'column', md: 'row' }}>
            <Wrap padding="10px" w="60px">
              <Image className="Image" w={['100%']} h={['100%']} src="/off_log.png" alt="image" />
            </Wrap>
            <Flex direction="column" alignItems="start" justifyContent="center">
              <Text>Jumlah Actuator Mati Hari ini</Text>
            </Flex>
            <Wrap>
              <Text width="100%" fontWeight="bold" color="var(--color-error)">{logs.off ?? 0}</Text>
            </Wrap>
          </Flex>
        </Box>
      </Flex>
    </Wrap>

  );
}
export default CardLogActuatorToday;
