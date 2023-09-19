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
import { updateSensorDetail, icons, categoryApi } from "../../Utility/api_link";
import axios from "axios";
import "./monitoring.css";

const Monitoring_Edit = () => {
  TabTitle("Edit Sensor - ITERA Hero");
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data;
  const [imageSensor, onChangeImageSensor] = useState(null);
  const [imagePos, onChangeImagePos] = useState(null);
  console.log(data);
  const header = localStorage.getItem("token");
  const [iconSelected, setIconSelected] = useState("");

  const [isloading, checkLoading] = useState(true);

  const schema = yup.object({
    name: yup.string().required("Nama harus diisi"),
    icon: yup.string().required("Ikon harus diisi"),
    color: yup.string().required("Warna harus diisi"),
    calibration: yup.string().required("Persamaan Kalibrasi harus diisi"),
    unit_measurement: yup.string().required("Satuan Ukur harus diisi"),
    brand: yup.string().required("brand harus diisi"),
    range_max: yup.number().required("Range Max harus diisi"),
    range_min: yup.number().required("Range Min harus diisi"),
    id_category_sensor: yup.string().required("id_category_sensor harus diisi"),
  });

  const dispatch = useDispatch();

  const [dataCategory, setDataCategory] = useState(null);
  const getDataCategory = async () => {
    axios
      .get(categoryApi, {
        headers: {
          Authorization: "Bearer " + header,
        },
      })
      .then((response) => {
        setDataCategory(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const putSensor = async (
    valueName,
    valueIcon,
    valueColor,
    valueCalibration,
    valueUnit,
    valueBrand,
    valueMax,
    valueMin,
    valueCategory,
    valueDetail,
    valueSensorImage,
    valuePosisition
  ) => {
    await axios
      .put(
        updateSensorDetail + data.id,
        {
          name: valueName,
          icon: valueIcon,
          color: valueColor,
          calibration: valueCalibration,
          unit_measurement: valueUnit,
          brand: valueBrand,
          range_max: valueMax,
          range_min: valueMin,
          id_category_sensor: valueCategory,
          detail: valueDetail,
          sensor_image: valueSensorImage,
          posisition: valuePosisition,
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
        alert("Data Sensor Berhasil Diperbaharui");
        navigate("/unit/monitoring");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [iconsList, setIconsList] = useState("");
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

  let dataSend = {
    name: "",
    icon: "",
    color: "",
    calibration: "",
    unit_measurement: "",
    brand: "",
    range_max: "",
    range_min: "",
    id_category_sensor: "",
    detail: "",
    sensor_image: {},
    posisition: {},
  };

  const submit = async (
    name,
    icon,
    color,
    calibration,
    unit_measurement,
    brand,
    range_max,
    range_min,
    id_category_sensor,
    detail
  ) => {
    dataSend.name = name;
    dataSend.icon = icon;
    dataSend.color = color;
    dataSend.calibration = calibration;
    dataSend.unit_measurement = unit_measurement;
    dataSend.brand = brand;
    dataSend.range_max = range_max;
    dataSend.range_min = range_min;
    dataSend.id_category_sensor = id_category_sensor;
    dataSend.detail = detail;

    if (
      dataSend.name == "" ||
      dataSend.icon == "" ||
      dataSend.color == "" ||
      dataSend.calibration == "" ||
      dataSend.unit_measurement == "" ||
      dataSend.brand == "" ||
      dataSend.range_max == "" ||
      dataSend.range_min == "" ||
      dataSend.id_category_sensor == ""
    ) {
      return alert("Masih ada yang belum di isi");
    } else {
      checkLoading(true);
      putSensor(
        name,
        icon,
        color,
        calibration,
        unit_measurement,
        brand,
        range_max,
        range_min,
        id_category_sensor,
        detail,
        imageSensor,
        imagePos
      );
    }
  };

  useEffect(() => {
    dispatch(routePageName("Monitoring"));
    getDataCategory();
    getIcon();
    checkLoading(true);
  }, []);

  return (
    <>
      {dataCategory == null || iconsList == null || isloading ? (
        <Loading />
      ) : (
        <Flex w="100%" flexDir={"column"}>
          <Flex width="100%">
            <Link to={"/unit/monitoring"}>
              <Flex marginRight={"2"}>
                <Text
                  fontWeight={"semibold"}
                  fontSize={"var(--header-3)"}
                  color={"var(--color-primer)"}
                >
                  List Sensor pada Greenhouse
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
              calibration: data.calibration,
              unit_measurement: data.unit_measurement,
              brand: data.brand,
              range_max: data.range_max,
              range_min: data.range_min,
              id_category_sensor: data.category["id"],
              detail: data.detail,
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
                  <FormLabel color={"var(--color-primer)"}>Icon</FormLabel>
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
                    <option value="">Pilih Icon</option>
                    {iconsList.map((item) =>
                      item.type == "sensor" ? (
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
                    type="hidden"
                    name="color"
                    value={values.color}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                  >
                    <option value="">Pilih Warna</option>
                    {iconsList.map((item) =>
                      item.type == "sensor" && item.icon == iconSelected ? (
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
                  isInvalid={errors.calibration && touched.calibration}
                >
                  <FormLabel color={"var(--color-primer)"}>
                    Persamaan Kalibrasi
                  </FormLabel>
                  <Input
                    color={"var(--color-primer)"}
                    maxWidth={"100%"}
                    marginTop={"0 auto"}
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
                  marginTop={"20px"}
                  isInvalid={errors.brand && touched.brand}
                >
                  <FormLabel color={"var(--color-primer)"}>Merek</FormLabel>
                  <Input
                    color={"var(--color-primer)"}
                    maxWidth={"100%"}
                    marginTop={"0 auto"}
                    type="text"
                    name="brand"
                    value={values.brand}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                    placeholder="Merek..."
                  />
                  <FormErrorMessage>{errors.brand}</FormErrorMessage>
                </FormControl>
                <FormControl
                  marginTop={"20px"}
                  isInvalid={
                    errors.unit_measurement && touched.unit_measurement
                  }
                >
                  <FormLabel color={"var(--color-primer)"}>
                    Satuan Ukur
                  </FormLabel>
                  <Input
                    color={"var(--color-primer)"}
                    maxWidth={"100%"}
                    marginTop={"0 auto"}
                    type="text"
                    name="unit_measurement"
                    value={values.unit_measurement}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                    placeholder="Satuan Ukur..."
                  />
                  <FormErrorMessage>{errors.unit_measurement}</FormErrorMessage>
                </FormControl>
                <FormControl
                  marginTop={"20px"}
                  isInvalid={errors.range_min && touched.range_min}
                >
                  <FormLabel color={"var(--color-primer)"}>Range Min</FormLabel>
                  <Input
                    color={"var(--color-primer)"}
                    maxWidth={"100%"}
                    marginTop={"0 auto"}
                    type="number"
                    name="range_min"
                    value={values.range_min}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                    placeholder="min_range..."
                  />
                  <FormErrorMessage>{errors.range_min}</FormErrorMessage>
                </FormControl>
                <FormControl
                  marginTop={"20px"}
                  isInvalid={errors.range_max && touched.range_max}
                >
                  <FormLabel color={"var(--color-primer)"}>Range Max</FormLabel>
                  <Input
                    color={"var(--color-primer)"}
                    maxWidth={"100%"}
                    marginTop={"0 auto"}
                    type="number"
                    name="range_max"
                    value={values.range_max}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                    placeholder="max_range..."
                  />
                  <FormErrorMessage>{errors.range_max}</FormErrorMessage>
                </FormControl>
                <FormControl
                  marginTop={"20px"}
                  isInvalid={
                    errors.id_category_sensor && touched.id_category_sensor
                  }
                >
                  <FormLabel color={"var(--color-primer)"}>Kategori</FormLabel>
                  <Select
                    value={values.id_category_sensor}
                    color={"var(--color-primer)"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="id_category_sensor"
                  >
                    <option value="">Pilih Kategori</option>
                    {dataCategory.map((item) => (
                      <option value={item.id} color={"var(--color-primer)"}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {errors.id_category_sensor}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  marginTop={"20px"}
                  isInvalid={errors.detail && touched.detail}
                >
                  <FormLabel color={"var(--color-primer)"}>
                    Detail dari Sensor
                  </FormLabel>
                  <Textarea
                    color={"var(--color-primer)"}
                    maxWidth={"100%"}
                    marginTop={"0 auto"}
                    type="text"
                    name="detail"
                    defaultValue={values.detail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                    placeholder="detail sensor..."
                  />
                  <FormErrorMessage>{errors.detail}</FormErrorMessage>
                </FormControl>
                <FormControl
                  marginTop={"20px"}
                  isInvalid={errors.sensor_image && touched.sensor_image}
                >
                  <FormLabel htmlFor="sensor_image" color={"black"}>
                    Gambar Sensor
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
                        onChangeImageSensor(e.target.files[0]);
                      }}
                    />
                  </Flex>
                  <FormErrorMessage>{errors.sensor_image}</FormErrorMessage>
                </FormControl>
                <FormControl
                  marginTop={"20px"}
                  isInvalid={errors.posisition && touched.posisition}
                >
                  <FormLabel htmlFor="posisition" color={"black"}>
                    Denah Posisi Sensor
                  </FormLabel>
                  <Flex
                    width={"100%"}
                    h="100px"
                    borderRadius={"5px"}
                    maxWidth={"100%"}
                    marginTop={"0 auto"}
                    variant="outline"
                    placeholder="Masukkan Posisi Sensor"
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
                <Link to={"/unit/monitoring"}>
                  <Button
                    marginTop={"44px"}
                    width="100%"
                    // height="50px important!"
                    borderRadius="10px"
                    backgroundColor="var(--color-primer)"
                    type="submit"
                    className="btn-login monitoring-edit-btn"
                    onClick={() =>
                      submit(
                        values.name,
                        values.icon,
                        values.color,
                        values.calibration,
                        values.unit_measurement,
                        values.brand,
                        values.range_max,
                        values.range_min,
                        values.id_category_sensor,
                        values.detail
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
export default Monitoring_Edit;
