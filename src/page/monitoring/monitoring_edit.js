import React, { useState, useEffect } from 'react';
import {
  Flex,
  Image,
  Text,
  Input,
  Circle,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormHelperText,
  Select,
  Textarea,
  Box,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { routePageName, selectUrl } from '../../features/auth/authSlice';
import { TabTitle } from '../../Utility/utility';
import { updateSensorDetail, icons, categoryApi } from '../../Utility/api_link';
import Loading from '../../component/loading/loading';
import './monitoring.css';
import { MdArrowDropDown } from "react-icons/md";

function Monitoring_Edit() {
  const base_url = useSelector(selectUrl);
  TabTitle('Edit Sensor - ITERA Hero');
  const header = localStorage.getItem('token');
  const { id } = useParams()
  const [sensor, setSensor] = useState({})
  const [iconsList, setIconsList] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const schema = yup.object({
    Name: yup.string().required('Nama harus diisi'),
    Type: yup.string().required('Ikon harus diisi'),
    Calibration: yup.string().required('Persamaan Kalibrasi harus diisi'),
    Satuan: yup.string().required('Satuan Ukur harus diisi'),
    Brand: yup.string().required('brand harus diisi'),
    "Range Max": yup.number().required('Range Max harus diisi'),
    "Range Min": yup.number().required('Range Min harus diisi'),
  });

  const getData = async () => {
    axios.get(base_url + 'api/v1/sensor', {
      params: {
        id
      },
      headers: {
        Authorization: `Bearer ${header}`
      }
    })
      .then(({ data }) => {
        console.log(data)
        setSensor(data.data)
        axios
          .get(base_url + icons, {
            headers: {
              Authorization: `Bearer ${header}`
            }
          })
          .then(({ data }) => {
            setIconsList(data.data);
          })
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false))
  };

  useEffect(() => {
    dispatch(routePageName('Monitoring'));
    getData();
  }, []);

  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <Flex w="100%" flexDir="column">
          <Flex width="100%">
            <Link to="/unit/monitoring">
              <Flex marginRight="2">
                <Text
                  fontWeight="semibold"
                  fontSize="var(--header-3)"
                  color="var(--color-primer)"
                >
                  List Sensor pada Greenhouse
                </Text>
              </Flex>
            </Link>

            <Flex marginRight="2">
              <Text
                fontWeight="semibold"
                fontSize="var(--header-3)"
                color="var(--color-primer)"
              >
                {' '}
                {'>'}
                {' '}
              </Text>
            </Flex>

            <Flex>
              <Text
                fontWeight="semibold"
                fontSize="var(--header-3)"
                color="var(--color-primer)"
              >
                {' '}
                Edit
                {' '}
                {sensor.name}
                {' '}
              </Text>
            </Flex>
          </Flex>
          <Formik
            initialValues={{
              Name: sensor.name,
              Type: sensor.icon.name,
              Brand: sensor.brand,
              Calibration: sensor.calibration,
              Satuan: sensor.unit_measurement,
              "Range Min": sensor.range_min,
              "Range Max": sensor.range_max
            }}
            onSubmit={async (values, action) => {
              setTimeout(() => {
                axios.put(base_url + "api/v1/sensor", {}, {
                  params: {
                    id
                  },
                  headers: {
                    Authorization: `Bearer ${header}`
                  }
                })
                .then(({ data }) => {
                  console.log(data)
                })
                .catch(({ response }) => console.error(response))
                .finally(() => setIsLoading(false))
                alert(JSON.stringify(values, null, 2))
                action.setSubmitting(false)
              }, 1000)
            }}
            validationSchema={schema}
          >
            {({ handleSubmit, handleChange, handleBlur, isValid, values, errors }) => (
              <Form
                onSubmit={handleSubmit}
                style={{
                  marginTop: 20,
                  color: "black",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start"
                }}
              >
                {Object.keys(values).map((item, index) => (
                  <FormControl isInvalid={errors[item]} key={index} pb={2}>
                    <FormLabel>{item}</FormLabel>
                    {item === 'Type' ? (
                      <Select name={item} icon={<MdArrowDropDown />} onChange={handleChange} value={values[item]}>
                        {iconsList.filter((icon) => icon.name.toLowerCase().includes('sensor')).map((sensor, index) => (
                          <option value={sensor.name} key={index}>{sensor.name}</option>
                        ))}
                      </Select>
                    ) : (
                      <Input
                        type={['Range Min', 'Range Max'].includes(item) ? 'number' : 'text'}
                        name={item}
                        value={values[item]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    )}
                    { errors[item] && <FormErrorMessage>{errors[item]}</FormErrorMessage> }
                  </FormControl>
                ))}
                <Button type='submit' disabled={!isValid}>Submit</Button>
              </Form>
            )}
          </Formik>
        </Flex>
      )}
    </>
  );
}
export default Monitoring_Edit;
