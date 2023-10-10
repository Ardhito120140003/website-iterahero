import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Box,
  CircularProgress,
  Grid,
  GridItem,
  Image,
  Center,
  Wrap,
  Button,
  FormLabel,
  Select,
  FormControl,
} from "@chakra-ui/react";
import { TabTitle } from "../../Utility/utility";
import CardJadwal from "../../component/card_jadwal/card_jadwal";
import { selectUrl } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import Loading from "../../component/loading/loading";
import CardFormPenjadwalan from "../../component/card_form_penjadwalan/card_form_penjadwalan";
import CardStatusPeracikan from "../../component/card_tandon_peracikan/card_tandon_peracikan";
import ValueTandon from "../../component/value_tandon/value_tandon";
import CardStatusPeracikanDasboard from "../../component/card_tandon_peracikan/card_tandon_peracikan_dashboard";
import { AiOutlineControl } from "react-icons/ai";
import { GiGreenhouse } from "react-icons/gi";
import { MdMonitor } from "react-icons/md";
import CardDashboard from "../../component/card_dashboard/card_dashboard";
import dashboardMenu from "../../Utility/dashboard_menu";
import { useParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";

const DashboardOperator = () => {
  TabTitle("Dashboard - ITERA Hero");
  const base_url = useSelector(selectUrl);
  const [dataApiDashboard, setDataApiDashboard] = useState(null);
  const [dataApiPenjadwalan, setDataApiPenjadwalan] = useState(null);
  const [firstFilter, setFirstFilter] = useState(null)
  const [filterData, setFilterData] = useState([])

  const [action, setAction] = useState(false);
  const headers = localStorage.getItem("token");

  useEffect(() => {
    if (firstFilter) {
      axios.get(base_url + "api/v1/" + firstFilter, {
        headers: {
          Authorization: "Bearer " + headers
        }
      })
        .then(response => {
          setFilterData(response.data.data)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }, [firstFilter])

  const getApiPenjadwalan = () => {
    axios
      .get(base_url + "api/v1/penjadwalan", {
        headers: {
          Authorization: `Bearer ${headers}`,
        },
      })
      .then((response) => {
        console.log("data yang di get :", response.data.data);
        setDataApiPenjadwalan(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getApiDashboard = async () => {
    axios
      .get(base_url + "api/v1/dashboard", {
        headers: {
          Authorization: `Bearer ${headers}`,
        },
      })
      .then((response) => {
        setDataApiDashboard(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getApiDashboard();
    getApiPenjadwalan();
  }, [action]);

  return (
    <>
      {dataApiDashboard === null ? (
        <Loading />
      ) : (
        <Flex flexDirection={"column"}>
          <Image
            width={"20%"}
            height={"auto"}
            src="https://res.cloudinary.com/diyu8lkwy/image/upload/v1663542541/itera%20herro%20icon/Frame_181_fmtxbh.png"
            alignSelf={"center"}
          />
          <Wrap mt={8} spacing={8} justify={"space-between"}>
            <CardDashboard
              data={{
                value: dataApiDashboard.greenhouse,
                icon: GiGreenhouse,
                name: "GreenHouse",
              }}
            />
            <CardDashboard
              data={{
                value: dataApiDashboard.tandonBahan,
                icon: MdMonitor,
                name: "Tandon Bahan",
              }}
            />
            <CardDashboard
              data={{
                value: dataApiDashboard.tandonPeracikan,
                icon: AiOutlineControl,
                name: "Tandon Peracikan",
              }}
            />
            <CardDashboard
              data={{
                value: dataApiDashboard.sensor,
                icon: AiOutlineControl,
                name: "Sensor",
              }}
            />
          </Wrap>
          <Flex my={8}>
            <Formik
              initialValues={{
                filter1: "",
                filter2: "",
              }}
              onSubmit={(values) => {
                alert(JSON.stringify(values.filter2));
              }}
            >
            {({ values, setFieldValue }) => (
              <Form>
                <Flex alignItems={"space-between"}>
                  <Select
                  size={"lg"}
                    name="filter1"
                    as={Select}
                    borderRadius={"10"}
                    placeholder="Pilih Filter"
                    width={"100%"}
                    bg={"white"}
                    _active={{ bg: "white" }}
                    borderColor={"var(--color-border)"}
                    fontSize={"var(--header-5)"}
                    fontWeight={"normal"}
                    color={"var(--color-primer)"}
                    _hover={{ borderColor: "var(--color-border)" }}
                    _focusWithin={{ borderColor: "var(--color-border)" }}
                    mr={10}
                    onChange={(e) => {
                        setFirstFilter(e.target.value)
                        setFieldValue("filter1", e.target.value)
                      }}
                  >
                    <option value="greenhouse">Greenhouse</option>
                    <option value="tandonUtama">Tandon</option>
                  </Select>
                  <Select
                    name="filter2"
                    as={Select}
                    borderRadius={"10"}
                    placeholder={values.filter1 ? 'Pilih ' + values.filter1 : '--'}
                    width={"100%"}
                    bg={"white"}
                    _active={{ bg: "white" }}
                    borderColor={"var(--color-border)"}
                    fontSize={"var(--header-5)"}
                    fontWeight={"normal"}
                    color={"var(--color-primer)"}
                    _hover={{ borderColor: "var(--color-border)" }}
                    _focusWithin={{ borderColor: "var(--color-border)" }}
                    onChange={(e) => setFieldValue("filter2", e.target.value)}
                  >
                    {filterData.map((item, index) => (
                      <option key={index} value={item}>
                        {item.nama}
                      </option>
                    ))}
                  </Select>
                </Flex>
                <Button type="submit" colorScheme="teal" disabled={ !values.filter1 || !values.filter2 } mt={4}>
                  Submit
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
export default DashboardOperator;
