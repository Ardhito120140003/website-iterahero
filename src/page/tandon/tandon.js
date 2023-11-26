import React, { useState, useEffect } from "react";
import { Flex, Text, Button, Wrap } from "@chakra-ui/react";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CardTandon from "../../component/card_tandon/card_tandon";
import { routePageName, selectUrl } from "../../features/auth/authSlice";
import { TabTitle } from "../../Utility/utility";

import Loading from "../../component/loading/loading";

function Tandon() {
  TabTitle("Tandon - ITERA Hero");

  const base_url = useSelector(selectUrl);
  const dispatch = useDispatch();

  const [dataApi, setDataApi] = useState(null);

  const header = localStorage.getItem("token");

  const getListTandon = async () => {
    await axios
      .get(`${base_url}api/v1/tandonUtama`, {
        headers: {
          Authorization: `Bearer ${header}`,
        },
      })
      .then((response) => {
        setDataApi(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        // localStorage.clear()
        // dispatch(logout())
        // navigate('/login')
      });
  };

  useEffect(() => {
    dispatch(routePageName("Tandon"));
    getListTandon();
  }, []);

  return (
    <>
      {dataApi == null ? (
        <Loading />
      ) : (
        <Flex w="100%" flexDir="column">
          <Flex
            w="100%"
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="40px"
          >
            <Text
              fontWeight="semibold"
              fontSize="var(--header-3)"
              color="var(--color-primer)"
            >
              List Tandon
            </Text>

            <Link to="/unit/tandon/add">
              <Button bg="#14453E" size="sm" colorScheme="teal">
                Tambah
              </Button>
            </Link>
          </Flex>
          <Wrap>
            {dataApi.map((placement) => (
              <CardTandon
                key={placement.id}
                data={{
                  created_at: placement.created_at,
                  id: placement.id,
                  image: placement.image,
                  title: placement.nama,
                  location: placement.location,
                  updated_at: placement.updated_at,
                }}
              />
            ))}
          </Wrap>
        </Flex>
      )}
    </>
  );
}
export default Tandon;
