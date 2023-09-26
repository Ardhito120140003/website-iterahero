import React, { useState } from "react";
import "./navigation.css";
import { Flex, Image, Box, Center } from "@chakra-ui/react";
import { FiHome, FiMonitor } from "react-icons/fi";
import { GiGreenhouse } from "react-icons/gi";
import { AiOutlineControl, AiOutlineHistory,AiOutlineHourglass } from "react-icons/ai";
import { MdOutlineMoreTime} from  "react-icons/md";
import NavItem from "../navitem/navitem";
import { useSelector, useDispatch } from "react-redux";
import { routePageName } from "../../redux/action";
import { Link } from "react-router-dom";

const SideNav = () => {
  const navSize = "large";

  const dispatch = useDispatch();

  const patchRoute = (data) => {
    dispatch(routePageName(data));
  };
  const { routeName } = useSelector((state) => state.userReducer);

  return (
    <>
      <Flex
        backgroundColor={"#09322D"}
        display={{
          base: "none",
          lg: "flex",
        }}
        pos="sticky"
        h="150vh"
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
        w={{
          base: "250px",
          xl: "250px",
        }}
        flexDir="column"
        justifyContent="flex-start"
      >
        <Flex flexDir="column" w="100%" as="nav" className="navbar">
          <Box paddingRight="5%">
            <Center>
              <Image src="https://res.cloudinary.com/diyu8lkwy/image/upload/v1663396824/itera%20herro%20icon/Frame_9_1_sznmbk.png" />
            </Center>
          </Box>

          <Link
            to={"/unit/dashboard/1"}
            onClick={() => {
              patchRoute("Dashboard");
            }}
          >
            <NavItem
              navSize={navSize}
              icon={FiHome}
              title="Dashboard"
              active={
                routeName === "Dashboard" ||
                routeName.includes("Automation") ||
                routeName.includes("automation")
              }
            />
          </Link>
          <Link
            to={"/unit/greenhouse"}
            onClick={() => {
              patchRoute("Greenhouse");
            }}
          >
            <NavItem
              navSize={navSize}
              icon={GiGreenhouse}
              title="Greenhouse"
              active={routeName === "Greenhouse"}
            />
          </Link>
          <Link
            to={"/unit/monitoring"}
            onClick={() => {
              patchRoute("Monitoring");
            }}
          >
            <NavItem
              navSize={navSize}
              icon={FiMonitor}
              title="Monitoring"
              active={
                routeName === "Monitoring" || routeName === "Monitoring Detail"
              }
            />
          </Link>
          <Link
            to={"/unit/controlling"}
            onClick={() => {
              patchRoute("Controlling");
            }}
          >
            <NavItem
              navSize={navSize}
              icon={AiOutlineControl}
              title="Controlling"
              active={routeName === "Controlling"}
            />
          </Link>
          <Link
            to={"/unit/historynotifikasi"}
            onClick={() => {
              patchRoute("History Notification");
            }}
          >
            <NavItem
              navSize={navSize}
              icon={AiOutlineHistory}
              title="Notification"
              active={routeName === "History Notification"}
            />
          </Link>
          <Link
						to={"/unit/Peracikan"}
						onClick={() => {
							patchRoute("Peracikan");
						}}>
						<NavItem
							navSize={navSize}
							icon={AiOutlineHourglass}
							title="Peracikan"
							active={routeName === "Peracikan"}
						/>
					</Link>
					<Link
						to={"/unit/Penjadwalan"}
						onClick={() => {
							patchRoute("Penjadwalan");
						}}>
						<NavItem
							navSize={navSize}
							icon={MdOutlineMoreTime}
							title="Penjadwalan"
							active={routeName === "Penjadwalan"}
						/>
					</Link>
        </Flex>
      </Flex>
    </>
  );
};
export default SideNav;
