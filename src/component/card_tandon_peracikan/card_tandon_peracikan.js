import React, { useState } from "react";
import {
  Icon,
  Flex,
  Text,
  Grid,
  CircularProgress,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { GiWaterTower } from "react-icons/gi";
import { useEffect } from "react";
import axios from 'axios';
import { selectUrl } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';

function CardStatusPeracikan({ id, isOnline, sensor, status }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [trigger, setTrigger] = useState(true);
  const [sensorValue, setSensorValue] = useState([]);

  const [rasioA, setRasioA] = useState();
  const [rasioB, setRasioB] = useState();
  const [rasioAir, setRasioAir] = useState();
  const [ppm, setPpm] = useState();

  const [dataApi, setDataApi] = useState([]);

  const base_url = useSelector(selectUrl);
  const header = localStorage.getItem('token');

  const fetchingMqtt = (id) => {
    // const data = id.map((item) => ({ id: item, value: Math.random()}));
    const data = id.map(item => (Math.random() * 15).toString().slice(0, 4));
    setSensorValue(data);
  }

  const handleSubmit = async () => {

    console.log('rasioA :', rasioA)
    console.log('rasioB :', rasioB)
    console.log('rasioAir :',rasioAir)
    console.log('ppm :',ppm)

    const newPerbandingan = {
      rasioA: rasioA,
      rasioB: rasioB,
      rasioAir: rasioAir,
      ppm: ppm,
    };
  
    //console.log({ header })
    axios.post(base_url + "api/v1/tandonUtama", newPerbandingan, {
      headers: {
        Authorization: `Bearer ${header}`
      },
      params:{
        id: '2'
      }
    })
      .then(response => {
        console.log(response.data);
        setRasioA('');
        setRasioB('');
        setRasioAir('');
        setPpm('');
      })
      .catch(err => {
        console.error(err);
      })
  }

  useEffect(() => {
    axios.get(`${base_url}api/v1/tandonUtama`, {
      params: {
        id
      },
      headers: {
        Authorization: `Bearer ${header}`,
      }
    })
      .then((response) => {
        setDataApi(response.data.data);
        console.log(dataApi)
      })
      .catch((error) => {
        console.error('Error fetching formula data:', error);
      });
  }, [])

  useEffect(() => {
    console.log(sensor)
    fetchingMqtt([1, 2, 3, 4, 5]);
    setTimeout(() => setTrigger(!trigger), 3000)
  }, [trigger])

  return (
    <Flex
      borderRadius="10px"
      width="100%"
      border="1px solid #E2E8F0"
      height="100%"
      flexDirection="column"
      alignItems="center"
      position="sticky"
      p={"30px"}
    >
      <Flex justifyContent="center">
        <Text>Tandon Peracikan</Text>
      </Flex>

      <Flex direction={"column"}>
        <Flex justifyContent="center" marginY="30px">
          {status == "Idle" ? (
            <Icon as={GiWaterTower} w="230px" h="130px" color="#14453E" />
          ) : (
            <CircularProgress
              value={30}
              size="100px"
              isIndeterminate
              color="green.300"
            />
          )}
        </Flex>
        <Flex justifyContent="center" marginY="10px">
          {status == "Idle" ? (
            <Text color="grey" fontSize="12px">
              Tandon Kosong
            </Text>
          ) : (
            <Text color="grey" fontSize="12px">
              Sedang Melakukan Peracikan...
            </Text>
          )}
        </Flex>
      </Flex>

      <Flex
        flexDirection="column"
        border="1px solid #E2E8F0"
        borderRadius={"10px"}
        w={"100%"}
        p={"15px"}
        justify={"center"}
        my={"20px"}
        paddingLeft={"60px"}
      >
        {sensor.map((item, index) => (
          <Grid key={index} templateColumns="repeat(2, 1fr)">
            <Text color="black" textAlign="left">
              {item.name}
            </Text>
            <Text color="black" textAlign="left">
              : {sensorValue[index]} {item.unit_measurement}
            </Text>
          </Grid>
        ))}
        <Grid templateColumns="repeat(2, 1fr)">
          <Text color="black" textAlign="left">
            Status Tandon
          </Text>
          {isOnline == null ? (
            <Text color="red" textAlign="left">
              : Offline
            </Text>
          ) : (
            <Text color="green" textAlign="left">
              : Online
            </Text>
          )}
        </Grid>
      </Flex>

      <Button
        onClick={onOpen}
        bgColor={"#09322D"}
        p={"5px"}
        w={"100%"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Text color={"white"} fontSize={"20px"}>
          {dataApi.rasioA} : {dataApi.rasioB} : {dataApi.rasioAir} = {dataApi.ppm}
        </Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={"10px"}>
          <ModalHeader alignSelf="center">Perbandingan Rasio Pupuk</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form>
              <Flex>
              <FormControl mt={"10px"}>
                <Text>Nutrisi A</Text>
                <Input
                  type="number"
                  value={rasioA}
                  style={{ color: "black" }}
                  placeholder="masukkan rasio nutrisi A"
                />
              </FormControl>
              </Flex>
              <Flex>
              <FormControl mt={"10px"}>
                <Text>Nutrisi B</Text>
                <Input
                  type="number"
                  value={rasioB}
                  style={{ color: "black" }}
                  placeholder="masukkan rasio nutrisi B"
                />
              </FormControl>
              </Flex>
              <Flex>
              <FormControl mt={"10px"}>
                <Text>Air</Text>
                <Input
                  type="number"
                  value={rasioAir}
                  style={{ color: "black" }}
                  placeholder="masukkan rasio air"
                />
              </FormControl>
              </Flex>
              <Flex>
              <FormControl mt={"10px"}>
                <Text>PPM</Text>
                <Input
                  type="number"
                  value={ppm}
                  style={{ color: "black" }}
                  placeholder="masukkan PPM yang dihasilkan"
                />
              </FormControl>
              </Flex>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={()=>{onClose();handleSubmit();}}
              backgroundColor="#09322D"
              color="white"
              mr="3"
              paddingX="30px"
            >
              Simpan
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default CardStatusPeracikan;
