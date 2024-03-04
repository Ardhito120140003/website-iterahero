import React, { useState, useEffect } from 'react';
import {
  Text,
  Image,
  Flex,
  FormControl,
  Stack,
  Link as ChakraLink,
  Icon
} from '@chakra-ui/react';
import axios from 'axios';
import useSound from 'use-sound';
import { useSelector } from 'react-redux';
import clickSound from '../../assets/switch.mp3';
import { postLogAktuator, Status } from '../../Utility/api_link';
import Loading from '../loading/loading';
import './value_aktuator.css';
import { selectUrl } from '../../features/auth/authSlice';
import { RiArrowRightSLine } from 'react-icons/ri';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Switch } from '@chakra-ui/react';

function ValueAktuatorOperator(props) {
  const base_url = useSelector(selectUrl);
  const idApi = props.data.id;
  const route = props.data.route;
  const { life_cycle , automation, isAvailable, isActive } = props.data;
  const [isLoading, setIsLoading] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(0.75);
  const [play] = useSound(clickSound, {
    playbackRate,
    interrupt: true,
  });

  useEffect(() => {
    setIsLoading(false);
  }, [idApi]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Flex justify="center" 
          mt="30px" 
          px={'20px'} 
          m={'20px'}
          >
            <Image
              w="70px"
              src={ !automation ? '/On.png' : '/automation.png'}
              alt="image"
            />
          </Flex>
          <Flex flexDir="row">
            <Flex flexDir="row">
              <Flex>
                <Text fontSize="var(--header-5)">Status :</Text>
              </Flex>
              <Flex>
                <Text
                  fontSize="var(--header-5)"
                  color={
                    isAvailable ? 'var(--color-secondary-variant)'
                      : 'var(--color-error)'
                  }
                >
                  {isAvailable ? 'Online' :  'Offline'}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          
          {/* <FormControl
            mt="10px"
            alignContent="center"
            justify="center"
            columns={{ base: 2, lg: 4 }}
          >
            <Stack align="center" onClick={play} className="touchable">
              {!isLoading ? (
                !automation ? (
                  <Switch
                    colorScheme="green"
                    size="lg"
                    onChange={() => {
                      setIsLoading(true);
                      toogleSwitch();
                    }}
                    isChecked={isActive}
                    isDisabled={isAvailable}
                  />
                ) : (
                  <Text color="var(--color-error)">Automation</Text>
                )
              ) : null}
            </Stack> */}
          {/* </FormControl> */}
          {/* { route === 'greenhouse' &&  */}
          <ChakraLink as={ReactRouterLink} to={`/unit/dashboard/aktuator/${idApi}`} className="touchable">
            <Flex
              w="100%"
              h="40px"
              alignItems="center"
              justifyContent="center"
              backgroundColor="#09322D"
              borderRadius="34px"
              px={2}
              my={4}
            >
              <Text color="white">Pengaturan</Text>
              <Icon
                as={RiArrowRightSLine}
                size="100%"
                color="#FFFFFF"
              />
            </Flex>
          </ChakraLink>
        </>
      )}
    </>
  );
}
export default ValueAktuatorOperator;
