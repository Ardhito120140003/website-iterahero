import React, { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { TabTitle } from '../../Utility/utility';
import CardFormPenjadwalan from '../../component/card_form_penjadwalan/card_form_penjadwalan';
import CardJadwal from '../../component/card_jadwal/card_jadwal';
import { routePageName, selectUrl } from '../../features/auth/authSlice';
import { selectToken } from '../../features/auth/authSlice';
import Loading from '../../component/loading/loading';
import './penjadwalan.css';
import CardJadwalAktuator from '../../component/card_jadwal/card_jadwal_aktuator';
import { Form, Formik } from 'formik';
import { Select } from '@chakra-ui/react';

function Penjadwalan() {
  TabTitle('Penjadwalan - ITERA Hero');
  const dispatch = useDispatch();
  const base_url = useSelector(selectUrl);
  const [data, setData] = useState(null);
  const [action, setAction] = useState(false);
  const header = useSelector(selectToken)
  const [dataTandon, setDataTandon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    axios.get(`${base_url}api/v1/penjadwalan`, {
      headers: {
        Authorization: `Bearer ${header}`,
      },
    })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
    dispatch(routePageName('Penjadwalan'));
  }, [action]);

  const handleDelete = async (id) => {
    axios.delete(`${base_url}api/v1/penjadwalan`, {
      headers: {
        Authorization: `Bearer ${header}`,
      },
      params: {
        id
      }
    })
      .then((response) => {
        // console.log(response);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setAction(!action));
  };

  const handleUpdate = async (id) => {
    axios.patch(`${base_url}api/v1/penjadwalan`, {
      id
    }, {
      headers: {
        Authorization: `Bearer ${header}`
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => setAction(!action))
  }

  const getTandon = async () => {
    try {
      const response = await axios.get(`${base_url}api/v1/tandonUtama`, {
        headers: {
          Authorization: `Bearer ${header}`,
        },
      });
      if (response.data.data.length > 0) {
        setDataTandon(response.data.data);
        setSelected(response.data.data[0].id)
      }
    } catch (err) {
      console.error(err);
    }
    finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getTandon()
    dispatch(routePageName("Penjadwalan"));
    const interval = setInterval(() => {
      getTandon()
    }, 1500)

    return (() => clearInterval(interval));
  }, []);

  const containerStyle = {
    flexDirection: 'row',
    gap: '20px',
  };

  const cardStyle = {
    flex: '1',
    marginLeft: '20px',
  };

  return (
    <>
      {data === null ? (
        <Loading />
      ) : (
        <Flex flexDirection={'column'} gap={4}>
        <Formik
            initialValues={{
              tandon: selected,
            }}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <Select
                  name="tandon"
                  as={Select}
                  borderRadius={"10"}
                  width={"100%"}
                  height={"5vh"}
                  bg={"white"}
                  _active={{ bg: "white" }}
                  borderColor={"grey"}
                  fontSize={"var(--header-5)"}
                  fontWeight={"normal"}
                  color={"var(--color-primer)"}
                  _hover={{ borderColor: "var(--color-border)" }}
                  _focusWithin={{ borderColor: "var(--color-border)" }}
                  value={values.tandon}
                  // placeholder="--Pilih Tandon Peracikan--"
                  onChange={async (e) => {
                    setFieldValue("tandon", e.target.value);
                    await getInfo(e.target.value)
                  }}
                >
                  {dataTandon.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.nama}
                    </option>
                  ))}
                </Select>
              </Form>
            )}
          </Formik>
        <Flex gap={'20px'} direction={{base:'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', "2xl": 'row' }}>
          <Flex w={{ base:'100%', sm: '100%', md: "50%", lg: "50%", xl: '50%', "2xl": "50%"}} flex={1}>
            <CardFormPenjadwalan
              updateAction={() => setAction(!action)}
              style={cardStyle}
            />
          </Flex>
          <Flex w={{ base:'100%', sm: '100%', md: "50%", lg: "50%", xl: '50%', "2xl": "50%"}} flex={1} gap={4} flexDir={"column"}>
            <CardJadwal jadwal={data} deleteHandler={handleDelete} updateHandler={handleUpdate} style={cardStyle} />
            <CardJadwalAktuator tandonId={selected} />
          </Flex>
        </Flex>
        
        </Flex>
      )}
    </>
  );
}

export default Penjadwalan;
