import React, { useState, useEffect } from 'react';
import {
  Flex, Text, Button, Input, Select,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/form-control';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { routePageName, selectUrl } from '../../features/auth/authSlice'
import { selectToken } from '../../features/auth/authSlice';

import Loading from '../../component/loading/loading';
import kondisiAutomatis from '../../Utility/dropdown_kondisi';
import { TabTitle } from '../../Utility/utility';
import { MdArrowDropDown } from 'react-icons/md';

function AutomationAddBySensor(props) {
  const base_url = useSelector(selectUrl);
  const { id } = props.data;
  TabTitle('Edit Automation - ITERA Hero');
  const [isLoading, setIsLoading] = useState(true);
  const [actuator, setActuator] = useState({});
  const [dataSensor, setDataSensor] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup.object({
    Nama: yup.string().required('data harus diisi'),
    "Sensor Rujukan": yup.number().required('data harus diisi'),
    Kondisi: yup.string().required('data harus diisi'),
    Aksi: yup.number().required('data harus diisi'),
    "Nilai Batas": yup.number().min(0, 'Nilai harus lebih dari 0').required('data harus diisi'),
  });

  const header = useSelector(selectToken)

  const getData = async () => {
    axios.get(base_url + "api/v1/aktuator", {
      params: {
        id: parseInt(id)
      },
      headers: {
        Authorization: `Bearer ${header}`
      }
    })
      .then(({ data }) => {
        console.log(data)
        setActuator(data.data)
        axios.get(base_url + "api/v1/greenhouse/" + data.data.greenhouseId + "/sensor", {
          headers: { Authorization: `Bearer ${header}` }
        })
          .then(({ data }) => setDataSensor(data.data));
      })
      .catch(({ response }) => console.error(response))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    getData();
    dispatch(routePageName('add automation'));
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Flex w="100%" h={['100%']} flexDir="column" overflow={"auto"}>
          <Formik
            initialValues={{
              Nama: actuator.name,
              "Sensor Rujukan": undefined,
              Aksi: undefined,
              Kondisi: undefined,
              "Nilai Batas": 0,
            }}
            validationSchema={schema}
            onSubmit={async (values, actions) => {
              axios.post(base_url + "api/v1/automation", {
                id_aktuator: actuator.id,
                id_sensor: parseInt(values["Sensor Rujukan"]),
                action: Boolean(values.Aksi),
                condition: values.Kondisi,
                constant: values["Nilai Batas"]
              }, {
                headers: {
                  Authorization: `Bearer ${header}`
                }
              })
                .then(({ data }) => {
                  // console.log(data)
                  navigate("/unit/dashboard/aktuator/" + id)
                }
                )
                .catch(({ response }) => console.error(response))
                .finally(() => setIsLoading(false))
              actions.setSubmitting(false)
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form style={{
                marginTop: 20,
                color: "black",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start"
              }}
              onSubmit={handleSubmit}>
                {Object.keys(values).map((item, index) => (
                  <FormControl isInvalid={errors[item] && touched[item]} key={index} pb={2}>
                    <FormLabel>{item}</FormLabel>
                    {item !== 'Nama' && item !== "Nilai Batas" ? (
                      <Select name={item} icon={<MdArrowDropDown />} placeholder={"Pilih " + item} onChange={handleChange} onBlur={handleBlur} value={values[item]}>
                        {item === "Sensor Rujukan" ? (
                          dataSensor.map((sensor, index) => (
                            <option value={sensor.id} key={index}>{sensor.name}</option>
                          ))) : item === "Aksi" ? (
                            <>
                              <option value={0}>On</option>
                              <option value={1}>Off</option>
                            </>
                          ) : item === "Kondisi" ? (
                            <>
                              <option value={">"}>Lebih besar dari (&gt;)</option>
                              <option value={"<"}>Lebih kecil dari (&lt;)</option>
                            </>
                          ) : null}
                      </Select>
                    ) : (
                      <Input
                        type={item === 'Nama' ? 'text' : 'number'}
                        name={item}
                        value={values[item]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isReadOnly={item === 'Nama'}
                      />
                    )}
                    {errors[item] && touched[item] && <FormErrorMessage>{errors[item]}</FormErrorMessage>}
                  </FormControl>
                ))}
                <Button
                  marginTop={2}
                  width="25%"
                  height="50px"
                  alignSelf={"flex-end"}
                  borderRadius="10px"
                  backgroundColor="var(--color-primer)"
                  type="submit"
                >
                  <Text
                    fontWeight="bold"
                    fontFamily="var(--font-family-secondary)"
                    fontSize="var(--header-3)"
                    color="var(--color-on-primary)"
                    colorScheme="var(--color-on-primary)"
                  >
                    Tambah
                  </Text>
                </Button>
              </Form>
            )}
          </Formik>
        </Flex>
      )}
    </>
  );
}

export default AutomationAddBySensor;
