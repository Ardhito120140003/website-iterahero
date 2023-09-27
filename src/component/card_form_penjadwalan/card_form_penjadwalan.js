import React, { useState } from 'react';
import {
    Flex, Text, Select, Button, Input, FormControl,
} from '@chakra-ui/react';

const CardFormPenjadwalan = ({ addSchedule }) => {
    const [formula, setFormula] = useState('');
    const [startTime, setStartTime] = useState('');
    const [repetition, setRepetition] = useState('');
    const [interval, setInterval] = useState('');

    const handleSubmit = () => {
        // Membuat objek jadwal baru
        const newSchedule = {
            formula,
            date: startTime,
            repetition,
            interval,
        };

        // Memanggil fungsi untuk menambahkan jadwal baru
        addSchedule(newSchedule);

        // Mengosongkan input setelah menambahkan jadwal
        setFormula('');
        setStartTime('');
        setRepetition('');
        setInterval('');
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
                    <Select
                        value={formula}
                        onChange={(e) => setFormula(e.target.value)}
                    >
                        <option value="">--Pilih Formula--</option>
                        <option value="Melon">Melon</option>
                        <option value="Lemon">Lemon</option>
                        <option value="Labu">Labu</option>
                        <option value="Cabai">Cabai</option>
                    </Select>
                </FormControl>

                <FormControl my={'10px'} color={'black'}>
                    <Text>Jam Mulai</Text>
                    <Input
                        type="time"
                        placeholder="--:--"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </FormControl>

                <FormControl my={'10px'} color={'black'}>
                    <Text>Perulangan</Text>
                    <Input
                        type="number"
                        placeholder="Masukkan perulangan.."
                        value={repetition}
                        onChange={(e) => setRepetition(e.target.value)}
                    />
                </FormControl>

                <FormControl my={'10px'} color={'black'}>
                    <Text>Durasi per penyiraman (menit)</Text>
                    <Input
                        type="string"
                        placeholder="60 (untuk satu jam)"
                        value={interval}
                        onChange={(e) => setInterval(e.target.value)}
                    />
                </FormControl>

                <Button onClick={handleSubmit} my="30px" backgroundColor="#09322D">
                    Tambah
                </Button>
            </Flex>
        </Flex>
    );
};

export default CardFormPenjadwalan;
