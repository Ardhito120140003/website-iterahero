import { Flex } from '@chakra-ui/layout';
import React from 'react';

function CustomCheckbox({ label, onSelect, isChecked, value }) {

  const handleCheckboxChange = () => {
    onSelect(value);
  };

  return (
    <Flex>
      <label
      style={{
        width: '65px',
        height: '30px',
        fontSize: "13px",
        fontWeight: 'bold',
        cursor: 'pointer',
        backgroundColor: isChecked ? '#09322D' : 'transparent',
        color: isChecked ? 'white' : 'gray',
        border: isChecked ? '1px solid #09322D' : '1px solid gray',
        borderRadius:"5px",
        display: 'flex', // Use display: flex
        justifyContent: 'center', // To center the content horizontally
        alignItems: 'center', // To center the content vertically
      }}
      onClick={handleCheckboxChange}
    >
      {label}
    </label>
    </Flex>
  );
}

export default CustomCheckbox;
