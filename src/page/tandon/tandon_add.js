import React, { useState, useEffect } from 'react';
import {
  Flex, Text, Button, Input,
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
import { selectToken } from '../../features/auth/authSlice';
import axios from 'axios';
import { routePageName, selectUrl } from '../../features/auth/authSlice';
import { TabTitle } from '../../Utility/utility';

import Loading from '../../component/loading/loading';

function TandonAdd() {
  TabTitle('Tambah Tandon - ITERA Hero');
  const data = {
    name: '',
    location: '',
  };

  const base_url = useSelector(selectUrl)
  const [image, onChangeImage] = useState(null);
  const [isloading, checkLoading] = useState(false);

  const navigate = useNavigate();

  const schema = yup.object({
    name: yup.string().required('data harus diisi'),
    location: yup.string().required('data harus diisi'),
    image: yup.object().required('data harus diisi'),
  });

  const submit = (name, location) => {
    data.name = name;
    data.location = location;

    if (
      data.name == ''
      || data.location == ''
      || image == {}
      || image == ''
      || image == null
    ) {
      return alert('Masih ada yang belum di isi');
    }
    checkLoading(true);
    postGreenhouse(name, image, location);
  };

  const dispatch = useDispatch();
  const header = useSelector(selectToken)

  const postGreenhouse = (valueName, valueImage, valueLocation) => {
    axios
      .post(
        // addGreenhouse,
        // {
        //   name: valueName,
        //   image: valueImage,
        //   location: valueLocation,
        // },
        base_url + "api/v1/tandonUtama",
        {
          name: valueName,
          image: valueImage,
          location: valueLocation
        },
        {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Bearer ${header}`,
          },
        },
      )
      .then((response) => {
        checkLoading(false);
        navigate('/unit/tandon');
      })
      .catch((error) => {
        checkLoading(false);
        alert(error.message)
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(routePageName('Tandon'));
  }, []);

  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <Flex w="100%" flexDir="column">
          <Flex w="100%" flexDir="row" alignItems="center">
            <Link to="/unit/tandon">
              <Text
                fontWeight="semibold"
                fontSize="var(--header-3)"
                mr="20px"
                color="var(--color-primer)"
              >
                List Tandon
              </Text>
            </Link>
            <Text
              fontWeight="semibold"
              fontSize="var(--header-3)"
              color="var(--color-primer)"
              mr="20px"
            >
              {'>'}
            </Text>
            <Text
              fontWeight="semibold"
              fontSize="var(--header-3)"
              color="var(--color-primer)"
            >
              Add Tandon
            </Text>
          </Flex>

          <Flex w="100%" flexDir="column">
            <Formik
              initialValues={{
                name: '',
                location: '',
                image: {},
              }}
              validationSchema={schema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
                handleSubmit,
              }) => (
                <Form>
                  <FormControl
                    marginTop="20px"
                    isInvalid={errors.name && touched.name}
                  >
                    <FormLabel htmlFor="name" color="black">
                      Nama Tandon
                    </FormLabel>
                    <Input
                      width="100%"
                      h="60px"
                      maxWidth="100%"
                      marginTop="0 auto"
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outline"
                      placeholder="Masukkan nama"
                      color="black"
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    marginTop="20px"
                    isInvalid={errors.location && touched.location}
                  >
                    <FormLabel htmlFor="location" color="black">
                      Lokasi Tandon
                    </FormLabel>
                    <Input
                      width="100%"
                      h="60px"
                      maxWidth="100%"
                      marginTop="0 auto"
                      type="text"
                      name="location"
                      value={values.location}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outline"
                      placeholder="Masukkan lokasi"
                      color="black"
                    />
                    <FormErrorMessage>{errors.location}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    marginTop="20px"
                    isInvalid={errors.image && touched.image}
                  >
                    <FormLabel htmlFor="image" color="black">
                      Gambar Tandon
                    </FormLabel>
                    <Flex
                      width="100%"
                      h="100px"
                      borderRadius="5px"
                      maxWidth="100%"
                      marginTop="0 auto"
                      variant="outline"
                      placeholder="Masukkan email"
                      color="black"
                      alignItems="center"
                      borderWidth="1px"
                      borderColor="#D9D9D9"
                      padding="20px"
                    >
                      <input
                        type="file"
                        name='image'
                        accept="image/*"
                        onChange={(e) => {
                          // setFieldValue("image", e.target.files[0])
                          onChangeImage(e.target.files[0]);
                        }}
                      />
                    </Flex>
                    <FormErrorMessage>{errors.image}</FormErrorMessage>
                  </FormControl>
                  <Button
                    marginTop="44px"
                    width="100%"
                    height="50px"
                    borderRadius="10px"
                    backgroundColor="var(--color-primer)"
                    type="submit"
                    // className="btn-login"
                    disabled={image === null || values.location === "" || values.name === "" }
                    onClick={() => submit(values.name, values.location)}
                  >
                    <Text
                      fontWeight="bold"
                      fontFamily="var(--font-family-secondary)"
                      fontSize="var(--header-3)"
                      color="var(--color-on-primary)"
                      colorScheme="var(--color-on-primary)"
                    >
                      Tambah
                    </Text>
                  </Button>
                </Form>
              )}
            </Formik>
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default TandonAdd;
