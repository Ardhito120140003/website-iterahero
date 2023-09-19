import React, { useState, useEffect } from "react";
import { Flex, Text, Button, Wrap } from "@chakra-ui/react";
import CardGreenhouse from "../../component/card_greenhouse/card_green";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { routePageName } from "../../redux/action";
import { TabTitle } from "../../Utility/utility";
import axios from "axios";
import { listGreenhouse } from "../../Utility/api_link";
import { useNavigate } from "react-router-dom";
import Loading from "../../component/loading/loading";

const GreenHouse = () => {
	TabTitle("Greenhouse - ITERA Hero")

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [dataApi, setDataApi] = useState(null)

	const header = localStorage.getItem('token')


	const getListGreenhouse = async () => {
		await axios.get(listGreenhouse, {
			headers: {
				'Authorization': 'Bearer ' + header
			}
		}).then(response => {
			setDataApi(response.data.data)
			console.log(response.data.data)
		})
			.catch((error) => {
				localStorage.clear()
				navigate('/login')
			})
	}

	useEffect(() => {
		dispatch(routePageName("Greenhouse"));
		getListGreenhouse()
	}, []);

	return (
		<>
			{dataApi == null ? <Loading />
				:



				<Flex w="100%" flexDir={"column"}>
					<Flex
						w="100%"
						flexDir={"row"}
						justifyContent="space-between"
						alignItems={"center"}
						marginBottom="40px">
						<Text
							fontWeight={"semibold"}
							fontSize={"var(--header-3)"}
							color={"var(--color-primer)"}>
							List Greenhouse
						</Text>

						<Link to={"/unit/greenhouse/add"}>
							<Button bg="#14453E" size="sm" colorScheme={"teal"}>
								Tambah
							</Button>
						</Link>
					</Flex>
					<Wrap>
						{dataApi.map((placement) => (
							<CardGreenhouse
								data={{
									created_at: placement.created_at,
									id: placement.id,
									image: placement.image,
									title: placement.name,
									location: placement.location,
									user_id: placement.user_id,
									user_name: placement.user_name,
								}}
							/>
						))}
					</Wrap>
				</Flex>
			}
		</>
	);
};
export default GreenHouse;
