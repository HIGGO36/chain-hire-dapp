import React from 'react';
import { Paper, Button } from '@mui/material';

const OvalPortal = ({ portalStyle }) => {
  const ovalStyle = {
    position: 'relative',
    width: '98%', // Adjusted width to take up about 90% of the screen width
    maxWidth: '800px', // Optional: Set a maximum width for the oval
    backgroundColor: 'black',
    border: '10px solid white',
    borderRadius: '20%', // Modified borderRadius for less circular shape
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
  };

  const buttonContainerStyle = {
    position: 'absolute',
    top: '50%',
    left: '0',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const buttonStyle = {
    backgroundColor: 'yellow',
    color: 'black',
    borderRadius: '50%',
    padding: '10px',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '0',
    right: '0',
    backgroundColor: 'yellow',
    color: 'black',
    borderRadius: '50%',
    padding: '10px',
  };

  return (
    <Paper elevation={3} sx={portalStyle}>
      <div style={ovalStyle}>
        <div style={buttonContainerStyle}>
          <Button style={buttonStyle}>Options</Button>
          <Button style={buttonStyle}>MINT</Button>
          <Button style={buttonStyle}>SELL</Button>
          <Button style={buttonStyle}>LIST</Button>
          <Button style={buttonStyle}>BURN</Button>
        </div>
        <Button style={closeButtonStyle}>Close</Button>
      </div>
    </Paper>
  );
};

export default OvalPortal;
