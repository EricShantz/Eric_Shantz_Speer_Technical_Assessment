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
      <div className='outgoing-call-title'>
        <p>
          Outgoing Call
        </p>
      </div>
      <div className='display-numbers'>
        ({inputNumbers[0] || ' _'}{inputNumbers[1] || '_'}{inputNumbers[2] || '_ '}) - {inputNumbers[3] || '_'}{inputNumbers[4] || '_'}{inputNumbers[5] || '_'} - {inputNumbers[6] || '_'}{inputNumbers[7] || '_'}{inputNumbers[8] || '_'}{inputNumbers[9] || '_'}
      </div>
      <div className="keypad-component">
        <KeypadComponent onKeypadClick={handleKeypadClick} executeCall={executeCall} onBackspaceClick={handleBackspaceClick} />
      </div>
    </div>
  );
  
  
};

export default Keypad;
