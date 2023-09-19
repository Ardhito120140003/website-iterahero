import React, { useState, useEffect } from "react";
import {
  Flex,
  Image,
  Text,
  Input,
  Icon,
  calc,
  Circle,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { routePageName } from "../../redux/action";
import { TabTitle } from "../../Utility/utility";
import {
  getApiGreenhouse,
  addActuatorApi,
  icons,
} from "../../Utility/api_link";
import axios from "axios";
import Loading from "../../component/loading/loading";

const Controlling_Add = () => {
  TabTitle("Tambah Aktuator - ITERA Hero");
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataApi, setDataApi] = useState(null);
  const [icon_selected, setIcon_selected] = useState("");
  const [iconsList, setIconsList] = useState("");
  const [isloading, checkLoading] = useState(true);
  const [imageActuator, onChangeImageActuator] = useState(null);
  const [imagePos, onChangeImagePos] = useState(null);

  const schema = yup.object({
    name: yup.string().required("Nama harus diisi"),
    icon: yup.string().required("Ikon harus diisi"),
    color: yup.string().required("Warna harus diisi"),
  });

  const getIcon = async () => {
    axios
      .get(icons)
      .then((response) => {
        setIconsList(response.data.data);
        checkLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getDataApi = async () => {
    axios
      .get(getApiGreenhouse + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setDataApi(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(routePageName("Controlling"));
    getDataApi();
    getIcon();
    checkLoading(true);
  }, []);

  return (
    <>
      {dataApi == null || iconsList == null || isloading ? (
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
            <Link>
              <Flex>
                {dataApi.id == id ? (
                  <Text
                    fontWeight={"semibold"}
                    fontSize={"var(--header-3)"}
                    color={"var(--color-primer)"}
                  >
                    {" "}
                    {dataApi.name}{" "}
                  </Text>
                ) : (
                  <Text
                    fontWeight={"semibold"}
                    fontSize={"var(--header-3)"}
                    color={"var(--color-primer)"}
                  >
                    {" "}
                    {dataApi.name}{" "}
                  </Text>
                )}
              </Flex>
            </Link>
          </Flex>
          <Formik
            validationSchema={schema}
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={{
              name: "",
              icon: "",
              color: "",
              id_greenhouse: id,
              detailact: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(async () => {
                const submitedData = new FormData();
                submitedData.append("name", values.name);
                submitedData.append("icon", values.icon);
                submitedData.append("color", values.color);
                submitedData.append("id_greenhouse", values.id_greenhouse);
                submitedData.append("detailact", values.detailact);
                submitedData.append("actuator_image", imageActuator);
                submitedData.append("posisitionact", imagePos);
                await axios
                  .post(addActuatorApi, submitedData, {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                      "content-type": "multipart/form-data",
                    },
                  })
                  .then((response) => {
                    if (response.status === 201) {
                      alert("Data berhasil ditambahkan");
                      navigate(-1);
                    } else {
                      alert("Data gagal ditambahkan");
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
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
              <Form onSubmit={handleSubmit}>
                <FormControl
                  marginTop={"20px"}
                  isInvalid={errors.name && touched.name}
                >
                  <FormLabel color={"var(--color-primer)"}>Name</FormLabel>
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
                    placeholder="Name..."
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl
                  marginTop={"20px"}
                  isInvalid={errors.icon && touched.icon}
                >
                  <FormLabel color={"var(--color-primer)"}>Icon</FormLabel>
                  <Select
                    color={"var(--color-primer)"}
                    onChange={(e) => {
                      setFieldValue("icon", e.target.value);
                      setIcon_selected(e.target.value);
                    }}
                    onBlur={handleBlur}
                    value={values.icon}
                    name="icon"
                    id="icon"
                  >
                    <option value="" selected>
                      Pilih Icon
                    </option>
                    {iconsList.map((item) =>
                      item.type == "actuator" ? (
                        <option value={item.icon} color={"var(--color-primer)"}>
                          {item.name}
                        </option>
                      ) : null
                    )}
                  </Select>
                  <Flex m={"15px"}>
                    <Image src={icon_selected} />
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
                    type="hidden"
                    name="color"
                    value={values.color}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                  >
                    <option value="">Pilih Warna</option>
                    {iconsList.map((item) =>
                      item.type == "actuator" && item.icon == icon_selected ? (
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
                  <FormErrorMessage>{errors.detailact}</FormErrorMessage>
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
                  isInvalid={errors.posisitionact && touched.posisitionact}
                >
                  <FormLabel htmlFor="posisitionact" color={"black"}>
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
                  <FormErrorMessage>{errors.posisitionact}</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <Input
                    type="hidden"
                    value={id}
                    name="id_greenhouse"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                    placeholder="id..."
                  />
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
                    disabled={isSubmitting}
                    onClick={handleSubmit}
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
};
export default Controlling_Add;
