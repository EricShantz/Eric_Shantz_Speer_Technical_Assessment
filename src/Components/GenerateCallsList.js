import React from "react"
import '../css/list-items.css';
import { format } from 'date-fns';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import VoicemailIcon from '@mui/icons-material/Voicemail';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';

const GenerateListItems = (data, toggleModal, archives) => {
  const groupedCalls = {};

  const sortedCalls = data.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  sortedCalls.forEach((item) => {
    const date = format(new Date(item.created_at), "yyyy-MM-dd");
    if (!groupedCalls[date]) {
      groupedCalls[date] = [];
    }
    groupedCalls[date].push(item);
  });

  const getIconForCallType = (type) => {
    switch (type) {
      case "missed":
        return <PhoneMissedIcon style={{ color: 'red' }} className="icon-base" />;
      case "voicemail":
        return <VoicemailIcon className="icon-base" />;
      case "answered":
        return <PhoneCallbackIcon className="icon-base" />;
      default:
        return <PhoneDisabledIcon className="icon-base" />;
    }
  };

  const formatDateTime = (dateTimeString) => {
    return format(new Date(dateTimeString), "HH:mm");
  }

  const listItems = [];
  for (const date in groupedCalls) {
    const callGroup = groupedCalls[date].filter((item) => !item.is_archived === archives);
    if (callGroup.length > 0) {
      listItems.push(
        <div key={date}>
          <h2>{format(new Date(date), "MMMM d, yyyy")}</h2>
          {callGroup.map((item, index) => (
            <div className="call-item" key={item.id} onClick={() => { toggleModal(item) }}>
              {getIconForCallType(item.call_type)}
              <p className="call-from">{item.from || "Unknown"}</p>
              <p className="date-time">{formatDateTime(item.created_at) || "N/A"}</p>
            </div>
          ))}
        </div>
      );
    }
  }
  return listItems;
};

export default GenerateListItems;
