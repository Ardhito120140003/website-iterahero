import React, { useState } from 'react';

function CustomCheckbox({ label, onSelect, value }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onSelect(value);
  };

  return (
    <label
      style={{
        display: 'inline-block',
        padding: '5px 10px',
        fontSize: "13px",
        fontWeight: 'bold',
        cursor: 'pointer',
        backgroundColor: isChecked ? '#09322D' : 'transparent',
        color: isChecked ? 'white' : 'gray',
        border: isChecked ? '1px solid #09322D' : '1px solid gray',
        borderRadius:"10px",
        marginRight: "5px"
      }}
      onClick={handleCheckboxChange}
    >
      {label}
    </label>
  );
}

export default CustomCheckbox;
