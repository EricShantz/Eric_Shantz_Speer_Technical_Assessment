import React, {useState} from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import DialpadIcon from '@mui/icons-material/Dialpad';
import InboxIcon from '@mui/icons-material/Inbox';
import'../css/tabbar.css'


const TabBar = ({ currentTab, setCurrentTab }) => {
    const [activeTab, setActiveTab] = useState(currentTab);

    return (
      <div className="tab-bar">
        <Box sx={{ width: "23.4rem" }}>
            <BottomNavigation
                showLabels
                value={activeTab}
                onChange={(event, newValue) => {
                    setActiveTab(newValue)
                    setCurrentTab(newValue);
                }}>
                <BottomNavigationAction label="Call History" value={"CallHistory"} icon={<RestoreIcon />} />
                <BottomNavigationAction label="Keypad" value={"Keypad"} icon={<DialpadIcon />} />
                <BottomNavigationAction label="Archives" value={"ArchivedCalls"} icon={<InboxIcon />} />
            </BottomNavigation>
        </Box>
      </div>
    );
  };


export default TabBar;




