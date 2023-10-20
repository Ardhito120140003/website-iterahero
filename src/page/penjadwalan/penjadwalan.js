import React, { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { TabTitle } from '../../Utility/utility';
import CardFormPenjadwalan from '../../component/card_form_penjadwalan/card_form_penjadwalan';
import CardJadwal from '../../component/card_jadwal/card_jadwal';
import { routePageName, selectUrl } from '../../features/auth/authSlice';
import Loading from '../../component/loading/loading';
import './penjadwalan.css';

function Penjadwalan() {
  TabTitle('Penjadwalan - ITERA Hero');
  const dispatch = useDispatch();
  const base_url = useSelector(selectUrl);
  const [data, setData] = useState(null);
  const [action, setAction] = useState(false);
  const headers = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${base_url}api/v1/penjadwalan`, {
      headers: {
        Authorization: `Bearer ${headers}`,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
    dispatch(routePageName('Penjadwalan'));
  }, [action]);

  const handleDelete = (id) => {
    console.log(id)
    axios.delete(`${base_url}api/v1/penjadwalan?id=${id}`, {
      headers: {
        Authorization: `Bearer ${headers}`,
      },
    })
      .then((response) => {
        console.log(response);
        setAction(!action);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
        <Flex style={containerStyle}>
          <CardFormPenjadwalan
            updateAction={() => setAction(!action)}
            style={cardStyle}
          />
          <CardJadwal jadwal={data} deleteHandler={handleDelete} style={cardStyle} />
        </Flex>
      )}
    </>
  );
}

export default Penjadwalan;
