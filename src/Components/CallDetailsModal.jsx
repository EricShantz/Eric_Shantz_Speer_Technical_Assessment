import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import '../css/call-details-modal.css';
import { format } from 'date-fns';
import Button from '@mui/material/Button';
import { ArchiveOne, RestoreOne } from "../APIs/ApplicationAPIS";

const CallDetailsModal = ({callDetails, toggleModal}) => {

  if (!callDetails) {
    return null;
  }

  const formatDateTime = (dateTimeString) =>{
    return format(new Date(dateTimeString),  "dd MMMM yyyy  HH:mm");
  }

  const formatDuration = (duration) =>{
    const hours = Math.floor(duration / 3600);
    const remainingSeconds = duration % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = Math.round(remainingSeconds % 60);

  return  `${hours > 0 ? hours + 'h ' : ''}${minutes}m ${seconds}s`;
  }

  const handleArchiveClick = () =>{
    ArchiveOne(callDetails)
    .then(()=>{
      //check if success
      //show toast
    }).then(()=>{
      toggleModal()
    })
    .catch((error)=>{
      console.error('Error:', error);
    })
  }

  const handleRestoreClick = () =>{
    RestoreOne(callDetails)
    .then(()=>{
      //check if success
      //show toast
    }).then(()=>{
      toggleModal()
    })
    .catch((error)=>{
      console.error('Error:', error);
    })
  }

  return (
    <div className="modal-body">
      <h2 className="modal-title">Call Details</h2>
      <CloseIcon onClick={toggleModal} className="close-icon" />
      <div className="modal-column">
        <p className="modal-subtitle">Call Type: </p>
        <p className="modal-content">{callDetails.call_type || "N/A"} </p>
      </div>
      <div className="modal-column">
        <p className="modal-subtitle">From: </p>
        <p className="modal-content">{callDetails.from || "Unknown"} </p>
      </div>
      <div className="modal-column">
        <p className="modal-subtitle">Datetime: </p>
        <p className="modal-content">{formatDateTime(callDetails.created_at)  || "N/A"} </p>
      </div>
      <div className="modal-column">
        <p className="modal-subtitle">Duration: </p>
        <p className="modal-content">{formatDuration(callDetails.duration)} </p>

      </div>

      <div className="button-div">
        {!callDetails.is_archived ? 
        <Button variant="outlined" className="archive-button" onClick={handleArchiveClick}>Archive</Button>
        :
        <Button variant="outlined" className="archive-button" onClick={handleRestoreClick}>Restore</Button>
        }
    </div>
    </div>
  );
};

export default CallDetailsModal;
