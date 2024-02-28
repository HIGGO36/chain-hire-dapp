// /src/users/profile/components/OvalPortal.js
import React, { useState } from 'react';
import { Button } from '@mui/material';
import MetaMaskConnectButton from './MetaMaskConnectButton';
import MintJobRoleNFTButton from '../../utils/MintJobRoleNFTButton';

const OvalPortal = ({ onConnect }) => {
  const [userAddress, setUserAddress] = useState(null);// State to hold the user's Ethereum address
  const userId = "exampleUserId";

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

// Callback function to handle the connection and receive the user's Ethereum address
  const handleConnect = (account) => {
    console.log(`Connected to MetaMask with account: ${account}`);
    setUserAddress(account); // Update the state with the connected user's address
    onConnect(account); // Pass the user's Ethereum address to the parent component
  };
  
 return (
    <div style={ovalStyle}>
      <div style={buttonContainerStyle}>
        <MetaMaskConnectButton userId={userId} onConnect={handleConnect} />
        {/* Pass the userAddress state to the MintJobRoleNFTButton */}
        <MintJobRoleNFTButton userAddress={userAddress} />
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
