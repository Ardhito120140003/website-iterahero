import React, { useState, useEffect } from 'react';
import {
  Flex,
  Text,
  Select,
  Button,
  Input,
  FormControl,
  Wrap,
  Icon,
  Box,
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
import { Formik, Field, Form, FieldArray } from 'formik'; // Import FieldArray
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUrl } from '../../features/auth/authSlice';
import CustomCheckbox from './checkbox';
import { BiTrash } from 'react-icons/bi';
import { MdOutlineLibraryAdd } from 'react-icons/md';
import * as Yup from 'yup';

const weekdays = [
  { label: 'Senin', value: 1 },
  { label: 'Selasa', value: 2 },
  { label: 'Rabu', value: 3 },
  { label: 'Kamis', value: 4 },
  { label: 'Jumat', value: 5 },
  { label: 'Sabtu', value: 6 },
  { label: 'Minggu', value: 0 },
];

const validatePenjadwalanSchema = Yup.object().shape({
  resep: Yup.string().required('Formula harus diisi'),
  waktu: Yup.array()
    .of(Yup.string().required('Waktu penyiraman harus diisi'))
    .min(1, 'Minimal satu waktu penyiraman harus diisi'),
  durasi: Yup.string()
    .min(2, 'Minimal 10 menit')
    .max(2, 'Kelamaan')
    .required('Durasi harus diisi'),
  hari: Yup.array()
    .of(Yup.number().required('Hari harus diisi'))
    .min(1, 'Minimal satu hari harus diisi'),
})

function CardFormPenjadwalan({ updateAction }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const base_url = useSelector(selectUrl);
  const header = localStorage.getItem('token');
  const [dataApi, setDataApi] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false)

  useEffect(() => {
    axios
      .get(`${base_url}api/v1/resep`, {
        headers: {
          Authorization: `Bearer ${header}`,
        },
        params: {
          tipe: 'besaran',
        },
      })
      .then((response) => {
        setDataApi(response.data.data);
        console.log(dataApi);
      })
      .catch((error) => {
        console.error('Error fetching resep data:', error);
      });
  }, []);

  return (
    <Formik
      initialValues={{
        resep: '',
        waktu: [''],
        durasi: '',
        hari: [],
      }}
      validationSchema={validatePenjadwalanSchema}
      onSubmit={(values, actions) => {
        setButtonLoading(true)
        const payload = values;
        payload.id_tandon = 1
        axios.post(base_url + "api/v1/penjadwalan", payload, {
          headers: {
            Authorization: `Bearer ${header}`,
          },
        }).then((response) => {
          console.log(response.data)
        })
          .catch((err) => console.error(err))
          .finally(() => {
            updateAction()
            setButtonLoading(false)
            actions.setSubmitting(false)
            actions.resetForm()
          })
      }}
    >
      {({ values, errors, touched, isValid, setFieldValue, submitForm }) => (
        <Form>
          <Flex
            flexDirection="column"
            width="100%"
            height="100%"
            borderRadius="10px"
            border="1px solid #E2E8F0"
            padding="30px"
          >
            <Text>Tambah Penjadwalan</Text>

            <Flex flexDir="column" justifyContent="space-around" gap={'10px'} >
              <Box mt={'20px'}>
                <Field name="resep">
                  {({ field }) => (
                    <FormControl isInvalid={errors.resep && touched.resep}>
                      <Text>Formula</Text>
                      <Select
                        {...field}
                        borderRadius="10"
                        value={values.resep}
                        color='black'
                        onChange={(e) => {
                          setFieldValue('resep', e.target.value);
                        }}
                      >
                        <option style={{ color: 'black' }} value="">--Pilih Formula--</option>
                        {dataApi.map((data, index) => (
                          <option key={index} value={data.nama} style={{ color: 'black' }}>
                            {data.nama.toUpperCase()}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>{errors.resep}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>

              <Box>
                <FieldArray name="waktu">
                  {({ push, remove, replace }) => (
                    <FormControl isRequired isInvalid={errors.waktu && touched.waktu}>
                      <Text>Waktu Penyiraman</Text>
                      {values.waktu.map((_, index) => (
                        <Flex key={index} mb={'10px'}>
                          <Flex w={'100%'}>
                            <Input
                              type="time"
                              name={`waktu.${index}`}
                              value={values.waktu[index]}
                              style={{ color: 'black' }}
                              onChange={(e) => replace(index, e.target.value)}
                            />
                          </Flex>
                          {values.waktu.length > 1 && (
                            <Icon
                              as={BiTrash}
                              color="#14453E"
                              w="20px"
                              h="20px"
                              alignSelf="center"
                              ml={'10px'}
                              onClick={() => remove(index)}
                            />
                          )}
                        </Flex>
                      ))}
                      <Button
                        h={'30px'}
                        fontSize={'13px'}
                        fontWeight={'bold'}
                        border={'1px'}
                        borderColor={'blue.600'}
                        bgColor={'white'}
                        color={'blue.600'}
                        onClick={() => push('')}
                      >
                        <Icon
                          as={MdOutlineLibraryAdd}
                          color="blue.600"
                          w="15px"
                          h="15px"
                          alignSelf="center"
                          mr={'10px'}
                        />
                        Tambah
                      </Button>
                    </FormControl>
                  )}
                </FieldArray>
              </Box>

              <Box>
                <Field name="durasi">
                  {({ field }) => (
                    <FormControl isRequired isInvalid={errors.durasi && touched.durasi}>
                      <Text>Durasi per penyiraman (menit)</Text>
                      <Input
                        {...field}
                        type="number"
                        value={values.durasi}
                        onChange={(e) => setFieldValue('durasi', parseInt(e.target.value))}
                        style={{ color: 'black' }}
                        placeholder="60 (untuk satu jam)"
                      />
                      <FormErrorMessage>{errors.durasi}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>

              <Box>
                <Field name="hari">
                  {({ field }) => (
                    <FormControl isRequired isInvalid={errors.hari && touched.hari}>
                      <Text>Ulangi</Text>
                      <Wrap mb="20px" gap={2}>
                        {weekdays.map((item, index) => (
                          <CustomCheckbox
                            {...field}
                            label={item.label}
                            value={item.value}
                            isChecked={values.hari.includes(item.value)}
                            onSelect={(value) => {
                              setFieldValue('hari', values.hari.includes(value) ? [...values.hari.filter(day => day !== value)] : [...values.hari, value])
                            }}
                            key={index}
                          />
                        ))}
                      </Wrap>
                      <FormErrorMessage>{errors.hari}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>

              <Flex marginTop="16px" flexDirection="row">
                <Button isLoading={buttonLoading} backgroundColor="#09322D" w={'100%'} isDisabled={!isValid}
                  onClick={() => {
                    onOpen()
                  }}>
                  Tambah
                </Button>
              </Flex>

              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader alignSelf="center">Tambah Jadwal</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={8}>
                    <Text>Apakah anda yakin untuk menambahkan jadwal ini?</Text>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      onClick={() => {
                        submitForm()
                        onClose()
                      }}
                      backgroundColor="#09322D"
                      color="white"
                      mr="3"
                      paddingX="30px"
                    >
                      Ok
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Flex>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}

export default CardFormPenjadwalan;
