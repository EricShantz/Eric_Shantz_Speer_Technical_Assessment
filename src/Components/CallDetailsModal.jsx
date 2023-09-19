import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import '../css/call-details-modal.css';
import { format } from 'date-fns';
import Button from '@mui/material/Button';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TimerIcon from '@mui/icons-material/Timer';
import { ArchiveOne, RestoreOne } from "../APIs/ApplicationAPIS";

const CallDetailsModal = ({callDetails, toggleModal, archiveSuccess, archiveFail, badData, restoreSucess, restoreFail}) => {

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
    .then((response)=>{
      if(response === "Call had been updated."){
        archiveSuccess()
      }
    }).then(()=>{
      toggleModal()
    })
    .catch((error)=>{
    

      if(error.message.includes("404")){
        badData()
      } else{
        archiveFail()
      }
    })
  }

  const handleRestoreClick = () =>{
    RestoreOne(callDetails)
    .then((response)=>{
      if(response === "Call had been updated."){
        restoreSucess()
      }
    }).then(()=>{
      toggleModal()
    })
    .catch((error)=>{
      if(error.message.includes("404")){
        badData()
      } else{
        restoreFail()
      }
    })
  }

  return (
    <div className="modal-body">
      <h2 className="modal-title">Call Details</h2>
      <CloseIcon onClick={toggleModal} className="close-icon" />
      <div className="modal-row">
        <PhoneIcon/>
        <p className="modal-content">{callDetails.call_type || "N/A"} </p>
      </div>
      <div className="modal-row">
      <PersonIcon/>
        <p className="modal-content">{callDetails.from || "Unknown"} </p>
      </div>
      <div className="modal-row">
      <CalendarTodayIcon/>
        <p className="modal-content">{formatDateTime(callDetails.created_at)  || "N/A"} </p>
      </div>
      <div className="modal-row">
      <TimerIcon/>
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
