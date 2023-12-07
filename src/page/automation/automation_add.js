import React, { useState, useEffect } from 'react';
import {
  Flex, Text, Button, Wrap,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { routePageName } from '../../features/auth/authSlice';

import { TabTitle } from '../../Utility/utility';
import automationMenu from '../../Utility/automation_menu';
import AutomationAddBySensor from './bySensor_add';
import SchedulingAdd from './scheduling_add';

function AutomationAdd() {
  const { id } = useParams();
  TabTitle('Edit Automation - ITERA Hero');
  const [selected, setSelected] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(routePageName('Add Automation'));
  }, []);

  return (
    <Flex flexDir='column' w={['100%']}>
      <Flex bg="white" borderRadius="10px" w={['100%']} mb={2}>
        <Link to="/unit/dashboard/2">
          <Text fontSize={{ base: '15px', md: '20px' }} fontWeight="bold">
            Dashboard
          </Text>
        </Link>
        <Text
          fontSize={{ base: '15px', md: '20px' }}
          fontWeight="bold"
          ml={{ base: '-10px', md: '0px' }}
          mr={{ base: '-10px', md: '0px' }}
        >
          {'>'}
        </Text>
        <Link to={`/unit/dashboard/aktuator/${id}`}>
          <Text fontSize={{ base: '15px', md: '20px' }} fontWeight="bold">
            Automation
          </Text>
        </Link>
        <Text
          fontSize={{ base: '15px', md: '20px' }}
          fontWeight="bold"
          ml={{ base: '-10px', md: '0px' }}
          mr={{ base: '-10px', md: '0px' }}
        >
          {'>'}
        </Text>
        <Text fontSize={{ base: '15px', md: '20px' }} fontWeight="bold">
          Add Automation
        </Text>
      </Flex>
      <Flex w={['100%']}>
        <Flex flexDir="row" gap="10px">
          {automationMenu.map((item, index) => (
            <Flex key={index} width="169px" height="44px">
              <Button
                onClick={() => setSelected(item.id)}
                w="100%"
                height="100%"
                borderRadius="16"
                border={
                    selected == item.id ? null : '1px solid var(--color-primer)'
                  }
                bg={
                    selected == item.id
                      ? 'var(--color-primer)'
                      : 'var(--color-on-primary)'
                  }
                flexDir="row"
                alignContent="center"
                justifyContent="center"
                alignItems="center"
              >
                <Text
                  fontWeight="semibold"
                  color={
                      selected == item.id
                        ? 'var(--color-surface)'
                        : 'var(--color-on-background'
                    }
                  size="var(--header-3)"
                >
                  {item.name}
                </Text>
              </Button>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Wrap w={['100%']}>
        {selected === 1 ? (
          <AutomationAddBySensor data={{ id }} />
        ) : (
          <SchedulingAdd data={{ id }} />
        )}
      </Wrap>
    </Flex>
  );
}

export default AutomationAdd;
