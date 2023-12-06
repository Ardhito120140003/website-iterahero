import React, { useEffect, useState } from 'react';
import {
  Text, Flex, Image, Wrap,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { routePageName, selectUrl } from '../../features/auth/authSlice';
import { TabTitle } from '../../Utility/utility';
import { selectToken } from '../../features/auth/authSlice';
import Loading from '../../component/loading/loading';
import axios from 'axios';

function ControllingDetail() {
  const base_url = useSelector(selectUrl);
  TabTitle('controlling - ITERA Hero');
  const dispatch = useDispatch();
  const { id } = useParams();
  const header = useSelector(selectToken)
  const [aktuator, setAktuator] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const getAktuatorDetail = async () => {
    axios.get(base_url + "api/v1/sensor", {
      params: {
        id
      },
      headers: {
        Authorization: `Bearer ${header}`
      }
    })
    .then(({ data }) => {
      console.log(data)
      setAktuator(data.data)
    })
    .catch(({ response }) => console.error(response))
    .finally(() => setIsLoading(false))
  };

  useEffect(() => {
    dispatch(routePageName('Controlling Detail'));
    getAktuatorDetail()
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Flex gap="30px" width="100%" flexDir="column">
          <Flex
            bg="white"
            borderRadius="10px"
            p="10px"
            alignItems="center"
            justifyContent="start"
          >
            <Flex alignItems="center">
              <Link to="/unit/controlling">
                <Text
                  fontSize={{ base: '15px', md: '20px' }}
                  fontWeight="bold"
                  mr="10px"
                >
                  Controlling
                </Text>
              </Link>
            </Flex>
            <Flex alignItems="center">
              <Text
                fontSize={{ base: '15px', md: '20px' }}
                fontWeight="bold"
                mr="10px"
              >
                {'>'}
              </Text>
            </Flex>
            <Text fontSize={{ base: '15px', md: '20px' }} fontWeight="bold">
              {`Detail actuator ${aktuator.name}`}
            </Text>
          </Flex>
          <Flex
            direction="column"
            justifyContent="start"
            alignItems="start"
          >
            <Text
              fontSize={{ base: '15px', md: '20px' }}
              fontWeight="bold"
              width={{ base: '100%', lg: '80px' }}
            >
              Detail
            </Text>
            <Flex
              mt="20px"
              direction={{ base: 'column', lg: 'row-reverse' }}
              justifyContent="center"
              alignItems="start"
            >
              <Wrap width={{ base: '100%', lg: '30%' }}>
                <Flex
                  width="100%"
                  direction="column"
                  justifyContent={{ base: 'center', lg: 'start' }}
                  alignItems={{ base: 'center', lg: 'start' }}
                >
                  <Text>Gambar actuator</Text>
                  <Image
                    width="100%"
                    maxWidth="600px"
                    marginLeft="10px"
                    src={aktuator.actuator_image}
                  />
                </Flex>
                <Flex
                  direction="column"
                  justifyContent={{ base: 'center', lg: 'start' }}
                  alignItems={{ base: 'center', lg: 'start' }}
                  width="100%"
                >
                  <Text>Posisi actuator</Text>
                  <Image
                    maxWidth="600px"
                    width="100%"
                    src={aktuator.posisitionact}
                    marginLeft="10px"
                  />
                </Flex>
              </Wrap>
              <Flex
                width={{ base: '100%', lg: '70%' }}
                direction="column"
                mt={{ base: '20px', lg: '0px' }}
                justifyContent="start"
                alignItems="start"
              >
                <Text>
                  Nama :
                  {aktuator.name}
                </Text>
                <Text>
                  Deskripsi :
                  {aktuator.detailact}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
}
export default ControllingDetail;
