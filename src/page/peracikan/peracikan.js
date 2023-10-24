import React, { useState, useEffect } from "react";
import {
  Flex,
  // Grid,
  // GridItem,
  Select,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { TabTitle } from "../../Utility/utility";
import CardFormPeracikan from "../../component/card_form_peracikan/card_form_peracikan";
import CardStatusPeracikan from "../../component/card_tandon_peracikan/card_tandon_peracikan";
import { Formik, Form } from "formik";
import { selectUrl, routePageName } from "../../features/auth/authSlice";
import "./peracikan.css";
import Loading from "../../component/loading/loading";

function Peracikan() {
  TabTitle("Peracikan - ITERA Hero");
  const base_url = useSelector(selectUrl);
  const dispatch = useDispatch();
  const [dataTandon, setDataTandon] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const headers = localStorage.getItem("token");

  const getTandon = async () => {
    try {
      const response = await axios.get(`${base_url}api/v1/tandonUtama`, {
        headers: {
          Authorization: `Bearer ${headers}`,
        },
      });
      if (response.data.data.length > 0) {
        setDataTandon(response.data.data);
        getInfo(response.data.data[0].id)
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false)
    }
  };

  const getInfo = async (target) => {
    try {
      const response = await axios.get(
        base_url + `api/v1/tandonUtama/${target}/sensor`,
        {
          headers: {
            Authorization: "Bearer " + headers,
          },
        }
      );
      console.log(response.data.data)
      setData(response.data.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTandon()
    dispatch(routePageName("Peracikan"));
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Flex flexDirection={'column'}>
          <Formik
            initialValues={{
              tandon: 0,
            }}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <Select
                  name="filter2"
                  as={Select}
                  borderRadius={"10"}
                  width={"100%"}
                  height={"5vh"}
                  bg={"white"}
                  _active={{ bg: "white" }}
                  borderColor={"var(--color-border)"}
                  fontSize={"var(--header-5)"}
                  fontWeight={"normal"}
                  color={"var(--color-primer)"}
                  _hover={{ borderColor: "var(--color-border)" }}
                  _focusWithin={{ borderColor: "var(--color-border)" }}
                  value={values.tandon}
                  // placeholder="--Pilih Tandon Peracikan--"
                  onChange={e => {
                    setFieldValue("tandon", e.target.value);
                    if (e.target.value) getInfo(e.target.value)
                  }}
                >
                  {dataTandon.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.nama}
                    </option>
                  ))}
                </Select>
              </Form>
            )}
          </Formik>

          <Flex gap={5} mt={"20px"} w={'100%'}
          direction={{ sm: 'column-reverse', md: 'row', lg: 'row', xl: 'row', "2xl": 'row' }}
          >
     
              {/* <ValueTandon tandonBahan={data.tandonBahan} /> */}
              <Flex
                flexDirection="column"
                border="1px solid #E2E8F0"
                borderRadius={"10px"}
                p={"30px"}
                h={"100%"}
                // w={'50%'}
                w={{ sm: '100%', md: "50%", lg: "50%", xl: '50%', "2xl": "50%" }}

              >
                <Text mb={"20px"}>Form Peracikan</Text>
                <CardFormPeracikan />
              </Flex>


              <Flex
              //  w={'50%'}
              w={{ sm: '100%', md: "50%", lg: "50%", xl: '50%', "2xl": "50%" }}
               >
                {data.sensor && (
                  <CardStatusPeracikan
                    isOnline={dataTandon[0].isOnline}
                    sensor={data.sensor}
                    status={dataTandon[0].status}
                  />
                )}
              </Flex>
        
            </Flex>
        </Flex>


      )}
    </>
  );
}
export default Peracikan;
