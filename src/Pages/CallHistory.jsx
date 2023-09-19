import React, { useEffect, useState, useCallback } from 'react';
import { GetCallHistory, ArchiveAll } from '../APIs/ApplicationAPIS';
import GenerateListItems from '../Utils/GenerateCallsList';
import CallDetailsModal from "../Components/CallDetailsModal.jsx"
import { ArchiveSuccessful, ArchiveFailed, BadData, ArchiveAllFailed, ArchiveAllSuccessful } from '../Utils/ToastMessages';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import Header from "../Components/Header.jsx"
import Button from '@mui/material/Button';

import '../css/list-items.css';
import { UseAppContext } from '../Utils/Context';


const CallHistory = () => {
  const {toggleLoader} = UseAppContext()
  const [listItems, setListItems] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reloadContent, setReloadContent] = useState(false);
  const [allCallDetails, setAllCallDetails] = useState(null);
  const [selectedCallDetails, setSelectedCallDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);


  const toggleModal = useCallback((callDetails) => {
    setSelectedCallDetails(callDetails);
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const handleArchiveAllClick = () => {
    toggleLoader()
    ArchiveAll(allCallDetails)
      .then(() => {
        ArchiveAllSuccessful()
      })
      .catch((err) => {
        console.error(err)
        ArchiveAllFailed();
      })
      .finally(() => {
        toggleLoader()
        setReloadContent(!reloadContent);
      });
  }

  useEffect(() => {
    GetCallHistory()
      .then((data) => {
        const items = GenerateListItems(data, toggleModal, true);
        setAllCallDetails(data)
        setListItems(items);
        setIsDataFetched(true)
      })
      .catch(error => {
        if(error.message.includes("Failed to fetch")){
          console.log("Trying again")
          setIsFetching(!isFetching)
        }
      });
}, [isModalOpen, reloadContent, toggleModal, isFetching]);


  return (
    
    <div className='list-items'>
      <Header className={"header"}/>

    <div className='button-container'>
      <Button variant="outlined" className="archive-all-button" onClick={handleArchiveAllClick}>Archive All Records</Button>
    </div>
    {isDataFetched ? (
        listItems.length > 0 ? (
          <>
          {listItems}

          {isModalOpen &&       
            <div className="modal-overlay" onClick={() => setIsModalOpen(false)}></div>
          }
          {isModalOpen &&       
            <CallDetailsModal callDetails={selectedCallDetails} toggleModal={toggleModal} archiveSuccess={ArchiveSuccessful} archiveFail={ArchiveFailed} badData={BadData} />
          }
        </>
      ) : (
        <div className='no-calls-div'>
          <CheckCircleOutlineSharpIcon  className='check-icon'/>
          <p>No call history</p>
          </div>
          )
          ) : (
            <div></div>
          )}
        </div>
      );
};

export default CallHistory;
