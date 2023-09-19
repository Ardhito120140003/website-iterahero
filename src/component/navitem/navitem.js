import React from "react";
import {
	Flex,
	Text,
	Icon,
	Menu,
	MenuButton,
} from "@chakra-ui/react";
import "../sidenav/navigation.css";

export default function NavItem({ icon, title, description, active, navSize }) {
	return (
		<Flex
			mt={30}
			flexDir="column"
			w="100%"
			alignContent={"center"}
			justifyContent={"center"}
			alignItems={navSize == "small" ? "center" : "flex-start"}>
			<Menu placement="right">
				<Flex
					backgroundColor={active && "#FFFF"}
					p={3}
					borderLeftRadius={25}
					_hover={{ textDecor: "#FFFF", backgroundColor: "#FBFBFB" }}
					w={navSize == "large" && "100%"}
					alignContent={"center"}
					alignItems={"center"}
					className="nav-item">
					<MenuButton w="100%">
						<Flex alignItems={"center"}>
							<Icon
								fontWeight={"bold"}
								fontSize={"var(--header-3)"}
								as={icon}
								color={active ? "var(--color-primer)" : "var(--color-grey)"}
							/>
							<Text
								ml={5}
								display={navSize == "small" ? "none" : "flex"}
								fontWeight={"semibold"}
								fontSize={"var(--header-3)"}
								color={active ? "var(--color-primer)" : "var(--color-grey)"}>
								{title}
							</Text>
						</Flex>
					</MenuButton>
				</Flex>
			</Menu>
		</Flex>
	);
}
