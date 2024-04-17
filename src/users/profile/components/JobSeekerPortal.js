// /src/users/profile/components/JobSeekerPortal.js
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import MetaMaskConnectButton from './MetaMaskConnectButton';

const JobSeekerPortal = () => {
  const [userAddress, setUserAddress] = useState('');

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
    padding: '16px',
    margin: '4px 4px 0px 4px',
  };

  // Effect to check for stored user address
  useEffect(() => {
    const storedAddress = localStorage.getItem(userAddress);
    if (storedAddress) {
      setUserAddress(storedAddress);
    }
  }, []);

  // Callback function to handle the connection and receive the user's Ethereum address
  const handleConnect = (account) => {
    console.log(`Connected to MetaMask with account: ${account}`);
    setUserAddress(account); // Update the state with the connected user's address
    localStorage.setItem('userAddress', account); // Persist user's address in localStorage
  };
  
  return (
    <div style={ovalStyle}>
      <div style={buttonContainerStyle}>
        <MetaMaskConnectButton onConnect={handleConnect} />
        <Button style={buttonStyle}>Options</Button>
        <Button style={buttonStyle}>BURN</Button>
      </div>
    </div>
  );
};

export default JobSeekerPortal;
