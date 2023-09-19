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
  apiGetAutomation,
} from "../../Utility/api_link";
import { useNavigate } from "react-router-dom";
import Loading from "../../component/loading/loading";
import { useParams } from "react-router";
import kondisiAutomatis from "../../Utility/dropdown_kondisi";
import dropLifeCycle from "../../Utility/lifeCycleDropDown";

const AutomationEdit = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [dataActuator, setDataActuator] = useState("");
  const [dataAutomation, setDataAutomation] = useState("");
  const [dataSensor, setDataSensor] = useState(null);
  const [dataKondisi, setDataKondisi] = useState(kondisiAutomatis);

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
      setIsLoading(false);
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
      .put(
        `${apiGetAutomation}${id}`,
        {
          id_actuator: valueActuator,
          id_sensor: valueSensor,
          condition: valueCondition,
          status_lifecycle: valueStatus_lifecycle,
          constanta: valueConstanta,
        },
        {
          headers: {
            Authorization: "Bearer " + header,
          },
        }
      )
      .then((response) => {
        setIsLoading(false);
        navigate(`/unit/dashboard/aktuator/${valueActuator}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAutomation = async () => {
    setIsLoading(true);
    await axios
      .get(`${apiGetAutomation}${id}`, {
        headers: {
          Authorization: "Bearer " + header,
        },
      })
      .then((response) => {
        setDataAutomation(response.data.data);
        getActuator(response.data.data.actuator.id);
      })
      .catch((error) => {
        localStorage.clear();
      });
  };

  const getActuator = async (data) => {
    setIsLoading(true);
    await axios
      .get(`${getActuatorDetail}${data}`, {
        headers: {
          Authorization: "Bearer " + header,
        },
      })
      .then((response) => {
        setDataActuator(response.data.data);
        getSensor(response.data.data.id_greenhouse);
      })
      .catch((error) => {
        localStorage.clear();
        navigate("/login");
      });
  };

  const getSensor = async (id_greenhouse) => {
    setIsLoading(true);
    await axios
      .get(`${monitoringApi}${id_greenhouse}`, {
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
    getAutomation();
    dispatch(routePageName(`Edit Automation ${id}`));
  }, []);

  TabTitle("Tambah Automation - ITERA Hero");
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Wrap>
          <Flex bg="white" borderRadius="10px" p="10px">
            <Flex>
              <Link to="/unit/dashboard/2">
                <Text fontSize="20px" fontWeight="bold" mr="10px">
                  Dashboard
                </Text>
              </Link>
            </Flex>
            <Flex>
              <Text fontSize="20px" fontWeight="bold" mr="10px">
                {">"}
              </Text>
            </Flex>
            <Flex>
              <Link
                to={`/unit/dashboard/aktuator/${dataAutomation.actuator.id}`}
              >
                <Text fontSize="20px" fontWeight="bold" mr="10px">
                  Automation
                </Text>
              </Link>
            </Flex>
            <Flex>
              <Text fontSize="20px" fontWeight="bold" mr="10px">
                {">"}
              </Text>
            </Flex>
            <Text fontSize="20px" fontWeight="bold" mb="10px">
              {`Edit Automation ${id}`}
            </Text>
          </Flex>
          <Flex w="100%" flexDir={"column"}>
            <Formik
              initialValues={{
                actuator: dataAutomation.actuator.id,
                sensor: dataAutomation.sensor.id,
                condition: dataAutomation.condition,
                lifecycle: dataAutomation.status_lifecycle,
                constanta: dataAutomation.constanta,
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
                    isInvalid={errors.actuator && touched.actuator}
                  >
                    <FormLabel color={"var(--color-primer)"}>
                      Actuator
                    </FormLabel>
                    <Select
                      color={"var(--color-primer)"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.actuator}
                      name="actuator"
                      id="actuator"
                    >
                      <option
                        value={dataAutomation.actuator.id}
                        color={"var(--color-primer)"}
                      >
                        {dataAutomation.actuator.name}
                      </option>
                    </Select>
                    <FormErrorMessage>{errors.actuator}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    marginTop={"20px"}
                    isInvalid={errors.sensor && touched.sensor}
                  >
                    <FormLabel color={"var(--color-primer)"}>Sensor</FormLabel>
                    <Select
                      color={"var(--color-primer)"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.sensor}
                      name="sensor"
                      id="sensor"
                    >
                      <option value="">Pilih Sensor</option>
                      {dataSensor.map((item) =>
                        item.id === dataAutomation.sensor.id ? (
                          <option value={item.id} selected>
                            {item.name}
                          </option>
                        ) : (
                          <option value={item.id}>{item.name}</option>
                        )
                      )}
                    </Select>
                    <FormErrorMessage>{errors.sensor}</FormErrorMessage>
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
                      <option value="">Pilih Kondisi</option>
                      {dataKondisi.map((data) =>
                        data.value === dataAutomation.condition ? (
                          <option value={data.value} selected>
                            {data.name}
                          </option>
                        ) : (
                          <option value={data.value}>{data.name}</option>
                        )
                      )}
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
                      <option value="">Pilih Status Lifecycle</option>
                      {dropLifeCycle.map((data) =>
                        data.value === dataAutomation.status_lifecycle ? (
                          <option value={data.value} selected>
                            {data.name}
                          </option>
                        ) : (
                          <option value={data.value}>{data.name}</option>
                        )
                      )}
                    </Select>
                    <FormErrorMessage>{errors.lifecycle}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    marginTop={"20px"}
                    isInvalid={errors.constanta && touched.constanta}
                  >
                    <FormLabel color={"var(--color-primer)"}>
                      Konstanta
                    </FormLabel>
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
                      placeholder={dataAutomation.constanta}
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
                        values.actuator,
                        values.sensor,
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
                      Update
                    </Text>
                  </Button>
                </Form>
              )}
            </Formik>
          </Flex>
        </Wrap>
      )}
    </>
  );
};

export default AutomationEdit;
