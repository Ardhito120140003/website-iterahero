import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { TabTitle } from "../../Utility/utility";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { greenhouseByUserId } from "../../Utility/api_link";
import { routePageName } from "../../redux/action";
import CardFormPenjadwalan from "../../component/card_form_penjadwalan/card_form_penjadwalan";
import CardJadwal from "../../component/card_jadwal/card_jadwal";
import { selectUrl } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";


const Penjadwalan = () => {
  TabTitle("Penjadwalan - ITERA Hero");
  const navigate = useNavigate();
  const base_url = useSelector(selectUrl);
  const [dataApi, setDataApi] = useState(null);
  const header = localStorage.getItem("token");

  const getApiGreenhouse = async () => {
    try {
      const response = await axios.get(base_url + greenhouseByUserId, {
        headers: {
          Authorization: "Bearer " + header,
        },
      });
      setDataApi(response.data.data);
      console.log(dataApi);
    } catch (error) {
      localStorage.clear();
      navigate("/login");
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    getApiGreenhouse();
    return () => {
      dispatch(routePageName("Penjadwalan"));
    };
  }, []);

  return (
    <>
      <Flex flexDirection={'row'} width={"100%"} height={'100%'} gap={"20px"}>
        <CardFormPenjadwalan/>
        <CardJadwal/>
      </Flex>
    </>
  );
};

export default Penjadwalan;