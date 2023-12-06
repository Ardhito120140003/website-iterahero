import {
  getNotificationByUserId,
  deleteNotification,
} from '../../Utility/api_link';
import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Button,
  Tr,
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
} from '@chakra-ui/react';
import { RiDeleteBinFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import './monitoring_table.css';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../features/auth/authSlice';

import { logout, selectUrl } from '../../features/auth/authSlice';
import Loading from '../loading/loading';

function TableNotification() {
  const base_url = useSelector(selectUrl);
  const eleminateZ = (date) => {
    const result = date.replace('T', ' ').replace('Z', ' +0700');
    return result;
  };

  const dispatch = useDispatch();
  const idLocale = require('moment/locale/id');
  moment.locale('id', idLocale);

  const deleteItem = (e, id) => {
    e.preventDefault();
    axios
      .delete(`${deleteNotification}${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {});
  };

  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [dataTable, setDataTable] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [totalData, setTotalData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
    const header = useSelector(selectToken)
    const [page, setPage] = useState(1);

  const getNotification = async () => {
    setIsLoading(true);

    await axios
      .get(`${base_url}${getNotificationByUserId}&&page=${page}`, {
        headers: {
          Authorization: `Bearer ${header}`,
        },
      })
      .then((response) => {
        setDataTable(response.data.data);
        setTotalPage(response.data.totalPage);
        setIsLoading(false);
      })
      .catch((error) => {
        
        
        navigate('/login');
      });
  };
  const getPagination = async () => {
    setIsLoading(true);

    await axios
      .get(`${base_url}${getNotificationByUserId}&&size=1000`, {
        headers: {
          Authorization: `Bearer ${header}`,
        },
      })
      .then((response) => {
        setTotalData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        
        
        navigate('/login');
      });
  };
  useEffect(() => {
    getPagination();
    getNotification();
    return () => {
      setIsLoading(true);
    };
  }, [page]);

  return (
    <>
      {/* {dataTable.map((item, index) => {
				return (
					<div>
						<p>{item.id}</p>
						<p>{item.detail}</p>
					</div>
				);
			})}
		</> */}
      {dataTable == null || isLoading ? (
        <Loading />
      ) : (
        <Box
          width={{ base: '92vw', lg: '73vw', xl: '78vw' }}
          borderRadius="md"
          boxShadow="md"
          bg="var(--color-on-primary)"
          justify="flex-start"
          mt={30}
        >
          <TableContainer
            borderRadius="md"
            bg="white"
            width="100%"
            overflowX="auto"
          >
            <Table
              variant="simple"
              size={['lg', 'md', 'sm']}
              overflowX="hidden"
            >
              <Thead>
                <Tr
                  textAlign="center"
                  alignContent="center"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Th textAlign="center">No</Th>
                  <Th textAlign="center">Detail 
                  ikasi</Th>
                  <Th textAlign="center">Tipe</Th>
                  <Th textAlign="center">Waktu</Th>
                  <Th textAlign="center">Lokasi</Th>
                  <Th textAlign="center">Id Actuator</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataTable.map((item, index) => (
                  <Tr key={index}>
                    <Td textAlign="center" color="var(--color-primer)">
                      {index + 1}
                    </Td>
                    <Td textAlign="center" color="var(--color-primer)">
                      {item.detail}
                    </Td>
                    <Td textAlign="center" color="var(--color-primer)">
                      {item.type}
                    </Td>
                    <Td textAlign="center" color="var(--color-primer)">
                      {moment(eleminateZ(item.created_at)).format(
                        'DD MMMM YYYY, h:mm:ss a',
                      )}
                    </Td>
                    <Td textAlign="center" color="var(--color-primer)">
                      {item.greenhouse_loc}
                    </Td>
                    <Td textAlign="center" color="var(--color-primer)">
                      {item.id_actuator}
                    </Td>
                    <Td textAlign="center">
                      <Flex justifyContent="space-evenly">
                        <Button
                          onClick={() => {
                            setId(item.id);
                            onOpen();
                          }}
                          bg="var(--color-on-primary)"
                          color="var(--color-error)"
                        >
                          <RiDeleteBinFill />
                        </Button>
                        <Modal isOpen={isOpen} onClose={onClose}>
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Peringatan !</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              Apakah anda yakin ingin menghapus notifikasi
                              ini?
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
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          {dataTable.length > 0 ? (
            <Flex justify="space-between">
              <Flex>
                <p>
                  Showing
                  {' '}
                  {dataTable.length}
                  {' '}
                  of
                  {' '}
                  {totalData.length}
                  {' '}
                  entries
                </p>
              </Flex>
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
                    <a className="page-link">
                      {' '}
                      {page}
                    </a>
                  </li>
                  {page + 1 <= totalPage ? (
                    <li className="page-item">
                      <a
                        className="page-link"
                        onClick={() => {
                          setPage(page + 1);
                        }}
                      >
                        {' '}
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
        </Box>
      )}
    </>
  );
}

export default TableNotification;
