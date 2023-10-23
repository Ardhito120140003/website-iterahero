import { Flex, Image, Text, Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TabTitle } from "../../Utility/utility";
import Loading from "../../component/loading/loading";
import { GiGreenhouse } from "react-icons/gi";
import "./dashboard_operator.css";
import {
  routePageName,
  selectToken,
  selectUrl,
  selectUser,
} from "../../features/auth/authSlice";
import CardDashboard from "../../component/card_dashboard/card_dashboard";

function DashboardOperator() {
  const id = parseInt(useParams().id);
  TabTitle("Dashboard - ITERA Hero");
  const dispatch = useDispatch();
  const base_url = useSelector(selectUrl);
  const role = useSelector(selectUser);
  const token = useSelector(selectToken);
  const [dataDashboard, setDataDashboard] = useState([]);
  const [dataPenjadwalan, setDataPenjadwalan] = useState([]);
  const [loading, setLoading] = useState(false);

  const getApiDashboard = async () => {
    setLoading(true);
    await axios
      .get(base_url + "api/v1/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = [];
        for (const item in response.data.data) {
          const obj = {};
          obj[item] = response.data.data[item];
          data.push(obj);
        }
        setDataDashboard(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchPenjadwalan = async () => {
    setLoading(true);
    axios
      .get(base_url + "api/v1/penjadwalan", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDataPenjadwalan(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    dispatch(routePageName("Dashboard"));
    getApiDashboard();
    fetchPenjadwalan();
  }, []);

  return (
    <>
      <Flex flexDirection={"column"}>
        <Image
          width={"20%"}
          height={"auto"}
          src="https://res.cloudinary.com/diyu8lkwy/image/upload/v1663542541/itera%20herro%20icon/Frame_181_fmtxbh.png"
          alignSelf={"center"}
        />
        <Box id="header">
          <Flex h={"200px"} py={8}>
            <Flex
              flexDir={"column"}
              borderRadius={20}
              border={"3px solid #D9D9D9"}
              flex={1}
              justifyContent={"center"}
              alignItems={"flex-end"}
            >
              <Text>Hello, {role}</Text>
              <Text>Selamat datang di website ITERAHERO2023</Text>
            </Flex>
            <Flex flex={2}>
              {dataPenjadwalan.length < 1 && loading ? (
                <Loading />
              ) : (
                dataPenjadwalan.map((item, index) => (
                  <Text key={index}>{JSON.stringify(item)}</Text>
                ))
              )}
            </Flex>
          </Flex>
        </Box>
        <Flex overflowX={"auto"}>
          {dataDashboard.map((item, index) => (
            <CardDashboard
              data={{
                value: Object.values(item),
                icon: GiGreenhouse,
                name: Object.keys(item),
              }}
              key={index}
            />
          ))}
        </Flex>
      </Flex>
      {/* )} */}
    </>
  );
}
export default DashboardOperator;
