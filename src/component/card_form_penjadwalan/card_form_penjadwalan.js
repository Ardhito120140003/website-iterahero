import React, { useState, useEffect } from 'react';
import {
  Flex,
  Text,
  Select,
  Button,
  Input,
  FormControl,
  Wrap,
  Icon,
  // WrapItem,
} from '@chakra-ui/react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUrl } from '../../features/auth/authSlice';
import CustomCheckbox from './checkbox';
import { BiTrash } from "react-icons/bi";
import { MdOutlineLibraryAdd } from "react-icons/md";

const weekdays = [
  { label: 'Senin', value: 1 },
  { label: 'Selasa', value: 2 },
  { label: 'Rabu', value: 3 },
  { label: 'Kamis', value: 4 },
  { label: 'Jumat', value: 5 },
  { label: 'Sabtu', value: 6 },
  { label: 'Minggu', value: 0 },
];

function CardFormPenjadwalan({ updateAction }) {
  const [dataApi, setDataApi] = useState([]);
  const [waktuMulai, setWaktuMulai] = useState('');
  const [perulangan, setPerulangan] = useState('');
  const [durasi, setDurasi] = useState('');
  const [formula, setFormula] = useState('');
  const base_url = useSelector(selectUrl);
  const header = localStorage.getItem('token');
  const [hari, setHari] = useState([]);

  ////////////////////////////////////////////////

  const [startTimes, setStartTimes] = useState(['']); // Initialize with one empty field

  const handleAddStartTime = () => {
    setStartTimes([...startTimes, '']); // Add a new empty field for the start time
  };

  const handleStartTimeChange = (index, e) => {
    const updatedStartTimes = [...startTimes];
    updatedStartTimes[index] = e.target.value;
    setStartTimes(updatedStartTimes);
  };

  const handleRemoveStartTime = (index) => {
    const updatedStartTimes = [...startTimes];
    updatedStartTimes.splice(index, 1);
    setStartTimes(updatedStartTimes);
  };

  /////////////////////////////////////////////

  useEffect(() => {
    axios.get(`${base_url}api/v1/resep`, {
      params: {
        tipe: "besaran"
      },
      headers: {
        Authorization: `Bearer ${header}`,
      },
    })
      .then((response) => {
        setDataApi(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching formula data:', error);
      });
  }, []);

  const handleSubmit = async () => {
    const newSchedule = {
      resep: formula,
      id_tandon: 1,
      waktu: waktuMulai,
      iterasi: parseInt(perulangan),
      durasi: parseInt(durasi),
      hari
    };

    axios.post(`${base_url}api/v1/penjadwalan`, newSchedule, {
      headers: {
        Authorization: `Bearer ${header}`,
      },
    })
      .then((response) => {
        console.log('Jadwal berhasil ditambahkan:', response.data);
        setFormula('');
        setWaktuMulai('');
        setPerulangan('');
        setDurasi('');
      })
      .catch((error) => {
        console.error('Error menambahkan jadwal :', error);
      })
      .finally(() => updateAction());
  };

  const handleDay = (val) => {
    if (hari.includes(val)) {
      setHari([...hari.filter((item) => item !== val)]);
    } else {
      setHari([...hari, val]);
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100%"
      height="100%"
      borderRadius="10px"
      border="1px solid #E2E8F0"
      padding="30px"
    >
      <Text>Tambah Penjadwalan</Text>
      <Flex flexDir="column" justifyContent="space-around">
        <FormControl my="10px" color="black">
          <Text>Formula</Text>
          <Select value={formula} name="formula" onChange={(e) => setFormula(e.target.value)}>
            <option value="">--Pilih Formula--</option>
            {dataApi.map((data, index) => (
              <option key={index} value={data.nama} style={{ color: 'black' }}>
                {data.nama.toUpperCase()}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl my="10px" color="black">
          <Text>Jam Mulai</Text>
          {/* <Input
            type="time"
            placeholder="--:--"
            value={waktuMulai}
            onChange={(e) => setWaktuMulai(e.target.value)}
          /> */}

          {startTimes.map((startTime, index) => (
            <Flex key={index} my={'10px'}>
              <Flex w={'100%'}>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => handleStartTimeChange(index, e)}
                />
              </Flex>

              {startTimes.length > 1 && (
              <Icon
                as={BiTrash}
                color="#14453E"
                w="20px"
                h="20px"
                alignSelf="center"
                ml={'10px'}
                onClick={() => handleRemoveStartTime(index)}
              />
              )}

              {/* <Button
              fontSize={'13px'}
              fontWeight={'bold'}
              border={'1px'} 
              borderColor={'blue.600'} 
              bgColor={'white'} 
              color={'blue.600'}  
              ml={'10px'} 
              onClick={() => handleRemoveStartTime(index)}>-</Button> */}
            </Flex>
          ))}



          <Button
            //w={'65px'}
            h={'30px'}
            fontSize={'13px'}
            fontWeight={'bold'}
            border={'1px'}
            borderColor={"blue.600"}
            bgColor={'white'}
            color={"blue.600"}
            onClick={handleAddStartTime} >
            <Icon
              as={MdOutlineLibraryAdd}
              color="blue.600"
              w="15px"
              h="15px"
              alignSelf="center"
              onClick={handleAddStartTime}
              mr={'10px'}
            />Tambah</Button>
        </FormControl>

        {/* <FormControl my="10px" color="black">
          <Text>Perulangan</Text>
          <Input
            type="number"
            placeholder="Masukkan perulangan.."
            value={perulangan}
            onChange={(e) => setPerulangan(e.target.value)}
          />
        </FormControl> */}

        <FormControl my="10px" color="black">
          <Text>Durasi per penyiraman (menit)</Text>
          <Input
            type="number"
            placeholder="60 (untuk satu jam)"
            value={durasi}
            onInput={(e) => setDurasi(e.target.value)}
          />
        </FormControl>

        <FormControl
          // my="10px" 
          color="black"
        >
          <Text>Ulangi</Text>
          {/* <Flex> */}
          <Wrap
            marginTop="20px"
            // direction="row" 
            // justifyContent="flex-start"
            gap={2}

          >
            {weekdays.map((item, index) => (
              <CustomCheckbox label={item.label} value={item.value} onSelect={handleDay} key={index} />
            ))}
          </Wrap>
          {/* </Flex> */}

        </FormControl>

        <Button
          // onClick={() => alert(hari)}
          onClick={handleSubmit}
          my="20px"
          backgroundColor="#09322D"
        >
          Tambah
        </Button>
      </Flex>
    </Flex>
  );
}

export default CardFormPenjadwalan;