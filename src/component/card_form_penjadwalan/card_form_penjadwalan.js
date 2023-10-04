import React, { useState, useEffect } from 'react';
import {
    Flex,
    Text,
    Select,
    Button,
    Input,
    FormControl,
    Stack,
} from '@chakra-ui/react';
import axios from "axios";
import { useSelector } from 'react-redux';
import { selectUrl } from "../../features/auth/authSlice";
import CustomCheckbox from './checkbox';

const CardFormPenjadwalan = ({ updateAction }) => {
    const [dataApi, setDataApi] = useState([]);
    const [waktuMulai, setWaktuMulai] = useState('');
    const [perulangan, setPerulangan] = useState('');
    const [interval, setInterval] = useState('');
    const [formula, setFormula] = useState('');
    const base_url = useSelector(selectUrl);
    const header = localStorage.getItem("token");

    useEffect(() => {
        axios.get(base_url + 'api/v1/resep', {
            headers: {
                Authorization: "Bearer " + header
            }
        })
            .then(response => {
                setDataApi(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching formula data:", error);
            });
    }, []);


    const handleSubmit = () => {
        const newSchedule = {
            resep: formula,
            id_tandon: 1,
            waktu: waktuMulai,
            iterasi: parseInt(perulangan),
            interval: parseInt(interval)
        };

        axios.post(base_url + 'api/v1/penjadwalan', newSchedule, {
            headers: {
                Authorization: "Bearer " + header
            }
        })
            .then(response => {
                console.log("Jadwal berhasil ditambahkan:", response.data);
                setFormula('');
                setWaktuMulai('');
                setPerulangan('');
                setInterval('');
                updateAction();
            })
            .catch(error => {
                console.error("Error menambahkan jadwal :", error);
            });
    };

    const handleFormulaChange = (e) => {
        const selectedFormula = e.target.value;
        setFormula(selectedFormula);
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
            <Flex flexDir={'column'} justifyContent={'space-around'}>
                <FormControl my={'10px'} color={'black'}>
                    <Text>Formula</Text>
                    <Select value={formula} name="formula" onChange={(e) => {

                        handleFormulaChange(e)
                    }}>
                        <option value="">--Pilih Formula--</option>
                        {dataApi.map((data, index) => (
                            <option key={index} value={data.nama} style={{ color: 'black' }}>
                                {data.nama.toUpperCase()}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl my={'10px'} color={'black'}>
                    <Text>Jam Mulai</Text>
                    <Input
                        type="time"
                        placeholder="--:--"
                        value={waktuMulai}
                        onChange={(e) => setWaktuMulai(e.target.value)}
                    />
                </FormControl>

                <FormControl my={'10px'} color={'black'}>
                    <Text>Perulangan</Text>
                    <Input
                        type="number"
                        placeholder="Masukkan perulangan.."
                        value={perulangan}
                        onChange={(e) => setPerulangan(e.target.value)}
                    />
                </FormControl>

                <FormControl my={'10px'} color={'black'}>
                    <Text>Durasi per penyiraman (menit)</Text>
                    <Input
                        type="number"
                        placeholder="60 (untuk satu jam)"
                        value={interval}
                        onInput={(e) => setInterval(e.target.value)}
                    />
                </FormControl>

                <FormControl my={'10px'} color={'black'}>
                    <Text>Ulangi</Text>
                    <Flex marginLeft={'10px'} marginTop={'20px'} direction={'row'} justifyContent={'space-between'}>
                        <CustomCheckbox label="Senin" />
                        <CustomCheckbox label="Selasa" />
                        <CustomCheckbox label="Rabu" />
                        <CustomCheckbox label="Kamis" />
                        <CustomCheckbox label="Jumat" />
                        <CustomCheckbox label="Sabtu" />
                        <CustomCheckbox label="Minggu" />
                    </Flex>
                </FormControl>

                <Button onClick={handleSubmit} my="20px" backgroundColor="#09322D">
                    Tambah
                </Button>
            </Flex>
        </Flex>
    );
};

export default CardFormPenjadwalan;
