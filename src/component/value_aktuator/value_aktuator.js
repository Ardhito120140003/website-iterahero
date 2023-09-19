import React, { useState, useEffect } from "react";
import {
  Text,
  FormControl,
  Image,
  Flex,
  Stack,
  Icon,
  Wrap,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSound from "use-sound";
import clickSound from "../../assets/switch.mp3";
import { postLogAktuator, Status } from "../..//Utility/api_link";
import Loading from "../../component/loading/loading";
import { Switch } from "@chakra-ui/react";
import "./value_aktuator.css";
import { RiArrowRightSLine } from "react-icons/ri";

const ValueAktuator = (props) => {
  const idApi = props.data.id;
  const life_cycle = props.data.life_cycle;
  const automation = props.data.automation;
  const [isLoading, setIsLoading] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(0.75);
  const [play] = useSound(clickSound, {
    playbackRate,
    interrupt: true,
  });
  const [isOn, setIsOn] = useState("offline");
  const convertValue = () => {
    if (life_cycle == 1) {
      return true;
    } else {
      return false;
    }
  };
  const onlineStatus = () => {
    axios
      .get(`${Status}${idApi}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.data.length > 0) {
          setIsOn(response.data.data[0].status);
        }
        if (response.data.data.length == 0) {
          setIsOn("offline");
        }
      });
  };

  const [status, setStatus] = useState(convertValue);
  const toogleSwitch = () => {
    if (status == true) {
      setTimeout(() => {
        axios
          .post(`${postLogAktuator}`, {
            id_actuator: idApi,
            on_off_status: 0,
          })
          .then((response) => {
            setIsLoading(false);
            setStatus((replace) => !replace);
          });
      }, 200);
    } else {
      setTimeout(() => {
        axios
          .post(`${postLogAktuator}`, {
            id_actuator: idApi,
            on_off_status: 1,
          })
          .then((response) => {
            setIsLoading(false);
            setStatus((replace) => !replace);
          });
      }, 200);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    onlineStatus();
  }, [idApi, status]);
  return (
    <>
      {status == null && isLoading ? (
        <Loading />
      ) : (
        <>
          <Flex justify={"center"} mt="30px" mb={"30px"}>
            <Image
              className="Image"
              w={"180px"}
              h={"auto"}
              src={
                automation == 0
                  ? status == 0
                    ? "/Off.png"
                    : "/On.png"
                  : "/automation.png"
              }
              alt="image"
              boxSize="100px"
            />
          </Flex>
          <Flex flexDir={"row"}>
            <Flex flexDir={"row"}>
              <Flex>
                <Text fontSize={`var(--header-5)`}>Status :</Text>
              </Flex>
              <Flex>
                <Text
                  fontSize={`var(--header-5)`}
                  color={
                    isOn == "online"
                      ? "var(--color-secondary-variant)"
                      : "var(--color-error)"
                  }
                >
                  {isOn == "offline" || isOn == undefined || isOn == ""
                    ? "Offline"
                    : "Online"}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <FormControl
            mt={"10px"}
            alignContent={"center"}
            justify={"center"}
            columns={{ base: 2, lg: 4 }}
          >
            <Stack align="center" onClick={play} className="touchable">
              {isLoading ? (
                automation == 0 ? (
                  <Switch
                    colorScheme="green"
                    size="lg"
                    onChange={() => {
                      setIsLoading(true);
                      toogleSwitch();
                    }}
                    value={status}
                    isChecked={status == 1}
                    isDisabled={
                      isOn == "offline" || isOn == undefined || isOn == ""
                        ? true
                        : false
                    }
                  />
                ) : (
                  <Text color={"var(--color-error)"}>Automation</Text>
                )
              ) : null}
            </Stack>
          </FormControl>
          <br></br>
          <Link to={`/unit/dashboard/aktuator/${idApi}`} className="touchable">
            <Flex
              w={"100%"}
              h={"40px"}
              alignItems={"center"}
              justifyContent={"center"}
              backgroundColor={"#09322D"}
              borderRadius={"34px"}
              paddingRight={"10px"}
              paddingLeft={"10px"}
            >
              <Text color={"white"}>Pengaturan</Text>
              <Icon
                as={RiArrowRightSLine}
                size={"100%"}
                color={"#FFFFFF"}
                marginRight={"5px"}
                marginLeft={"-10px"}
              />
            </Flex>
          </Link>
        </>
      )}
    </>
  );
};
export default ValueAktuator;
