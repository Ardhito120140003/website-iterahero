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
  const getApiGreenhouse = async () => {
    await axios
      .get(base_url + greenhouseByUserId, {
        headers: {
          Authorization: `Bearer ${header}`,
        },
      })
      .then((response) => {
        if (response.data.data.length > 0) {
          setData(response.data.data[0].id);
        }
        setDataApi(response.data.data);
      })
      .catch((error) => {
      // localStorage.clear()
      // dispatch(logout());
      // navigate("/login");
    });
    console.log(dataApi)
  };
  useEffect(() => {
    dispatch(routePageName('Monitoring'));
    getApiGreenhouse();
  }, []);
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
                  greenhouse: data,
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
                    <Flex alignContent="center" alignItems="center" justify="space-between">
                      <Flex width="100%">
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
                      </Flex>
                    </Flex>
                  </form>
                )}
              </Formik>
            </Flex>
            {data === '' ? (
              <></>
            ) : (
              <Link to={`/unit/monitoring/add/${data}`}>
                <Button
                  data={{ name: data }}
                  type="submit"
                  bg="var(--color-primer)"
                >
                  Tambah
                </Button>
              </Link>
            )}
          </Flex>
          {data === '' ? (
            <></>
          ) : (
            <TableMonitoring
              data={{
                id: data,
              }}
            />
          )}
        </Flex>
      )}
    </>
  );
}
export default Monitoring;
