import { Flex, Text, Icon, useDisclosure } from "@chakra-ui/react";
import { IoExitOutline } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { useSelector } from "react-redux";
import Draw from "../draw/draw";
import { Link } from "react-router-dom";

const Header = () => {
  const { routeName } = useSelector((state) => state.userReducer);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      height={"80px"}
      bg={"#ffff"}
      padding={"20px"}
      justifyContent="space-between"
      alignItems={"center"}
      flexDirection={"row"}
      shadow="0 0 0 1px rgba(0, 0, 0, 0.1)"
    >
      <Icon
        as={AiOutlineMenu}
        fontSize="xl"
        color={"#09322D"}
        display={{
          lg: "none",
        }}
        onClick={onOpen}
      />

      <Draw
        data={{
          onclose: onClose,
          isopen: isOpen,
        }}
      />

      <Text
        color={"var(--color-primer)"}
        fontWeight={"bold"}
        fontSize={"var(--header-2)"}
      >
        {routeName}
      </Text>

      <Flex flexDirection={"row"}>
        <Link
          to={"/login"}
          onClick={() => {
            localStorage.clear();
          }}
        >
          <div>
            <Icon
              cursor="pointer"
              as={IoExitOutline}
              color={"var(--color-primer)"}
              fontSize={"xx-large"}
            />
          </div>
        </Link>
      </Flex>
    </Flex>
  );
};
export default Header;
