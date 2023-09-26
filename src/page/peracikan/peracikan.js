import React, { useState, useEffect } from "react";
import { Flex, Image, Text, Select, Wrap, Button, Menu, Box, Input, FormControl, CircularProgressLabel, CircularProgress, WrapItem, border } from "@chakra-ui/react";
import { TabTitle } from "../../Utility/utility";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { greenhouseByUserId } from "../../Utility/api_link";
import { routePageName } from "../../redux/action";
import axios from "axios";
import ValueTandon from "../../component/value_tandon/value_tandon";
import CardFormPeracikan from "../../component/card_form_peracikan/card_form_peracikan";
import CardStatusPeracikan from "../../component/card_tandon_peracikan/card_tandon_peracikan";

const Peracikan = () => {
	TabTitle("Peracikan - ITERA Hero")
	const navigate = useNavigate();
	const [data, setData] = useState("");
	const [dataApi, setDataApi] = useState(null);
	const header = localStorage.getItem("token");

	const getApiGreenhouse = async () => {
		await axios
			.get(greenhouseByUserId, {
				headers: {
					Authorization: "Bearer " + header,
				},
			})
			.then((response) => setDataApi(response.data.data))
		// console.log(dataApi)
			.catch((error) => {
				localStorage.clear();
				navigate("/login");
			});
	};
	
	const dispatch = useDispatch();
	useEffect(() => {
		getApiGreenhouse();
		return () => {
			dispatch(routePageName("Peracikan"));
		};
	}, []);

	return (
		<>
			<Flex gap={'20px'}>
				<CardStatusPeracikan />
				<Box flexDirection={'column'} display={'flex'}>
					<ValueTandon />
					<CardFormPeracikan />
				</Box>
			</Flex>
		</>
	);
};
export default Peracikan;
