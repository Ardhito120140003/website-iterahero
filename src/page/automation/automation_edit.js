import React, { useState, useEffect } from 'react';
import {
  Flex, Text, Button, Input, Wrap, Select,
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
import { useParams } from 'react-router';
import { routePageName, logout, selectUrl } from '../../features/auth/authSlice';

import Loading from '../../component/loading/loading';
import kondisiAutomatis from '../../Utility/dropdown_kondisi';
import dropLifeCycle from '../../Utility/lifeCycleDropDown';
import { TabTitle } from '../../Utility/utility';
import { selectToken } from '../../features/auth/authSlice';
import { MdArrowDropDown } from 'react-icons/md';


function AutomationEdit() {
  const base_url = useSelector(selectUrl);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [dataAutomation, setDataAutomation] = useState({});
  const [dataSensor, setDataSensor] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup.object({
    Nama: yup.string().required('data harus diisi'),
    "Sensor Rujukan": yup.number().required('data harus diisi'),
    Kondisi: yup.string().required('data harus diisi'),
    Aksi: yup.bool().required('data harus diisi'),
    "Nilai Batas": yup.number().min(0, 'Nilai harus lebih dari 0').required('data harus diisi'),
  });

  const header = useSelector(selectToken)


  const getAutomation = async () => {
    await axios
      .get(base_url + "api/v1/automation", {
        params: {
          id_automation: id,
          type: "bySensor"
        },
        headers: {
          Authorization: `Bearer ${header}`,
        },
      })
      .then(({ data }) => {
        console.log(data)
        setDataAutomation(data.data);
        axios.get(base_url + "api/v1/greenhouse/" + data.data.aktuator.greenhouseId + "/sensor", {
          headers: {
            Authorization: `Bearer ${header}`
          }
        })
          .then(({ data }) => {
            console.log(data)
            setDataSensor(data.data)
          })
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setIsLoading(false)
        dispatch(routePageName(`Edit Automation`))
      })
  };


  useEffect(() => {
    getAutomation();
  }, []);

  TabTitle('Tambah Automation - ITERA Hero');
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Wrap>
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
              <Link
                to={`/unit/dashboard/aktuator/${dataAutomation.aktuator.id}`}
              >
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
              {`Edit Automation ${dataAutomation.aktuator.name}`}
            </Text>
          </Flex>
          <Flex w="100%" flexDir="column">
            <Formik
              initialValues={{
                Nama: dataAutomation.aktuator.name,
                "Sensor Rujukan": dataAutomation.sensor.id,
                Aksi: dataAutomation.action,
                Kondisi: dataAutomation.condition,
                "Nilai Batas": dataAutomation.constant,
              }}
              validationSchema={schema}
              onSubmit={async (values, actions) => {
                console.log({ values })
                axios.put(base_url + "api/v1/automation", {
                  id_sensor: parseInt(values["Sensor Rujukan"]),
                  action: Boolean(values.Aksi),
                  condition: values.Kondisi,
                  constant: values["Nilai Batas"]
                }, {
                  params: {
                    id,
                    type: 'bySensor'
                  },
                  headers: {
                    Authorization: `Bearer ${header}`
                  }
                })
                  .then(({ data }) => {
                    console.log(data)
                    navigate("/unit/dashboard/aktuator/" + dataAutomation.aktuator.id)
                  })
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
                                <option value={true}>On</option>
                                <option value={false}>Off</option>
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
                      Perbarui
                    </Text>
                  </Button>
                </Form>
              )}
            </Formik>
          </Flex>
        </Wrap>
      )}
    </>
  );
}

export default AutomationEdit;
