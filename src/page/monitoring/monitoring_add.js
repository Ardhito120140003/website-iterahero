import React, { useState, useEffect } from 'react';
import {
  Flex,
  Image,
  Text,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Circle,
  Textarea,
} from '@chakra-ui/react';

import { useParams, useNavigate } from 'react-router';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { routePageName, selectUrl } from '../../features/auth/authSlice';
import { TabTitle } from '../../Utility/utility';
import {
  getApiGreenhouse,
  icons,
  categoryApi,
  addSensorApi,
} from '../../Utility/api_link';
import Loading from '../../component/loading/loading';
import { selectToken } from '../../features/auth/authSlice';
import { MdArrowDropDown } from 'react-icons/md';

function Monitoring_Add() {
  const base_url = useSelector(selectUrl);
  TabTitle('Tambah Sensor - ITERA Hero');
  const { id, route } = useParams();
  const [isloading, setIsLoading] = useState(true);
  const header = useSelector(selectToken)
  const [iconsList, setIconsList] = useState([]);
  const [target, setTarget] = useState({})
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const schema = yup.object({
    Name: yup.string().required('Nama harus diisi'),
    Type: yup.string().required('icon harus diisi'),
    Brand: yup.string().required('Satuan Ukur harus diisi'),
    Calibration: yup.string().required('Persamaan Kalibrasi harus diisi'),
    Satuan: yup.string().required('Merek harus diisi'),
    "Range Max": yup.number().required('Range Max harus diisi'),
    "Range Min": yup.number().required('Range Min harus diisi')
  });

  const getIcon = async () => {
    axios
      .get(base_url + icons, {
        headers: {
          Authorization: `Bearer ${header}`
        }
      })
      .then(({ data }) => {
        setIconsList(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getGreenhouse = async () => {
    axios.get(base_url + "api/v1/" + route, {
      params: {
        id
      },
      headers: {
        Authorization: `Bearer ${header}`
      }
    })
      .then(({ data }) => {
        console.log(data)
        setTarget(data.data)
      })
      .catch(({ response }) => console.error(response))
  }

  useEffect(() => {
    dispatch(routePageName('Monitoring'));
    getGreenhouse();
    getIcon();
    setIsLoading(false);
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
            <Link>
              <Flex>
                <Text
                  fontWeight="semibold"
                  fontSize="var(--header-3)"
                  color="var(--color-primer)"
                >
                  {' Menambah sensor '}
                  {target.name}
                  {' '}
                </Text>
              </Flex>
            </Link>
          </Flex>
          <Formik
            initialValues={{
              Name: undefined,
              Type: undefined,
              Brand: undefined,
              Calibration: undefined,
              Satuan: undefined,
              "Range Min": undefined,
              "Range Max": undefined
            }}
            onSubmit={async (values, action) => {
              setTimeout(() => {
                const where = route === 'greenhouse' ? 'greenhouse' : 'tandon';
                axios.post(base_url + "api/v1/sensor", {
                  name: values.Name,
                  [`id_${where}`]: parseInt(id),
                  brand: values.Brand,
                  calibration: values.Calibration,
                  unit_measurement: values.Satuan,
                  type: values.Type,
                  range_min: values["Range Min"],
                  range_max: values["Range Max"],
                }, {
                  params: {
                    id
                  },
                  headers: {
                    Authorization: `Bearer ${header}`
                  }
                })
                  .then(({ data }) => {
                    console.log(data)
                    navigate('/unit/monitoring')
                  })
                  .catch(({ response }) => console.error(response))

                alert(JSON.stringify(values, null, 2))
                action.setSubmitting(false)
                navigate("/unit/monitoring")
              }, 200)
            }}
            validationSchema={schema}
          >
            {({ handleSubmit, handleChange, handleBlur, isValid, values, errors, touched }) => (
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
                        {iconsList.filter((icon) => category.name.toLowerCase().includes('sensor')).map((sensor, index) => (
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
                    {errors[item] && touched[item] && <FormErrorMessage>{errors[item]}</FormErrorMessage>}
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

export default Monitoring_Add;
