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

function Penjadwalan() {
  TabTitle('Penjadwalan - ITERA Hero');
  const dispatch = useDispatch();
  const base_url = useSelector(selectUrl);
  const [data, setData] = useState(null);
  const [action, setAction] = useState(false);
  const header = useSelector(selectToken)

  useEffect(() => {
    axios.get(`${base_url}api/v1/penjadwalan`, {
      headers: {
        Authorization: `Bearer ${header}`,
      },
    })
      .then((response) => {
        // console.log(response.data.data);
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
        // console.log(response);
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => setAction(!action))
  }

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
        <Flex gap={'20px'} direction={{base:'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', "2xl": 'row' }}>
          <Flex w={{ base:'100%', sm: '100%', md: "50%", lg: "50%", xl: '50%', "2xl": "50%"}} flex={1}>
            <CardFormPenjadwalan
              updateAction={() => setAction(!action)}
              style={cardStyle}
            />
          </Flex>
          <Flex w={{ base:'100%', sm: '100%', md: "50%", lg: "50%", xl: '50%', "2xl": "50%"}} flex={1} gap={4} flexDir={"column"}>
            <CardJadwal jadwal={data} deleteHandler={handleDelete} updateHandler={handleUpdate} style={cardStyle} />
            <CardJadwalAktuator />
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default Penjadwalan;
