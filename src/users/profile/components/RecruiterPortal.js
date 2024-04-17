import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import MetaMaskConnectButton from './MetaMaskConnectButton';

const RecruiterPortal = () => {
  // State to hold the user's Ethereum address
  const [userAddress, setUserAddress] = useState(null);

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
    margin: '4px 4px 0 4px',
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
  };

  return (
       <div style={{ position: 'relative', margin: '0 auto', width: '99%', maxWidth: '800px', height: '600px', backgroundColor: '#20336B', border: '10px solid #0E1D47', borderRadius: '10%', boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)', color: '#D4E774' }}>

      <div style={buttonContainerStyle}>
        <MetaMaskConnectButton onConnect={handleConnect} />
        {/* {userAddress && <MintJobRoleNFTButton userAddress={userAddress} />} */}
        <Button style={buttonStyle}>Options</Button>
        <Button style={buttonStyle}>SELL</Button>
        <Button style={buttonStyle}>LIST</Button>
        <Button style={buttonStyle}>BURN</Button>

      </div>
      </div>
  );
};

export default RecruiterPortal;
