import { Flex, Text } from '@chakra-ui/layout';
import React from 'react';

function CustomCheckbox({ label, onSelect, isChecked, value }) {
  const handleCheckboxChange = () => {
    onSelect(value);
  };

  return (
    <Flex>
      <Text
        h="30px"
        w={"10vh"}
        px={"2px"}
        pt={"5px"}
        fontSize="13px"
        fontWeight="bold"
        cursor="pointer"
        backgroundColor={isChecked ? '#09322D' : 'transparent'}
        color={isChecked ? 'white' : 'gray'}
        border={isChecked ? '1px solid #09322D' : '1px solid gray'}
        borderRadius="5px"
        flex={1} // Take full available space
        justifyContent="center"
        alignContent="center"
        onClick={handleCheckboxChange}
      >
        {label}
      </Text>
    </Flex>
  );
}

export default CustomCheckbox;
