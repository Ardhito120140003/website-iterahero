import React, { useState, useEffect } from "react";
import { Flex, Box} from "@chakra-ui/react";
import { TabTitle } from "../../Utility/utility";
import { useDispatch } from "react-redux";
import { greenhouseByUserId } from "../../Utility/api_link";
import axios from "axios";
import ValueTandon from "../../component/value_tandon/value_tandon";
import CardFormPeracikan from "../../component/card_form_peracikan/card_form_peracikan";
import CardStatusPeracikan from "../../component/card_tandon_peracikan/card_tandon_peracikan";
import { useSelector } from "react-redux";
import { selectUrl, routePageName } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Peracikan = () => {
	TabTitle("Peracikan - ITERA Hero")
	const base_url = useSelector(selectUrl);
	const dispatch = useDispatch();
	const [dataApi, setDataApi] = useState(null);
	const header = localStorage.getItem("token");

	const navigate = useNavigate();

	const getApiGreenhouse = async () => {
		await axios
			.get(base_url + greenhouseByUserId, {
				headers: {
					Authorization: "Bearer " + header,
				},
			})
			.then((response) => setDataApi(response.data.data))
			.catch((error) => {
				localStorage.clear();
				navigate("/login");
			});
	};
	
	useEffect(() => {
		getApiGreenhouse();
		dispatch(routePageName("Peracikan"));
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
