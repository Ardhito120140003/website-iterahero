import React, { useEffect } from 'react';
import {
  Text, Flex, Image, Wrap,
} from '@chakra-ui/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { routePageName, selectUrl } from '../../features/auth/authSlice';
import { TabTitle } from '../../Utility/utility';
import Loading from '../../component/loading/loading';

function ControllingDetail() {
  const base_url = useSelector(selectUrl);
  TabTitle('controlling - ITERA Hero');
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data;
  console.log(data);
  const header = localStorage.getItem('token');

  // const getactuatorDetail = async () => {
  //   await axios
  //     .get(base_url + greenhouseByUserId, {
  //       headers: {
  //         Authorization: "Bearer " + header,
  //       },
  //     })
  //     .then((response) => {
  //       setDataApi(response.data.data);
  //       setData(response.data.data[0].id);
  //     });
  //   console.log(dataApi).catch((error) => {
  //     localStorage.clear()
  //     dispatch(logout());
  //     navigate("/login");
  //   });
  // };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(routePageName('controlling Detail'));
  }, []);
  return (
    <>
      {data == null ? (
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
                  controlling
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
              {`Detail actuator ${data.name}`}
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
                    src={data.actuator_image}
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
                    src={data.posisitionact}
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
                  {data.name}
                </Text>
                <Text>
                  Deskripsi :
                  {data.detailact}
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
