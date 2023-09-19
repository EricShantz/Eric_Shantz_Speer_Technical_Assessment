import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CallHistory from './Pages/CallHistory.jsx';
import Keypad from './Pages/Keypad.jsx';
import ArchivedCalls from './Pages/ArchivedCalls.jsx';
import TabBar from './Components/TabBar.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./css/app.css"


const App = () => {
  const [currentPage, setCurrentPage] = useState('CallHistory');

  return (
    <div className='container'>
      <div className="container-view">

      
        {currentPage === "CallHistory" && 
          <CallHistory />
        }
        {currentPage === "ArchivedCalls" && 
          <ArchivedCalls />
        }
        {currentPage === "Keypad" && 
          <Keypad />
        }
        <div className='toast-container'>
          <ToastContainer style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '80%', // You can adjust the width as needed
          }} />
        </div>
        <TabBar currentTab={currentPage} setCurrentTab={setCurrentPage} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
