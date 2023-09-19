import React from 'react';
import { Button, Grid } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import BackspaceIcon from '@mui/icons-material/Backspace';
import '../css/keypad.css';

const KeypadComponent = ({ onKeypadClick, executeCall, onBackspaceClick }) => {
  return (
    <Grid container spacing={1}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((value) => (
        <Grid item xs={4} key={value}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              onKeypadClick(value);
            }}
          >
            {value}
          </Button>
        </Grid>
      ))}
      <div className='bottom-buttons'>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<CallIcon />}
                onClick={() => {
                  executeCall();
                }}
              >
                Call
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth onClick={() => onBackspaceClick()}>
                <BackspaceIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

export default KeypadComponent;
