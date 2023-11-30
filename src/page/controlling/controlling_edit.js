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
import * as yup from 'yup';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { routePageName, logout, selectUrl } from '../../features/auth/authSlice';
import { TabTitle } from '../../Utility/utility';
import { updateActuatorDetail, icons } from '../../Utility/api_link';
import Loading from '../../component/loading/loading';
import { MdArrowDropDown } from 'react-icons/md';

function Controlling_Edit() {
  const base_url = useSelector(selectUrl);
  TabTitle('Edit Aktuator - ITERA Hero');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams()
  const header = localStorage.getItem('token');
  const [isloading, setIsLoading] = useState(true);
  const [aktuator, setAktuator] = useState({})
  const [iconsList, setIconsList] = useState([])

  const schema = yup.object({
    Name: yup.string().required('Nama harus diisi'),
    Type: yup.string().required('Tipe harus diisi'),
    Merek: yup.string().required('Merek harus diisi'),
  });

  const getData = async () => {
    axios.get(base_url + "api/v1/aktuator", {
      params: {
        id
      },
      headers: {
        Authorization: `Bearer ${header}`
      }
    })
    .then(({ data }) => {
      console.log(data)
      setAktuator(data.data)
      axios.get(base_url + "api/v1/icon", {
        headers: {
          Authorization: `Bearer ${header}`
        }
      })
      .then(({ data }) => setIconsList(data.data))
    })
    .catch(({ response }) => console.error(response))
    .finally(() => setIsLoading(false))
  };

  useEffect(() => {
    dispatch(routePageName('Controlling'));
    getData();
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
                  List Controlling pada Greenhouse
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
                {aktuator.name}
                {' '}
              </Text>
            </Flex>
          </Flex>
          <Formik
            initialValues={{
              Name: aktuator.name,
              Type: aktuator.icon.name,
              Merek: aktuator.merek
            }}
            onSubmit={async (values, action) => {
              setTimeout(() => {
                axios.patch(base_url + "api/v1/aktuator", {
                  name: values.Name,
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
                  console.log(data)
                })
                .catch(({ response }) => console.error(response))
                navigate("/unit/controlling")
                alert(JSON.stringify(values, null, 2))
                action.setSubmitting(false)
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
                  <FormControl isInvalid={errors[item]} key={index} pb={2}>
                    <FormLabel>{item}</FormLabel>
                    {item === 'Type' ? (
                      <Flex flexDir={"row"} alignItems={"center"}>
                        <Select name={item} icon={<MdArrowDropDown />} onChange={handleChange} value={values[item]} flex={3}>
                          {iconsList.filter((icon) => !icon.name.toLowerCase().includes('sensor')).map((actuator, index) => (
                            <option value={actuator.name} key={index}>{actuator.name}</option>
                          ))}
                        </Select>
                        <Image src={iconsList.find((actuator) => actuator.name === values[item])?.logo} alt="Actuator Logo" boxSize="50px" ml={2} flex={1} objectFit={"contain"}/>
                      </Flex>
                    ) : (
                      <Input
                        type={['Range Min', 'Range Max'].includes(item) ? 'number' : 'text'}
                        name={item}
                        value={values[item]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    )}
                    { errors[item] && touched[item] && <FormErrorMessage>{errors[item]}</FormErrorMessage> }
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
export default Controlling_Edit;
