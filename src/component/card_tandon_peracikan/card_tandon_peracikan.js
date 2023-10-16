import React from 'react';
import {
  Icon, Flex, Text, Grid, CircularProgress,
} from '@chakra-ui/react';
import { GiWaterTower } from 'react-icons/gi';

function CardStatusPeracikan({
  id, isOnline, sensor, status,
}) {
  return (
    <Flex
      borderRadius="10px"
      width="100%"
      border="1px solid #E2E8F0"
      paddingX="30px"
      height="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="sticky"
    >
      <Flex justifyContent="center" paddingTop="30px">
        <Text>Tandon Peracikan</Text>
      </Flex>
      <Flex justifyContent="center" marginY="30px">
        {
                        status == 'Idle'
                          ? (<Icon as={GiWaterTower} w="300px" h="200px" color="#14453E" />)
                          : (<CircularProgress value={30} size="150px" isIndeterminate color="green.300" />)
                    }
      </Flex>
      <Flex justifyContent="center" marginY="30px">
        {
                        status == null
                          ? (<Text color="grey" fontSize="12px">Tandon Kosong</Text>)
                          : (<Text color="grey" fontSize="12px">Sedang Melakukan Peracikan...</Text>)

                    }
      </Flex>
      <Flex>
        <Flex flexDirection="column" p={12} borderRadius={20}>
          {sensor.map((item) => (
            <Grid templateColumns="repeat(2, 1fr)">
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
    </Flex>
  );
}

export default CardStatusPeracikan;
