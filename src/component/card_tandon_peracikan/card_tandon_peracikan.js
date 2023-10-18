import React from 'react';
import {
  Icon, Flex, Text, Grid, CircularProgress,
} from '@chakra-ui/react';
import { GiWaterTower } from 'react-icons/gi';

function CardStatusPeracikan({
  id, isOnline, sensor, status
}) {

  console.log(status)

  return (
    <Flex
      borderRadius="10px"
      width="100%"
      border="1px solid #E2E8F0"
      height="100%"
      flexDirection="column"
      alignItems="center"
      position="sticky"
    >
      <Flex justifyContent="center" paddingTop="30px">
        <Text>Tandon Peracikan</Text>
      </Flex>

        <Flex direction={'column'}>
          <Flex justifyContent="center" marginY="30px">
            {
              status == 'Idle'
                ? (<Icon as={GiWaterTower} w="250px" h="150px" color="#14453E" />)
                : (<CircularProgress value={30} size="100px" isIndeterminate color="green.300" />)
            }
          </Flex>
          <Flex justifyContent="center" marginY="10px">
            {
              status == 'Idle'
                ? (<Text color="grey" fontSize="12px">Tandon Kosong</Text>)
                : (<Text color="grey" fontSize="12px">Sedang Melakukan Peracikan...</Text>)

            }
          </Flex>
        </Flex>

          <Flex flexDirection="column" borderRadius={20} justify={'center'} my={'20px'} paddingLeft={'60px'}>
            {sensor.map((item, index) => (
              <Grid key={index} templateColumns="repeat(2, 1fr)">
                <Text color="black" textAlign="left">
                  {item.name}
                </Text>
                <Text color="black" textAlign="left">
                  :{item.range_max}
                  {' '}
                  {item.unit_measurement}
                </Text>
              </Grid>
            ))}
            <Grid templateColumns="repeat(2, 1fr)">
              <Text color="black" textAlign="left">
                Status Tandon
              </Text>
              {
                isOnline == null
                  ? (<Text color="red" textAlign="left">: Offline</Text>)
                  : (<Text color="green" textAlign="left">: Online</Text>)
              }
            </Grid>
          </Flex>


    </Flex>
  );
}

export default CardStatusPeracikan;
