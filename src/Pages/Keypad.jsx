import React, { useState } from 'react';
import KeypadComponent from '../Components/KeypadComponent.jsx';
import "../css/keypad.css"

const Keypad = () => {
  const [inputNumbers, setInputNumbers] = useState([]);

  const handleKeypadClick = (value) => {
    setInputNumbers((prevInputNumbers) => [...prevInputNumbers, value]);
  };

  const executeCall = () => {
    let phoneNumber = inputNumbers.join('')
    window.open("tel:" + phoneNumber);
  }

  const handleBackspaceClick = () => {
    setInputNumbers((prevInputNumbers) => {
      const updatedInputNumbers = [...prevInputNumbers];
      updatedInputNumbers.pop();
      return updatedInputNumbers;
    });
  };

  return (
    <div>
      <div className='display-numbers'>
        {inputNumbers.join(' ')}
      </div>
      <div className="keypad-component">
        <KeypadComponent onKeypadClick={handleKeypadClick} executeCall={executeCall} onBackspaceClick={handleBackspaceClick} />
      </div>
    </div>
  );
};

export default Keypad;
