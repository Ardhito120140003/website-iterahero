import React, { useState, useEffect } from 'react';
import {
  Flex, Text, Button, Input, Select,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/form-control';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { selectToken } from '../../features/auth/authSlice';
import { useParams } from 'react-router';
import { routePageName, logout, selectUrl } from '../../features/auth/authSlice';
import { scheduling } from '../../Utility/api_link';

import Loading from '../../component/loading/loading';
import { TabTitle } from '../../Utility/utility';

function ScheduleEdit() {
  const base_url = useSelector(selectUrl);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [dataSchedule, setDataSchedule] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const header = useSelector(selectToken)

  const schema = yup.object({
    "Jam Mulai": yup.string().required('data harus diisi'),
    "Durasi Menyala": yup.number().required('data harus diisi'),
    Perulangan: yup.number().min(1, 'Harus lebih dari nol').required('data harus diisi'),
    "Interval waktu menyala (jam)": yup.number().required('data harus diisi'),
  });

  const getSchedule = async () => {
    axios.get(base_url + "api/v1/automation", {
      params: {
        id_automation: id,
        type: "bySchedule"
      },
      headers: {
        Authorization: `Bearer ${header}`
      }
    })
    .then(({ data }) => {
      console.log(data)
      setDataSchedule(data.data)
    })
    .catch(({ response }) => console.error(response))
    .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    getSchedule();
    dispatch(routePageName(`Edit Automation`));
  }, []);

  TabTitle('Tambah Automation - ITERA Hero');
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Flex w="100%" h={['100%']} flexDir="column">
          <Flex bg="white" borderRadius="10px" p="10px">
            <Flex>
              <Link to="/unit/dashboard/2">
                <Text fontSize="20px" fontWeight="bold" mr="10px">
                  Dashboard
                </Text>
              </Link>
            </Flex>
            <Flex>
              <Text fontSize="20px" fontWeight="bold" mr="10px">
                {'>'}
              </Text>
            </Flex>
            <Flex>
              <Link to={`/unit/dashboard/aktuator/${dataSchedule.aktuator.id}`}>
                <Text fontSize="20px" fontWeight="bold" mr="10px">
                  Automation
                </Text>
              </Link>
            </Flex>
            <Flex>
              <Text fontSize="20px" fontWeight="bold" mr="10px">
                {'>'}
              </Text>
            </Flex>
            <Text fontSize="20px" fontWeight="bold" mb="10px">
              {`Edit Automation ${dataSchedule.aktuator.name}`}
            </Text>
          </Flex>
          <Formik
            initialValues={{
              "Nama": dataSchedule.aktuator.name,
              "Jam Mulai": dataSchedule.startTime,
              "Durasi Menyala": dataSchedule.duration,
              Perulangan: dataSchedule.iterasi,
              "Interval waktu menyala (jam)": dataSchedule.interval,
            }}
            validationSchema={schema}
            onSubmit={async (values, actions) => {
              // console.log(values)
              axios.post(base_url + "api/v1/automation", {
                id_aktuator: parseInt(id),
                interval: values["Interval waktu menyala (jam)"],
                duration: values["Durasi Menyala"],
                iterasi: values.Perulangan,
                startTime: values["Jam Mulai"]
              }, {
                headers: {
                  Authorization: `Bearer ${header}`
                }
              })
              .then(({ data }) => {
                // console.log(data)
                navigate("/unit/dashboard/aktuator/" + id)
              })
              .catch(({ response }) => console.error(response))
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
                      <Input
                        type={item === 'Jam Mulai' ? 'time' : item === 'Nama' ? 'text' : 'number'}
                        name={item}
                        value={values[item]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isReadOnly={item === 'Nama'}
                      />
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

export default ScheduleEdit;
