import React, { useState, useEffect } from 'react';
import { getGrafikSensor } from '../../Utility/api_link';
import axios from 'axios';
import GrafikValue from './grafik_value';
import './grafik_component';
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { selectUrl } from '../../features/auth/authSlice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

function GrafikComponent(props) {
  const base_url = useSelector(selectUrl);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = props.data;
  const { value } = props.data;
  const [dataSensor, setDataSensor] = useState([]);
  const getGrafik = async () => {
    const header = localStorage.getItem('token');
    await axios
      .get(`${base_url}${getGrafikSensor}${id}?getDateQuery=${value}`, {
        headers: {
          Authorization: `Bearer ${header}`,
        },
      })
      .then((response) => {
        if (value === 'Day') {
          response.data.data.map(
            (data, index) => (response.data.data[index].label = parseInt(response.data.data[index].label) + 7),
          );
        }
        setDataSensor(response.data.data);
      });
  };
  useEffect(() => {
    getGrafik();
  }, [id, value]);
  return (
    <GrafikValue
      className="grafik"
      data={{
        value,
        label: dataSensor.map((item) => item.label),
        data: dataSensor.map((item) => item.data),
      }}
    />
  );
}
export default GrafikComponent;
