import Lottie from 'react-lottie-player';
import { Flex } from '@chakra-ui/react';
import data from '../../assets/loading.json';

function Loading() {
  return (
    <Flex w="100%" h="100%" justifyContent="center" alignItems="center">

      <Lottie
        loop
        animationData={data}
        play
        style={{ width: 150, height: 150 }}
      />
    </Flex>
  );
}
export default Loading;
