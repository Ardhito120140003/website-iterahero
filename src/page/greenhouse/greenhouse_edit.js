import React, { useState, useEffect } from "react";
import { Flex, Text, Button, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
} from "@chakra-ui/form-control";
import * as yup from "yup";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { routePageName } from "../../redux/action";
import { TabTitle } from "../../Utility/utility";
import axios from "axios";
import { updateGreenhouse } from "../../Utility/api_link";
import Loading from "../../component/loading/loading";
import { useNavigate } from "react-router-dom";

const GreenhouseEdit = () => {
	TabTitle("Edit Greenhouse - ITERA Hero");

	const { slug } = useParams();
	const navigate = useNavigate();

	const [dataApi, setDataApi] = useState(null);

	const header = localStorage.getItem("token");

	const getApibyID = async () => {
		await axios
			.get(updateGreenhouse + slug, {
				headers: {
					Authorization: "Bearer " + header,
				},
			})
			.then((response) => {
				setDataApi(response.data.data);
				console.log(response.data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	let data = {
		name: "",
		location: "",
	};
	const [image, onChangeImage] = useState(null);
	const [isloading, checkLoading] = useState(false);

	const schema = yup.object({
		name: yup.string().required("data harus diisi"),
		location: yup.string().required("data harus diisi"),
		image: yup.object().required("data harus diisi"),
	});

	const submit = async (name, location) => {
		data.name = name;
		data.location = location;

		if (data.name == "" || data.location == "") {
			return alert("Masih ada yang belum di isi");
		} else {
			checkLoading(true);
			console.log(location);
			putGreenhouse(name, image, location);
		}
	};

	const putGreenhouse = async (valueName, valueImage, valueLocation) => {
		await axios
			.put(
				updateGreenhouse + slug,
				{
					name: valueName,
					image: valueImage,
					location: valueLocation,
				},
				{
					headers: {
						"content-type": "multipart/form-data",
						Authorization: "Bearer " + header,
					},
				}
			)
			.then((response) => {
				checkLoading(false);
				navigate("/unit/greenhouse");
				// alert("Data Greenhouse Berhasil Diperbaharui ");
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(routePageName("Greenhouse"));
		getApibyID();
	}, []);

	return (
		<>
			{dataApi == null || isloading ? (
				<Loading />
			) : (
				<Flex w="100%" flexDir={"column"}>
					<Flex w="100%" flexDir={"row"} alignItems={"center"}>
						<Flex width="100%">
							<Link to={"/unit/monitoring"}>
								<Flex marginRight={"2"}>
									<Text
										fontWeight={"semibold"}
										fontSize={"var(--header-3)"}
										color={"var(--color-primer)"}>
										List GreenHouse
									</Text>
								</Flex>
							</Link>
							<Flex marginRight={"2"}>
								<Text
									fontWeight={"semibold"}
									fontSize={"var(--header-3)"}
									color={"var(--color-primer)"}>
									{" "}
									{">"}{" "}
								</Text>
							</Flex>
							<Link>
								<Flex>
									<Text
										fontWeight={"semibold"}
										fontSize={"var(--header-3)"}
										color={"var(--color-primer)"}>
										{" "}
										{dataApi.name}{" "}
									</Text>
								</Flex>
							</Link>
						</Flex>
					</Flex>
					<Link />
					<Flex w="100%" flexDir={"column"}>
						<Formik
							initialValues={{
								name: dataApi.name,
								location: dataApi.location,
								image: {},
							}}
							validationSchema={schema}>
							{({
								values,
								errors,
								touched,
								handleChange,
								handleBlur,
								handleSubmit,
								isSubmitting,
							}) => (
								<Form>
									<FormControl
										marginTop={"20px"}
										isInvalid={errors.name && touched.name}>
										<FormLabel htmlFor="name" color={"black"}>
											Nama Greenhouse
										</FormLabel>
										<Input
											width={"100%"}
											h="60px"
											maxWidth={"100%"}
											marginTop={"0 auto"}
											type="text"
											name="name"
											value={values.name}
											onChange={handleChange}
											onBlur={handleBlur}
											variant="outline"
											placeholder={dataApi.name}
											color={"black"}
										/>
										<FormErrorMessage>{errors.name}</FormErrorMessage>
									</FormControl>

									<FormControl
										marginTop={"20px"}
										isInvalid={errors.location && touched.location}>
										<FormLabel htmlFor="location" color={"black"}>
											Lokasi Greenhouse
										</FormLabel>
										<Input
											width={"100%"}
											h="60px"
											maxWidth={"100%"}
											marginTop={"0 auto"}
											type="text"
											name="location"
											value={values.location}
											onChange={handleChange}
											onBlur={handleBlur}
											variant="outline"
											placeholder={dataApi.location}
											color={"black"}
										/>
										<FormErrorMessage>{errors.location}</FormErrorMessage>
									</FormControl>

									<FormControl
										marginTop={"20px"}
										isInvalid={errors.image && touched.image}>
										<FormLabel htmlFor="image" color={"black"}>
											Gambar Greenhouse
										</FormLabel>
										<Flex
											width={"100%"}
											h="100px"
											borderRadius={"5px"}
											maxWidth={"100%"}
											marginTop={"0 auto"}
											variant="outline"
											placeholder="Masukkan email"
											color={"black"}
											alignItems="center"
											borderWidth="1px"
											borderColor={"#D9D9D9"}
											padding={"20px"}>
											<input
												type="file"
												accept="image/*"
												onChange={(e) => {
													onChangeImage(e.target.files[0]);
												}}
											/>
										</Flex>
									</FormControl>
									<Button
										marginTop={"44px"}
										width="100%"
										height="50px"
										borderRadius="10px"
										backgroundColor="var(--color-primer)"
										type="submit"
										// disabled={isSubmitting}
										// className="btn-login"
										onClick={() => submit(values.name, values.location)}>
										<Text
											fontWeight="bold"
											fontFamily="var(--font-family-secondary)"
											fontSize="var(--header-3)"
											color="var(--color-on-primary)"
											colorScheme={"var(--color-on-primary)"}>
											Tambah
										</Text>
									</Button>
								</Form>
							)}
						</Formik>
					</Flex>
				</Flex>
			)}
		</>
	);
};

export default GreenhouseEdit;
