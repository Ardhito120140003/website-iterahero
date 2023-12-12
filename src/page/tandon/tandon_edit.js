import React, { useState, useEffect } from "react";
import { Flex, Text, Button, Input } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import * as yup from "yup";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { routePageName, selectUrl } from "../../features/auth/authSlice";
import { TabTitle } from "../../Utility/utility";
import Loading from "../../component/loading/loading";

function TandonEdit() {
  const base_url = useSelector(selectUrl);
  TabTitle("Edit Tandon - ITERA Hero");
  const { slug } = useParams();
  const navigate = useNavigate();
  const [dataApi, setDataApi] = useState(null);
  const header = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [image, onChangeImage] = useState(null);
  const [isloading, setLoading] = useState(true);
  const data = {
    name: "",
    location: "",
  };

  const getApibyID = async () => {
    await axios
      .get(base_url + "api/v1/tandonUtama",
        {
          params: {
            id: slug
          },
          headers: {
            Authorization: `Bearer ${header}`,
          },
        })
      .then((response) => {
        setDataApi(response.data.data);
        // console.log(response.data.data);
      })
      .catch((error) => {
        // console.log(error);
      })
      .finally(() => setLoading(false))
  };

  const schema = yup.object({
    name: yup.string().required("data harus diisi"),
    location: yup.string().required("data harus diisi"),
    image: yup.object().required("data harus diisi"),
  });

  const submit = async (name, location) => {
    data.name = name;
    data.location = location;

    if (data.name == "" || data.location == "") {
      return alert("Masih ada yang belum di isi");
    }
    setLoading(true);
    await updateTandon(name, image, location);
  };

  const updateTandon = async (valueName, valueImage, valueLocation) => {
    // console.log(valueName,valueImage,valueLocation,slug)
    await axios
      .patch(
        base_url + "api/v1/tandonUtama",
        {
          name: valueName,
          image: valueImage,
          location: valueLocation,
        },
        {
          params: {
            id_tandon: parseInt(slug),
          },
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${header}`,
          },
        }
      )
      .then((response) => {
        // console.log(response)
        navigate(`/unit/tandon`);
      })
      .catch((error) => {
        // console.log(error);
      })
      .finally(() => setLoading(false))
  };

  useEffect(() => {
    dispatch(routePageName("Tandon"));
    getApibyID();
  }, []);

  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <Flex w="100%" flexDir="column">
          <Flex w="100%" flexDir="row" alignItems="center" borderRadius={10} bgColor={"gray.100"} px={5} py={2}>
            <Flex width="100%">
              <Link to="/unit/tandon">
                <Flex marginRight="2">
                  <Text
                    fontWeight="semibold"
                    fontSize="var(--header-3)"
                    color="var(--color-primer)"
                  >
                    List Tandon
                  </Text>
                </Flex>
              </Link>
              <Flex marginRight="2">
                <Text
                  fontWeight="semibold"
                  fontSize="var(--header-3)"
                  color="var(--color-primer)"
                >
                  {" "}
                  {">"}{" "}
                </Text>
              </Flex>
              <Link>
                <Flex>
                  <Text
                    fontWeight="semibold"
                    fontSize="var(--header-3)"
                    color="var(--color-primer)"
                  >
                    {" "}
                    {dataApi.nama}{" "}
                  </Text>
                </Flex>
              </Link>
            </Flex>
          </Flex>
          <Link />
          <Flex w="100%" flexDir="column">
            <Formik
              initialValues={{
                name: dataApi.nama,
                location: dataApi.location,
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
                handleSubmit,
                isSubmitting,
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
                      placeholder={dataApi.name}
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
                      placeholder={dataApi.location}
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
                      placeholder="Masukkan gambar"
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
                          onChangeImage(e.target.files[0]);
                        }}
                      />
                    </Flex>
                  </FormControl>
                  <Button
                    marginTop="44px"
                    width="100%"
                    height="50px"
                    borderRadius="10px"
                    backgroundColor="var(--color-primer)"
                    type="submit"
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

export default TandonEdit;
