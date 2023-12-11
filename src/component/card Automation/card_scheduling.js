import React, { useEffect } from 'react';
import {
  Text,
  Image,
  Flex,
  Wrap,
  Button,
  Icon,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { selectToken, selectUrl } from '../../features/auth/authSlice';
import { RiDeleteBinFill, RiPencilFill } from 'react-icons/ri';
import { scheduling } from '../../Utility/api_link';
import { useSelector } from 'react-redux';

function CardScheduling(props) {
  const item = props.data;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const base_url = useSelector(selectUrl)
  const header = useSelector(selectToken)
  const deleteItem = async () => {
    axios
      .delete(base_url + "api/v1/automation", {
        params: {
          id: item.id,
          type: "bySchedule",
        },
        headers: {
          Authorization: `Bearer ${header}`,
        },
      })
      .then(() => window.location.reload());
  };

  return (
    <>
      <Box
        w={['100%']}
        className="card-Automation"
        bg="#ffff"
        borderRadius="10px"
        border="1px solid #E2E8F0"
        padding="10px"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          w={['100%']}
          p="10px"
          direction={{ base: 'column', md: 'row' }}
        >
          <Flex
            alignItems="center"
            justifyContent="start"
            direction={{ base: 'column', md: 'row' }}
          >
            <Wrap p="10px">
              <Image
                className="Image"
                w={['100%']}
                h={['100%']}
                src="/schedule.png"
                alt="image"
              />
            </Wrap>
            <Flex
              direction="column"
              alignItems="start"
              justifyContent="start"
            >
              <Flex direction="row">
                <Text>Actuator :</Text>
                <Text>{item.aktuator.name}</Text>
              </Flex>
              <Flex
                direction="row"
                alignItems="start"
                justifyContent="start"
              >
                <Text>Waktu Mulai :</Text>
                <Text>{item.startTime}</Text>
              </Flex>
              <Flex
                direction="row"
                alignItems="start"
                justifyContent="start"
              >
                <Text>Interval :</Text>
                <Text>{item.interval}</Text>
              </Flex>
              <Flex
                direction="row"
                alignItems="start"
                justifyContent="start"
              >
                <Text>perulangan :</Text>
                <Text>{item.iterasi}</Text>
              </Flex>
              <Flex
                direction="row"
                alignItems="start"
                justifyContent="start"
              >
                <Text>duration :</Text>
                <Text>{item.duration}</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex direction="row" alignItems="start" justifyContent="start">
            <Flex>
              <div
                onClick={() => {
                  onOpen();
                }}
                className="touch"
              >
                <Icon as={RiDeleteBinFill} size="24px" color="#B00020" />
              </div>
              <div>
                <Link
                  className="touch"
                  to={{
                    pathname: `/unit/dashboard/aktuator/schedule/edit/${item.id}`,
                  }}
                >
                  <Icon
                    as={RiPencilFill}
                    size="24px"
                    color="#007BFF"
                    marginStart="10px"
                  />
                </Link>
              </div>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Hapus Automation`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {`Apakah kamu yakin menghapus Automation ini?`}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button bg="#E2E8F0" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button
              variant="#09322D"
              bg="#09322D"
              color="#ffff"
              onClick={deleteItem}
            >
              Hapus
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default CardScheduling;
