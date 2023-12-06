import React, { useState, useEffect } from "react";
import { Text, Image, Flex, Wrap, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { getLogAktuator } from "../../Utility/api_link";
import Loading from "../loading/loading";

import CardLogActuatorToday from "./today_card_log_act";
import { logout, selectUrl } from "../../features/auth/authSlice";

function CardLogActuator(props) {
  const eleminateZ = (date) => {
    const result = date.replace("T", " ").replace("Z", " +0700");
    return result;
  };
  const base_url = useSelector(selectUrl);
  const idApi = props.data.id;
  const idLocale = require("moment/locale/id");
  moment.locale("id", idLocale);
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [totalData, setTotalData] = useState("");
  const [log, setLog] = useState({})
  const [page, setPage] = useState(1);
  const header = localStorage.getItem('token')

  const getPagination = async () => {
    await axios
      .get(`${base_url}api/v1/logging/aktuator`, {
        params: {
          id: idApi
        },
        headers: {
          Authorization: `Bearer ${header}`,
        },
      })
      .then(({ data }) => {
        console.log(data)
        setDataTable(data.data)
        setLog(data.log)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setIsLoading(false))
  };

  useEffect(() => {
    getPagination();
  }, [idApi, page]);
  return (
    <>
      {dataTable == null || isLoading ? (
        <Loading />
      ) : (
        <Flex direction="column" w={["100%"]} margin="0px">
          <CardLogActuatorToday data={{ id: idApi, log }} w={["100%"]} />
          <Flex align="center" justify="center" w={["100%"]}>
            <Wrap align="center" spacing="10px" mt="30px" w={["100%"]}>
              {
                dataTable.length < 1 ? (
                  <Text>Kosong</Text>
                ) : (
                  dataTable.map((item, index) => (
                    <Box
                      key={index}
                      w={["100%"]}
                      className="card-sensor"
                      bg="#ffff"
                      borderRadius="10px"
                      border="1px solid #E2E8F0"
                      padding="10px"
                    >
                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        w={["100%"]}
                        direction={{ base: "column", md: "row" }}
                      >
                        <Flex>
                          <Wrap padding="10px" w="60px">
                            <Image
                              className="Image"
                              w={["100%"]}
                              h={["100%"]}
                              src={
                                item.on_off_status == 0
                                  ? "/off_log.png"
                                  : "/on_log.png"
                              }
                              alt="image"
                            />
                          </Wrap>
                          <Flex
                            direction="column"
                            alignItems="start"
                            justifyContent="center"
                          >
                            <Text>
                              Status
                              {item.on_off_status == 1 ? (
                                <Text
                                  width="100%"
                                  fontWeight="bold"
                                  color="var(--color-secondary-variant)"
                                >
                                  Nyala
                                </Text>
                              ) : (
                                <Text
                                  width="100%"
                                  fontWeight="bold"
                                  color="var(--color-error)"
                                >
                                  Mati
                                </Text>
                              )}
                            </Text>
                            <Text>
                              {moment(eleminateZ(item.created_at))
                                .startOf("seconds")
                                .fromNow()}
                            </Text>
                          </Flex>
                        </Flex>
                        <Text>
                          {moment(eleminateZ(item.created_at)).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </Text>
                      </Flex>
                    </Box>
                  )))}
            </Wrap>
          </Flex>
          {dataTable.length > 0 ? (
            <Flex justify="space-between">
              <p>
                Showing {dataTable.length} of {totalData} entries
              </p>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="previous">
                    <a
                      className="page-link"
                      onClick={() => {
                        setPage(1);
                      }}
                    >
                      <GrFormPrevious />
                    </a>
                  </li>
                  {page - 1 != 0 ? (
                    <li className="page-item">
                      <a
                        className="page-link"
                        onClick={() => {
                          setPage(page - 1);
                        }}
                      >
                        {page - 1}
                      </a>
                    </li>
                  ) : null}
                  <li className="page-item-active">
                    <a className="page-link"> {page}</a>
                  </li>
                  {page + 1 <= totalPage ? (
                    <li className="page-item">
                      <a
                        className="page-link"
                        onClick={() => {
                          setPage(page + 1);
                        }}
                      >
                        {" "}
                        {page + 1}
                      </a>
                    </li>
                  ) : null}
                  <li className="next">
                    <a
                      className="page-link"
                      onClick={() => {
                        setPage(totalPage);
                      }}
                    >
                      <GrFormNext />
                    </a>
                  </li>
                </ul>
              </nav>
            </Flex>
          ) : null}
        </Flex>
      )}
    </>
  );
}
export default CardLogActuator;
