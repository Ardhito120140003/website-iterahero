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
  const [data, setData] = useState('');
  const header = localStorage.getItem('token');

  const getApiGreenhouse = async () => {
    await axios
      .get(base_url + greenhouseByUserId, {
        headers: {
          Authorization: `Bearer ${header}`,
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
        dispatch(logout());
        navigate('/login');
      });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(routePageName('Controlling'));
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
            <Flex width="30%">
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
                      alignContent="center"
                      alignItems="center"
                      justify="space-between"
                    >
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
              <Link to={`/unit/controlling/add/${data}`}>
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
}
export default Controlling;
