import React, { useState } from "react";
import {
  Flex,
  Image,
  Text,
  Icon,
  CloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { RiMapPinFill } from "react-icons/ri";
import moment from "moment";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUrl, selectToken } from "../../features/auth/authSlice";

function CardNotification(props) {
  const { data } = props;
  const base_url = useSelector(selectUrl)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState("");
  const token = useSelector(selectToken)

  const deleteItem = (e, id) => {
    e.preventDefault();
    axios
      .delete(base_url + 'api/v1/notification', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id
        }
      })
      .then((response) => {
        window.location.reload();
        alert("Berhasil Menghapus Data");
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const eleminateZ = (date) => {
    const result = date.replace("T", " ").replace("Z", " +0700");
    return result;
  };

  const idLocale = require("moment/locale/id");
  moment.locale("id", idLocale);

  return (
    <>
      <Flex
        bg="#ffff"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="#D9D9D9"
        boxShadow="md"
        justify="space-between"
        alignItems="center"
        padding="2%"
        gap={4}
      >
        <Flex flex={1} justifyContent={"center"}>
          <Image src="https://res.cloudinary.com/diyu8lkwy/image/upload/v1663905296/itera%20herro%20icon/icon-notif_owss6p.png" />
        </Flex>
        <Flex alignSelf={"flex-start"} flexDir="row" alignItems="center" flex={5}>
          <Flex flexDir="column" gap={3}>
            <Text
              textAlign={"left"}
              fontWeight="semibold"
              fontSize="var(--header-3)"
              color="var(--color-primer)"
            >
              {data.message}
            </Text>
            <Flex flexDir="row" paddingLeft="2%" gap={2} alignItems="center">
              <Icon as={RiMapPinFill} w={25} h={25} color="black" />
              <Text
                alignItems="left"
                justifyContent="left"
                textAlign="left"
                color="var(--color-primer)"
                fontSize="var(--header-5)"
              >
                {data.loc}
              </Text>
            </Flex>
            <Text
              fontWeight="semibold"
              fontSize="var(--header-3)"
              color="var(--color-grey)"
              alignItems="left"
              justifyContent="left"
              textAlign="left"
              flex={1}
            >
              {moment(eleminateZ(data.created_at)).startOf("seconds").fromNow()}
            </Text>
          </Flex>
        </Flex>
        <CloseButton
          w={35}
          h={35}
          color="red"
          size={20}
          onClick={() => {
            setId(data.id);
            onOpen();
          }}
        />
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Peringatan !</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Apakah anda yakin ingin menghapus notifikasi ini?
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={(e) => {
                deleteItem(e, id);
                onClose();
              }}
              mr={3}
            >
              Hapus
            </Button>
            <Button
              onClick={() => {
                onClose();
              }}
              variant="ghost"
            >
              Batal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CardNotification;
