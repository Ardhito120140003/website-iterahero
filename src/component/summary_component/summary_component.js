import React, { useState, useEffect } from "react";
import { downloadSummary, summary } from "../../Utility/api_link";
import { Text, Flex, Button } from "@chakra-ui/react";
import axios from "axios";
import Papa from "papaparse";
import Loading from "../../component/loading/loading";

const SummaryComponent = (props) => {
  const id = props.data.id;
  const value = props.data.value;
  const name = props.data.name;
  const [isLoading, setIsLoading] = useState(false);
  const [dataSensor, setDataSensor] = useState([]);

  const exportData = (data, fileName, type) => {
    // Create a link and download the file
    const blob = new Blob([data], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getSummary = async () => {
    const header = localStorage.getItem("token");
    await axios
      .get(`${summary}/${id}?getDateQuery=${value}`, {
        headers: {
          Authorization: "Bearer " + header,
        },
      })
      .then((response) => {
        setDataSensor(response.data.data);
      });
  };

  const DownloadSummary = async () => {
    setIsLoading(true);
    const header = localStorage.getItem("token");
    await axios
      .get(`${downloadSummary}/${id}?getDateQuery=${value}`, {
        headers: {
          Authorization: "Bearer " + header,
        },
      })
      .then((response) => {
        const jsonData = JSON.stringify(response.data);
        exportData(jsonData, `datasheet ${name}.json`, "application/json");
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        alert("Data Gagal di Download Karena masih kosong");
      });
  };
  useEffect(() => {
    getSummary();
  }, [id, value]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Flex direction={"column"} alignItems={"start"} marginTop={"10px"}>
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              w={"100%"}
            >
              <Text fontSize="25px" fontWeight="bold" marginBottom={"10px"}>
                Summary
              </Text>
              <Button
                onClick={DownloadSummary}
                backgroundColor={"var(--color-primer)"}
              >
                Download CSV
              </Button>
            </Flex>

            <Text color={"black"}>Maksismum : {dataSensor.max} </Text>
            <Text color={"black"}>Minimum : {dataSensor.min}</Text>
            <Text color={"black"}>
              Rata-Rata : {Math.floor(dataSensor.average * 100) / 100}
            </Text>

            <Text>
              Kondisi :{""}
              <Text
                color={
                  dataSensor.conditionType == 1
                    ? "var(--color-secondary-variant)"
                    : "var(--color-error)"
                }
              >
                {dataSensor.condition}
              </Text>
            </Text>
          </Flex>
        </>
      )}
    </>
  );
};
export default SummaryComponent;
