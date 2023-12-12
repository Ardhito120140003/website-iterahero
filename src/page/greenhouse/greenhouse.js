import React, { useState, useEffect } from "react";
import { Flex, Text, Button, Wrap } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CardGreenhouse from "../../component/card_greenhouse/card_green";
import { routePageName, selectUrl } from "../../features/auth/authSlice";
import { TabTitle } from "../../Utility/utility";

import Loading from "../../component/loading/loading";

function GreenHouse() {
  TabTitle("Greenhouse - ITERA Hero");

  const base_url = useSelector(selectUrl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dataApi, setDataApi] = useState(null);

  const header = localStorage.getItem("token");

  const getListGreenhouse = async () => {
    await axios
      .get(`${base_url}api/v1/greenhouse`, {
        headers: {
          Authorization: `Bearer ${header}`,
        },
      })
      .then((response) => {
        setDataApi(response.data.data);
        // console.log(response.data.data);
      })
      .catch((error) => {
        // localStorage.clear()
        // dispatch(logout())
        // navigate('/login')
      });
  };

  useEffect(() => {
    dispatch(routePageName("Greenhouse"));
    getListGreenhouse();
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
              List Greenhouse
            </Text>

            <Link to="/unit/greenhouse/add">
              <Button bg="#14453E" size="sm" colorScheme="teal">
                Tambah
              </Button>
            </Link>
          </Flex>
          <Wrap>
            {dataApi.map((placement) => (
              //  <Link to={`/unit/greenhouse/detail/${placement.id}`} key={placement.id}>
                <CardGreenhouse
                key={placement.id}
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
              //  </Link>
            ))}
          </Wrap>
        </Flex>
      )}
    </>
  );
}
export default GreenHouse;
