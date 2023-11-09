import React from 'react';
import {
  Flex, Text, Icon,
} from '@chakra-ui/react';
import './card_dashboard.css';

function CardDashboard(props) {
  const { data } = props;

  return (
    <Flex
      bg="#ffff"
      borderRadius="20"
      borderWidth="3px"
      borderColor="#D9D9D9"
      px={5}
      boxShadow="0px 0.1px 2px rgba(0, 0, 0, 0.25)"
      w={{ base:'80%', sm:'80%', md:"40%", lg:"40%", xl: "31%" }}
      h={{ base: '120px', sm: '120px', md: '220px', lg: '220px', xl: '220px', "2xl": '220px'}}
      align="center"
      justifyContent="center"
    >
      <Flex flex={1} justifyContent="center">
        <Flex
          padding={[4, 5]}
          borderRadius="10px"
          bg="#319795"
          justify="center"
          align="center"
        >
          <Icon as={data.icon} color="white" w={[6, 7, 8, 9]} h={[6, 7, 8, 9]} />
        </Flex>
      </Flex>

      <Flex direction="column" flex={1}>
        <Text
          color="black"
          fontWeight="semibold"
          fontSize="var( --header-1)"
          fontFamily="var(--font-family-secondary)"
        >
          {data.value}
        </Text>

        <Text
          color="black"
          fontWeight="semibold"
          fontSize="var( --header-4)"
          fontFamily="var(--font-family-secondary)"
        >
          {data.name}
        </Text>
      </Flex>
    </Flex>
  );
}
export default CardDashboard;
