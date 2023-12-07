import React, { useState, useEffect } from 'react';
import { Text, Flex, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loading from '../loading/loading';
import { selectToken } from '../../features/auth/authSlice';
import { downloadSummary, summary } from '../../Utility/api_link';
import { selectUrl } from '../../features/auth/authSlice';

function SummaryComponent(props) {
  const base_url = useSelector(selectUrl);
  const { id } = props.data;
  const { value } = props.data;
  const { name } = props.data;
  const [isLoading, setIsLoading] = useState(true);
    const header = useSelector(selectToken)
    const [dataSensor, setDataSensor] = useState([]);

  const exportData = (data, fileName, type) => {
    // Create a link and download the file
    const blob = new Blob([data], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getSummary = async () => {
    await axios
      .get(`${base_url}` + "api/v1/summary", {
        params: {
          id,
          timespan: value
        },
        headers: {
          Authorization: `Bearer ${header}`,
        },
      })
      .then(({ data }) => {
        console.log(data)
        setDataSensor(data.data);
      })
      .finally(() => setIsLoading(false))
  };

  const DownloadSummary = async () => {
    setIsLoading(true);
    await axios
      .get(`${base_url}` + "api/v1/download/summary", {
        params: {
          id,
          timespan: value,
        },
        headers: {
          Authorization: `Bearer ${header}`,
        },
      })
      .then(({ data }) => {
        exportData(JSON.stringify(data), `Datasheet ${name.name}.json`, 'application/json');
      })
      .catch(({ response }) => {
        console.log(response)
        alert(response.data.message ?? 'Data Gagal di Download Karena masih kosong');
      })
      .finally(() => setIsLoading(false))
  };
  useEffect(() => {
    getSummary();
  }, [id, value]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Flex direction="column" alignItems="start" marginTop="10px">
          <Flex
            alignItems="center"
            justifyContent="space-between"
            w="100%"
          >
            <Text fontSize="25px" fontWeight="bold" marginBottom="10px">
              Summary
            </Text>
            <Button
              onClick={DownloadSummary}
              backgroundColor="var(--color-primer)"
            >
              Download CSV
            </Button>
          </Flex>

          <Text color="black">
            Maksismum :
            {dataSensor.max}
          </Text>
          <Text color="black">
            Minimum :
            {dataSensor.min}
          </Text>
          <Text color="black">
            Rata-Rata :
            {' '}
            {Math.floor(dataSensor.average * 100) / 100}
          </Text>

          <Text>
            Kondisi :

            <Text
              color={
                  dataSensor.conditionType == 1
                    ? 'var(--color-secondary-variant)'
                    : 'var(--color-error)'
                }
            >
              {dataSensor.condition}
            </Text>
          </Text>
        </Flex>
      )}
    </>
  );
}
export default SummaryComponent;
