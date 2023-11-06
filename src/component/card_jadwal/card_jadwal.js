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
} from "@chakra-ui/react";
import { MdOutlineAccessTime } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
// import CustomCheckbox from "../card_form_penjadwalan/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { RiPencilFill } from 'react-icons/ri';

function getDayName(dayValue) {
  const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  return daysOfWeek[dayValue];
}

function CardJadwal({ jadwal, deleteHandler, updateHandler }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [target, setTarget] = useState(null);

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
                <Accordion color={"black"} allowToggle w={"100%"}>
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
                            w="35px"
                            h="35px"
                            alignSelf="center"
                          />
                          <Text ml={"10px"} alignSelf={"center"}>
                            {item.waktu} - {item.resep.nama}{" "}
                          </Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} fontSize={"15px"}>
                      <Flex direction={"column"}>
                        <Flex flexDir={"row"} gap={"20px"}>
                          <Flex flexDir="row" marginRight="5px" marginY="20px">
                            <Flex direction={"column"} alignItems={"start"}>
                              <Text color="black"> Formula </Text>
                              <Text color="black"> Jam </Text>
                              <Text color="black"> Durasi Siram</Text>
                            </Flex>
                            <Flex direction={"column"}>
                              <Text color="black"> : </Text>
                              <Text color="black"> : </Text>
                              <Text color="black"> : </Text>
                            </Flex>
                            <Flex direction={"column"} alignItems={"start"}>
                              <Text color="black"> {item.resep.nama} </Text>
                              <Text color="black"> {item.waktu} </Text>
                              <Text color="black"> {item.resep.interval} </Text>
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
                              width= '80px'
        height= '30px'
                            >
                              {getDayName(day)}
                            </Flex>
                          ))}
                        </Wrap>

                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>

                <Flex mx={"10px"} gap={"10px"}>

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
                        onOpen();
                        setTarget(item.id);
                      }}
                    />
                  </Flex>

                  <Flex alignSelf="center">
                    {/* <Link
                      className="touch"
                    > */}
                    <Icon
                      as={RiPencilFill}
                      w="20px"
                      h="20px"
                      color="#007BFF"
                    />
                    {/* </Link> */}
                  </Flex>

                </Flex>

                <AlertDialog
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Hapus Penjadwalan
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        {/* Are you sure? You can't undo this action afterwards. */}
                        Apakah anda yakin menghapus jadwal ini ?
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Cancel
                        </Button>
                        <Button
                          colorScheme="red"
                          ml={3}
                          onClick={() => {
                            deleteHandler(target);
                            onClose();
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
