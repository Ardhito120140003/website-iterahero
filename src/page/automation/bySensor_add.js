import { TabTitle } from "../../Utility/utility";
import React, { useState, useEffect } from "react";
import { Flex, Text, Button, Input, Wrap, Select } from "@chakra-ui/react";
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
import axios from "axios";
import {
  getActuatorDetail,
  addAutomation,
  monitoringApi,
} from "../../Utility/api_link";
import { useNavigate } from "react-router-dom";
import Loading from "../../component/loading/loading";
import { useParams } from "react-router";
import kondisiAutomatis from "../../Utility/dropdown_kondisi";
import automationMenu from "../../Utility/automation_menu";

const AutomationAddBySensor = (props) => {
  const id = props.data.id;
  TabTitle("Edit Automation - ITERA Hero");
  const [isLoading, setIsLoading] = useState(true);
  const [dataActuator, setDataActuator] = useState("");
  const [dataSensor, setDataSensor] = useState(null);
  const [dataKondisi, setDataKondisi] = useState(kondisiAutomatis);
  const [selected, setSelected] = useState(1);

  let data = {
    id_actuator: "",
    id_sensor: "",
    condition: "",
    status_lifecycle: "",
    constanta: "",
  };

  const navigate = useNavigate();

  const schema = yup.object({
    id_actuator: yup.number().required("data harus diisi"),
    id_sensor: yup.number().required("data harus diisi"),
    condition: yup.string().required("data harus diisi"),
    status_lifecycle: yup.number().required("data harus diisi"),
    constanta: yup.number().required("data harus diisi"),
  });

  const submit = (
    id_actuator,
    id_sensor,
    condition,
    status_lifecycle,
    constanta
  ) => {
    data.id_actuator = id_actuator;
    data.id_sensor = id_sensor;
    data.condition = condition;
    data.status_lifecycle = status_lifecycle;
    data.constanta = constanta;

    if (
      data.id_actuator == "" ||
      data.id_sensor == "" ||
      data.condition == "" ||
      data.status_lifecycle == "" ||
      data.constanta == ""
    ) {
      return alert("Masih ada yang belum di isi");
    } else {
      setIsLoading(true);
      updateAutomation(
        id_actuator,
        id_sensor,
        condition,
        status_lifecycle,
        constanta
      );
    }
  };
  const header = localStorage.getItem("token");

  const updateAutomation = (
    valueActuator,
    valueSensor,
    valueCondition,
    valueStatus_lifecycle,
    valueConstanta
  ) => {
    axios
      .post(
        addAutomation,
        {
          id_actuator: parseInt(valueActuator),
          id_sensor: parseInt(valueSensor),
          condition: valueCondition,
          status_lifecycle: parseInt(valueStatus_lifecycle),
          constanta: parseInt(valueConstanta),
        },
        {
          headers: {
            Authorization: "Bearer " + header,
          },
        }
      )
      .then((response) => {
        setIsLoading(false);
        navigate(`/unit/dashboard/aktuator/${id}`);
      })
      .catch((error) => {
        console.log(
          valueActuator,
          parseInt(valueSensor),
          valueCondition,
          valueStatus_lifecycle,
          valueConstanta
        );
        console.log(error);
      });
  };

  const getActuator = async () => {
    setIsLoading(true);
    await axios
      .get(`${getActuatorDetail}${id}`, {
        headers: {
          Authorization: "Bearer " + header,
        },
      })
      .then(async (response) => {
        setDataActuator(response.data.data);
        await getSensor(response.data.data.id_greenhouse);
      })
      .catch((error) => {
        localStorage.clear();
        navigate("/login");
      });
  };

  const getSensor = async (id_greenhouse) => {
    setIsLoading(true);
    await axios
      .get(`${monitoringApi}${id_greenhouse}&&size=100`, {
        headers: {
          Authorization: "Bearer " + header,
        },
      })
      .then((response) => {
        setDataSensor(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        localStorage.clear();
        navigate("/login");
      });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getActuator();
    dispatch(routePageName("add automation"));
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Flex w="100%" h={["100%"]} flexDir={"column"}>
          <Formik
            initialValues={{
              id_actuator: dataActuator.id,
              id_sensor: "",
              condition: "",
              status_lifecycle: "",
              constanta: "",
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
                  isInvalid={errors.id_actuator && touched.id_actuator}
                >
                  <FormLabel color={"var(--color-primer)"}>Actuator</FormLabel>
                  <Select
                    color={"var(--color-primer)"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.id_actuator}
                    name="id_actuator"
                    id="id_actuator"
                  >
                    <option
                      value={dataActuator.id}
                      color={"var(--color-primer)"}
                    >
                      {dataActuator.name}
                    </option>
                  </Select>
                  <FormErrorMessage>{errors.id_actuator}</FormErrorMessage>
                </FormControl>
                <FormControl
                  marginTop={"20px"}
                  isInvalid={errors.id_sensor && touched.id_sensor}
                >
                  <FormLabel color={"var(--color-primer)"}>Sensor</FormLabel>
                  <Select
                    color={"var(--color-primer)"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.id_sensor}
                    name="id_sensor"
                    id="id_sensor"
                  >
                    <option defaultValue="" selected>
                      Pilih Sensor
                    </option>
                    {dataSensor.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.id_sensor}</FormErrorMessage>
                </FormControl>
                <FormControl
                  marginTop={"20px"}
                  isInvalid={errors.condition && touched.condition}
                >
                  <FormLabel color={"var(--color-primer)"}>
                    Kondisi Automatis
                  </FormLabel>
                  <Select
                    color={"var(--color-primer)"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.condition}
                    name="condition"
                    id="condition"
                  >
                    <option defaultValue="" selected>
                      Pilih Kondisi
                    </option>
                    {dataKondisi.map((data) => (
                      <option value={data.value}>{data.name}</option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.condition}</FormErrorMessage>
                </FormControl>
                <FormControl
                  marginTop={"20px"}
                  isInvalid={errors.lifecycle && touched.lifecycle}
                >
                  <FormLabel color={"var(--color-primer)"}>
                    Status Lifecycle
                  </FormLabel>
                  <Select
                    color={"var(--color-primer)"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lifecycle}
                    name="lifecycle"
                    id="lifecycle"
                  >
                    <option defaultValue="" selected>
                      Pilih Status Lifecycle
                    </option>
                    <option value={0}>Off</option>
                    <option value={1}>On</option>
                  </Select>
                  <FormErrorMessage>{errors.lifecycle}</FormErrorMessage>
                </FormControl>
                <FormControl
                  marginTop={"20px"}
                  isInvalid={errors.constanta && touched.constanta}
                >
                  <FormLabel color={"var(--color-primer)"}>Konstanta</FormLabel>
                  <Input
                    color={"var(--color-primer)"}
                    maxWidth={"100%"}
                    marginTop={"0 auto"}
                    type="number"
                    name="constanta"
                    defaultValue={values.constanta}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                    placeholder="Constanta..."
                  />
                  <FormErrorMessage>{errors.constanta}</FormErrorMessage>
                </FormControl>
                <Button
                  marginTop={"44px"}
                  width="100%"
                  height="50px"
                  borderRadius="10px"
                  backgroundColor="var(--color-primer)"
                  type="submit"
                  onClick={() =>
                    submit(
                      values.id_actuator,
                      values.id_sensor,
                      values.condition,
                      values.lifecycle,
                      values.constanta
                    )
                  }
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
      )}
    </>
  );
};

export default AutomationAddBySensor;
