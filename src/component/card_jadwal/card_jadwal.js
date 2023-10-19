import React from 'react';
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
  Grid
} from '@chakra-ui/react';
import { MdOutlineMoreTime } from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';
import { FlatTree } from 'framer-motion';
import CustomCheckbox from '../card_form_penjadwalan/checkbox';


const weekdays = [
  { label: 'senin', value: 1 },
  { label: 'selasa', value: 2 },
  { label: 'rabu', value: 3 },
  { label: 'kamis', value: 4 },
  // { label: 'jumat', value: 5 },
  // { label: 'sabtu', value: 6 },
  //{ label: 'minggu', value: 0 },
];

const weekdays2 = [
  // { label: 'senin', value: 1 },
  // { label: 'selasa', value: 2 },
  // { label: 'rabu', value: 3 },
  { label: 'kamis', value: 4 },
  { label: 'jumat', value: 5 },
  { label: 'sabtu', value: 6 },
  { label: 'minggu', value: 0 },
];


function CardJadwal({ jadwal, deleteHandler }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

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
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {
            width: '0.4em',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'transparent',
          },
        }}
        flexDirection="column"
        width="100%"
        height="500px"
      >
        {jadwal.map((item, index) => (
          <Flex
            key={index}
            borderRadius="10px"
            border="1px solid #E2E8F0"
            marginY="8px"
            marginX="20px"
            paddingY="0px"
            paddingX="20px"
            justifyContent="space-around"
          >
            <Accordion color={'black'} allowToggle w={'100%'}>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box display={'flex'} flexDir={'row'} as="span" flex='1' textAlign='left'>
                      <Icon as={MdOutlineMoreTime} color="#14453E" w="40px" h="40px" alignSelf="center" />
                      <Text ml={'10px'} alignSelf={'center'}>{item.waktu} - {item.resep.nama} </Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontSize={'15px'}>
                  <Flex direction={'column'}>
                    <Flex flexDir={'row'} gap={'20px'}>
                      <Flex flexDir="row" marginRight="5px" marginY="20px">
                        <Flex direction={'column'} alignItems={'start'}>
                          <Text color="black"> Formula </Text>
                          <Text color="black"> Jam </Text>
                          <Text color="black"> Durasi Penyiraman</Text>
                        </Flex>
                        <Flex direction={'column'}>
                          <Text color="black"> : </Text>
                          <Text color="black"> : </Text>
                          <Text color="black"> : </Text>
                        </Flex>
                        <Flex direction={'column'} alignItems={'start'}>
                          <Text color="black"> {item.resep.nama} </Text>
                          <Text color="black"> {item.waktu} </Text>
                          <Text color="black"> {item.resep.interval} </Text>
                        </Flex>
                      </Flex>
                    </Flex>

                    <Flex direction="row" justifyContent='stretch' gap={'5px'}>
                      {weekdays.map((item, index) => (
                        <CustomCheckbox label={item.label} value={item.value} onSelect={handleDay} key={index} />
                      ))}
                    </Flex>

                    <Flex direction="row" justifyContent='stretch' gap={'5px'} mt={'5px'}>
                      {weekdays2.map((item, index) => (
                        <CustomCheckbox label={item.label} value={item.value} onSelect={handleDay} key={index} />
                      ))}
                    </Flex>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Flex mx={"10px"} gap={'10px'}>
                    <Switch alignSelf="center" />

                    <Icon
                      as={BiTrash}
                      color="#14453E"
                      w="30px"
                      h="30px"
                      alignSelf="center"
                      onClick={onOpen}

                    />
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
                    <Button colorScheme="red" ml={3} onClick={() => { deleteHandler(item.id); onClose(); }}>
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Flex>

        ))}
      </Flex>
    </Flex>
  );
}

export default CardJadwal;
