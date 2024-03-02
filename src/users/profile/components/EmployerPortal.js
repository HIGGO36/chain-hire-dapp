import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import MetaMaskConnectButton from './MetaMaskConnectButton';
import MintJobRoleNFTButton from '../../utils/MintJobRoleNFTButton';

const EmployerPortal = () => {
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    // Check for stored address in local storage on component mount
    const storedAddress = localStorage.getItem('userAddress');
    if (storedAddress) {
      setUserAddress(storedAddress);
    }
  }, []);

  const handleConnect = (account) => {
    console.log(`Connected to MetaMask with account: ${account}`);
    // Update the state with the connected user's address
    setUserAddress(account);
    // Store the connected user's address in local storage
    localStorage.setItem('userAddress', account);
  };

  const ovalStyle = {
    position: 'relative',
    margin: '0px auto',
    width: '99%',
    maxWidth: '800px',
    height: '550px',
    backgroundColor: 'black',
    border: '10px solid white',
    borderRadius: '10%',
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
  };

  const buttonContainerStyle = {
    position: 'absolute',
    top: '270px',
    left: '90px',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const buttonStyle = {
    backgroundColor: 'yellow',
    color: 'black',
    borderRadius: '50%',
    padding: '16px',
    margin: '4px',
  };

  return (
    <div style={ovalStyle}>
      <div style={buttonContainerStyle}>
        <MetaMaskConnectButton onConnect={handleConnect} />
        <Button style={buttonStyle}>Options</Button>
        {/* Render buttons if userAddress is set */}
        {userAddress && (
          <>
            <MintJobRoleNFTButton style={buttonStyle} userAddress={userAddress} />
            <Button style={buttonStyle}>SELL</Button>
            <Button style={buttonStyle}>LIST</Button>
            <Button style={buttonStyle}>BURN</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployerPortal;
