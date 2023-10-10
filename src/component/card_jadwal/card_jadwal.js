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
  AlertDialogCloseButton,
  Button

} from '@chakra-ui/react';
import { MdOutlineMoreTime } from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';
import { useDisclosure } from '@chakra-ui/react';

const CardJadwal = ({ jadwal, deleteHandler }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  return (
    <Flex
      flexDirection="column"
      width="100%"
      height="100%"
      borderRadius="10px"
      border="1px solid #E2E8F0"
    >
      <Text padding="30px">Jadwal Peracikan</Text>

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
            <Icon as={MdOutlineMoreTime} color="#14453E" w="50px" h="50px" alignSelf="center" />

            <Flex flexDir="column" marginRight={'50px'} marginY="20px">
              <Text align="left">Formula : {item.resep.nama} </Text>
              <Text align="left">Jam : {item.waktu} </Text>
              <Text align="Left">Durasi Penyiraman : {item.resep.interval} </Text>
            </Flex>

            <Switch alignSelf="center" />

            <Icon
              as={BiTrash}
              color="#14453E"
              w="30px"
              h="30px"
              alignSelf="center"
              onClick={onOpen}
              
            />

            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Hapus Penjadwalan
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme='red' ml={3}  onClick={() => { deleteHandler(item.id); onClose() }}>
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
};

export default CardJadwal;
