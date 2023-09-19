import React,{useState,useEffect} from 'react';
import {
	Text,
	Image,
	Flex,
  Wrap,
  WrapItem,
  Center,
	Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom"
import axios from 'axios';
import { actuatorLogToday } from '../../Utility/api_link';
import Loading from "../../component/loading/loading";
import { useNavigate } from "react-router-dom";

const CardLogActuatorToday = (props) => {
    const idApi = props.data.id

    const navigate = useNavigate();
    const [dataTable, setDataTable] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getPagination = async () => {
      setIsLoading(true)

      const header = localStorage.getItem('token')
      await axios.get(`${actuatorLogToday}${idApi}`, {
        headers: {
            'Authorization': 'Bearer ' + header
          }
        })
        .then(response => {
          setDataTable(response.data.data)
          setIsLoading(false)
        })
        .catch((error) => {
            localStorage.clear()
            navigate('/login')
        })
    }
    

    useEffect(() => {
      getPagination()
    },[idApi]);
    return (
      <Wrap className='center-ul' align={'center'} spacing={'10px'} mt={'30px'} width={['100%']}>
        <Flex direction={{ base: 'column', md: 'row' }}  mt={'30px'} justifyContent={'space-between'} w={['100%']}>
            <Box
            w={['100%','40%']}
            className='card-sensor'
            bg={'#ffff'}
            borderRadius={'10px'}
            border={'1px solid #E2E8F0'}
            padding={'10px'}>
              <Flex w={['100%']} alignItems={'center'} justifyContent={'center'} direction={{ base: 'column', md: 'row' }}>
                  <Wrap padding={'10px'} w={'60px'}>
                      <Image className='Image' w={['100%']} h={['100%']}src={'/on_log.png'} alt="image" />
                  </Wrap>
                  <Flex direction={'column'} alignItems={'start'} justifyContent={'center'}>
                      <Text>Jumlah Actuator Nyala Hari ini</Text>                          
                  </Flex>
                  <Wrap>
                      <Text width={'100%'} fontWeight={'bold'} color={'var(--color-secondary-variant)'}>{dataTable.count_on}</Text>
                  </Wrap>
              </Flex>								
            </Box>	
            <Box
            w={['100%','40%']}
            className='card-sensor'
            bg={'#ffff'}
            borderRadius={'10px'}
            border={'1px solid #E2E8F0'}
            padding={'10px'}>	
                <Flex w={['100%']} alignItems={'center'} justifyContent={'center'} direction={{ base: 'column', md: 'row' }}>
                    <Wrap padding={'10px'} w={'60px'}>
                        <Image className='Image' w={['100%']} h={['100%']}src={'/off_log.png'} alt="image" />
                    </Wrap>
                    <Flex direction={'column'} alignItems={'start'} justifyContent={'center'}>
                        <Text>Jumlah Actuator Mati Hari ini</Text>                          
                    </Flex>
                    <Wrap>
                        <Text width={'100%'} fontWeight={'bold'} color={'var(--color-error)'}>{dataTable.count_off}</Text>
                    </Wrap>
                </Flex>		
            </Box>	
            </Flex>
          </Wrap>		
            
    )
}
export default CardLogActuatorToday;