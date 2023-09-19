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
import { scheduling } from "../../Utility/api_link";
import { useNavigate } from "react-router-dom";
import Loading from "../../component/loading/loading";
import { useParams } from "react-router";

const ScheduleEdit = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [dataSchedule, setDataSchedule] = useState("");

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
      .put(
        `${scheduling}/${id}`,
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
  const getSchedule = async () => {
    setIsLoading(true);
    await axios
      .get(`${scheduling}/${id}`, {
        headers: {
          Authorization: "Bearer " + header,
        },
      })
      .then((response) => {
        setIsLoading(false);
        setDataSchedule(response.data.data);
      })
      .catch((error) => {
        localStorage.clear();
      });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getSchedule();
    dispatch(routePageName(`Edit Automation ${id}`));
  }, []);

  TabTitle("Tambah Automation - ITERA Hero");
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Flex w="100%" h={["100%"]} flexDir={"column"}>
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
              <Link to={`/unit/dashboard/aktuator/${dataSchedule.id_actuator}`}>
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
          <Formik
            initialValues={{
              id_actuator: dataSchedule.id_actuator,
              start: dataSchedule.start,
              duration: dataSchedule.duration,
              repeat: dataSchedule.repeat,
              interval: dataSchedule.interval,
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
                    <option
                      value={dataSchedule.id_actuator}
                      color={"var(--color-primer)"}
                    >
                      {dataSchedule.id_actuator}
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

export default ScheduleEdit;
