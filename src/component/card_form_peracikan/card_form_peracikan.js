import React, { useState, useEffect } from 'react';
import {
  Flex,
  Text,
  Select,
  Button,
  Box,
  Input,
  FormControl,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loading from '../loading/loading';
import { selectUrl } from '../../features/auth/authSlice';

function CardFormPeracikan() {
  const { isOpen: isRacikModalOpen, onOpen: onRacikModalOpen, onClose: onRacikModalClose } = useDisclosure();
  const { isOpen: isSaveModalOpen, onOpen: onOpenSaveModal, onClose: onCloseSaveModal } = useDisclosure();

  const [newFormulaName, setNewFormulaName] = useState('');
  const [phValue, setPhValue] = useState('');
  const [ppmValue, setPpmValue] = useState('');
  const [formula, setFormula] = useState('');
  const [volume, setVolume] = useState('');
  const [tandon, setTandon] = useState('');



  const [dataApi, setDataApi] = useState([]);
  const base_url = useSelector(selectUrl);
  const header = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${base_url}api/v1/resep`, {
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
  }, [onOpenSaveModal]);

  const handleFormulaChange = (e) => {
    const selectedFormula = e.target.value;
    setFormula(selectedFormula);
  };

  const handleRacikSubmit = async () => {
    console.log('pH Value:', phValue);
    console.log('ppm Value:', ppmValue);
  };

  const handleSaveSubmit = async () => {
    console.log('Nama Formula:', newFormulaName);
    console.log('pH Value:', phValue);
    console.log('ppm Value:', ppmValue);

    const newformula = {
      nama: newFormulaName,
      ppm: ppmValue,
      ph: phValue,
      interval: 0,
    };

    axios.post(`${base_url}api/v1/resep`, newformula, {
      headers: {
        Authorization: `Bearer ${header}`,
      },
    })
      .then((response) => {
        console.log('Formula berhasil disimpan :', response.data);
        setNewFormulaName('');
        setPpmValue('');
        setPhValue('');
      })
      .catch((error) => {
        console.error('Error menyimpan formula :', error);
      });
  };

  return (
    <>
      {dataApi.length < 1 ? (
        <Loading />
      ) : (
        <Flex flexDirection="column" width="100%" height="100%">
          <Box color="black" mb="20px" mt="5px">
            <Select
              borderRadius="10"
              value={formula}
              name="formula"
              onChange={(e) => {
                const idx = parseInt(e.target.value);
                if (isNaN(idx)) {
                  setPhValue('');
                  setPpmValue('');
                  handleFormulaChange(e);
                } else {
                  handleFormulaChange(e);
                  setPhValue(dataApi[idx].ph);
                  setPpmValue(dataApi[idx].ppm);
                }
              }}
            >
              <option value="">--Pilih Formula--</option>
              {dataApi.map((data, index) => (
                <option key={index} value={index} style={{ color: 'black' }}>
                  {data.nama.toUpperCase()}
                </option>
              ))}
              <option value="Tambah Formula">--Tambah Formula--</option>
            </Select>
          </Box>
          <Box
          // bg="#ffff"
          // borderRadius="10px"
          // border="1px solid #E2E8F0"
          // p={8}
          // pb={20}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {formula === 'Tambah Formula' && (
                <Box marginBottom="16px">
                  <FormControl>
                    <Text>Nama Formula</Text>
                    <Input
                      type="text"
                      value={newFormulaName}
                      onChange={(e) => setNewFormulaName(e.target.value)}
                      style={{ color: 'black' }}
                      placeholder="masukkan nama formula"
                      required="Nama formula harus diisi"
                    />
                  </FormControl>
                </Box>
              )}
              <Box marginBottom="16px">
                <FormControl>
                  <Text>PH Value</Text>
                  <Input
                    type="number"
                    value={phValue}
                    onChange={(e) => setPhValue(e.target.value)}
                    style={{ color: 'black' }}
                    placeholder="masukkan ph value"
                    required="PH harus diisi"
                  />
                </FormControl>
              </Box>

              <Box marginBottom="16px">
                <FormControl>
                  <Text>PPM Value</Text>
                  <Input
                    type="number"
                    value={ppmValue}
                    onChange={(e) => setPpmValue(e.target.value)}
                    style={{ color: 'black' }}
                    placeholder="masukkan ppm value"
                    required="PPM harus diisi"
                  />
                </FormControl>
              </Box>

              <Box marginBottom="16px">
                <FormControl>
                  <Text>Volume</Text>
                  <Input
                    type="number"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    style={{ color: 'black' }}
                    placeholder="masukkan volume pupuk (liter)"
                    required="interval harus diisi"
                  />
                </FormControl>
              </Box>

              <Box marginBottom="16px">
                <FormControl>
                  <Text>Tandon Penyimpanan</Text>
                  {/* <Input
                          type="number"
                          value={tandon}
                          onChange={(e) => setTandon(e.target.value)}
                          style={{ color: 'black' }}
                          placeholder="Tandon Penyimpanan"
                          required="interval harus diisi"
                        /> */}

                  <Select color={'black'}>
                    <option value="">--Pilih tandon penyimpanan--</option>
                    {dataApi.map((data, index) => (
                      <option key={index} value={index} style={{ color: 'black' }}>
                        {data.nama.toUpperCase()}
                      </option>
                    ))}
                  </Select>

                </FormControl>
              </Box>

              <Box marginTop="16px" display="flex" flexDirection="row">
                <Button
                  type="Submit"
                  backgroundColor="#09322D"
                  onClick={onRacikModalOpen}
                >
                  Racik
                </Button>
                {formula === 'Tambah Formula'
                  && (
                    <Button
                      type="Submit"
                      backgroundColor="#09322D"
                      onClick={onOpenSaveModal}
                      ml="20px"
                    >
                      Simpan
                    </Button>
                  )}
              </Box>

              {/* Modal Racik */}
              <Modal isOpen={isRacikModalOpen} onClose={onRacikModalClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader alignSelf="center">Proses Peracikan</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <Text>Apakah anda yakin untuk memproses formula ini ?</Text>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      onClick={() => { onRacikModalClose(); handleRacikSubmit(); }}

                      backgroundColor="#09322D"
                      color="white"
                      mr="3"
                      paddingX="30px"
                    >
                      Ok
                    </Button>
                    <Button onClick={onRacikModalClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              {/* Modal Save */}
              <Modal isOpen={isSaveModalOpen} onClose={onCloseSaveModal}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader alignSelf="center">Simpan Formula</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <Text>Apakah anda yakin untuk menyimpan formula ini ?</Text>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      onClick={() => { onCloseSaveModal(); handleSaveSubmit(); }}
                      backgroundColor="#09322D"
                      color="white"
                      mr="3"
                      paddingX="30px"
                    >
                      Simpan Formula
                    </Button>
                    <Button onClick={onOpenSaveModal}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

            </form>
          </Box>
        </Flex>
      )}
    </>
  );
}

export default CardFormPeracikan;
