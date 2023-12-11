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
import { selectToken, selectUrl } from '../../features/auth/authSlice';
import axios from 'axios';
import { routePageName } from '../../features/auth/authSlice';

import Loading from '../../component/loading/loading';
import { TabTitle } from '../../Utility/utility';

function SchedulingAdd(props) {
  const { id } = props.data;
  TabTitle('Edit Automation - ITERA Hero');
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("")
  const header = useSelector(selectToken)
  const navigate = useNavigate();
  const base_url = useSelector(selectUrl)

  const schema = yup.object({
    "Jam Mulai": yup.string().required('data harus diisi'),
    "Durasi Menyala": yup.number().required('data harus diisi'),
    Perulangan: yup.number().min(1, 'Harus lebih dari nol').required('data harus diisi'),
    "Interval waktu menyala (jam)": yup.number().required('data harus diisi'),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(base_url + "api/v1/aktuator", {
      params: {
        id
      },
      headers: {
        Authorization: `Bearer ${header}`
      }
    })
    .then(({ data }) => setName(data.data.name))
    .catch(({ response }) => console.error(error))
    .finally(() => setIsLoading(false))
    dispatch(routePageName('add automation'));
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Flex w="100%" h={['100%']} flexDir="column">
          <Formik
            initialValues={{
              "Nama": name,
              "Jam Mulai": undefined,
              "Durasi Menyala": undefined,
              Perulangan: undefined,
              "Interval waktu menyala (jam)": undefined,
            }}
            validationSchema={schema}
            onSubmit={async (values, actions) => {
              console.log(values)
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
                console.log(data)
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

export default SchedulingAdd;
