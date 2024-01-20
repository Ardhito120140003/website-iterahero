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
import { selectToken } from '../../features/auth/authSlice';
import { Formik, Form } from 'formik';
import Loading from "../../component/loading/loading";

function CardStatusPeracikan({ tandon, sensor }) {
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const base_url = useSelector(selectUrl);
  const header = useSelector(selectToken)
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
    // console.log('data update : ', rasioA, rasioB, rasioAir, ppm, id)
    axios.patch(base_url + "api/v1/tandonUtama", {
      rasioA: parseFloat(rasioA),
      rasioB: parseFloat(rasioB),
      rasioAir: parseFloat(rasioAir),
      ppm: parseFloat(ppm),
    }, {
      params: {
        edit: "rasio",
        id_tandon: parseInt(id)
      },
      headers: {
        Authorization: `Bearer ${header}`,
        'content-type': 'multipart/form-data',
      },
    })
      .then(response => {
        window.location.reload()
      })
      .catch(err => {
        console.error(err);
      })
  };

  useEffect(() => {
    const fetchData = async () => {
      axios.get(`${base_url}api/v1/logging/sensor`, {
        headers: {
          Authorization: `Bearer ${header}`
        }
      })
        .then((response) => {
          setSensorRealtime(response.data.data)
          setIsLoading(false)
        })
        .catch(err => console.error(err))
    }

    const interval = setInterval(() => {
      fetchData()
    }, 1500)

    return (() => clearInterval(interval))
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Flex
            p={"30px"}
            border="1px solid #E2E8F0"
            borderRadius="10px"
            width="100%"
            height="100%"
            flexDirection="column"
          >
            <Flex justifyContent="center">
              <Text>Tandon Peracikan</Text>
            </Flex>

            <Flex gap={'10px'} w={'100%'}>

              <Flex
                direction={"column"}
                border="1px solid #E2E8F0"
                borderRadius={"10px"}
                py={"15px"}
                mt={"20px"}
                w={'35%'}
              >
                <Flex justifyContent="center" mt="5px">
                  {tandon.status === "Kosong" || tandon.status === "Ada Isinya" ? (
                    <Icon as={GiWaterTower} w="130px" h="80px" color="#14453E" />
                  ) : (
                    <CircularProgress
                      // value={30}
                      size="80px"
                      isIndeterminate
                      color="green.300"
                    />
                  )}
                </Flex>
                <Flex justifyContent="center" mt={"10px"}>
                  <Text>{tandon.status}</Text>
                </Flex>
              </Flex>

              <Flex w={'65%'}>
                {isLoading ? (
                  <Flex
                    flexDirection="column"
                    border="1px solid #E2E8F0"
                    borderRadius={"10px"}
                    p={"10px"}
                    mt={"20px"}
                    w={"100%"}
                  >
                    <Loading />
                  </Flex>
                ) : (
                  <>
                    <Flex
                      flexDirection="column"
                      border="1px solid #E2E8F0"
                      borderRadius={"10px"}
                      py={"15px"}
                      px={"10px"}
                      mt={"20px"}
                      w={"100%"}
                    >
                      <Grid templateColumns="repeat(2, 1fr)" fontSize={'sm'}>
                        <Text color="black" textAlign="left">
                          Status Tandon
                        </Text>
                        {tandon.isOnline ? (
                          <Text color="green" textAlign="left">
                            : Online
                          </Text>
                        ) : (
                          <Text color="red" textAlign="left">
                            : Offline
                          </Text>
                        )}
                      </Grid>

                      {sensor.map((item, index) => {
                        const matchedData = sensorRealtime.find(obj => obj.channel === item.channel || obj.gpio === item.GPIO);
                        const sensorValue = matchedData ? matchedData.nilai : null
                        return (
                          <Grid key={index} templateColumns="repeat(2, 1fr)" justifyContent={'center'} fontSize={'sm'}> 
                            <Text color="black" textAlign="left">
                              {item.name}
                            </Text>
                            <Text color="black" textAlign="left">
                              : {sensorValue} {item.unit_measurement}
                            </Text>
                          </Grid>
                        )
                      })}

                      <Grid templateColumns="repeat(2, 1fr)" fontSize={'sm'}>
                        <Text color="black" textAlign="left">
                          Volume
                        </Text>

                        <Text color="black" textAlign="left">
                          : {tandon.capacity} L
                        </Text>

                      </Grid>
                    </Flex>
                  </>
                )}
              </Flex>
            </Flex>

            <Button
              onClick={onOpen}
              bgColor={"white"}
              p={"5px"}
              w={"100%"}
              justifyContent={"center"}
              alignContent={"center"}
              border="1px solid #E2E8F0"
              borderRadius={"10px"}
              mt={"10px"}
              backgroundColor="#09322D"
            >
              <Text fontSize={"20px"}
                color="white"
              >
                {tandon.rasioA} : {tandon.rasioB} : {tandon.rasioAir} = {tandon.ppm}
              </Text>
            </Button>

          </Flex>



          <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'sm', md: 'xl' }}>
            <ModalOverlay />
            <ModalContent p={"10px"}>
              <ModalHeader alignSelf="center">Perbandingan Rasio Pupuk</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Formik
                  initialValues={{
                    rasioA: tandon.rasioA,
                    rasioB: tandon.rasioB,
                    rasioAir: tandon.rasioAir,
                    ppm: tandon.ppm,
                    id: tandon.id,
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
        </>
      )}
    </>
  );
}

export default CardStatusPeracikan;
