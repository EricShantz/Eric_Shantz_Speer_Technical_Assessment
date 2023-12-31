import React, { useEffect, useState, useCallback  } from 'react';
import { GetCallHistory } from '../APIs/ApplicationAPIS';
import GenerateListItems from '../Utils/GenerateCallsList';
import CallDetailsModal from "../Components/CallDetailsModal.jsx"
import Header from "../Components/Header.jsx"
import Button from '@mui/material/Button';
import '../css/list-items.css';
import { RestoreAll } from "../APIs/ApplicationAPIS";
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import { RestoreFailed, RestoreSuccessful, RestoreAllFailed, RestoreAllSuccessful } from '../Utils/ToastMessages';
import { UseAppContext } from '../Utils/Context';


const ArchivedCalls = () => {
    const {toggleLoader} = UseAppContext()
    const [listItems, setListItems] = useState([]); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reloadContent, setReloadContent] = useState(false);
    const [allCallDetails, setAllCallDetails] = useState(null);
    const [selectedCallDetails, setSelectedCallDetails] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isDataFetched, setIsDataFetched] = useState(false);


    const handleRestoreAllClick = (listItems) =>{
      toggleLoader()
        RestoreAll(allCallDetails)
        .then(()=>{
          RestoreAllSuccessful()
        }).catch((err)=>{
          console.error(err)
          RestoreAllFailed()
        })
        .finally(()=>{
          setTimeout(()=>{
            toggleLoader()
            setReloadContent(!reloadContent);
          }, 500)        })

    }

    const toggleModal = useCallback((callDetails) => {
      setSelectedCallDetails(callDetails);
      setIsModalOpen(!isModalOpen);
    }, [isModalOpen]);
    
    useEffect(() => {
      GetCallHistory()
        .then((data) => {
          const items = GenerateListItems(data, toggleModal, false);
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
      <Header className={"header"} />

     

      {isDataFetched ? (
        listItems.length > 0 ? (
          <>
           <div className='button-container'>
            <Button variant="outlined" className="archive-all-button" onClick={handleRestoreAllClick}> Restore All Records</Button>
          </div>
            {listItems}

            {isModalOpen && (
              <div className="modal-overlay modal-open" onClick={() => setIsModalOpen(false)}></div>
            )}

            {isModalOpen && (
              <CallDetailsModal
                callDetails={selectedCallDetails}
                toggleModal={toggleModal}
                restoreSucess={RestoreSuccessful}
                restoreFail={RestoreFailed}
              />
            )}
          </>
        ) : (
          <div className='no-calls-div'>
            <CheckCircleOutlineSharpIcon className='check-icon' />
            <p>No archived calls</p>
          </div>
        )
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ArchivedCalls;
