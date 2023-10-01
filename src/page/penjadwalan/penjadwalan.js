import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { TabTitle } from "../../Utility/utility";
import CardFormPenjadwalan from "../../component/card_form_penjadwalan/card_form_penjadwalan";
import CardJadwal from "../../component/card_jadwal/card_jadwal";
import { selectUrl } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import Loading from "../../component/loading/loading";

const Penjadwalan = () => {
  TabTitle("Penjadwalan - ITERA Hero");
  const base_url = useSelector(selectUrl);
  const [data, setData] = useState(null);
  const [action, setAction] = useState(false);
  const headers = localStorage.getItem("token")

  useEffect(() => {
    axios.get(base_url + "api/v1/penjadwalan", {
      headers: {
        Authorization: `Bearer ${headers}`
      }
    })
      .then(response => {
        console.log(response.data.data)
        setData(response.data.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [action])

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

  return (
    <>
      {data === null ? (
        <Loading />
      ) : (
        <Flex flexDirection={'row'} width={"100%"} height={'100%'} gap={"20px"}>
          <CardFormPenjadwalan updateAction={() => setAction(!action)} />
          <CardJadwal jadwal={data} deleteHandler={handleDelete} />
        </Flex>
      )}

    </>
  );
};

export default Penjadwalan;