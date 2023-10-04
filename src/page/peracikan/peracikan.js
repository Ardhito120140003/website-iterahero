import React, { useState, useEffect } from "react";
import { Flex} from "@chakra-ui/react";
import { TabTitle } from "../../Utility/utility";
import { useDispatch } from "react-redux";
import axios from "axios";
import ValueTandon from "../../component/value_tandon/value_tandon";
import CardFormPeracikan from "../../component/card_form_peracikan/card_form_peracikan";
import CardStatusPeracikan from "../../component/card_tandon_peracikan/card_tandon_peracikan";
import { useSelector } from "react-redux";
import { selectUrl, routePageName } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./peracikan.css"
import Loading from "../../component/loading/loading";

const Peracikan = () => {
	TabTitle("Peracikan - ITERA Hero")
	const base_url = useSelector(selectUrl);
	const dispatch = useDispatch();
	const [dataApi, setDataApi] = useState(null);
	const header = localStorage.getItem("token");

	const getApi = async () => {
		await axios
			.get(base_url + "api/v1/tandonUtama", {
				headers: {
					Authorization: "Bearer " + header,
				},
				params: {
					id: 1,
				}
			})
			.then(response => {
				setDataApi(response.data.data)
			})
			.catch((error) => {
				console.log("error : ", error)
			});
	};

	useEffect(() => {
		getApi();
		dispatch(routePageName("Peracikan"));
	}, []);

	return (
		<>
			{dataApi === null ? (
				<Loading />
			) : (
				<Flex gap={'20px'} className="flex-container">
					<Flex flex={1}>
						<CardStatusPeracikan
							id={dataApi.id}
							isOnline={dataApi.isOnline}
							sensor={dataApi.sensor}
							status={dataApi.status} s
						/>
					</Flex>
					<Flex flex={1} flexDirection={'column'}>
						<ValueTandon tandonBahan={dataApi.tandonBahan} />
						<CardFormPeracikan /> 
					</Flex>
				</Flex>
			)}

		</>
	);
};
export default Peracikan;
