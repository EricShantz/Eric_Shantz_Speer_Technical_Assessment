import React, { useEffect, useState } from 'react';
import { GetCallHistory } from '../APIs/ApplicationAPIS';
import GenerateListItems from '../Components/GenerateCallsList';
import CallDetailsModal from "../Components/CallDetailsModal.jsx"
import Header from "../Components/Header.jsx"
import Button from '@mui/material/Button';
import '../css/list-items.css';
import { RestoreAll } from "../APIs/ApplicationAPIS";



const ArchivedCalls = () => {
    const [listItems, setListItems] = useState([]); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reloadContent, setReloadContent] = useState(false);
    const [allCallDetails, setAllCallDetails] = useState(null);
    const [selectedCallDetails, setSelectedCallDetails] = useState(null);

    const handleRestoreAllClick = (listItems) =>{
        RestoreAll(allCallDetails)
        .finally(()=>{
          setReloadContent(true)
        })

    }

  const toggleModal = (callDetails) => {
    setSelectedCallDetails(callDetails);
    setIsModalOpen(!isModalOpen);
  }

    useEffect(() => {
        GetCallHistory()
          .then((data) => {
            const items = GenerateListItems(data, toggleModal, false);
            setAllCallDetails(data)
            setListItems(items);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }, [isModalOpen, reloadContent]);

    return(
        <div className='list-items'>
            <Header className={"header"}/>

            <div className='button-container'>
              <Button variant="outlined" className="archive-all-button" onClick={handleRestoreAllClick}> Restore All Records</Button>
            </div>

            {listItems}

            {isModalOpen &&       
                <div className="modal-overlay modal-open" onClick={() => setIsModalOpen(false)}></div>
            }
            {isModalOpen &&       
                <CallDetailsModal callDetails={selectedCallDetails} toggleModal={toggleModal} />
            }

        </div>
    )
}

export default ArchivedCalls;
