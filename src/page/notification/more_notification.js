import React, { useEffect } from 'react';
import { Text, Flex } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TabTitle } from '../../Utility/utility';
import { routePageName } from '../../features/auth/authSlice';
import TableNotification from '../../component/table/notification_table';

function MoreNotification() {
  const navigate = useNavigate();
  TabTitle('Notifikasi - ITERA Hero');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(routePageName('History Notification'));
  }, []);

  return (
    <Flex w="100%" flexDir="column">
      <Flex width="100%">
        <Link to="/unit/historynotifikasi">
          <Flex marginRight="2">
            <Text
              fontWeight="semibold"
              fontSize="var(--header-3)"
              color="var(--color-primer)"
            >
              Notifikasi Terkini
            </Text>
          </Flex>
        </Link>
        <Flex marginRight="2">
          <Text
            fontWeight="semibold"
            fontSize="var(--header-3)"
            color="var(--color-primer)"
          >
            {' '}
            {'>'}
            {' '}
          </Text>
        </Flex>

        <Flex>
          <Text
            fontWeight="semibold"
            fontSize="var(--header-3)"
            color="var(--color-primer)"
          >
            {' '}
            Riwayat Notifikasi Lainnya
          </Text>
        </Flex>
      </Flex>
      <TableNotification />
    </Flex>
  );
}

export default MoreNotification;
