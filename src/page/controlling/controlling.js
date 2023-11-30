import React, { useState, useEffect } from 'react';
import './controlling.css';
import {
  Text, Button, Select, Flex,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Formik } from 'formik';
import { TabTitle } from '../../Utility/utility';
import { logout, routePageName, selectUrl } from '../../features/auth/authSlice';
import { greenhouseByUserId } from '../../Utility/api_link';
import Loading from '../../component/loading/loading';
import TableControlling from '../../component/table/controlling_table';

function Controlling() {
  const base_url = useSelector(selectUrl);
  TabTitle('Controlling - ITERA Hero');
  const navigate = useNavigate();
  const [dataApi, setDataApi] = useState(null);
  const header = localStorage.getItem('token');

  const [filterData, setFilterData] = useState([]);
  const [firstFilter, setFirstFilter] = useState("greenhouse");
  const [secondFilter, setSecondFilter] = useState(1);

  const getDataApi = async () => {

    let url = `${base_url}api/v1/${firstFilter}`;
    console.log('url : ', url);
    console.log('filter 1 : ', firstFilter);
    console.log('filter 2 : ', secondFilter);

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
        localStorage.clear();
        dispatch(logout());
        navigate('/login');
      });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(routePageName('Controlling'));
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

  return (
    <>
      {dataApi == null ? (
        <Loading />
      ) : (
        <Flex gap="30px" width="100%" flexDir="column">
          <Flex justifyContent="space-between" width="100%">
            <Link>
              <Text
                fontWeight="semibold"
                fontSize="var(--header-3)"
                color="var(--color-primer)"
              >
                List Controlling pada Greenhouse
              </Text>
            </Link>
          </Flex>
          <Flex
            alignContent="center"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex width="100%">
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
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Flex
                      alignContent="center"
                      alignItems="center"
                      justify="space-between"
                    >
                      {/* <Flex width="100%">
                        <Select
                          onChange={(e) => {
                            setFieldValue('id', e.target.value);
                            setData(e.target.value);
                          }}
                          size="xs"
                          borderRadius="10"
                          name="greenhouse"
                          value={values.id}
                          placeholder="Pilih Greenhouse"
                          width="100%"
                          bg="white"
                          _active={{ bg: 'white' }}
                          borderColor="var(--color-border)"
                          fontSize="var(--header-5)"
                          fontWeight="normal"
                          color="var(--color-primer)"
                          _hover={{ borderColor: 'var(--color-border)' }}
                          _focusWithin={{ borderColor: 'var(--color-border)' }}
                        >
                          {dataApi.map((item, index) => (index == 0 ? (
                            <option
                              color="var(--color-border)"
                              key={index}
                              value={item.id}
                              selected
                            >
                              {item.name}
                            </option>
                          ) : (
                            <option
                              color="var(--color-border)"
                              key={index}
                              value={item.id}
                            >
                              {item.name}
                            </option>
                          )))}
                        </Select>
                      </Flex> */}

                      <Flex alignItems={"space-between"} width={"100%"}>
                        <Select
                          size={"lg"}
                          name="filter1"
                          as={Select}
                          borderRadius={"10"}
                          width={"25vw"}
                          height={"30px"}
                          bg={"white"}
                          _active={{ bg: "white" }}
                          borderColor={"grey"}
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
                          height={"30px"}
                          bg={"white"}
                          _active={{ bg: "white" }}
                          borderColor={"grey"}
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
            <Button
              data={{ name: secondFilter }}
              type="submit"
              bg="var(--color-primer)"
              disabled={!secondFilter}
              onClick={() => navigate(`/unit/controlling/add/${firstFilter}/${secondFilter}`)}
            >
              Tambah
            </Button>
          </Flex>
          {!secondFilter ? (
            <></>
          ) : (
            <TableControlling
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
export default Controlling;
