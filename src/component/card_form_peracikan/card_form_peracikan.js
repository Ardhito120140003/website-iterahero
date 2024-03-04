import React, { useState, useEffect, useRef } from 'react';
import { Formik, Field, Form } from 'formik';
import {
  Flex,
  Text,
  Select,
  Button,
  Box,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Icon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectToken } from '../../features/auth/authSlice';
import { selectUrl } from '../../features/auth/authSlice';
import { BiTrash } from "react-icons/bi";
import Loading from '../loading/loading';
//import { RiPencilFill } from 'react-icons/ri';

function CardFormPeracikan({ tandon }) {
  const { isOpen: isOpenRacikModal, onOpen: onOpenRacikModal, onClose: onCloseRacikModal } = useDisclosure();
  const { isOpen: isOpenSaveModal, onOpen: onOpenSaveModal, onClose: onCloseSaveModal } = useDisclosure();
  const { isOpen: isOpenUpdateModal, onOpen: onOpenUpdateModal, onClose: onCloseUpdateModal } = useDisclosure();
  const { isOpen: isOpenDeleteModal, onOpen: onOpenDeleteModal, onClose: onCLoseDeleteModal } = useDisclosure();

  const [dataApi, setDataApi] = useState([]);
  const base_url = useSelector(selectUrl);
  const header = useSelector(selectToken)
  const cancelRef = useRef();
  const [selectedFormulaId, setSelectedFormulaId] = useState(null);
  const [action, setAction] = useState(false);
  const [selected, setSelected] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get(`${base_url}api/v1/resep`, {
      headers: {
        Authorization: `Bearer ${header}`,
      }
    })
      .then((response) => {
        setDataApi(response.data.data);
        setIsLoading(false);
        // console.log('data resep :',dataApi)
      })
      .catch((error) => {
        console.error('Error fetching formula data:', error);
      });
  }, [onOpenSaveModal, action]);

  const handleRacikSubmit = async (id) => {
    // console.log('ID Form Values:', id);

    axios.post(base_url + 'api/v1/peracikan', {
      resep: id,
      id_tandon: tandon.id,
    }, {
      headers: {
        Authorization: `Bearer ${header}`
      }
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  };


  const handleUpdate = async (
    nama,
    ph_min,
    ph_max,
    ppm_min,
    ppm_max,
    volume,
    id,
  ) => {
    // console.log(id)
    axios.patch(`${base_url}api/v1/resep`, {
      nama: nama,
      ph_min: parseFloat(ph_min),
      ph_max: parseFloat(ph_max),
      ppm_min: parseFloat(ppm_min),
      ppm_max: parseFloat(ppm_max),
      volume: parseFloat(volume)
    }, {
      params: {
        id,
      },
      headers: {
        Authorization: `Bearer ${header}`
      }
    })
      .then(response => {
        // console.log(response);
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => setAction(!action))
  };

  const handleSaveSubmit = async (
    nama,
    ph_min,
    ph_max,
    ppm_min,
    ppm_max,
    volume,
  ) => {
    axios.post(`${base_url}api/v1/resep`, {
      nama: nama,
      ph_min: parseFloat(ph_min),
      ph_max: parseFloat(ph_max),
      ppm_min: parseFloat(ppm_min),
      ppm_max: parseFloat(ppm_max),
      volume: parseFloat(volume)
    }, {
      headers: {
        Authorization: `Bearer ${header}`,
      },
    })
      .then((response) => {
        console.log('Formula berhasil disimpan :', response.data);
      })
      .catch((error) => {
        console.error('Error menyimpan formula :', error);
      });

    // console.log('simpan',nama,ph,ppm,volume);
  };

  const handleDelete = async (id) => {
    // console.log('Formula id:', id);
    axios.delete(`${base_url}api/v1/resep`, {
      headers: {
        Authorization: `Bearer ${header}`,
      },
      params: {
        id: id
      }
    })
      .then((response) => {
        // console.log(response);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setAction(!action));
  };

  return (
    isLoading ?
      (<Loading />) : (
        <Formik
          initialValues={{
            id: '',
            formula: '',
            newFormulaName: '',
            ph_min: '',
            ph_max: '',
            ppm_min: '',
            ppm_max: '',
            volume: '',
          }}

          validate={(values) => {
            const errors = {};
            if (!values.newFormulaName) {
              errors.newFormulaName = 'Nama formula harus diisi';
            }
            if (!values.ph_min) {
              errors.ph_min = 'PH Min harus diisi';
            }
            if (!values.ph_max) {
              errors.ph_max = 'PH Max harus diisi';
            }
            if (!values.ppm_min) {
              errors.ppm_min = 'PPM Min harus diisi';
            }
            if (!values.ppm_max) {
              errors.ppm_max = 'PPM Max harus diisi';
            }
            if (!values.volume) {
              errors.volume = 'Volume harus diisi';
            }
            if (values.volume > tandon.capacity) {
              errors.volume = 'Volume melebihi kapasitas'
            }
            return errors;
          }}

          onSubmit={(values, actions) => {
            // console.log('values yang disubmit :',values);

            if (values.formula === 'Tambah Formula') {
              onOpenSaveModal();
            } else if (values.formula !== 'Tambah Formula' && values.formula !== '') {
              onOpenRacikModal(values.id);
            }

            actions.setSubmitting(false);
          }}
        >
          {({ values, errors, touched, isValid, setFieldValue, setTouched }) => (
            <Form style={{ height: "100%" }}>
              <Flex flexDirection="column" width="100%" height="100%" gap={"10px"}>
                <Box color="black"
                //mt="5px"
                >
                  <Field name="formula">
                    {({ field }) => (
                      <FormControl isInvalid={errors.formula && touched.formula && values.formula} isReadOnly={!Boolean(values.formula)}>
                        <Flex alignItems={"center"}>
                          <FormLabel color={'black'}>Formula</FormLabel>
                          <Select
                            {...field}
                            borderRadius="10"
                            value={values.formula}
                            onChange={(e) => {
                              setSelected(e.target.value)
                              const x = parseInt(e.target.value)
                              if (isNaN(x)) {
                                setFieldValue('id', '');
                                setFieldValue('newFormulaName', '');
                                setFieldValue('ph_min', '');
                                setFieldValue('ph_max', '');
                                setFieldValue('ppm_min', '');
                                setFieldValue('ppm_max', '');
                                setFieldValue('volume', '');
                              } else {
                                setFieldValue('id', dataApi[x].id);
                                setFieldValue('newFormulaName', dataApi[x].nama);
                                setFieldValue('ph_min', dataApi[x].ph_min);
                                setFieldValue('ppm_min', dataApi[x].ppm_min);
                                setFieldValue('ph_max', dataApi[x].ph_max);
                                setFieldValue('ppm_max', dataApi[x].ppm_max);
                                setFieldValue('volume', dataApi[x].volume);
                                setTouched({}, false)
                              }
                              setFieldValue('formula', e.target.value);
                            }}
                          >
                            <option value="" disabled={values.formula}>--Pilih Formula--</option>
                            {dataApi.map((data, index) => (
                              <option key={index} value={index} style={{ color: 'black' }}>
                                {data.nama}
                              </option>
                            ))}
                            <option
                              //style={{ backgroundColor: '#09322D', color: 'white' }} 
                              value="Tambah Formula">--Tambah Formula--
                            </option>
                          </Select>
                        </Flex>
                        <FormErrorMessage>{errors.formula}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
                {selected === '' ? (<Flex justifyContent={"center"} alignItems={"center"} flex={1}><Text>Pilih Resep</Text></Flex>) : (
                  <Flex direction={'column'}>
                    {values.formula === 'Tambah Formula' && (
                      <Box>
                        <Field name="newFormulaName">
                          {({ field }) => (
                            <FormControl isInvalid={errors.newFormulaName && touched.newFormulaName && values.formula} isReadOnly={!Boolean(values.formula)}>
                              <FormLabel color={'black'}>Nama Formula</FormLabel>
                              <Input
                                {...field}
                                type="text"
                                value={values.newFormulaName}
                                onChange={(e) => setFieldValue('newFormulaName', e.target.value)}
                                style={{ color: 'black' }}
                                placeholder="masukkan nama formula"
                              />
                              <FormErrorMessage>{errors.newFormulaName}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                    )}

                    <Flex direction={'column'} pb={3}>
                      <Text>PH</Text>
                      <Flex align={"center"}>
                        <Field name="ph_min">
                          {({ field }) => (
                            <FormControl isInvalid={errors.ph_min && touched.ph_min && values.formula} isReadOnly={!Boolean(values.formula)}>
                              <FormLabel color={'black'} textAlign={'center'}>Min</FormLabel>
                              <Input
                                {...field}
                                type="number"
                                value={values.ph_min}
                                onChange={(e) => setFieldValue('ph_min', e.target.value)}
                                style={{ color: 'black' }}
                                placeholder="nilai minimal ph"
                                textAlign={"center"}
                              />
                              <FormErrorMessage>{errors.ph_min}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Text mt={{ base: "6%", sm: "5%" }}> - </Text>
                        <Field name="ph_max">
                          {({ field }) => (
                            <FormControl isInvalid={errors.ph_max && touched.ph_max && values.formula} isReadOnly={!Boolean(values.formula)}>
                              <FormLabel color={'black'} textAlign={'center'}>Max</FormLabel>
                              <Input
                                {...field}
                                type="number"
                                value={values.ph_max}
                                onChange={(e) => setFieldValue('ph_max', e.target.value)}
                                style={{ color: 'black' }}
                                placeholder="nilai maksimal ph"
                                textAlign={"center"}
                              />
                              <FormErrorMessage>{errors.ph_max}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>
                    </Flex>

                    <Flex flexDirection={"column"} py={3}>
                      <Text>PPM</Text>
                      <Flex align={"center"}>
                        <Field name="ppm_min">
                          {({ field }) => (
                            <FormControl isInvalid={errors.ppm_min && touched.ppm_min && values.formula} isReadOnly={!Boolean(values.formula)}>
                              <FormLabel color={'black'} textAlign={'center'}>Min</FormLabel>
                              <Input
                                {...field}
                                type="number"
                                value={values.ppm_min}
                                onChange={(e) => setFieldValue('ppm_min', e.target.value)}
                                style={{ color: 'black' }}
                                placeholder="nilai minimal ppm"
                                textAlign={"center"}
                              />
                              <FormErrorMessage>{errors.ppm_min}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Text mt={{ base: "6%", sm: "5%" }}> - </Text>
                        <Field name="ppm_max">
                          {({ field }) => (
                            <FormControl isInvalid={errors.ppm_max && touched.ppm_max && values.formula} isReadOnly={!Boolean(values.formula)}>
                              <FormLabel color={'black'} textAlign={'center'}>Max</FormLabel>
                              <Input
                                {...field}
                                type="number"
                                value={values.ppm_max}
                                onChange={(e) => setFieldValue('ppm_max', e.target.value)}
                                style={{ color: 'black' }}
                                placeholder="nilai maksimal ppm"
                                textAlign={"center"}
                              />
                              <FormErrorMessage>{errors.ppm_max}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>
                    </Flex>

                    <Box py={3}>
                      <Field name="volume">
                        {({ field }) => (
                          <FormControl isInvalid={errors.volume && touched.volume && values.formula} isReadOnly={!Boolean(values.formula)}>
                            <FormLabel color={'black'}>Volume (L)</FormLabel>
                            <Input
                              {...field}
                              type="number"
                              value={values.volume}
                              onChange={(e) => setFieldValue('volume', e.target.value)}
                              style={{ color: 'black' }}
                              placeholder="masukkan volume pupuk (liter)"
                            />
                            <FormErrorMessage>{errors.volume}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>

                    {(values.formula !== 'Tambah Formula' && values.formula !== '') && (
                      <Box justifyContent={'flex-start'} p={'10px'} display={'flex'}>
                        <Flex alignSelf="center">
                          <Icon
                            as={BiTrash}
                            color="#14453E"
                            w="20px"
                            h="20px"
                            alignSelf="center"
                            onClick={() => {
                              // console.log(values.id);
                              setSelectedFormulaId(values.id);
                              onOpenDeleteModal();
                            }}
                          />
                        </Flex>
                      </Box>
                    )}


                    <Flex
                      flexDirection="row"
                      gap="10px"
                      mt={values.formula === 'Tambah Formula' ? "16px" : values.formula === '' ? "60px" : "10px"}
                    >
                      {values.formula === 'Tambah Formula' && (
                        <Button
                          type="Submit"
                          backgroundColor="#09322D"
                          w={'100%'}
                        >
                          Simpan Formula
                        </Button>
                      )}

                      {(values.formula !== 'Tambah Formula' && values.formula !== '') && (
                        <Button
                          type="button"
                          backgroundColor="#09322D"
                          w={'100%'}

                          onClick={onOpenUpdateModal}
                        >
                          Simpan Perubahan
                        </Button>
                      )}


                      {values.formula !== 'Tambah Formula' && (
                        <Button
                          type="Submit"
                          backgroundColor="#09322D"
                          w={'100%'}
                          isDisabled={isNaN(parseInt(selected)) ? false : (values.ph_max != dataApi[parseInt(selected)].ph_max ||
                            values.ph_min != dataApi[parseInt(selected)].ph_min ||
                            values.volume != dataApi[parseInt(selected)].volume ||
                            values.ppm_max != dataApi[parseInt(selected)].ppm_max ||
                            values.ppm_min != dataApi[parseInt(selected)].ppm_min ||
                            values.newFormulaName != dataApi[parseInt(selected)].nama) ? true : false}
                        >
                          Racik
                        </Button>
                      )}
                    </Flex>
                    {!isNaN(parseInt(selected)) && (
                      values.ph_max != dataApi[parseInt(selected)].ph_max ||
                      values.ph_min != dataApi[parseInt(selected)].ph_min ||
                      values.ppm_max != dataApi[parseInt(selected)].ppm_max ||
                      values.ppm_min != dataApi[parseInt(selected)].ppm_min ||
                      values.volume != dataApi[parseInt(selected)].volume ||
                      values.newFormulaName != dataApi[parseInt(selected)].nama) ? (
                      <Text fontSize={'xs'} color={'red'}> Ada pergantian nilai formula, simpan perubahan sebelum meracik </Text>
                    ) : null}
                  </Flex>
                )}
              </Flex>

              {/* Modal Racik */}
              <Modal isOpen={isOpenRacikModal} onClose={onCloseRacikModal} size={{ base: 'sm', md: 'xl' }}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader alignSelf="center">Proses Peracikan</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <Text>Apakah anda yakin untuk memproses formula ini ?</Text>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      onClick={() => { onCloseRacikModal(); handleRacikSubmit(values.id); }}
                      backgroundColor="#09322D"
                      color="white"
                      mr="3"
                      paddingX="30px"
                    >
                      Ok
                    </Button>
                    <Button onClick={onCloseRacikModal}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              {/* Modal Update */}
              <Modal isOpen={isOpenUpdateModal} onClose={onCloseUpdateModal} size={{ base: 'sm', md: 'xl' }}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader alignSelf="center">Update Formula</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <Text>Apakah anda yakin untuk menyimpan perubahan ini ?</Text>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      onClick={() => { onCloseUpdateModal(); handleUpdate(values.newFormulaName, values.ph_min, values.ph_max, values.ppm_min, values.ppm_max, values.volume, values.id); }}
                      backgroundColor="#09322D"
                      color="white"
                      mr="3"
                      paddingX="30px"
                      isDisabled={!isValid}
                    >
                      Update
                    </Button>
                    <Button
                      onClick={onCloseUpdateModal}
                    >Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              {/* Modal Save */}
              <Modal isOpen={isOpenSaveModal} onClose={onCloseSaveModal} size={{ base: 'sm', md: 'xl' }}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader alignSelf="center">Simpan Formula</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <Text>Apakah anda yakin untuk menyimpan formula ini ?</Text>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      onClick={() => { onCloseSaveModal(); handleSaveSubmit(values.newFormulaName, values.ph_min, values.ph_max, values.ppm_min, values.ppm_max, values.volume); }}
                      backgroundColor="#09322D"
                      color="white"
                      mr="3"
                      paddingX="30px"
                      isDisabled={!isValid}
                    >
                      Simpan Formula
                    </Button>
                    <Button
                      onClick={onCloseSaveModal}
                    >Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              {/* Modal Delete */}
              <AlertDialog
                isOpen={isOpenDeleteModal}
                leastDestructiveRef={cancelRef}
                onClose={onCLoseDeleteModal}
                size={{ base: 'sm', md: 'xl' }}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Hapus Formula
                    </AlertDialogHeader>

                    <AlertDialogBody py={"10px"}>
                      {/* Are you sure? You can't undo this action afterwards. */}
                      Apakah anda yakin menghapus formula ini ?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onCLoseDeleteModal}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="red"
                        ml={3}
                        onClick={() => {
                          onCLoseDeleteModal();
                          handleDelete(selectedFormulaId);
                        }}
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Form>
          )}
        </Formik>
      )
  );
}

export default CardFormPeracikan;
