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
  scheduling,
} from "../../Utility/api_link";
import { useNavigate } from "react-router-dom";
import Loading from "../../component/loading/loading";
import { useParams } from "react-router";
import kondisiAutomatis from "../../Utility/dropdown_kondisi";
import automationMenu from "../../Utility/automation_menu";
import startItem from "../../Utility/start_time";

const SchedulingAdd = (props) => {
  const id = props.data.id;
  TabTitle("Edit Automation - ITERA Hero");
  const [isLoading, setIsLoading] = useState(false);

  let data = {
    id_actuator: "",
    start: "",
    duration: "",
    repeat: "",
    interval: "",
  };

  const navigate = useNavigate();

  const schema = yup.object({
    id_actuator: yup.number().required("data harus diisi"),
    start: yup.string().required("data harus diisi"),
    duration: yup.number().required("data harus diisi"),
    repeat: yup.number().required("data harus diisi"),
    interval: yup.number().required("data harus diisi"),
  });

  const submit = (id_actuator, start, duration, repeat, interval) => {
    data.id_actuator = id_actuator;
    data.start = start;
    data.duration = duration;
    data.repeat = repeat;
    data.interval = interval;

    if (
      data.id_actuator == "" ||
      data.start == "" ||
      data.duration == "" ||
      data.repeat == "" ||
      data.interval == ""
    ) {
      return alert("Masih ada yang belum di isi");
    } else {
      setIsLoading(true);
      updateAutomation(id_actuator, start, duration, repeat, interval);
    }
  };
  const header = localStorage.getItem("token");

  const updateAutomation = (
    valueActuator,
    valueStart,
    valueDuration,
    valueRepeat,
    valuInterval
  ) => {
    console.log(
      valueActuator,
      valueStart,
      valueDuration,
      valueRepeat,
      valuInterval
    );
    axios
      .post(
        scheduling,
        {
          id_actuator: valueActuator,
          start: valueStart,
          duration: valueDuration,
          repeat: valueRepeat,
          interval: valuInterval,
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

  const dispatch = useDispatch();

  useEffect(() => {
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
              id_actuator: id,
              start: "",
              duration: "",
              repeat: "",
              interval: "",
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
                  visibility={"hidden"}
                  position={"absolute"}
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
                    <option value={id} color={"var(--color-primer)"}>
                      {id}
                    </option>
                  </Select>
                  <FormErrorMessage>{errors.id_actuator}</FormErrorMessage>
                </FormControl>
                <FormControl
                  marginTop={"20px"}
                  isInvalid={errors.start && touched.start}
                >
                  <FormLabel color={"var(--color-primer)"}>Jam Mulai</FormLabel>
                  <Input
                    width={"100%"}
                    maxWidth={"100%"}
                    marginTop={"0 auto"}
                    type="time"
                    name="start"
                    value={values.start}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                    color={"black"}
                  />
                  <FormErrorMessage>{errors.start}</FormErrorMessage>
                </FormControl>
                <FormControl
                  marginTop={"20px"}
                  isInvalid={errors.duration && touched.duration}
                >
                  <FormLabel color={"var(--color-primer)"}>
                    Durasi Menyala (menit)
                  </FormLabel>
                  <Input
                    width={"100%"}
                    maxWidth={"100%"}
                    marginTop={"0 auto"}
                    type="number"
                    name="duration"
                    value={values.duration}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                    color={"black"}
                    placeholder="Masukkan durasi"
                  />
                  <FormErrorMessage>{errors.duration}</FormErrorMessage>
                </FormControl>
                <FormControl
                  marginTop={"20px"}
                  isInvalid={errors.repeat && touched.repeat}
                >
                  <FormLabel color={"var(--color-primer)"}>
                    Perulangan (loop)
                  </FormLabel>
                  <Input
                    width={"100%"}
                    maxWidth={"100%"}
                    marginTop={"0 auto"}
                    type="number"
                    name="repeat"
                    value={values.repeat}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                    color={"black"}
                    placeholder="Masukkan perulangan .."
                  />
                  <FormErrorMessage>{errors.repeat}</FormErrorMessage>
                </FormControl>
                <FormControl
                  marginTop={"20px"}
                  isInvalid={errors.interval && touched.interval}
                >
                  <FormLabel color={"var(--color-primer)"}>
                    Lama waktu antar alat menyala
                  </FormLabel>
                  <Input
                    color={"var(--color-primer)"}
                    maxWidth={"100%"}
                    marginTop={"0 auto"}
                    type="number"
                    name="interval"
                    defaultValue={values.interval}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outline"
                    placeholder="Masukkan Interval"
                  />
                  <FormErrorMessage>{errors.interval}</FormErrorMessage>
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
                      values.start,
                      values.duration,
                      values.repeat,
                      values.interval
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

export default SchedulingAdd;
