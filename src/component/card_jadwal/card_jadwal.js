import React from 'react';
import {
  Flex, Text, Switch, Icon,
} from '@chakra-ui/react';
import { MdOutlineMoreTime } from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';
import { useState } from 'react';

const CardJadwal = ({ schedules, deleteSchedule }) => {

  // const [isChecked, setIsChecked] = useState(true); // Kondisi awalnya dicentang

  // const toggleSwitch = () => {
  //   setIsChecked(!isChecked); // Mengganti kondisi switch saat diklik
  // };



  return (
    <Flex
      flexDirection="column"
      width="100%"
      height="100%"
      borderRadius="10px"
      border="1px solid #E2E8F0"
    >
      <Text padding="30px">Jadwal Peracikan</Text>

      <Flex
        css={{
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {
            width: '0.4em',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'transparent',
          },
        }}
        flexDirection="column"
        width="100%"
        height="100%"
      >
        {schedules.map((schedule, index) => (
          <Flex
            key={index}
            borderRadius="10px"
            border="1px solid #E2E8F0"
            marginY="8px"
            marginX="20px"
            paddingY="0px"
            paddingX="20px"
            justifyContent="space-around"
          >
            <Icon as={MdOutlineMoreTime} color="#14453E" w="50px" h="50px" alignSelf="center" />
            <Flex flexDir="column" marginRight={'50px'} marginY="20px">
              <Text align="left">Formula : {schedule.formula}</Text>
              <Text align="left">Jam : {schedule.date}</Text>
            </Flex>
            <Switch alignSelf="center"  />
            {/* isChecked={isChecked} onChange={toggleSwitch} */}
            <Icon
              as={BiTrash}
              color="#14453E"
              w="30px"
              h="30px"
              alignSelf="center"
              onClick={() => deleteSchedule(index)}
            />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default CardJadwal;
