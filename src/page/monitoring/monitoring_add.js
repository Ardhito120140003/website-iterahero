import React, { useState, useEffect } from 'react';
import {
  Flex,
  Image,
  Text,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Circle,
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
  getApiGreenhouse,
  icons,
  categoryApi,
  addSensorApi,
} from '../../Utility/api_link';
import Loading from '../../component/loading/loading';

function Monitoring_Add() {
  const base_url = useSelector(selectUrl);
  const navigate = useNavigate();
  TabTitle('Tambah Sensor - ITERA Hero');
  const { id } = useParams();
  const [imageSensor, onChangeImageSensor] = useState(null);
  const [imagePos, onChangeImagePos] = useState(null);
  const [isloading, checkLoading] = useState(true);
  const dispatch = useDispatch();
  const [dataApi, setDataApi] = useState(null);
  const header = localStorage.getItem('token');

  const schema = yup.object({
    name: yup.string().required('Nama harus diisi'),
    icon: yup.string().required('icon harus diisi'),
    color: yup.string().required('Warna harus diisi'),
    brand: yup.string().required('Satuan Ukur harus diisi'),
    calibration: yup.string().required('Persamaan Kalibrasi harus diisi'),
    unit_measurement: yup.string().required('Merek harus diisi'),
    range_max: yup.number().required('Range Max harus diisi'),
    range_min: yup.number().required('Range Min harus diisi'),
    id_category_sensor: yup.number().required('Kategori harus diisi'),
    id_greenhouse: yup.number().required(''),
  });
  const [iconsList, setIconsList] = useState(null);
  const getGreenhouse = async () => {
    axios.get(base_url + "api/v1/greenhouse", {
      params: {
        id
      },
      headers: {
        Authorization: `Bearer ${header}`
      }
    })
    .then(({ data }) => {
      console.log(data)
      setDataApi(data.data)
    })
    .catch(err => console.error(err))
  }

  const getIcon = async () => {
    axios
      .get(base_url + icons)
      .then((response) => {
        setIconsList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [dataCategory, setDataCategory] = useState(null);
  const getDataCategory = async () => {
    axios
      .get(base_url + categoryApi, {
        headers: {
          Authorization: `Bearer ${header}`,
        },
      })
      .then((response) => {
        setDataCategory(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [icon_selected, setIcon_selected] = useState('');

  useEffect(() => {
    dispatch(routePageName('Monitoring'));
    getGreenhouse();
    getDataCategory();
    getIcon();
    checkLoading(false);
  }, []);

  return (
    <>
      {isloading ? (
        <Loading />
        ) : (
          <Flex w="100%" flexDir="column">
            <Flex width="100%">
              <Link to="/unit/monitoring">
                <Flex marginRight="2">
                  <Text
                    fontWeight="semibold"
                    fontSize="var(--header-3)"
                    color="var(--color-primer)"
                  >
                    List Sensor pada Greenhouse
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
                      {dataApi.name}
                      {' '}
                    </Text>
                </Flex>
              </Link>
            </Flex>
            <Formik
              validationSchema={schema}
              validateOnChange={false}
              validateOnBlur={false}
              initialValues={{
                name: '',
                icon: '',
                color: '',
                brand: '',
                calibration: '',
                unit_measurement: '',
                range_max: '',
                range_min: '',
                id_category_sensor: '',
                id_greenhouse: id,
                detail: '',
                sensor_image: {},
                posisition: {},
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  const submitedData = new FormData();
                  submitedData.append('name', values.name);
                  submitedData.append('icon', values.icon);
                  submitedData.append('color', values.color);
                  submitedData.append('calibration', values.calibration);
                  submitedData.append('brand', values.brand);
                  submitedData.append(
                    'unit_measurement',
                    values.unit_measurement,
                  );
                  submitedData.append('range_max', values.range_max);
                  submitedData.append('range_min', values.range_min);
                  submitedData.append(
                    'id_category_sensor',
                    values.id_category_sensor,
                  );
                  submitedData.append('detail', values.detail);
                  submitedData.append('sensor_image', imageSensor);
                  submitedData.append('posisition', imagePos);
                  submitedData.append('id_greenhouse', values.id_greenhouse);
                  axios
                    .post(addSensorApi, submitedData, {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'content-type': 'multipart/form-data',
                      },
                    })
                    .then((response) => {
                      if (response.status === 201) {
                        alert('Data berhasil ditambahkan');
                        navigate(-1);
                      } else {
                        alert('Data gagal ditambahkan');
                      }
                    })
                    .catch((error) => {});
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                setFieldValue,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form method="POST" onSubmit={handleSubmit}>
                  <FormControl
                    marginTop="20px"
                    isInvalid={errors.name && touched.name}
                  >
                    <FormLabel color="var(--color-primer)">Nama</FormLabel>
                    <Input
                    color="var(--color-primer)"
                    maxWidth="100%"
                    marginTop="0 auto"
                    type="text"
                    name="name"
                    defaultValue={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                    placeholder="Nama..."
                  />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    marginTop="20px"
                    isInvalid={errors.icon && touched.icon}
                  >
                    <FormLabel color="var(--color-primer)">Icon</FormLabel>
                    <Select
                    color="var(--color-primer)"
                    onChange={(e) => {
                      setFieldValue('icon', e.target.value);
                      setIcon_selected(e.target.value);
                    }}
                    onBlur={handleBlur}
                    // defaultValue={values.icon}
                    value={values.icon}
                    name="icon"
                    id="icon"
                  >
                    <option defaultValue="" selected>
                      Pilih Icon
                    </option>
                    {iconsList.map((item, index) => (item.type == 'sensor' ? (
                      <option value={item.icon} key={index} color="var(--color-primer)">
                        {item.name}
                      </option>
                    ) : null))}
                  </Select>
                    <Flex m="15px">
                    <Image src={icon_selected} />
                  </Flex>
                    <FormErrorMessage>{errors.icon}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    marginTop="20px"
                    isInvalid={errors.color && touched.color}
                  >
                    <FormLabel color="var(--color-primer)">Warna</FormLabel>
                    <Select
                    color="var(--color-primer)"
                    maxWidth="100%"
                    marginTop="0 auto"
                    type="hidden"
                    name="color"
                    value={values.color}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                  >
                    <option defaultValue="">Pilih Warna</option>
                    {iconsList.map((item) => (item.type == 'sensor' && item.icon == icon_selected ? (
                      <option
                        value={item.color}
                        color="var(--color-primer)"
                        selected
                      >
                        {item.name}
                      </option>
                    ) : null))}
                  </Select>
                    <Flex m="15px">
                    <Circle bg={values.color} size="30px" />
                  </Flex>
                    <FormErrorMessage>{errors.color}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    marginTop="20px"
                    isInvalid={errors.calibration && touched.calibration}
                  >
                    <FormLabel color="var(--color-primer)">
                    Persamaan Kalibrasi
                  </FormLabel>
                    <Input
                    color="var(--color-primer)"
                    maxWidth="100%"
                    marginTop="0 auto"
                    type="text"
                    name="calibration"
                    defaultValue={values.calibration}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                    placeholder="Persamaan Kalibrasi..."
                  />
                    <FormErrorMessage>{errors.calibration}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    marginTop="20px"
                    isInvalid={errors.brand && touched.brand}
                  >
                    <FormLabel color="var(--color-primer)">Merek</FormLabel>
                    <Input
                    color="var(--color-primer)"
                    maxWidth="100%"
                    marginTop="0 auto"
                    type="text"
                    name="brand"
                    defaultValue={values.brand}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                    placeholder="Merek..."
                  />
                    <FormErrorMessage>{errors.brand}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    marginTop="20px"
                    isInvalid={
                    errors.unit_measurement && touched.unit_measurement
                  }
                  >
                    <FormLabel color="var(--color-primer)">
                    Satuan Ukur
                  </FormLabel>
                    <Input
                    color="var(--color-primer)"
                    maxWidth="100%"
                    marginTop="0 auto"
                    type="text"
                    name="unit_measurement"
                    defaultValue={values.unit_measurement}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                    placeholder="Satuan Ukur..."
                  />
                    <FormErrorMessage>{errors.unit_measurement}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    marginTop="20px"
                    isInvalid={errors.range_min && touched.range_min}
                  >
                    <FormLabel color="var(--color-primer)">Range Min</FormLabel>
                    <Input
                    color="var(--color-primer)"
                    maxWidth="100%"
                    marginTop="0 auto"
                    type="number"
                    name="range_min"
                    defaultValue={values.range_min}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                    placeholder="min_range..."
                  />
                    <FormErrorMessage>{errors.range_min}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    marginTop="20px"
                    isInvalid={errors.range_max && touched.range_max}
                  >
                    <FormLabel color="var(--color-primer)">Range Max</FormLabel>
                    <Input
                    color="var(--color-primer)"
                    maxWidth="100%"
                    marginTop="0 auto"
                    type="number"
                    name="range_max"
                    defaultValue={values.range_max}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                    placeholder="max_range..."
                  />
                    <FormErrorMessage>{errors.range_max}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    marginTop="20px"
                    isInvalid={
                    errors.id_category_sensor && touched.id_category_sensor
                  }
                  >
                    <FormLabel color="var(--color-primer)">Kategori</FormLabel>
                    <Select
                    defaultValue={values.id_category_sensor}
                    color="var(--color-primer)"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="id_category_sensor"
                  >
                    <option value="">Pilih Kategori</option>
                    {dataCategory.map((item, index) => (
                      <option value={item.id} key={index} color="var(--color-primer)">
                        {item.name}
                      </option>
                    ))}
                  </Select>
                    <FormErrorMessage>
                    {errors.id_category_sensor}
                  </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    marginTop="20px"
                    isInvalid={errors.detail && touched.detail}
                  >
                    <FormLabel color="var(--color-primer)">
                    Detail dari Sensor
                  </FormLabel>
                    <Textarea
                    color="var(--color-primer)"
                    maxWidth="100%"
                    marginTop="0 auto"
                    type="text"
                    name="detail"
                    defaultValue={values.detail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                    placeholder="detail sensor..."
                  />
                    <FormErrorMessage>{errors.range_min}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    marginTop="20px"
                    isInvalid={errors.sensor_image && touched.sensor_image}
                  >
                    <FormLabel htmlFor="sensor_image" color="black">
                    Gambar Sensor
                  </FormLabel>
                    <Flex
                    width="100%"
                    h="100px"
                    borderRadius="5px"
                    maxWidth="100%"
                    marginTop="0 auto"
                    variant="outline"
                    placeholder="Masukkan Gambar"
                    color="black"
                    alignItems="center"
                    borderWidth="1px"
                    borderColor="#D9D9D9"
                    padding="20px"
                  >
                    {/* <FilePicker
                                            onFileChange={(fileList) => onChangeImage(fileList)}
                                            placeholder="Pilih Gambar"
                                            clearButtonLabel="Hapus"
                                            multipleFiles={true}
                                            accept="image/*"
                                            hideClearButton={false}
                                        /> */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        onChangeImageSensor(e.target.files[0]);
                      }}
                    />
                  </Flex>
                    <FormErrorMessage>{errors.sensor_image}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    marginTop="20px"
                    isInvalid={errors.posisition && touched.posisition}
                  >
                    <FormLabel htmlFor="posisition" color="black">
                    Denah Posisi Sensor
                  </FormLabel>
                    <Flex
                    width="100%"
                    h="100px"
                    borderRadius="5px"
                    maxWidth="100%"
                    marginTop="0 auto"
                    variant="outline"
                    placeholder="Masukkan Posisi Sensor"
                    color="black"
                    alignItems="center"
                    borderWidth="1px"
                    borderColor="#D9D9D9"
                    padding="20px"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        onChangeImagePos(e.target.files[0]);
                      }}
                    />
                  </Flex>
                    <FormErrorMessage>{errors.posisition}</FormErrorMessage>
                  </FormControl>
                  <FormControl>
                    <Input
                    type="hidden"
                    defaultValue={id}
                    name="id_greenhouse"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                    placeholder="id..."
                  />
                  </FormControl>
                  <Link to="/unit/monitoring">
                    <Button
                    marginTop="44px"
                    width="100%"
                    height="10%"
                    borderRadius="10px"
                    backgroundColor="var(--color-primer)"
                    type="submit"
                    className="btn-login"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    loadingText="Tunggu Sebentar..."
                  >
                    <Text
                      fontWeight="bold"
                      fontFamily="var(--font-family-secondary)"
                      fontSize="var(--header-3)"
                      color="var(--color-on-primary)"
                    >
                      Tambah
                    </Text>
                  </Button>
                  </Link>
                </Form>
              )}
            </Formik>
          </Flex>
        )}
    </>
  );
}

export default Monitoring_Add;
