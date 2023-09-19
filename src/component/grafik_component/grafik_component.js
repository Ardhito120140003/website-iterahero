import React, { useState, useEffect } from "react";
import { getGrafikSensor } from "../../Utility/api_link";
import axios from "axios";
import GrafikValue from "./grafik_value";
import "./grafik_component";
import { useNavigate } from "react-router";
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
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const GrafikComponent = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const id = props.data.id;
  const value = props.data.value;
  const [dataSensor, setDataSensor] = useState([]);
  const getGrafik = async () => {
    const header = localStorage.getItem("token");
    await axios
      .get(`${getGrafikSensor}${id}?getDateQuery=${value}`, {
        headers: {
          Authorization: "Bearer " + header,
        },
      })
      .then((response) => {
        if (value === "Day") {
          response.data.data.map(
            (data, index) =>
              (response.data.data[index].label =
                parseInt(response.data.data[index].label) + 7)
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
        value: value,
        label: dataSensor.map((item) => item.label),
        data: dataSensor.map((item) => item.data),
      }}
    />
  );
};
export default GrafikComponent;
