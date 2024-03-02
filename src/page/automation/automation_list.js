import React, { useState, useEffect } from 'react';
import {
  Text,
  Flex,
  Wrap,
  Button,
  FormControl,
  FormLabel,
  Switch,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../component/loading/loading';

import {
  getActuatorDetail,
  getAutomationByActuator,
  scheduling,
  updateActuatorDetail,
} from '../../Utility/api_link';
import CardAutomation from '../../component/card Automation/card_automation';
import CardScheduling from '../../component/card Automation/card_scheduling';
import { selectToken } from '../../features/auth/authSlice';
import { logout, selectUrl } from '../../features/auth/authSlice';

function AutomationList(props) {
  const base_url = useSelector(selectUrl);
  const idApi = props.data.id;
  const filter = props.data.filterId;
  const header = useSelector(selectToken)
  const [dataApi, setDataApi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(0);

  const getAutomation = async () => {
    axios
      .get(`${base_url}api/v1/automation`, {
        params: {
          id: idApi
        },
        headers: {
          Authorization: `Bearer ${header}`,
        },
      })
      .then(({ data }) => {
        setDataApi(data.data);
        axios.get(base_url + "api/v1/aktuator", {
          params: {
            id: idApi
          },
          headers: {
            Authorization: `Bearer ${header}`
          }
        })
        .then(({ data }) => {
          setStatus(data.data.automation)
        })
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => setIsLoading(false))
  };

  const handleSwitch = async () => {
    axios.patch(base_url + "api/v1/automation", {}, {
      params: {
        id: parseInt(idApi)
      },
      headers: {
        Authorization: `Bearer ${header}`
      }
    })
    .then(({ data }) => console.log(data))
    .catch(({ response }) => console.error(response))
    .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    getAutomation()

    const interval = setInterval(() => {
      getAutomation()
    }, 3000)

    return (() => clearInterval(interval))
  }, [idApi]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Flex flexDir="column" w="100%">
          <FormControl
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormLabel htmlFor="email-alerts" mb="0">
              <Text
                fontWeight="semibold"
                fontSize="var(--header-3)"
                color="var(--color-primer)"
              >
                Automation
              </Text>
            </FormLabel>
            <Switch
              id="email-alerts"
              onChange={() => {
                handleSwitch();
              }}
              value={status}
              isChecked={status}
            />
          </FormControl>
          <Flex w="100%" flexDir="column">
            <Flex
              w="100%"
              flexDir="row"
              justifyContent="center"
              alignItems="center"
              marginBottom="20px"
            >
              <Link to={`/unit/dashboard/aktuator/automation/add/${idApi}`} state={{ filter: filter ? 'greenhouse' : 'tandon'}}>
                <Button bg="#14453E" size="md" colorScheme="teal">
                  Tambah
                </Button>
              </Link>
            </Flex>
          </Flex>
          <Wrap>
            {dataApi.filter(item => item.sensorId).map((data, index) => (
              <CardAutomation
                data={data}
                key={index}
              />
            ))}
            ;
          </Wrap>
          <Wrap>
            {dataApi.filter(item => !item.sensorId).map((data, index) => (
              <CardScheduling
                data={data}
                key={index}
              />
            ))}
            ;
          </Wrap>
        </Flex>
      )}
    </>
  );
}
export default AutomationList;
