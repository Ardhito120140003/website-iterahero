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
import { deleteNotification } from "../../Utility/api_link";

const CardNotification = (props) => {
	let data = props.data;

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [id, setId] = useState("");

	const deleteItem = (e, id) => {
		e.preventDefault();
		axios
			.delete(`${deleteNotification}${id}`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				window.location.reload();
				alert("Berhasil Menghapus Data");
			})
			.catch((error) => {});
	};

	const eleminateZ = (date) => {
		let result = date.replace("T", " ").replace("Z", " +0700");
		return result;
	};

	var idLocale = require("moment/locale/id");
	moment.locale("id", idLocale);

	return (
		<Flex
			w={"100%"}
			h={"80%"}
			bg={"#ffff"}
			borderRadius={"xl"}
			borderWidth="1px"
			borderColor={"#D9D9D9"}
			boxShadow={"md"}
			justify={"space-between"}
			flexDir={"row"}
			alignItems="center"
			padding={"2%"}>
			<Flex justify={"start"} gap={70} flexDir={"row"} alignItems="center">
				<Flex
					w={"65px"}
					h={"56px"}
					borderRadius={"10px"}
					justify="center"
					align={"center"}>
					<Image src="https://res.cloudinary.com/diyu8lkwy/image/upload/v1663905296/itera%20herro%20icon/icon-notif_owss6p.png" />
				</Flex>
				<Flex flexDir={"column"} gap={3}>
					<Text
						alignItems={"left"}
						justifyContent={"left"}
						textAlign={"left"}
						fontWeight={"semibold"}
						fontSize={"var(--header-3)"}
						color={"var(--color-primer)"}>
						{data.detail}
					</Text>
					<Flex
						flexDir={"row"}
						paddingLeft={"2%"}
						gap={2}
						alignItems={"center"}>
						<Icon as={RiMapPinFill} w={25} h={25} color={"black"} />
						<Text
							alignItems={"left"}
							justifyContent={"left"}
							textAlign={"left"}
							color={"var(--color-primer)"}
							fontSize={"var(--header-5)"}>
							{data.greenhouse_loc}
						</Text>
					</Flex>
					<Text
						fontWeight={"semibold"}
						fontSize={"var(--header-3)"}
						color={"var(--color-grey)"}
						alignItems={"left"}
						justifyContent={"left"}
						textAlign={"left"}>
						{moment(eleminateZ(data.created_at)).startOf("seconds").fromNow()}
					</Text>
				</Flex>
			</Flex>
			<CloseButton
				w={35}
				h={35}
				color={"black"}
				size={20}
				onClick={() => {
					setId(data.id);
					onOpen();
				}}
			/>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Peringatan !</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						Apakah anda yakin ingin menghapus notifikasi {id} ini?
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="blue"
							onClick={(e) => {
								deleteItem(e, id);
								onClose();
							}}
							mr={3}>
							Hapus
						</Button>
						<Button
							onClick={() => {
								onClose();
							}}
							variant="ghost">
							Batal
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default CardNotification;
