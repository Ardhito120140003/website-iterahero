import React from 'react';
import { Formik, Field, Form } from 'formik';
import {
  Flex,
  Text,
  Select,
  Button,
  Box,
  Input,
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
} from '@chakra-ui/react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUrl } from '../../features/auth/authSlice';

function CardFormPeracikan() {
  const { isOpen: isRacikModalOpen, onOpen: onRacikModalOpen, onClose: onRacikModalClose } = useDisclosure();
  const { isOpen: isSaveModalOpen, onOpen: onOpenSaveModal, onClose: onCloseSaveModal } = useDisclosure();

  const [dataApi, setDataApi] = React.useState([]);
  const base_url = useSelector(selectUrl);
  const header = localStorage.getItem('token');

  const data = {
    nama: '',
    ph: '',
    ppm: '',
    volume: '',
    interval: '',
  };

  React.useEffect(() => {
    axios.get(`${base_url}api/v1/resep`, {
      headers: {
        Authorization: `Bearer ${header}`,
      },
      params: {
        tipe: 'besaran'
      }
    })
      .then((response) => {
        setDataApi(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching formula data:', error);
      });
  }, [onOpenSaveModal]);

  const handleRacikSubmit = async (values) => {
    console.log({ header });
    console.log('Form Values:', values);
    axios.post(base_url + 'api/v1/kontrol', {}, {
      params: {
        id: 1
      },
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

  const handleSaveSubmit = async (values) => {
    console.log('Form Values:', values);
    axios.post(`${base_url}api/v1/resep`, values, {
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
  };

  return (
    <Formik
      initialValues={{
        formula: '',
        newFormulaName: '',
        phValue: '',
        ppmValue: '',
        volume: '',
        selenoid:'',
      }}
      validate={(values) => {
        const errors = {};
        if (!values.newFormulaName) {
          errors.newFormulaName = 'Nama formula harus diisi';
        }
        if (!values.phValue) {
          errors.phValue = 'PH harus diisi';
        }
        if (!values.ppmValue) {
          errors.ppmValue = 'PPM harus diisi';
        }
        if (!values.volume) {
          errors.volume = 'Volume harus diisi';
        }
        if (!values.tandonTujuan) {
          errors.selenoid = 'Tandon tujuan harus diisi';
        }
        return errors;
      }}
      onSubmit={(values, actions) => {
        // Check if all fields are filled
        const allFieldsFilled = Object.values(values).every((value) => value !== '');

        if (allFieldsFilled) {
          if (values.formula === 'Tambah Formula') {
            onOpenSaveModal();
          } else {
            onRacikModalOpen();
          }
        }

        actions.setSubmitting(false);
      }}
    >
      {({ values, errors, touched, isValid, setFieldValue }) => (
        <Form>
          <Flex flexDirection="column" width="100%" height="100%" gap={"10px"}>
            <Box color="black" 
            //mt="5px"
            >
              <Field name="formula">
                {({ field }) => (
                  <FormControl isInvalid={errors.formula && touched.formula}>
                    <Text>Formula</Text>
                    <Select
                      {...field}
                      borderRadius="10"
                      value={values.formula}
                      onChange={(e) => {
                        const idx = parseInt(e.target.value);
                        if (isNaN(idx)) {
                          setFieldValue('newFormulaName', '');
                          setFieldValue('phValue', '');
                          setFieldValue('ppmValue', '');
                          setFieldValue('volume', '');
                          setFieldValue('selenoid','');
                        } else {
                          setFieldValue('newFormulaName', dataApi[idx].nama);
                          setFieldValue('phValue', dataApi[idx].ph);
                          setFieldValue('ppmValue', dataApi[idx].ppm);
                          setFieldValue('volume', dataApi[idx].volume);
                          setFieldValue('selenoid', dataApi[idx].selenoid);
                        }
                        setFieldValue('formula', e.target.value);
                      }}
                    >
                      <option value="">--Pilih Formula--</option>
                      {dataApi.map((data, index) => (
                        <option key={index} value={index} style={{ color: 'black' }}>
                          {data.nama.toUpperCase()}
                        </option>
                      ))}
                      <option style={{ backgroundColor: '#09322D', color: 'white' }} value="Tambah Formula">--Tambah Formula--</option>
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
                    <FormControl isRequired isInvalid={errors.newFormulaName && touched.newFormulaName}>
                      <Text>Nama Formula</Text>
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
              <Field name="phValue">
                {({ field }) => (
                  <FormControl isRequired isInvalid={errors.phValue && touched.phValue}>
                    <Text>PH Value</Text>
                    <Input
                      {...field}
                      type="number"
                      value={values.phValue}
                      onChange={(e) => setFieldValue('phValue', e.target.value)}
                      style={{ color: 'black' }}
                      placeholder="masukkan ph value"
                    />
                    <FormErrorMessage>{errors.phValue}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>

            <Box>
              <Field name="ppmValue">
                {({ field }) => (
                  <FormControl isRequired isInvalid={errors.ppmValue && touched.ppmValue}>
                    <Text>PPM Value</Text>
                    <Input
                      {...field}
                      type="number"
                      value={values.ppmValue}
                      onChange={(e) => setFieldValue('ppmValue', e.target.value)}
                      style={{ color: 'black' }}
                      placeholder="masukkan ppm value"
                    />
                    <FormErrorMessage>{errors.ppmValue}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>

            <Box>
              <Field name="volume">
                {({ field }) => (
                  <FormControl isRequired isInvalid={errors.volume && touched.volume}>
                    <Text>Volume</Text>
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

            <Box color="black">
              <Field name="formula">
                {({ field }) => (
                  <FormControl isInvalid={errors.selenoid && touched.selenoid}>
                    <Text>Greenhouse Tujuan</Text>
                    <Select
                      {...field}
                      borderRadius="10"
                      value={values.selenoid}
                      onChange={(e) => {
                        setFieldValue('selenoid', e.target.value);
                      }}
                    >
                      <option value="">--Pilih Greenhouse--</option>
                      {dataApi.map((data, index) => (
                        <option key={index} value={index} style={{ color: 'black' }}>
                          {data.nama.toUpperCase()}
                        </option>
                      ))}
                      {/* <option style={{ backgroundColor: '#09322D', color: 'white' }} value="Tambah Formula">--Tambah Formula--</option> */}
                    </Select>
                    <FormErrorMessage>{errors.selenoid}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>

            <Flex marginTop="16px" flexDirection="row">
              <Button
                type="Submit"
                backgroundColor="#09322D"
                w={'100%'}
                isDisabled={!isValid}
              >
                {values.formula === 'Tambah Formula' ? 'Simpan Formula' : 'Racik'}
              </Button>
            </Flex>
          </Flex>

          {/* Modal Racik */}
          <Modal isOpen={isRacikModalOpen} onClose={onRacikModalClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader alignSelf="center">Proses Peracikan</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Text>Apakah anda yakin untuk memproses formula ini ?</Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => { onRacikModalClose(); handleRacikSubmit(values); }}
                  backgroundColor="#09322D"
                  color="white"
                  mr="3"
                  paddingX="30px"
                >
                  Ok
                </Button>
                <Button onClick={onRacikModalClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Modal Save */}
          <Modal isOpen={isSaveModalOpen} onClose={onCloseSaveModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader alignSelf="center">Simpan Formula</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Text>Apakah anda yakin untuk menyimpan formula ini ?</Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => { onCloseSaveModal(); handleSaveSubmit(values); }}
                  backgroundColor="#09322D"
                  color="white"
                  mr="3"
                  paddingX="30px"
                  isDisabled={!isValid}
                >
                  Simpan Formula
                </Button>
                <Button onClick={onCloseSaveModal}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

        </Form>
      )}
    </Formik>
  );
}

export default CardFormPeracikan;
