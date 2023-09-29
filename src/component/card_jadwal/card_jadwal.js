import React from 'react';
import {
  Flex, 
  Text, 
  Switch, 
  Icon,
} from '@chakra-ui/react';
import { MdOutlineMoreTime } from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';
import { useState } from 'react';
import axios from 'axios';
import { selectUrl } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const CardJadwal = () => {
  const [dataApi,setDataApi]=useState([]);
  const base_url = useSelector(selectUrl);
  const header = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(base_url + 'api/v1/penjadwalan', {
        headers: {
          Authorization: "Bearer " + header
        }
      })
      .then(response => {
          setDataApi(response.data.data);
          console.log("Data :", response.data.data)
      })
      .catch(error => {
          console.error("Error fetching formula data:", error);
      });
  }, [dataApi]);

  const handleDelete = (id) => {
    axios
      .delete(base_url + `api/v1/penjadwalan`, {
        params : {id},
        headers: {
          Authorization: "Bearer " + header,
        },
      })
      .then(() => {
        console.log("Schedule with ID", id, "has been deleted.");
      })
      .catch((error) => {
        console.error("Error deleting schedule:", error);
      });
  };

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
        {dataApi.map((dataApi, index) => (
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
              <Text align="left">Formula : {dataApi.id} </Text>
              <Text align="left">Jam : {dataApi.waktu} </Text>
            </Flex>

            <Switch alignSelf="center"/>

            <Icon
              as={BiTrash}
              color="#14453E"
              w="30px"
              h="30px"
              alignSelf="center"
              onClick={() => handleDelete(dataApi.id)}
            />

          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default CardJadwal;
