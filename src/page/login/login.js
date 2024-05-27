import React, { useEffect, useState } from 'react';
import {
  Box, Flex, Button, Image, Text, Input,
  Icon,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/form-control';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { TabTitle } from '../../Utility/utility';
import { login, logout, selectToken, selectUrl } from '../../features/auth/authSlice';
import { IoEye, IoEyeOff } from 'react-icons/io5';

const schema = yup.object({
  email: yup.string().required('Email harus diisi'),
  password: yup
    .string()
    .min(6, 'Password harus lebih dari 6 karakter')
    .required('Password harus diisi'),
});

function Login() {
  const base_url = useSelector(selectUrl)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [btnPressed, setBtnPressed] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const handleSubmitComplate = (emailValue, passwordValue, setFieldError) => {
    setBtnPressed(true)
    axios
      .post(base_url + 'api/v1/login', {
        email: emailValue,
        password: passwordValue,
      })
      .then((response) => {
        dispatch(login(response.data));
        localStorage.setItem('token', response.data.accessToken);
        navigate('/unit/dashboard/1');
      })
      .catch((error) => {
        setFieldError('password', 'Email atau password salah');
        console.log(error)}
      ).finally(() => setBtnPressed(false))
  };

  const checkToken = () => {
    if (token) {
      navigate('/unit/dashboard/1');
    }
  };

  useEffect(() => {
    checkToken();
  }, [token]);

  TabTitle('Login - ITERA Hero');
  return (
    <Flex
      backgroundColor="var(--color-on-primary)"
      width="100%"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        flexDir="column"
        backgroundColor="var(--color-on-primary)"
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
        display={{ base: 'none', sm: 'none', lg: 'flex' }}
      >
        <Image
          position="Relative"
          width="80%"
          maxWidth="400px"
          src="https://res.cloudinary.com/diyu8lkwy/image/upload/v1664911531/itera%20herro%20icon/Frame_245_3_nvtrkl.png"
        />
        <Text
          p={3}
          fontWeight="semibold"
          fontFamily="var(--font-family-secondary)"
          fontSize="var(--header-3)"
          color="{var(--color-primer)}"
        >
          Kerjasama ITERA dan PT. East West Seed Indonesia
        </Text>
        <Image
          width={"35%"}
          position={"Relative"}
          maxWidth={"350px"}
          src="https://res.cloudinary.com/iterahero2023/image/upload/v1699238050/iterahero2023/MITRA%20ITERAHERO2023.png"
        // src="https://res.cloudinary.com/diyu8lkwy/image/upload/v1663542541/itera%20herro%20icon/Frame_181_fmtxbh.png"
        />
      </Flex>
      <Flex
        backgroundColor={{ lg: 'var(--color-primer)' }}
        width="100%"
        height="100%"
        alignItems={{ lg: 'center' }}
        justifyContent="center"
      >
        <Box
          max-width="649px"
          borderRadius="20px"
          display="flex"
          gap="40px"
          flexDirection="column"
          size="sm"
          width={{ base: '100%', sm: '80%' }}
          padding={{ base: '100px', sm: '70px' }}
          backgroundColor="var(--color-on-primary)"
          justifyContent={{ lg: 'center' }}
          textAlign="center"
          alignItems="center"
        >
          <Image
            sizes="sm"
            display={{ base: 'flex', lg: 'none' }}
            position="Relative"
            width="80%"
            maxWidth="200px"
            src="https://res.cloudinary.com/diyu8lkwy/image/upload/v1664911531/itera%20herro%20icon/Frame_245_3_nvtrkl.png"
          />

          {/* <Text
            fontWeight="semibold"
            fontFamily="var(--font-family-secondary)"
            fontSize="var(--header-5)"
            color="{var(--color-primer)}"
          >
            Kerjasama ITERA dan PT. East West Seed Indonesia
          </Text> */}

          <Image
            sizes="sm"
            display={{ base: 'flex', lg: 'none' }}
            position="Relative"
            width="80%"
            maxWidth="200px"
            src="https://res.cloudinary.com/iterahero2023/image/upload/v1699238050/iterahero2023/MITRA%20ITERAHERO2023.png"
          //src="https://res.cloudinary.com/diyu8lkwy/image/upload/v1663542541/itera%20herro%20icon/Frame_181_fmtxbh.png"
          />

          <Text
            size="sm"
            fontWeight="bold"
            fontFamily="var(--font-family-secondary)"
            fontSize="var(--header-3)"
            color="var(--color-primer)"
          >
            Website ITERAHERO
          </Text>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={schema}
            onSubmit={(values, actions) => {
              actions.resetForm();
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldError
            }) => (
              <Form onSubmit={handleSubmit}>
              <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"} w={"250px"}>
                <FormControl isInvalid={errors.email && touched.email} pb={errors.email ? 0 : 7} minH={"100px"}>
                  <FormLabel htmlFor="email" fontWeight={"bold"}>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                    placeholder="Masukkan email"
                  />
                  <FormErrorMessage py={1} px={1} m={0}>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password && touched.password} pb={errors.password ? 0 : 7} minHeight={"100px"}>
                  <FormLabel htmlFor="password" fontWeight={"bold"}>Password</FormLabel>
                  <Flex alignItems={"center"} gap={"10px"}>
                    <Input
                      type={showPassword ? "text" :"password"}
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Masukkan password"
                      required="password harus diisi"
                    />
                    <Button onClick={() => setShowPassword(!showPassword)} >
                      {showPassword ? <IoEye fontSize={"1.5rem"}/> : <IoEyeOff fontSize={"1.5rem"}/>}
                    </Button>
                  </Flex>
                  <FormErrorMessage py={1} px={1} m={0}>{errors.password}</FormErrorMessage>
                </FormControl>
                <Button
                  mt={4}
                  width="100%"
                  height="50px"
                  borderRadius="10px"
                  backgroundColor="var(--color-primer)"
                  loadingText="Tunggu Sebentar..."
                  type="submit"
                  className="btn-login"
                  isLoading={btnPressed}
                  onClick={() => {
                    handleSubmitComplate(values.email, values.password, setFieldError);
                  }}
                  isDisabled={errors.email || errors.password}
                >
                  <Text
                    fontWeight="bold"
                    fontFamily="var(--font-family-secondary)"
                    fontSize="var(--header-3)"
                    color="var(--color-on-primary)"
                  >
                    Masuk
                  </Text>
                </Button>
                {/* </Link> */}
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Flex>
  );
}
export default Login;
