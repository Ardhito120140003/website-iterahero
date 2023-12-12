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
  Select,
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
  icons,
} from '../../Utility/api_link';
import Loading from '../../component/loading/loading';
import { MdArrowDropDown } from 'react-icons/md';

function Controlling_Add() {
  const base_url = useSelector(selectUrl);
  TabTitle('Tambah Aktuator - ITERA Hero');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, route } = useParams()
  const [iconsList, setIconsList] = useState([]);
  const [target, setTarget] = useState({})
  const [isloading, setIsLoading] = useState(true);
  const header = localStorage.getItem('token')

  const schema = yup.object({
    Name: yup.string().required('Nama harus diisi'),
    Type: yup.string().required('Ikon harus diisi'),
    Merek: yup.string().required('Warna harus diisi'),
  });

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
        // console.log(data)
        setTarget(data.data)
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
      .catch(({ response }) => console.error(response))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    dispatch(routePageName('Controlling'));
    getGreenhouse();
  }, []);

  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <Flex w="100%" flexDir="column">
          <Flex width="100%">
            <Link to="/unit/controlling">
              <Flex marginRight="2">
                <Text
                  fontWeight="semibold"
                  fontSize="var(--header-3)"
                  color="var(--color-primer)"
                >
                  List Controlling pada {`${(() => {
                    let x = route.replace(/([A-Z])/g, ' $1');
                    let text = x.charAt(0).toUpperCase() + x.slice(1)
                    return text
                  })()}`}
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
                  {' '}
                  {target.nama ?? target.name}
                  {' '}
                </Text>
              </Flex>
            </Link>
          </Flex>
          <Formik
            initialValues={{
              Name: undefined,
              Type: '',
              Merek: undefined,
            }}
            onSubmit={async (values, action) => {
              setTimeout(() => {
                const where = route === 'greenhouse' ? 'greenhouse' : 'tandon';
                axios.post(base_url + "api/v1/aktuator", {
                  name: values.Name,
                  [`id_${where}`]: parseInt(id),
                  merek: values.Merek,
                  type: values.Type,
                }, {
                  params: {
                    id
                  },
                  headers: {
                    Authorization: `Bearer ${header}`
                  }
                })
                  .then(({ data }) => {
                    // console.log(data)
                    navigate('/unit/controlling')
                  })
                  .catch(({ response }) => console.error(response))

                alert(JSON.stringify(values, null, 2))
                action.setSubmitting(false)
                navigate
              }, 1000)
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
                  <FormControl isInvalid={errors[item] && touched[item]} key={index} pb={2}>
                    <FormLabel>{item}</FormLabel>
                    {item === 'Type' ? (
                      <Select name={item} icon={<MdArrowDropDown />} onChange={handleChange} value={values[item]} onBlur={handleBlur}>
                        <option disabled={values.Type} selected>-- Pilih Icon --</option>
                        {iconsList.filter((icon) => !category.name.toLowerCase().includes('sensor')).map((sensor, index) => (
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
export default Controlling_Add;
