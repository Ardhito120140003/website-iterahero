import React, { useState, useEffect } from "react";
import {
  Flex,
  Image,
  Text,
  Input,
  Circle,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Textarea,
} from "@chakra-ui/react";
import Loading from "../../component/loading/loading";
import * as yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { routePageName } from "../../redux/action";
import { TabTitle } from "../../Utility/utility";
import { updateActuatorDetail, icons } from "../../Utility/api_link";
import axios from "axios";

const Controlling_Edit = () => {
  TabTitle("Edit Aktuator - ITERA Hero");
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;
  const [imageActuator, onChangeImageActuator] = useState(null);
  const [imagePos, onChangeImagePos] = useState(null);
  console.log(data);
  const header = localStorage.getItem("token");
  const [iconSelected, setIconSelected] = useState("");

  const [isloading, checkLoading] = useState(true);

  const schema = yup.object({
    name: yup.string().required("Nama harus diisi"),
    icon: yup.string().required("Ikon harus diisi"),
    color: yup.string().required("Warna harus diisi"),
  });

  const dispatch = useDispatch();

  const putActuator = async (
    valueName,
    valueIcon,
    valueColor,
    detail,
    actuator_image,
    posisitionact
  ) => {
    await axios
      .put(
        updateActuatorDetail + data.id,
        {
          name: valueName,
          icon: valueIcon,
          color: valueColor,
          detailact: detail,
          actuator_image: actuator_image,
          posisitionact: posisitionact,
        },
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + header,
          },
        }
      )
      .then((response) => {
        console.log(response);
        checkLoading(false);
        alert("Data Aktuator Berhasil Diperbaharui");
        navigate("/unit/controlling");
      })
      .catch((error) => {
        localStorage.clear();
        navigate("/login");
      });
  };

  const [iconsList, setIconsList] = useState(null);
  const getIcon = async () => {
    axios
      .get(icons)
      .then((response) => {
        // console.log("isi response", response);
        setIconsList(response.data.data);
        checkLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let dataSend = {
    name: "",
    icon: "",
    color: "",
    detailact: "",
  };

  const submit = async (name, color, icon, detailact) => {
    dataSend.name = name;
    dataSend.color = color;
    dataSend.icon = icon;
    dataSend.detailact = detailact;

    if (dataSend.name == "" || dataSend.icon == "" || dataSend.color == "") {
      return alert("Masih ada yang belum di isi");
    } else {
      checkLoading(true);
      putActuator(name, icon, color, detailact, imageActuator, imagePos);
    }
  };

  console.log("hallo", iconsList);

  useEffect(() => {
    dispatch(routePageName("Controlling"));
    getIcon();
    checkLoading(true);
  }, []);

  return (
    <>
      {iconsList == null || isloading ? (
        <Loading />
      ) : (
        <Flex w="100%" flexDir={"column"}>
          <Flex width="100%">
            <Link to={"/unit/controlling"}>
              <Flex marginRight={"2"}>
                <Text
                  fontWeight={"semibold"}
                  fontSize={"var(--header-3)"}
                  color={"var(--color-primer)"}
                >
                  List Controlling pada Greenhouse
                </Text>
              </Flex>
            </Link>

            <Flex marginRight={"2"}>
              <Text
                fontWeight={"semibold"}
                fontSize={"var(--header-3)"}
                color={"var(--color-primer)"}
              >
                {" "}
                {">"}{" "}
              </Text>
            </Flex>

            <Flex>
              <Text
                fontWeight={"semibold"}
                fontSize={"var(--header-3)"}
                color={"var(--color-primer)"}
              >
                {" "}
                Edit {data.name}{" "}
              </Text>
            </Flex>
          </Flex>
          <Formik
            initialValues={{
              name: data.name,
              icon: data.icon,
              color: data.color,
              detailact: data.detailact,
            }}
            validationSchema={schema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              setFieldValue,
              handleBlur,
            }) => (
              <Form>
                <FormControl
                  marginTop={"20px"}
                  isInvalid={errors.name && touched.name}
                >
                  <FormLabel color={"var(--color-primer)"}>Nama</FormLabel>
                  <Input
                    color={"var(--color-primer)"}
                    maxWidth={"100%"}
                    marginTop={"0 auto"}
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                    placeholder="Nama..."
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl
                  marginTop={"20px"}
                  isInvalid={errors.icon && touched.icon}
                >
                  <FormLabel color={"var(--color-primer)"}>Ikon</FormLabel>
                  <Select
                    color={"var(--color-primer)"}
                    onChange={(e) => {
                      setFieldValue("icon", e.target.value);
                      setIconSelected(e.target.value);
                    }}
                    onBlur={handleBlur}
                    value={values.icon}
                    name="icon"
                    id="icon"
                  >
                    <option value="">Pilih Ikon</option>
                    {iconsList.map((item) =>
                      item.type == "actuator" ? (
                        <option value={item.icon} color={"var(--color-primer)"}>
                          {item.name}
                        </option>
                      ) : null
                    )}
                  </Select>
                  <Flex m={"15px"}>
                    {iconSelected == "" ? (
                      <Image src={data.icon} />
                    ) : (
                      <Image src={iconSelected} />
                    )}
                  </Flex>
                  <FormErrorMessage>{errors.icon}</FormErrorMessage>
                </FormControl>
                <FormControl
                  marginTop={"20px"}
                  isInvalid={errors.color && touched.color}
                >
                  <FormLabel color={"var(--color-primer)"}>Warna</FormLabel>
                  <Select
                    color={"var(--color-primer)"}
                    maxWidth={"100%"}
                    marginTop={"0 auto"}
                    type="text"
                    name="color"
                    value={values.color}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                  >
                    <option value="">Pilih Warna</option>
                    {iconsList.map((item) =>
                      item.type == "actuator" && item.icon == iconSelected ? (
                        <option
                          value={item.color}
                          color={"var(--color-primer)"}
                          selected
                        >
                          {item.name}
                        </option>
                      ) : null
                    )}
                  </Select>
                  <Flex m={"15px"}>
                    <Circle bg={values.color} size="30px" />
                  </Flex>
                  <FormErrorMessage>{errors.color}</FormErrorMessage>
                </FormControl>
                <FormControl
                  marginTop={"20px"}
                  isInvalid={errors.detailact && touched.detailact}
                >
                  <FormLabel color={"var(--color-primer)"}>
                    Detail dari actuator
                  </FormLabel>
                  <Textarea
                    color={"var(--color-primer)"}
                    maxWidth={"100%"}
                    marginTop={"0 auto"}
                    type="text"
                    name="detailact"
                    defaultValue={values.detailact}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                    placeholder="detail actuator..."
                  />
                  <FormErrorMessage>{errors.range_min}</FormErrorMessage>
                </FormControl>
                <FormControl
                  marginTop={"20px"}
                  isInvalid={errors.actuator_image && touched.actuator_image}
                >
                  <FormLabel htmlFor="actuator_image" color={"black"}>
                    Gambar actuator
                  </FormLabel>
                  <Flex
                    width={"100%"}
                    h="100px"
                    borderRadius={"5px"}
                    maxWidth={"100%"}
                    marginTop={"0 auto"}
                    variant="outline"
                    placeholder="Masukkan Gambar"
                    color={"black"}
                    alignItems="center"
                    borderWidth="1px"
                    borderColor={"#D9D9D9"}
                    padding={"20px"}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        onChangeImageActuator(e.target.files[0]);
                      }}
                    />
                  </Flex>
                  <FormErrorMessage>{errors.actuator_image}</FormErrorMessage>
                </FormControl>
                <FormControl
                  marginTop={"20px"}
                  isInvalid={errors.posisition && touched.posisition}
                >
                  <FormLabel htmlFor="posisition" color={"black"}>
                    Denah Posisi actuator
                  </FormLabel>
                  <Flex
                    width={"100%"}
                    h="100px"
                    borderRadius={"5px"}
                    maxWidth={"100%"}
                    marginTop={"0 auto"}
                    variant="outline"
                    placeholder="Masukkan Posisi actuator"
                    color={"black"}
                    alignItems="center"
                    borderWidth="1px"
                    borderColor={"#D9D9D9"}
                    padding={"20px"}
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
                <Link to={"/unit/controlling"}>
                  <Button
                    marginTop={"44px"}
                    width="100%"
                    height="50px"
                    borderRadius="10px"
                    backgroundColor="var(--color-primer)"
                    type="submit"
                    className="btn-login"
                    // disabled={isSubmitting}
                    onClick={() =>
                      submit(
                        values.name,
                        values.color,
                        values.icon,
                        values.detailact
                      )
                    }
                  >
                    <Text
                      fontWeight="bold"
                      fontFamily="var(--font-family-secondary)"
                      fontSize="var(--header-3)"
                      color="var(--color-on-primary)"
                    >
                      Simpan
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
};
export default Controlling_Edit;
