import React, { useState, useEffect } from 'react';
import './monitoring.css';
import {
  Text, Button, Select, Flex,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { routePageName, selectUrl } from '../../features/auth/authSlice';
import { TabTitle } from '../../Utility/utility';
import TableMonitoring from '../../component/table/monitoring_table';
import { greenhouseByUserId } from '../../Utility/api_link';
import Loading from '../../component/loading/loading';

function Monitoring() {
  const base_url = useSelector(selectUrl);
  TabTitle('Monitoring - ITERA Hero');
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [dataApi, setDataApi] = useState(null);
  const header = localStorage.getItem('token');
  const dispatch = useDispatch();

  const [filterData, setFilterData] = useState([]);
  const [firstFilter, setFirstFilter] = useState("greenhouse");
  const [secondFilter, setSecondFilter] = useState(1);

  const getDataApi = async () => {
    let url = `${base_url}api/v1/${firstFilter}`;
    console.log('url : ',url);

    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${header}`,
        },
      })
      .then((response) => {
        if (response.data.data.length > 0) {
          setDataApi(response.data.data);
        } else {
          setDataApi(response.data.data);
        }
      })
      .catch((error) => {
        // localStorage.clear();
        // dispatch(logout());
        // navigate('/login');
      });
  };

  useEffect(() => {
    dispatch(routePageName('Monitoring'));
    getDataApi();
    
    axios
    .get(base_url + "api/v1/" + firstFilter, {
      headers: {
        Authorization: "Bearer " + header,
      },
    })
    .then((response) => {
      setFilterData(response.data.data);
    })
    .catch((err) => {
      console.error(err);
    });

  }, [firstFilter]);

  console.log('filter 1 : ',firstFilter);
  console.log('filter 2 : ',secondFilter);

  return (
    <>
      {dataApi == null ? (
        <Loading />
      ) : (
        <Flex gap="30px" width="100%" flexDir="column">
          <Flex justifyContent="space-between" width="100%">
            <Link>
              <Text fontWeight="semibold" fontSize="var(--header-3)" color="var(--color-primer)">
                List Sensor pada Greenhouse
              </Text>
            </Link>
          </Flex>
          <Flex alignContent="center" alignItems="center" justifyContent="space-between">
            <Flex width="30%">
              <Formik
                initialValues={{
                  filter1: firstFilter,
                  filter2: secondFilter,
                }}
                onSubmit={(values) => {
                  setData(values.greenhouse);
                }}
              >
                {({
                  values,
                  resetForm,
                  handleSubmit,
                  setFieldValue,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Flex alignContent="center" alignItems="center" justify="space-between">
                    <Flex alignItems={"space-between"} width={"100%"}>
                        <Select
                          size={"lg"}
                          name="filter1"
                          as={Select}
                          borderRadius={"10"}
                          width={"25vw"}
                          height={"5vh"}
                          bg={"white"}
                          _active={{ bg: "white" }}
                          borderColor={"var(--color-border)"}
                          fontSize={"var(--header-5)"}
                          fontWeight={"normal"}
                          color={"var(--color-primer)"}
                          _hover={{ borderColor: "var(--color-border)" }}
                          _focusWithin={{ borderColor: "var(--color-border)" }}
                          mr={5}
                          value={values.filter1}
                          onChange={(e) => {
                            setFieldValue("filter1", e.target.value);
                            setFieldValue("filter2", null);
                            setFirstFilter(e.target.value);
                            setSecondFilter(null);
                            
                          }}
                        >
                          <option value="greenhouse">Greenhouse</option>
                          <option value="tandonUtama">Tandon</option>
                        </Select>

                        <Select
                          name="filter2"
                          as={Select}
                          borderRadius={"10"}
                          width={"25vw"}
                          height={"5vh"}
                          bg={"white"}
                          _active={{ bg: "white" }}
                          borderColor={"var(--color-border)"}
                          fontSize={"var(--header-5)"}
                          fontWeight={"normal"}
                          color={"var(--color-primer)"}
                          _hover={{ borderColor: "var(--color-border)" }}
                          _focusWithin={{ borderColor: "var(--color-border)" }}
                          value={values.filter2}
                          disabled={!values.filter1}
                          onChange={(e) => {
                            setFieldValue("filter2", e.target.value);
                            setSecondFilter(e.target.value);
                          }}
                        >
                          <option disabled={values.filter2} selected={!values.filter2}>{`Pilih ${(() => {
                            let x = values.filter1.replace(/([A-Z])/g, ' $1');
                            let text = x.charAt(0).toUpperCase() + x.slice(1);
                            return text;
                          })()}`}</option>
                          {filterData.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.nama || item.name}
                            </option>
                          ))}
                        </Select>
                      </Flex>
                    </Flex>
                  </form>
                )}
              </Formik>
            </Flex>
            {!secondFilter ? (
              null
            ) : (
              <Link to={`/unit/monitoring/add/${firstFilter}/${secondFilter}`}>
                <Button
                  type="submit"
                  bg="var(--color-primer)"
                >
                  Tambah
                </Button>
              </Link>
            )}
          </Flex>
          {secondFilter === ''? (
            <></>
            ) : (
            <TableMonitoring
              data={{
                id: secondFilter,
                route: firstFilter,
              }}
            />
            )}
        </Flex>
      )}
    </>
  );
}
export default Monitoring;
