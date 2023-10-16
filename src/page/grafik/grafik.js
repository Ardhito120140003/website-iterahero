import React, { useState, useEffect } from 'react';
import {
  Text, Select, Flex,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../component/loading/loading';
import { TabTitle } from '../../Utility/utility';
import './grafik.css';
import { idSensor } from '../../Utility/api_link';
import infoGrafik from '../../Utility/grafikDropDown';
import GrafikComponent from '../../component/grafik_component/grafik_component';
import SummaryComponent from '../../component/summary_component/summary_component';
import { logout, selectUrl } from '../../features/auth/authSlice';

function Grafik() {
  TabTitle('Grafik - ITERA Hero');
  const base_url = useSelector(selectUrl);
  const [data, setData] = useState('Day');
  const [dataApi, setDataApi] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const getSensor = async () => {
    setIsLoading(true);
    const header = localStorage.getItem('token');
    await axios
      .get(`${base_url}${idSensor}${id}`, {
        headers: {
          Authorization: `Bearer ${header}`,
        },
      })
      .then((response) => {
        setDataApi(response.data.data[0].name);
        setIsLoading(false);
      })
      .catch((error) => {
        localStorage.clear();
        dispatch(logout());
        navigate('/login');
      });
  };

  useEffect(() => {
    getSensor();
    // getSensorData()
  }, [id, data]);
  return (
    <>
      {dataApi == null ? (
        <Loading />
      ) : (
        // {
        //   data.id ==
        // }
        <>
          <Flex bg="white" borderRadius="10px" p="10px">
            <Flex>
              <Link to="/unit/dashboard/1">
                <Text fontSize="20px" fontWeight="bold" mr="10px">
                  Dashboard
                </Text>
              </Link>
            </Flex>
            <Flex>
              <Text fontSize="20px" fontWeight="bold" mr="10px">
                {'>'}
              </Text>
            </Flex>
            <Text fontSize="20px" fontWeight="bold" mb="10px">
              {`Summary ${dataApi}`}
            </Text>
          </Flex>
          <Flex>
            <Flex width="100%">
              <Formik
                initialValues={{
                  value: 'Day',
                }}
                onSubmit={(values) => {
                  setData(values.value);
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
                    <Flex>
                      <Flex>
                        <Select
                          onChange={(e) => {
                            setFieldValue('value', e.target.value);
                            setData(e.target.value);
                          }}
                          size="xs"
                          borderRadius="10"
                          name="grafik"
                          value={values.value}
                          placeholder="Pilih Data"
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
                          {infoGrafik.map((item, index) => (
                            <option
                              color="var(--color-border)"
                              key={index}
                              value={item.value}
                            >
                              Data
                              {' '}
                              {item.name}
                            </option>
                          ))}
                        </Select>
                      </Flex>
                    </Flex>
                  </form>
                )}
              </Formik>
            </Flex>
          </Flex>
          {data == '' ? (
            <></>
          ) : (
            <>
              <SummaryComponent
                data={{
                  value: data,
                  id,
                  name: dataApi,
                }}
              />
              <GrafikComponent
                size="lg"
                className="grafik"
                data={{
                  value: data,
                  id,
                }}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
export default Grafik;
