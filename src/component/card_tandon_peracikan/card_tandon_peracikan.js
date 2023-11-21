import React, { useState } from "react";
import {
  Icon,
  Flex,
  Text,
  Grid,
  CircularProgress,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/form-control';
import { GiWaterTower } from "react-icons/gi";
import { useEffect } from "react";
import axios from 'axios';
import { selectUrl } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { Formik, Form } from 'formik';

function CardStatusPeracikan({ id, sensor }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [trigger, setTrigger] = useState(true);
  const [sensorValue, setSensorValue] = useState([]);
  const [dataApi, setDataApi] = useState([]);
  const base_url = useSelector(selectUrl);
  const header = localStorage.getItem('token');
  const [sensorRealtime, setSensorRealtime] = useState([])

  const data = {
    rasioA: '',
    rasioB: '',
    rasioAir: '',
    ppm: '',
  };

  const schema = yup.object({
    rasioA: yup.number().required(' data harus diisi'),
    rasioB: yup.number().required('data harus diisi'),
    rasioAir: yup.number().required('data harus diisi'),
    ppm: yup.number().required('data harus diisi'),
  });


  const submit = (
    rasioA,
    rasioB,
    rasioAir,
    ppm,
    id,
  ) => {
    data.rasioA = rasioA;
    data.rasioB = rasioB;
    data.rasioAir = rasioAir;
    data.ppm = ppm;
    data.id = id;

    if (
      data.rasioA == ''
      || data.rasioB == ''
      || data.rasioAir == ''
      || data.ppm == ''
      || data.id == ''

    ) {
      return alert('Masih ada yang belum di isi');
    }
    //setIsLoading(false);
    updateAutomation(
      rasioA,
      rasioB,
      rasioAir,
      ppm,
      id,
    );
  };

  const updateAutomation = (
    rasioA,
    rasioB,
    rasioAir,
    ppm,
    id,
  ) => {
    console.log('data update : ',rasioA,rasioB,rasioAir,ppm,id)
    axios.patch(base_url + "api/v1/tandonUtama",    {
      rasioA: parseFloat(rasioA),
      rasioB: parseFloat(rasioB),
      rasioAir: parseFloat(rasioAir),
      ppm: parseFloat(ppm),
      id_tandon : parseInt(id)
    }, {
      headers: {
        Authorization: `Bearer ${header}`
      },
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.error(err);
      })
  };

  useEffect(() => {
    axios.get(`${base_url}api/v1/tandonUtama`, {
      params: {
        id
      },
      headers: {
        Authorization: `Bearer ${header}`,
      }
    })
      .then((response) => {
        setDataApi(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching formula data:', error);
      });
      axios.get(`${base_url}api/v1/logging`, {
        headers: {
          Authorization: `Bearer ${header}`
        }
      })
      .then((response) => {
        setSensorRealtime(response.data.data)
      })
      .catch(err => console.error(err))

    setTimeout(() => setTrigger(!trigger), 200)
  }, [trigger])

  return (
    <Flex
      borderRadius="10px"
      width="100%"
      border="1px solid #E2E8F0"
      height="100%"
      flexDirection="column"
      alignItems="center"
      position="sticky"
      p={"30px"}
    >
      <Flex justifyContent="center">
        <Text>Tandon Peracikan</Text>
      </Flex>

      <Flex direction={"column"}>
        <Flex justifyContent="center" marginY="30px">
          {dataApi.status === "Kosong" || dataApi.status === "Ada Isinya" ? (
            <Icon as={GiWaterTower} w="230px" h="130px" color="#14453E" />
          ) : (
            <CircularProgress
              value={30}
              size="100px"
              isIndeterminate
              color="green.300"
            />
          )}
        </Flex>
        <Flex justifyContent="center" marginY="10px">
          {/* {dataApi.status === "Kosong" ? (
            <Text color="grey" fontSize="12px">
              Tandon Kosong
            </Text>
          ) : (
            <Text color="grey" fontSize="12px">
              Sedang Melakukan Peracikan...
            </Text>
          )} */}
          <Text>{dataApi.status}</Text>
        </Flex>
      </Flex>

      <Flex
        flexDirection="column"
        border="1px solid #E2E8F0"
        borderRadius={"10px"}
        w={"100%"}
        p={"15px"}
        my={"20px"}
        paddingLeft={{ base: "7%", sm: "15%", md: "15%", lg: "13%", xl: "15%" }}
      >
        {sensor.map((item, index) => {
          const matchedData = sensorRealtime.find(obj => obj.channel === item.channel || obj.gpio === item.GPIO);
          const sensorValue = matchedData ? matchedData.nilai : null
          return (
            <Grid key={index} templateColumns="repeat(2, 1fr)">
              <Text color="black" textAlign="left">
                {item.name}
              </Text>
              <Text color="black" textAlign="left">
                : {sensorValue} {item.unit_measurement}
              </Text>
              {/* <Text color="black" textAlign="left">
                : {sensorValue[index]} {item.unit_measurement}
              </Text> */}
           </Grid>
          )
        })}
        <Grid templateColumns="repeat(2, 1fr)">
          <Text color="black" textAlign="left">
            Status Tandon
          </Text>
          {dataApi.isOnline ? (
            <Text color="green" textAlign="left">
              : Online
            </Text>
          ) : (
            <Text color="red" textAlign="left">
              : Offline
            </Text>
          )}
        </Grid>
      </Flex>

      <Button
        onClick={onOpen}
        bgColor={"#09322D"}
        p={"5px"}
        w={"100%"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Text color={"white"} fontSize={"20px"}>
          {dataApi.rasioA} : {dataApi.rasioB} : {dataApi.rasioAir} = {dataApi.ppm}
        </Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={{base:'sm',md:'xl'}}>
        <ModalOverlay />
        <ModalContent p={"10px"}>
          <ModalHeader alignSelf="center">Perbandingan Rasio Pupuk</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={{
                rasioA: dataApi.rasioA,
                rasioB: dataApi.rasioB,
                rasioAir: dataApi.rasioAir,
                ppm: dataApi.ppm,
                id: dataApi.id,
              }}
              validationSchema={schema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <Form>
                  <FormControl
                  isRequired
                    mb={'15px'}
                    isInvalid={errors.rasioA && touched.rasioA}
                  >
                    <FormLabel color="var(--color-primer)">
                      Rasio Nutrisi A
                    </FormLabel>
                    <Input
                      color="var(--color-primer)"
                      maxWidth="100%"
                      marginTop="0 auto"
                      type="number"
                      name="rasioA"
                      defaultValue={values.rasioA}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outline"
                    />
                    <FormErrorMessage>{errors.rasioA}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                  isRequired
                  mb={'15px'}
                    isInvalid={errors.rasioB && touched.rasioB}
                  >
                    <FormLabel color="var(--color-primer)">
                    Rasio Nutrisi B
                    </FormLabel>
                    <Input
                      color="var(--color-primer)"
                      maxWidth="100%"
                      marginTop="0 auto"
                      type="number"
                      name="rasioB"
                      defaultValue={values.rasioB}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outline"
                    />
                    <FormErrorMessage>{errors.rasioB}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                  isRequired
                  mb={'15px'}
                    isInvalid={errors.rasioAir && touched.rasioAir}
                  >
                    <FormLabel color="var(--color-primer)">
                      Rasio Air
                    </FormLabel>
                    <Input
                      color="var(--color-primer)"
                      maxWidth="100%"
                      marginTop="0 auto"
                      type="number"
                      name="rasioAir"
                      defaultValue={values.rasioAir}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outline"
                    />
                    <FormErrorMessage>{errors.rasioAir}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                  isRequired
                  mb={'15px'}
                    isInvalid={errors.ppm && touched.ppm}
                  >
                    <FormLabel color="var(--color-primer)">
                      PPM
                    </FormLabel>
                    <Input
                      color="var(--color-primer)"
                      maxWidth="100%"
                      marginTop="0 auto"
                      type="number"
                      name="ppm"
                      defaultValue={values.ppm}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outline"
                    />
                    <FormErrorMessage>{errors.ppm}</FormErrorMessage>
                  </FormControl>

                  <Flex mt={'20px'} justifyContent={'flex-end'}>
                  <Button
                    onClick={() => {
                      submit(
                        values.rasioA,
                        values.rasioB,
                        values.rasioAir,
                        values.ppm,
                        values.id,
                      ); onClose()
                    }}
                    backgroundColor="#09322D"
                    color="white"
                    mr="3"
                    paddingX="30px"
                  >
                    Simpan
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>

  );
}

export default CardStatusPeracikan;
