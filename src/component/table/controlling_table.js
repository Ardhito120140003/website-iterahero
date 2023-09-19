import { controllingApi, deleteAktuatorApi } from "../..//Utility/api_link";
import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Button,
  Tr,
  Image,
  Th,
  Td,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  ModalBody,
  TableContainer,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { RiDeleteBinFill, RiPencilFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../component/loading/loading";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import "./monitoring_table.css";

const TableControlling = (props) => {
  const idApi = props.data.id;
  const deleteItem = (e, id) => {
    e.preventDefault();
    axios
      .delete(`${deleteAktuatorApi}${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [dataTable, setDataTable] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [totalData, setTotalData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(1);

  const getApiControlling = async () => {
    setIsLoading(true);

    const header = localStorage.getItem("token");
    await axios
      .get(`${controllingApi}${idApi}&&page=${page}`, {
        headers: {
          Authorization: "Bearer " + header,
        },
      })
      .then((response) => {
        setDataTable(response.data.data);
        setTotalPage(response.data.totalPage);
        setIsLoading(false);
      })
      .catch((error) => {
        localStorage.clear();
        navigate("/login");
      });
  };
  const getPagination = async () => {
    setIsLoading(true);

    const header = localStorage.getItem("token");
    await axios
      .get(`${controllingApi}${idApi}&&size=100`, {
        headers: {
          Authorization: "Bearer " + header,
        },
      })
      .then((response) => {
        setTotalData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        localStorage.clear();
        navigate("/login");
      });
  };

  useEffect(() => {
    getPagination();
    getApiControlling();
    return () => {
      setIsLoading(true);
    };
  }, [idApi, page]);
  return (
    <>
      {dataTable == null || isLoading ? (
        <Loading />
      ) : (
        <Box
          width={{ base: "92vw", lg: "73vw", xl: "78vw" }}
          borderRadius={"md"}
          boxShadow={"md"}
          bg={"var(--color-on-primary)"}
          justify="flex-start"
          mt={30}
        >
          <TableContainer
            borderRadius={"md"}
            bg={"white"}
            width="100%"
            overflowX="auto"
          >
            <Table variant="simple" size={["lg", "md", "sm"]}>
              <Thead>
                <Tr
                  textAlign={"center"}
                  alignContent={"center"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Th textAlign={"center"}>No</Th>
                  <Th textAlign={"center"}>Nama Alat</Th>
                  <Th textAlign={"center"}>Icon</Th>
                  <Th textAlign={"center"}>Life Cycle</Th>
                  <Th textAlign={"center"}>Warna</Th>
                  <Th textAlign={"center"}>Detail</Th>
                  <Th textAlign={"center"}>Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataTable.map((item, index) => {
                  return (
                    <Tr key={index}>
                      <Td textAlign={"center"} color={"var(--color-primer)"}>
                        {index + 1}
                      </Td>
                      <Td textAlign={"center"} color={"var(--color-primer)"}>
                        {item.name}
                      </Td>
                      <Td
                        display={"flex"}
                        justifyContent="center"
                        alignItems={"center"}
                      >
                        <Image height={"30px"} src={item.icon} alt="icon" />
                      </Td>
                      <Td textAlign={"center"} color={"var(--color-primer)"}>
                        {item.status_lifecycle}
                      </Td>
                      <Td
                        display={"flex"}
                        justifyContent="center"
                        alignItems={"center"}
                      >
                        <Box
                          width={"20px"}
                          borderRadius={"100px"}
                          height={"20px"}
                          background={item.color}
                        ></Box>
                      </Td>
                      <Td textAlign={"center"} color={"var(--color-primer)"}>
                        <Link
                          to={{
                            pathname: "/unit/controlling/detail/" + item.id,
                          }}
                          state={{
                            data: item,
                          }}
                        >
                          <Button>Detail</Button>
                        </Link>
                      </Td>
                      <Td textAlign={"center"}>
                        <Flex justifyContent={"space-evenly"}>
                          <Link
                            to={{
                              pathname: "/unit/controlling/edit/" + item.id,
                            }}
                            state={{
                              data: item,
                            }}
                          >
                            <Button
                              bg={"var(--color-on-primary)"}
                              color={"var(--color-info)"}
                            >
                              <RiPencilFill />
                            </Button>
                          </Link>
                          <Button
                            onClick={() => {
                              setId(item.id);
                              setName(item.name);
                              onOpen();
                            }}
                            bg={"var(--color-on-primary)"}
                            color={"var(--color-error)"}
                          >
                            <RiDeleteBinFill />
                          </Button>
                          <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                              <ModalHeader>Peringatan !</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>
                                Apakah anda yakin ingin menghapus {name} ini?
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  colorScheme="blue"
                                  onClick={(e) => {
                                    deleteItem(e, id);
                                    onClose();
                                  }}
                                  mr={3}
                                >
                                  Hapus
                                </Button>
                                <Button
                                  onClick={() => {
                                    onClose();
                                  }}
                                  variant="ghost"
                                >
                                  Batal
                                </Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
                        </Flex>
                      </Td>
                    </Tr>
                  );
                })}
                ;
              </Tbody>
            </Table>
          </TableContainer>
          {dataTable.length > 0 ? (
            <Flex justify={"space-between"}>
              <p>
                Showing {dataTable.length} of {totalData.length} entries
              </p>
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="previous">
                    <a
                      class="page-link"
                      onClick={() => {
                        setPage(1);
                      }}
                    >
                      <GrFormPrevious />
                    </a>
                  </li>
                  {page - 1 != 0 ? (
                    <li class="page-item">
                      <a
                        class="page-link"
                        onClick={() => {
                          setPage(page - 1);
                        }}
                      >
                        {page - 1}
                      </a>
                    </li>
                  ) : null}
                  <li class="page-item-active">
                    <a class="page-link"> {page}</a>
                  </li>
                  {page + 1 <= totalPage ? (
                    <li class="page-item">
                      <a
                        class="page-link"
                        onClick={() => {
                          setPage(page + 1);
                        }}
                      >
                        {" "}
                        {page + 1}
                      </a>
                    </li>
                  ) : null}
                  <li class="next">
                    <a
                      class="page-link"
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
        </Box>
      )}
    </>
  );
};
export default TableControlling;
