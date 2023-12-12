import React from "react";
import {
  Flex,
  Image,
  Box,
  Text,
  Icon,
  WrapItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { RiDeleteBinFill, RiPencilFill, RiMapPinFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";
import "./card_tandon.css";
import { useSelector } from "react-redux";
import { selectUrl } from "../../features/auth/authSlice";

function CardTandon(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const base_url = useSelector(selectUrl);
  const { data } = props;
  // console.log(props)

  const header = localStorage.getItem("token");

  const deleteItem = async () => {
    axios
      .delete(
        // deleteGreenhouse + data.id,
        base_url + "api/v1/tandonUtama",
        {
          params: {
            id: data.id,
          },
          headers: {
            Authorization: `Bearer ${header}`,
          },
        }
      )
      .then(() => window.location.reload());
  };
  return (
    <>
      <WrapItem className="dont-touch">
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Link 
         className="touch"
         to={{pathname: `/unit/tandon/edit/${data.id}`}} 
         key={data.id}
         >
          <Image src={data.image} h="250px" w="350px" />
         </Link> 
         <Flex flexDir={"column"} justifyContent={"space-around"} p={2} gap={1}>
            <Flex
              justifyContent="space-between"
              alignItems={"center"}
            >
              <Text
                fontWeight="semibold"
                fontSize="var(--header-3)"
                color="black"
                p={0}
              >
                {data.title}
              </Text>
              <Flex>
                <div
                  className="touch"
                  onClick={() => {
                    onOpen();
                  }}
                >
                  <Icon as={RiDeleteBinFill} size="24px" color="#B00020" />
                </div>
                <Link
                  className="touch"
                  to={{
                    pathname: `/unit/tandon/${data.id}`,
                  }}
                >
                  <Icon
                    as={RiPencilFill}
                    size="24px"
                    color="#007BFF"
                    marginStart="10px"
                  />
                </Link>
              </Flex>
            </Flex>
            <Flex alignItems={"center"}>
              <Flex>
                <Icon as={RiMapPinFill} size="30px" color="black" />
              </Flex>
              <Flex textAlign="center" alignContent="center">
                <Text
                  color="black"
                  flexDirection="row"
                  fontSize="var(--header-5)"
                >
                  {data.location}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </WrapItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Hapus ${data.title}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"} flexDirection={"column"} display={"flex"}>
            <Text>{`Apakah  yakin menghapus`}</Text>
            <Text>{`${data.title}`}</Text>
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
export default CardTandon;
