import React, { useState, useEffect } from "react";
import "./controlling.css";
import { Text, Button, Select, Flex, Form } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { TabTitle } from "../../Utility/utility";
import { useDispatch } from "react-redux";
import { routePageName } from "../../redux/action";
import axios from "axios";
import { greenhouseByUserId } from "../../Utility/api_link";
import Loading from "../../component/loading/loading";
import TableControlling from "../../component/table/controlling_table";
import { Formik } from "formik";

const Controlling = () => {
  TabTitle("Controlling - ITERA Hero");
  const navigate = useNavigate();
  const [dataApi, setDataApi] = useState(null);
  const [data, setData] = useState("");
  const header = localStorage.getItem("token");

  const getApiGreenhouse = async () => {
    await axios
      .get(greenhouseByUserId, {
        headers: {
          Authorization: "Bearer " + header,
        },
      })
      .then((response) => {
        if (response.data.data.length > 0) {
          setDataApi(response.data.data);
          setData(response.data.data[0].id);
        } else {
          setDataApi(response.data.data);
        }
      })
      .catch((error) => {
        localStorage.clear();
        navigate("/login");
      });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(routePageName("Controlling"));
    getApiGreenhouse();
  }, []);
  return (
    <>
      {dataApi == null ? (
        <Loading />
      ) : (
        <Flex gap={"30px"} width={"100%"} flexDir={"column"}>
          <Flex justifyContent={"space-between"} width="100%">
            <Link>
              <Text
                fontWeight={"semibold"}
                fontSize={"var(--header-3)"}
                color={"var(--color-primer)"}
              >
                List Controlling pada Greenhouse
              </Text>
            </Link>
          </Flex>
          <Flex
            alignContent={"center"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Flex width={"30%"}>
              <Formik
                initialValues={{
                  data,
                }}
                onSubmit={(values) => {
                  setData(values.greenhouse);
                }}
              >
                {({
                  values,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Flex
                      alignContent={"center"}
                      alignItems={"center"}
                      justify={"space-between"}
                    >
                      <Flex width={"100%"}>
                        <Select
                          onChange={(e) => {
                            setFieldValue("id", e.target.value);
                            setData(e.target.value);
                          }}
                          size="xs"
                          borderRadius={"10"}
                          name="greenhouse"
                          value={values.id}
                          placeholder="Pilih Greenhouse"
                          width={"100%"}
                          bg={"white"}
                          _active={{ bg: "white" }}
                          borderColor={"var(--color-border)"}
                          fontSize={"var(--header-5)"}
                          fontWeight={"normal"}
                          color={"var(--color-primer)"}
                          _hover={{ borderColor: "var(--color-border)" }}
                          _focusWithin={{ borderColor: "var(--color-border)" }}
                        >
                          {dataApi.map((item, index) => {
                            return index == 0 ? (
                              <option
                                color={"var(--color-border)"}
                                key={index}
                                value={item.id}
                                selected
                              >
                                {item.name}
                              </option>
                            ) : (
                              <option
                                color={"var(--color-border)"}
                                key={index}
                                value={item.id}
                              >
                                {item.name}
                              </option>
                            );
                          })}
                        </Select>
                      </Flex>
                    </Flex>
                  </form>
                )}
              </Formik>
            </Flex>
            {data === "" ? (
              <></>
            ) : (
              <Link to={"/unit/controlling/add/" + data}>
                <Button
                  data={{ name: data }}
                  type="submit"
                  bg={"var(--color-primer)"}
                >
                  Tambah
                </Button>
              </Link>
            )}
          </Flex>
          {data === "" ? (
            <></>
          ) : (
            <TableControlling
              data={{
                id: data,
              }}
            />
          )}
        </Flex>
      )}
    </>
  );
};
export default Controlling;
