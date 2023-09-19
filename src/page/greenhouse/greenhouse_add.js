import React, { useState, useEffect } from "react";
import { Flex, Text, Button, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { routePageName } from "../../redux/action";
import { TabTitle } from "../../Utility/utility";
import axios from "axios";
import { addGreenhouse } from "../../Utility/api_link";
import { useNavigate } from "react-router-dom";
import Loading from "../../component/loading/loading";

const GreenhouseAdd = () => {
  TabTitle("Tambah Greenhouse - ITERA Hero");
  let data = {
    name: "",
    location: "",
  };

  const [image, onChangeImage] = useState(null);
  const [isloading, checkLoading] = useState(false);

  const navigate = useNavigate();

  const schema = yup.object({
    name: yup.string().required("data harus diisi"),
    location: yup.string().required("data harus diisi"),
    image: yup.object().required("data harus diisi"),
  });

  const submit = (name, location) => {
    data.name = name;
    data.location = location;

    if (
      data.name == "" ||
      data.location == "" ||
      image == {} ||
      image == "" ||
      image == null
    ) {
      return alert("Masih ada yang belum di isi");
    } else {
      checkLoading(true);
      postGreenhouse(name, image, location);
    }
  };

  const dispatch = useDispatch();
  const header = localStorage.getItem("token");

  const postGreenhouse = (valueName, valueImage, valueLocation) => {
    axios
      .post(
        addGreenhouse,
        {
          name: valueName,
          image: valueImage,
          location: valueLocation,
        },
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + header,
          },
        }
      )
      .then((response) => {
        checkLoading(false);
        navigate("/unit/greenhouse");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(routePageName("Greenhouse"));
  }, []);

  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <Flex w="100%" flexDir={"column"}>
          <Flex w="100%" flexDir={"row"} alignItems={"center"}>
            <Link to={"/unit/greenhouse"}>
              <Text
                fontWeight={"semibold"}
                fontSize={"var(--header-3)"}
                mr={"20px"}
                color={"var(--color-primer)"}
              >
                List Greenhouse
              </Text>
            </Link>
            <Text
              fontWeight={"semibold"}
              fontSize={"var(--header-3)"}
              color={"var(--color-primer)"}
              mr={"20px"}
            >
              {">"}
            </Text>
            <Text
              fontWeight={"semibold"}
              fontSize={"var(--header-3)"}
              color={"var(--color-primer)"}
            >
              Add Greenhouse
            </Text>
          </Flex>

          <Flex w="100%" flexDir={"column"}>
            <Formik
              initialValues={{
                name: "",
                location: "",
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
              }) => (
                <Form>
                  <FormControl
                    marginTop={"20px"}
                    isInvalid={errors.name && touched.name}
                  >
                    <FormLabel htmlFor="name" color={"black"}>
                      Nama Greenhouse
                    </FormLabel>
                    <Input
                      width={"100%"}
                      h="60px"
                      maxWidth={"100%"}
                      marginTop={"0 auto"}
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outline"
                      placeholder="Masukkan nama"
                      color={"black"}
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    marginTop={"20px"}
                    isInvalid={errors.location && touched.location}
                  >
                    <FormLabel htmlFor="location" color={"black"}>
                      Lokasi Greenhouse
                    </FormLabel>
                    <Input
                      width={"100%"}
                      h="60px"
                      maxWidth={"100%"}
                      marginTop={"0 auto"}
                      type="text"
                      name="location"
                      value={values.location}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outline"
                      placeholder="Masukkan lokasi"
                      color={"black"}
                    />
                    <FormErrorMessage>{errors.location}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    marginTop={"20px"}
                    isInvalid={errors.image && touched.image}
                  >
                    <FormLabel htmlFor="image" color={"black"}>
                      Gambar Greenhouse
                    </FormLabel>
                    <Flex
                      width={"100%"}
                      h="100px"
                      borderRadius={"5px"}
                      maxWidth={"100%"}
                      marginTop={"0 auto"}
                      variant="outline"
                      placeholder="Masukkan email"
                      color={"black"}
                      alignItems="center"
                      borderWidth="1px"
                      borderColor={"#D9D9D9"}
                      padding={"20px"}
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
                          onChangeImage(e.target.files[0]);
                        }}
                      />
                    </Flex>
                    <FormErrorMessage>{errors.image}</FormErrorMessage>
                  </FormControl>
                  <Button
                    marginTop={"44px"}
                    width="100%"
                    height="50px"
                    borderRadius="10px"
                    backgroundColor="var(--color-primer)"
                    type="submit"
                    // className="btn-login"
                    onClick={() => submit(values.name, values.location)}
                  >
                    <Text
                      fontWeight="bold"
                      fontFamily="var(--font-family-secondary)"
                      fontSize="var(--header-3)"
                      color="var(--color-on-primary)"
                      colorScheme={"var(--color-on-primary)"}
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
};

export default GreenhouseAdd;
