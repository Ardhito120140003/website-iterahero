import React, { useState } from "react";
import {
  Flex,
  Text,
  Switch,
  Icon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useDisclosure,
  Box,
  Wrap,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { MdOutlineAccessTime } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
//import { RiPencilFill } from 'react-icons/ri';
import CustomCheckbox from "../card_form_penjadwalan/checkbox";

const weekdays = [
  { label: 'Senin', value: 1 },
  { label: 'Selasa', value: 2 },
  { label: 'Rabu', value: 3 },
  { label: 'Kamis', value: 4 },
  { label: 'Jumat', value: 5 },
  { label: 'Sabtu', value: 6 },
  { label: 'Minggu', value: 0 },
];

function getDayName(dayValue) {
  const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  return daysOfWeek[dayValue];
}

function CardJadwal({ jadwal, deleteHandler, updateHandler }) {
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalCLose } = useDisclosure();
  const cancelRef = React.useRef();
  const [target, setTarget] = useState(null);
  const [hari, setHari] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleEditClick = (index) => {
    setEditingIndex(index);
    onEditModalOpen();
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
    >
      <Text padding="30px">Jadwal Pendistribusian</Text>
      <Flex
        css={{
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "transparent",
          },
        }}
        flexDirection="column"
        width="100%"
        height="500px"
      >
        {jadwal.length < 1 ? (
          <Flex h={'100%'} alignItems={'center'} justifyContent={'center'} overflow={'auto'}>
            <Text color={'grey'}>Tidak Ada penjadwalan</Text>
          </Flex>
        ) : (
          <AnimatePresence>
            {jadwal.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Flex
                  borderRadius="10px"
                  border="1px solid #E2E8F0"
                  marginY="8px"
                  marginX="20px"
                  paddingY="0px"
                  paddingX="10px"
                  justifyContent="space-around"
                >
                  <Accordion border={'white'} color={"black"} allowToggle w={"100%"}>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box
                            display={"flex"}
                            flexDir={"row"}
                            as="span"
                            flex="1"
                            textAlign="left"
                          >
                            <Icon
                              as={MdOutlineAccessTime}
                              color="#14453E"
                              w="30px"
                              h="30px"
                              alignSelf="center"
                            />
                            <Text ml={"5px"} alignSelf={"center"}>
                              {item.waktu} - {item.resep.nama}{" "}
                            </Text>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4} fontSize={"15px"}>
                        <Flex direction={"column"}>
                          <Flex flexDir={"row"}>
                            <Flex flexDir="row" marginRight="5px" marginY="20px" w={'100%'}>
                              <Flex direction={"column"} alignItems={"start"}>
                                <Text color="black"> Formula </Text>
                                <Text color="black"> Waktu </Text>
                                <Text color="black"> Durasi </Text>
                                <Text color="black"> Greenhouse </Text>
                              </Flex>
                              <Flex direction={"column"}>
                                <Text color="black"> : </Text>
                                <Text color="black"> : </Text>
                                <Text color="black"> : </Text>
                                <Text color="black"> : </Text>
                              </Flex>
                              <Flex direction={"column"} alignItems={"start"}>
                                <Text color="black"> {item.resep.nama} </Text>
                                <Text color="black"> {item.waktu} </Text>
                                <Text color="black"> {item.resep.interval} Menit</Text>
                                <Text color="black"> {item.greenhouseId} </Text>
                              </Flex>
                            </Flex>
                          </Flex>

                          <Wrap flexDir="row" alignItems="start" gap={2} >
                            {item.hari.map((day) => (
                              <Flex
                                key={day}
                                bg="#09322D"
                                color="white"
                                justifyContent='center' // To center the content horizontally
                                alignItems='center' // To center the content vertically
                                borderRadius="5"
                                fontSize="sm"
                                fontWeight="bold"
                                width='80px'
                                height='30px'
                              >
                                {getDayName(day)}
                              </Flex>
                            ))}
                          </Wrap>
                        </Flex>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>

                  <Flex mr={"10px"} gap={"10px"}>

                    <Flex alignSelf="center">
                      <Switch isChecked={item.isActive} size={"sm"} onChange={() => {
                        updateHandler(item.id)
                      }}
                      />
                    </Flex>

                    <Flex alignSelf="center">
                      <Icon
                        as={BiTrash}
                        color="#14453E"
                        w="20px"
                        h="20px"
                        alignSelf="center"
                        onClick={() => {
                          onDeleteModalOpen();
                          setTarget(item.id);
                        }}
                      />
                    </Flex>

{/* 
                    <Flex alignSelf="center">
                      <Icon
                        as={RiPencilFill}
                        w="20px"
                        h="20px"
                        color="#007BFF"
                        onClick={() => handleEditClick(index)} // Pass the index to handleEditClick
                      />
                    </Flex> */}

                  </Flex>

                  <Modal 
                  isOpen={isEditModalOpen} 
                  onClose={() => { onEditModalClose(); setEditingIndex(null); }}
                  size={{base:'sm',md:'xl'}}>
                    {/* ... (existing code) */}
                    <ModalOverlay />
                    <ModalContent p={"10px"}>
                      <ModalHeader alignSelf="center">Ubah Jadwal</ModalHeader>
                      <ModalCloseButton />
                
                    <ModalBody pb={6}>
                      <FormControl my="10px" color="black">
                        <Text>Waktu Penyiraman</Text>
                        <Input
                          type="time"
                          mt={'10px'}
                          defaultValue={editingIndex !== null ? jadwal[editingIndex].waktu : ''}
                        />
                      </FormControl>

                      <FormControl my="10px" color="black">
                        <Text>Durasi per penyiraman (menit)</Text>
                        <Input
                          type="number"
                          mt={'10px'}
                          defaultValue={editingIndex !== null ? jadwal[editingIndex].resep.interval : ''}
                        />
                      </FormControl>

                      <FormControl color="black">
                        <Text>Ulangi</Text>
                        <Wrap
                          marginTop="10px"
                          gap={2}
                        >
                          {weekdays.map((weekday) => (
                            <CustomCheckbox
                              label={weekday.label}
                              value={weekday.value}
                              onSelect={handleDay}
                              key={weekday.value}
                              isChecked={editingIndex !== null && jadwal[editingIndex].hari.includes(weekday.value)}
                            />
                          ))}
                        </Wrap>
                      </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                          onClick={() => { onEditModalClose(); }}
                          backgroundColor="#09322D"
                          color="white"
                          mr="3"
                          paddingX="30px"
                        //disabled={ppm === '' || rasioA === '' || rasioB === '' || rasioAir === ''}
                        >
                          Simpan
                        </Button>
                        <Button onClick={onEditModalClose}>Cancel</Button>
                      </ModalFooter>
                    </ModalContent>
                    {/* ... (existing code) */}
                  </Modal>

                  <AlertDialog
                    isOpen={isDeleteModalOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onDeleteModalCLose}
                    size={{base:'sm',md:'xl'}}
                  >
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                          Hapus Penjadwalan
                        </AlertDialogHeader>

                        <AlertDialogBody py={"10px"}>
                          {/* Are you sure? You can't undo this action afterwards. */}
                          Apakah anda yakin menghapus jadwal ini ?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={onDeleteModalCLose}>
                            Cancel
                          </Button>
                          <Button
                            colorScheme="red"
                            ml={3}
                            onClick={() => {
                              onDeleteModalCLose();
                              deleteHandler(target);
                            }}
                          >
                            Delete
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
                </Flex>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </Flex>
    </Flex>
  );
}

export default CardJadwal;
