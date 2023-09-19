import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinFill, RiPencilFill } from "react-icons/ri";
import { deleteAutomation } from "../../Utility/api_link";

const CardAutomation = (props) => {
  const item = props.data;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const header = localStorage.getItem("token");
  const deleteItem = async () => {
    axios
      .delete(`${deleteAutomation}${item.id_automation}`, {
        headers: {
          Authorization: "Bearer " + header,
        },
      })
      .then(() => window.location.reload());
  };

  useEffect(() => {}, [item]);

  return (
    <>
      <Box
        w={["100%"]}
        classNameName="card-Automation"
        bg={"#ffff"}
        borderRadius={"10px"}
        border={"1px solid #E2E8F0"}
        padding={"10px"}
      >
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          w={["100%"]}
          p={"10px"}
          direction={{ base: "column", md: "row" }}
        >
          <Flex
            alignItems={"center"}
            justifyContent={"start"}
            direction={{ base: "column", md: "row" }}
          >
            <Wrap p={"10px"}>
              <Image
                classNameName="Image"
                w={["100%"]}
                h={["100%"]}
                src={"/automation.png"}
                alt="image"
              ></Image>
            </Wrap>
            <Flex
              direction={"column"}
              alignItems={"start"}
              justifyContent={"start"}
            >
              <Flex direction={"row"}>
                <Text>Acutator :</Text>
                <Text>{item.actuator.name}</Text>
              </Flex>
              <Flex
                direction={"row"}
                alignItems={"start"}
                justifyContent={"start"}
              >
                <Text>Sensor :</Text>
                <Text>{item.sensor.name}</Text>
              </Flex>
              <Flex
                direction={"row"}
                alignItems={"start"}
                justifyContent={"start"}
              >
                <Text>Kondisi :</Text>
                <Text>{item.condition}</Text>
              </Flex>
              <Flex
                direction={"row"}
                alignItems={"start"}
                justifyContent={"start"}
              >
                <Text>Status Lifecycle :</Text>
                {item.status_lifecycle == "1" ? (
                  <Text color={"var(--color-secondary-variant)"}>on</Text>
                ) : (
                  <Text color={"var(--color-error)"}>off</Text>
                )}
              </Flex>
              <Flex
                direction={"row"}
                alignItems={"start"}
                justifyContent={"start"}
              >
                <Text>constanta :</Text>
                <Text>{item.constanta}</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex direction={"row"} alignItems={"start"} justifyContent={"start"}>
            <Flex>
              <div
                onClick={() => {
                  onOpen();
                }}
                className="touch"
              >
                <Icon as={RiDeleteBinFill} size={"24px"} color={"#B00020"} />
              </div>
              <div>
                <Link
                  className="touch"
                  to={{
                    pathname: `/unit/dashboard/aktuator/automation/edit/${item.id_automation}`,
                  }}
                >
                  <Icon
                    as={RiPencilFill}
                    size={"24px"}
                    color={"#007BFF"}
                    marginStart={"10px"}
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
          <ModalHeader>{"Hapus Automation " + item.id_automation}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {"Apakah kamu yakin menghapus Automation" + item.id_automation}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button bg={"#E2E8F0"} mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button
              variant="#09322D"
              bg={"#09322D"}
              color={"#ffff"}
              onClick={deleteItem}
            >
              Hapus
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CardAutomation;
