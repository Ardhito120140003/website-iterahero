import React, { useState } from 'react';

const CustomCheckbox = ({ label, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <label
      style={{
        display: 'inline-block',
        padding: '5px 10px',
        fontSize: '13px',
        cursor: 'pointer',
        backgroundColor: isChecked ? '#09322D' : 'transparent',
        color: isChecked ? 'white' : 'gray',
        borderRadius: '10px',
        border: isChecked ?'1px solid #09322D' : '1px solid gray',
      }}
      onClick={handleCheckboxChange}
    >
      {label}
    </label>
  );
};

export default CustomCheckbox;
