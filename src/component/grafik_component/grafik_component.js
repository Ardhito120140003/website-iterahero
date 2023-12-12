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
import { selectToken } from '../../features/auth/authSlice';
import { selectUrl } from '../../features/auth/authSlice';
import Loading from '../loading/loading';

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
  const [isLoading, setIsLoading] = useState(true);
  const { id } = props.data;
  const { value } = props.data;
  const header = useSelector(selectToken)
  const [dataSensor, setDataSensor] = useState([]);

  const getGrafik = async () => {
    await axios
      .get(`${base_url}` + "api/v1/grafik", {
        params: {
          id,
          timespan:   value
        },
        headers: {
          Authorization: `Bearer ${header}`,
        },
      })
      .then(({ data }) => {
        // console.log(data)
        setDataSensor(data.data);
      })
      .finally(() => setIsLoading(false))
  };

  useEffect(() => {
    getGrafik();
  }, [id, value]);

  return (
    isLoading ? <Loading /> :
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
