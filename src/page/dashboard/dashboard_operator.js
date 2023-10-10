import React, { useState, useEffect } from "react";
import { Flex, Text, Box, CircularProgress, Grid, GridItem, Center, Wrap} from "@chakra-ui/react";
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
import { AiOutlineControl, } from "react-icons/ai";
import { GiGreenhouse } from "react-icons/gi";
import { MdMonitor } from "react-icons/md";
import CardDashboard from "../../component/card_dashboard/card_dashboard";

const DashboardOperator = () => {
  TabTitle("Dashboard - ITERA Hero");
  const base_url = useSelector(selectUrl);
  const [dataApiPenjadwalan, setDataApiPenjadwalan] = useState(null);
  const [dataApiPeracikan, setDataApiPeracikan] = useState(null);
  const [dataApiDashboard, setDataApiDashboard] = useState(null);

  const [action, setAction] = useState(false);
  const headers = localStorage.getItem("token")

  const getApiPenjadwalan = () => {
    axios.get(base_url + "api/v1/penjadwalan", {
      headers: {
        Authorization: `Bearer ${headers}`
      }
    })
      .then(response => {
        console.log('data yang di get :', response.data.data)
        setDataApiPenjadwalan(response.data.data)
      })
      .catch(err => {
        console.error(err)
      })

  }

  const handleDelete = (id) => {
    axios.delete(base_url + "api/v1/penjadwalan", {
      params: { id },
      headers: {
        Authorization: `Bearer ${headers}`
      }
    })
      .then(response => {
        console.log(response)
        setAction(!action);
      })
      .catch(err => {
        console.error(err);
      })
  }

  const getApiPeracikan = async () => {
    await axios
      .get(base_url + "api/v1/tandonUtama", {
        headers: {
          Authorization: `Bearer ${headers}`
        },
        params: {
          id: 1,
        }
      })
      .then(response => {
        console.log('data tandon utma :', response.data.data)
        setDataApiPeracikan(response.data.data)
      })
      .catch((error) => {
        console.log("error : ", error)
      });
  };

  const getApiDashboard = async ()=> {
    axios.get(base_url + "api/v1/dashboard", {
      headers: {
        Authorization: `Bearer ${headers}`
      }
    })
    .then(response =>{
      setDataApiDashboard(response.data.data)
      console.log(response.data.data)
    })
    .catch((error) => {
      console.log('error',error)
    })
  }

  useEffect(() => {
    getApiDashboard()
    getApiPenjadwalan()
    getApiPeracikan()
  }, [action])

  return (
    <>
      {/* <Grid
        h='100%'
        templateRows='repeat(10, 1fr)'
        templateColumns='repeat(13, 1fr)'
        gap={4}
      >
        <GridItem rowSpan={10} colSpan={4} bg='tomato' />
        <GridItem rowSpan={4} colSpan={9} bg='tomato' />
        <GridItem rowSpan={2} colSpan={3} bg='tomato' />
        <GridItem rowSpan={2} colSpan={3} bg='tomato' />
        <GridItem rowSpan={2} colSpan={3} bg='tomato' />
        <GridItem rowSpan={2} colSpan={3} bg='tomato' />
        <GridItem rowSpan={2} colSpan={3} bg='tomato' />
        <GridItem rowSpan={2} colSpan={3} bg='tomato' />
        <GridItem rowSpan={2} colSpan={9} bg='tomato' />
      </Grid> */}

      {/* {dataApiPeracikan === null ? (
        <Loading />
      ) : (
        < Flex gap={'20px'} flexDirection={'column'}>

            <CardStatusPeracikanDasboard
              id={dataApiPeracikan.id}
              isOnline={dataApiPeracikan.isOnline}
              sensor={dataApiPeracikan.sensor}
              status={dataApiPeracikan.status}
            />
      
              <ValueTandon tandonBahan={dataApiPeracikan.tandonBahan} />

          <Flex gap={'20px'}>
            <CardJadwal jadwal={dataApiPenjadwalan} deleteHandler={handleDelete} />
          </Flex>
        </Flex>

      )} */}

      {dataApiPeracikan === null ? (
        <Loading />
      ) : (
        <Flex>
          <Flex justify="center" mt={"-30px"}>
            <Wrap spacing={{ base: "5px", md: "50px" }} justify="center">
              <CardDashboard
                data={{
                  value: dataApiDashboard.greenhouse,
                  icon: GiGreenhouse,
                  name: "Jumlah GreenHouse",
                }}
              />
              <CardDashboard
                data={{
                  value: dataApiDashboard.tandonBahan,
                  icon: MdMonitor,
                  name: "Jumlah Tandon Bahan",
                }}
              />
              <CardDashboard
                data={{
                  value: dataApiDashboard.selenoid,
                  icon: AiOutlineControl,
                  name: "Jumlah Selenoid",
                }}
              />
              <CardDashboard
                data={{
                  value: dataApiDashboard.tandonPeracikan,
                  icon: AiOutlineControl,
                  name: "Jumlah Tandon Peracikan",
                }}
              />
              <CardDashboard
                data={{
                  value: dataApiDashboard.sensor,
                  icon: AiOutlineControl,
                  name: "Jumlah Sensor",
                }}
              />
            </Wrap>
          </Flex>
        </Flex>
      )}

    </>
  );
};
export default DashboardOperator;
