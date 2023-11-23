import React from 'react';
import {
  Drawer,
  Image,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { FiHome, FiMonitor } from 'react-icons/fi';
//import { FiHome } from 'react-icons/fi';


import { GiGreenhouse } from 'react-icons/gi';
import { AiOutlineControl, AiOutlineHistory } from 'react-icons/ai';
//import { AiOutlineHistory } from 'react-icons/ai';

import { Link } from 'react-router-dom';
import NavItem from '../navitem/navitem';
import { selectUrl, routePageName, selectUser } from '../../features/auth/authSlice';

function Draw(props) {
  const { data } = props;
  const navSize = 'large';

  const routeName = useSelector(selectUrl);
  const user = useSelector(selectUser)

  const dispatch = useDispatch();

  const patchRoute = (data) => {
    dispatch(routePageName(data));
  };

  return (
    <Drawer placement="left" onClose={data.onclose} isOpen={data.isopen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <Image
            display={{ base: 'flex', lg: 'none' }}
            position="Relative"
            width="80%"
            maxWidth="200px"
            src="https://res.cloudinary.com/diyu8lkwy/image/upload/v1663418492/itera%20herro%20icon/Frame_3_2_3_1_hfojfh.png"
          />
        </DrawerHeader>
        <DrawerBody>
          <Link
            to="/unit/dashboard/1"
            onClick={() => {
              patchRoute('Dashboard');
            }}
          >
            <NavItem
              navSize={navSize}
              icon={FiHome}
              title="Dashboard"
              active={routeName === 'Dashboard'}
            />
          </Link>
          <Link
            to="/unit/greenhouse"
            onClick={() => {
              patchRoute('Greenhouse');
            }}
          >
            <NavItem
              navSize={navSize}
              icon={GiGreenhouse}
              title="Greenhouse"
              active={routeName === 'Greenhouse'}
            />
          </Link>

          {user === 'admin' ? (
            <>
            <Link
              to="/unit/monitoring"
              onClick={() => {
                patchRoute('Monitoring');
              }}
            >
              <NavItem
                navSize={navSize}
                icon={FiMonitor}
                title="Monitoring"
                active={routeName === 'Monitoring'}
              />
            </Link>
            
            <Link
              to="/unit/controlling"
              onClick={() => {
                patchRoute('Controlling');
              }}
            >
              <NavItem
                navSize={navSize}
                icon={AiOutlineControl}
                title="Controlling"
                active={routeName === 'Controlling'}
              />
            </Link>
            </>
          ) : null}


          {/* <Link
            to="/unit/historynotifikasi"
            onClick={() => {
              patchRoute('History Notification');
            }}
          >
            <NavItem
              navSize={navSize}
              icon={AiOutlineHistory}
              title="History Notification"
              active={routeName === 'History Notification'}
            />
          </Link> */}

          <Link
            to="/unit/peracikan"
            onClick={() => {
              patchRoute('Peracikan');
            }}
          >
            <NavItem
              navSize={navSize}
              icon={AiOutlineHistory}
              title="Peracikan"
              active={routeName === 'Peracikan'}
            />
          </Link>
          <Link
            to="/unit/penjadwalan"
            onClick={() => {
              patchRoute('Penjadwalan');
            }}
          >
            <NavItem
              navSize={navSize}
              icon={AiOutlineHistory}
              title="Penjadwalan"
              active={routeName === 'Penjadwalan'}
            />
          </Link>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
export default Draw;
