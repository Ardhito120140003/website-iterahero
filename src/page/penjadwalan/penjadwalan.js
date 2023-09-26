import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { TabTitle } from "../../Utility/utility";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { greenhouseByUserId } from "../../Utility/api_link";
import { routePageName } from "../../redux/action";
import axios from "axios";
import CardFormPenjadwalan from "../../component/card_form_penjadwalan/card_form_penjadwalan";
import CardJadwal from "../../component/card_jadwal/card_jadwal";

const Penjadwalan = () => {
  TabTitle("Penjadwalan - ITERA Hero");

  const navigate = useNavigate();
  const [dataApi, setDataApi] = useState(null);
  const header = localStorage.getItem("token");

  const getApiGreenhouse = async () => {
    try {
      const response = await axios.get(greenhouseByUserId, {
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

  const [isOpen, setIsOpen] = useState(false);
  const [schedules, setSchedules] = useState([]);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  // Fungsi untuk menambahkan jadwal baru
  const addSchedule = (newSchedule) => {
    // Menambahkan jadwal baru ke state
    setSchedules([...schedules, newSchedule]);
  };

  // Fungsi untuk menghapus jadwal berdasarkan indeks
  const deleteSchedule = (index) => {
    const updatedSchedules = [...schedules];
    updatedSchedules.splice(index, 1); // Menghapus jadwal dari array
    setSchedules(updatedSchedules); // Memperbarui state
    onClose(); // Menutup modal setelah menghapus
  };

  return (
    <>
      <Flex flexDirection={'row'} width={"100%"} height={'100%'} gap={"20px"}>
        <CardFormPenjadwalan addSchedule={addSchedule} />
        <CardJadwal schedules={schedules} deleteSchedule={deleteSchedule} />
      </Flex>
    </>
  );
};

export default Penjadwalan;
