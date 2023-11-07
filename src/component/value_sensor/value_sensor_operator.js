import React, { useState, useEffect } from 'react';
import {
  Text,
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';
import { brokerSensor } from '../../Utility/api_link';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import './value_sensor.css';
import { useSelector } from 'react-redux';
import { selectUrl } from '../../features/auth/authSlice';

function ValueSensorOperator(props) {
  const idSensor = props.data.id;
  const { color } = props.data;
  const base_url = useSelector(selectUrl);
  const kategori = props.data.category;
  const satuan = props.data.unit;
  const { max } = props.data;
  const { min } = props.data;
  const navigate = useNavigate();
  const [valueSensor, setValueSensor] = useState(0);
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  // console.log(kategori); 

  const [onRefresh, setOnRefresh] = useState(true);
  const [firstCheck, setFirstCheck] = useState(true);

  const getValueRefreshFirst = async () => {
    setTimeout(
      () => {
        axios.get(`${base_url}${brokerSensor}${idSensor}`)
          .then((response) => {
            setValueSensor(response.data.data[0].value);
            setStatus(response.data.data[0].status);
            setTime(response.data.data[0].updated_at);
            setOnRefresh(true);
          });
      },
      1000,
    );
  };
  const getValueRefreshSecond = async () => {
    setTimeout(
      () => {
        axios.get(`${base_url}${brokerSensor}${idSensor}`)
          .then((response) => {
            setValueSensor(response.data.data[0].value);
            setStatus(response.data.data[0].status);
            setOnRefresh(false);
          });
      },
      1000,
    );
  };

  const onRefreshUpdate = () => {
    if (onRefresh == false) {
      getValueRefreshFirst();
    }
    if (onRefresh == true) {
      getValueRefreshSecond();
    }
  };
  const getValue = async () => {
    axios.get(`${base_url}${brokerSensor}${idSensor}`)
      .then((response) => {
        setValueSensor(response.data.data[0].value);
        setStatus(response.data.data[0].status);
      });
  };

  useEffect(() => {
    // if (firstCheck == true) {
    //   // getValue();
    // } else {
    //   onRefreshUpdate();
    // }
    // return () => setFirstCheck(false);
  }, [onRefresh, firstCheck, valueSensor, status]);

  return (
    <Flex alignContent="center" justify="center" flexDir="column" alignItems="center">
      <Flex flexDir="column" justifyContent="flex-start" mx={'40px'}>
        <Text fontSize="var(--caption)">Diperbarui : </Text>
        <Text fontSize="var(--caption)">
          {moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a')}
        </Text>
      </Flex>
    </Flex>
  );
}
export default ValueSensorOperator;
