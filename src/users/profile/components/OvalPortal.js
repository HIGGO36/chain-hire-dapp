import React from 'react';
import { Button } from '@mui/material';

const OvalPortal = () => {
  const ovalStyle = {
    position: 'relative',
    margin: '0px auto',
    width: '99%', 
    maxWidth: '800px', 
    height: '550px',
    backgroundColor: 'black',
    border: '10px solid white',
    borderRadius: '20%', 
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

  return (
      <div style={ovalStyle}>
        <div style={buttonContainerStyle}>
          <Button style={buttonStyle}>Options</Button>
          <Button style={buttonStyle}>MINT</Button>
          <Button style={buttonStyle}>SELL</Button>
          <Button style={buttonStyle}>LIST</Button>
          <Button style={buttonStyle}>BURN</Button>
        </div>
      </div>
  );
};

export default OvalPortal;
