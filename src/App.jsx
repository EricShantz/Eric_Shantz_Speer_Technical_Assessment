import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CallHistory from './Pages/CallHistory.jsx';
import Keypad from './Pages/Keypad.jsx';
import ArchivedCalls from './Pages/ArchivedCalls.jsx';
import TabBar from './Components/TabBar.jsx';
import { ToastContainer } from 'react-toastify';
import { ContextProvider } from './Utils/Context.js';
import {UseAppContext} from "./Utils/Context"
import HourglassEmptySharpIcon from '@mui/icons-material/HourglassEmptySharp';
import 'react-toastify/dist/ReactToastify.css';
import "./css/app.css"

const App = () => {
  const [currentPage, setCurrentPage] = useState('CallHistory');
  const {isLoading} = UseAppContext()

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
            width: '80%',
          }} />
        </div>
        <TabBar currentTab={currentPage} setCurrentTab={setCurrentPage} />
        
        {isLoading && 
          <div className='loading-overlay'>
            <div className='icon-circle'>
              <HourglassEmptySharpIcon className='loading-icon'/>
            </div>
            <p className='loading-text'>Loading ...</p>
          </div>
        }
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider> 
      <App /> 
    </ContextProvider>
  </React.StrictMode>
,
document.getElementById('app'));

export default App;
