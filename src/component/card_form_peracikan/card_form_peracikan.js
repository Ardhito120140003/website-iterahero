import React, { useState, useEffect,useRef }  from 'react';
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
import { selectUrl } from '../../features/auth/authSlice';
import { BiTrash } from "react-icons/bi";
//import { RiPencilFill } from 'react-icons/ri';

function CardFormPeracikan({ id_tandon }) {
  const { isOpen: isOpenRacikModal, onOpen: onOpenRacikModal, onClose: onCloseRacikModal } = useDisclosure();
  const { isOpen: isOpenSaveModal, onOpen: onOpenSaveModal, onClose: onCloseSaveModal } = useDisclosure();
  const { isOpen: isOpenUpdateModal, onOpen: onOpenUpdateModal, onClose: onCloseUpdateModal } = useDisclosure();
  const { isOpen: isOpenDeleteModal, onOpen: onOpenDeleteModal, onClose: onCLoseDeleteModal } = useDisclosure();

  const [dataApi, setDataApi] = useState([]);
  const base_url = useSelector(selectUrl);
  const header = localStorage.getItem('token');
  const cancelRef = useRef();
  const [selectedFormulaId, setSelectedFormulaId] = useState(null);
  const [action, setAction] = useState(false);

  useEffect(() => {
    axios.get(`${base_url}api/v1/resep`, {
      headers: {
        Authorization: `Bearer ${header}`,
      }
    })
      .then((response) => {
        setDataApi(response.data.data);
        console.log('data resep :',dataApi)
      })
      .catch((error) => {
        console.error('Error fetching formula data:', error);
      });
  }, [onOpenSaveModal,action]);

  const handleRacikSubmit = async (id) => {
    console.log('ID Form Values:', id);

    axios.post(base_url + 'api/v1/peracikan', {
      resep: id,
      id_tandon,
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
    ph,
    ppm,
    volume,
    id,
  ) => {
    console.log(id)
    axios.patch(`${base_url}api/v1/resep`, {
      nama: nama,
      ppm: parseFloat(ppm),
      ph: parseFloat(ph),
      volume: parseFloat(volume),
    }, {
      params: {
        id,
      },
      headers: {
        Authorization: `Bearer ${header}`
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => setAction(!action))
  };

  const handleSaveSubmit = async (
    nama,
    ph,
    ppm,
    volume,
    ) => {
    axios.post(`${base_url}api/v1/resep`, {
      nama: nama,
      ph: parseFloat(ph),
      ppm: parseFloat(ppm),
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

      console.log('simpan',nama,ph,ppm,volume);
  };

  const handleDelete = async (id) => {
    console.log('Formula id:', id);
    axios.delete(`${base_url}api/v1/resep`, {
      headers: {
        Authorization: `Bearer ${header}`,
      },
      params: {
        id : id
      }
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setAction(!action));
  };

  return (
    <Formik
      initialValues={{
        id: '',
        formula: '',
        newFormulaName: '',
        ph: '',
        ppm: '',
        volume: '',
      }}

      validate={(values) => {
        const errors = {};
        if (!values.newFormulaName) {
          errors.newFormulaName = 'Nama formula harus diisi';
        }
        if (!values.ph) {
          errors.ph = 'PH harus diisi';
        }
        if (!values.ppm) {
          errors.ppm = 'PPM harus diisi';
        }
        if (!values.volume) {
          errors.volume = 'Volume harus diisi';
        }
        return errors;
      }}

      onSubmit={(values, actions) => {
        console.log('values yang disubmit :',values);
       
           if (values.formula === 'Tambah Formula') {
              onOpenSaveModal();
           } else if (values.formula !== 'Tambah Formula' && values.formula !== '') {
              onOpenRacikModal(values.id);
           }
     
        actions.setSubmitting(false);
     }}
    >
      {({ values, errors, touched, isValid, setFieldValue, setTouched }) => (
        <Form>
          <Flex flexDirection="column" width="100%" height="100%" gap={"10px"}>
            <Box color="black"
            //mt="5px"
            >
              <Field name="formula">
                {({ field }) => (
                  <FormControl isInvalid={errors.formula && touched.formula}>
                    <FormLabel color={'black'}>Formula</FormLabel>
                    <Select
                      {...field}
                      borderRadius="10"
                      value={values.formula}
                      onChange={(e) => {
                        const idx = parseInt(e.target.value);
                        if (isNaN(idx)) {
                          setFieldValue('id', '');
                          setFieldValue('newFormulaName', '');
                          setFieldValue('ph', '');
                          setFieldValue('ppm', '');
                          setFieldValue('volume', '');
                        } else {
                          setFieldValue('id', dataApi[idx].id);
                          setFieldValue('newFormulaName', dataApi[idx].nama);
                          setFieldValue('ph', dataApi[idx].ph);
                          setFieldValue('ppm', dataApi[idx].ppm);
                          setFieldValue('volume', dataApi[idx].volume);
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
                    <FormErrorMessage>{errors.formula}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>

            {values.formula === 'Tambah Formula' && (
              <Box>
                <Field name="newFormulaName">
                  {({ field }) => (
                    <FormControl isInvalid={errors.newFormulaName && touched.newFormulaName}>
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

            <Box>
              <Field name="ph">
                {({ field }) => (
                  <FormControl isInvalid={errors.ph && touched.ph}>
                    <FormLabel color={'black'}>PH Value</FormLabel>
                    <Input
                      {...field}
                      type="number"
                      value={values.ph}
                      onChange={(e) => setFieldValue('ph', e.target.value)}
                      style={{ color: 'black' }}
                      placeholder="masukkan ph value"
                    />
                    <FormErrorMessage>{errors.ph}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>

            <Box>
              <Field name="ppm">
                {({ field }) => (
                  <FormControl isInvalid={errors.ppm && touched.ppm}>
                    <FormLabel color={'black'}>PPM Value</FormLabel>
                    <Input
                      {...field}
                      type="number"
                      value={values.ppm}
                      onChange={(e) => setFieldValue('ppm', e.target.value)}
                      style={{ color: 'black' }}
                      placeholder="masukkan ppm value"
                    />
                    <FormErrorMessage>{errors.ppm}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>

            <Box>
              <Field name="volume">
                {({ field }) => (
                  <FormControl isInvalid={errors.volume && touched.volume}>
                    <FormLabel color={'black'}>Volume</FormLabel>
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
                      console.log(values.id);
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

              {(values.formula !== 'Tambah Formula' &&  values.formula !== '')  && (
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
                >
                  Racik
                </Button>
              )}
            </Flex>
          </Flex>

          {/* Modal Racik */}
          <Modal isOpen={isOpenRacikModal} onClose={onCloseRacikModal} size={{base:'sm',md:'xl'}}>
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
          <Modal isOpen={isOpenUpdateModal} onClose={onCloseUpdateModal} size={{base:'sm',md:'xl'}}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader alignSelf="center">Update Formula</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Text>Apakah anda yakin untuk menyimpan perubahan ini ?</Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => { onCloseUpdateModal(); handleUpdate(values.newFormulaName,values.ph,values.ppm,values.volume,values.id); }}
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
          <Modal isOpen={isOpenSaveModal} onClose={onCloseSaveModal} size={{base:'sm',md:'xl'}}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader alignSelf="center">Simpan Formula</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Text>Apakah anda yakin untuk menyimpan formula ini ?</Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => { onCloseSaveModal(); handleSaveSubmit(values.newFormulaName,values.ph,values.ppm,values.volume); }}
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
            size={{base:'sm',md:'xl'}}
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
  );
}

export default CardFormPeracikan;
