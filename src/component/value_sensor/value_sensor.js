import React,{useState,useEffect} from 'react';
import {
	Table,
	Thead,
	Tbody,
	Text,
	Button,
	Select,
	Tr,
	Image,
	Th,
	Td,
	Box,
	TableContainer,
	Flex,
  Wrap,
  CircularProgress,
  CircularProgressLabel
} from "@chakra-ui/react";
import axios from 'axios';
import { brokerSensor } from "../..//Utility/api_link";
import Loading from "../../component/loading/loading";
import { useNavigate } from "react-router-dom";
import { buildStyles } from 'react-circular-progressbar';
import moment from 'moment/moment';
import './value_sensor.css';

const ValueSensor = (props) => {
  const idSensor = props.data.id
  const color = props.data.color
  const kategori = props.data.category
  const satuan =props.data.unit
  const max = props.data.max
  const min = props.data.min
  const navigate = useNavigate();
  const [valueSensor,setValueSensor] = useState(0)
  const [time,setTime] = useState('')
  const [category,setCategory] = useState('')
  const [status, setStatus] = useState('')

  console.log( kategori)
  
  const [onRefresh,setOnRefresh] = useState(true)
  const [firstCheck,setFirstCheck] = useState(true)

  const getValueRefreshFirst = async () => {
     setTimeout(() => {
      axios.get(`${brokerSensor}${idSensor}`)
      .then(response => { 
        setValueSensor(response.data.data[0].value)
        setStatus(response.data.data[0].status)
        setTime(response.data.data[0].createdAt)
        setOnRefresh(true)
      })
    }
    , 1000)
  }
  const getValueRefreshSecond = async () => {
     setTimeout(() => {
      axios.get(`${brokerSensor}${idSensor}`)
      .then(response => { 
        setValueSensor(response.data.data[0].value)
        setStatus(response.data.data[0].status)
        setOnRefresh(false)
      })
    }
    , 1000)
  }
  
  const onRefreshUpdate = () => {
    if(onRefresh == false){
      getValueRefreshFirst()
    }
    if (onRefresh == true){
      getValueRefreshSecond()
    }
  }
  const getValue = async () => {
    axios.get(`${brokerSensor}${idSensor}`)
    .then(response => { 
      setValueSensor(response.data.data[0].value)
      setStatus(response.data.data[0].status)
      })
    }
    

    useEffect(() => { 
      if(firstCheck == true){
      getValue()
    }
    else{
      onRefreshUpdate()
    }
    return () => setFirstCheck(false);
  },[onRefresh, firstCheck, valueSensor,status]);
  
  return (
    <>
  <Flex alignContent={'center'} justify={'center'} flexDir={'column'} alignItems={'center'} >
    {
      kategori == 'Persen' ? 
      <Flex flexDir={'column'} justify={'center'} alignItems={'center'} textAlign='center' mb={'5px'} mt={'10px'} style={{ width: "100px" }}>
        <Flex>
          <CircularProgress value={valueSensor} color={valueSensor > max || valueSensor < min ? 'var(--color-error)' : `${color}`} size='70px'>
            <CircularProgressLabel>{valueSensor}%</CircularProgressLabel>
          </CircularProgress>
        </Flex>
        <Flex width={'130px'}  mt={'10px'} flexDir={'row'} justifyContent={"center"} alignItems={"center"} >
            <Text width={'100%'} fontSize={'12px'} fontWeight={'bold'} color={'var(--color-primer)'}>Status :</Text>
            {
              status == null && status == undefined ?
              (<Text width={'100%'} fontSize={'12px'} fontWeight={'bold'} color={'var(--color-primer)'}>Offline</Text>):
              (<Text width={'100%'} ml={'-20px'} fontSize={'12px'} fontWeight={'bold'} color={status == 'offline' || status == undefined || status == ''   ? 'var(--color-error)' : `var(--color-secondary-variant)`}>{status == 'offline' || status == undefined || status == '' ? 'Offline' : 'Online'}</Text>)
            }
          </Flex>
      </Flex>:
        null
      }
      {
        kategori == 'Derajat' ?
        <Flex justify={'center'}  mb={'10px'} mt={'10px'} flexDir={'column'} alignItems={'center'} textAlign='center' style={{ width: "50px" }}>
          {
            <><Text fontSize={'20px'} color={valueSensor > max || valueSensor < min ? 'var(--color-error)' : `${color}`}>{valueSensor}°</Text><Text fontSize={'20px'} color={valueSensor > max || valueSensor < min ? 'var(--color-error)' : `${color}`}>{satuan}</Text></>
          }
          <Flex width={'130px'}  mt={'10px'} flexDir={'row'} justifyContent={"center"} alignItems={"center"} >
            <Text width={'100%'} fontSize={'12px'} fontWeight={'bold'} color={'var(--color-primer)'}>Status :</Text>
            {
              status == null && status == undefined ?
              (<Text width={'100%'} fontSize={'12px'} fontWeight={'bold'} color={'var(--color-error)'}>Offline</Text>):
              (<Text width={'100%'} ml={'-20px'} fontSize={'12px'} fontWeight={'bold'} color={status == 'offline' || status == undefined || status == ''  ? 'var(--color-error)' : `var(--color-secondary-variant)`}>{status == 'offline' || status == undefined || status == '' ? 'Offline' : 'Online'}</Text>)
            }
          </Flex>
        </Flex>:
           
         null
      }
      {
        kategori == 'Lainnya'  ?
        <Flex justify={'center'}  mb={'10px'} mt={'10px'} flexDir={'column'} alignItems={'center'} textAlign='center' style={{ width: "50px" }}>
          {
            <><Text fontSize={'20px'} color={
              valueSensor > max || valueSensor < min ? 'var(--color-error)' :  `${color}`
            }>{valueSensor}</Text><Text fontSize={'20px'} color={valueSensor > max || valueSensor < min ? 'var(--color-error)' :  `${color}`}>{satuan}</Text></>
          }
          <Flex width={'130px'}  mt={'10px'} flexDir={'row'} justifyContent={"center"} alignItems={"center"} >
            <Text width={'100%'} fontSize={'12px'} fontWeight={'bold'} color={'var(--color-primer)'}>Status :</Text>
            {
              status == null && status == undefined ?
              (<Text width={'100%'} fontSize={'12px'} fontWeight={'bold'} color={'var(--color-error)'}>Offline</Text>):
              (<Text width={'100%'} ml={'-20px'} fontSize={'12px'} fontWeight={'bold'} color={status == 'offline' || status == undefined || status == ''  ? 'var(--color-error)' : `var(--color-secondary-variant)`}>{status == 'offline' || status == undefined || status == '' ? 'Offline' : 'Online'}</Text>)
            }
          </Flex>
        </Flex>
        : null
      }
    {
          <Flex flexDir={'row'} justifyContent={'space-between'}>
            <Text  fontSize={'var(--caption)'}>Diperbarui : </Text>
              <Text fontSize={'var(--caption)'}>
                {moment(time).format('MMMM Do YYYY, h:mm:ss a')}
              </Text>
          </Flex>
      }
  </Flex>
  </>
  )
}
export default ValueSensor