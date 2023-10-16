import React, { useState, useEffect } from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { routePageName, logout, selectUrl } from '../../features/auth/authSlice';
import CardNotification from '../../component/card_notification/card_notification';
import { TabTitle } from '../../Utility/utility';
import { getNotificationByUserId } from '../../Utility/api_link';
import Loading from '../../component/loading/loading';

function Notification() {
  const base_url = useSelector(selectUrl);
  TabTitle('Notifikasi - ITERA Hero');
  const navigate = useNavigate();
  const [dataNotification, setDataNotification] = useState(null);
  const header = localStorage.getItem('token');
  const dispatch = useDispatch();

  const getNotificationData = async () => {
    await axios
      .get(`${base_url}${getNotificationByUserId}&&size=6`, {
        headers: {
          Authorization: `Bearer ${header}`,
        },
      })
      .then((response) => {
        setDataNotification(response.data.data);
      })
      .catch((error) => {
        localStorage.clear();
        dispatch(logout());
        navigate('/login');
      });
  };
  console.log(dataNotification);

  useEffect(() => {
    dispatch(routePageName('History Notification'));
    getNotificationData();
  }, []);

  return (
    <>
      {dataNotification == null ? (
        <Loading />
      ) : (
        <Flex gap="30px" width="100%" flexDir="column">
          <Flex w="100%" justifyContent="space-between">
            <Text
              fontWeight="semibold"
              fontSize="var(--header-3)"
              color="var(--color-primer)"
            >
              Notifikasi Terkini
            </Text>
          </Flex>
          <Flex gap="20px" width="100%" flexDir="column">
            {dataNotification.map((item, index) => <CardNotification key={index} data={item} index={index} />)}
          </Flex>
          <Link to="/unit/historynotifikasi/more-notifcation">
            <Button
              marginTop="36px"
              width="100%"
              height="50px"
              borderRadius="10px"
              backgroundColor="var(--color-primer)"
              type="submit"
              className="btn-login"
            >
              <Text
                fontWeight="bold"
                fontFamily="var(--font-family-secondary)"
                fontSize="var(--header-3)"
                color="var(--color-on-primary)"
              >
          Notifikasi Lainnya
              </Text>
            </Button>
          </Link>
        </Flex>
      )}
    </>
  );
}
export default Notification;
