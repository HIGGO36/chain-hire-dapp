import React from 'react';
import { useNavigate } from 'react-router-dom';
import useB2BVerification from '../hooks/useB2BVerification';
import { Button } from '@material-ui/core';

const B2BHomePage = ({ account, onDisconnect }) => {
  const navigate = useNavigate();
  const isVerified = useB2BVerification(account);

  // Function to handle wallet disconnection
  const handleDisconnect = () => {
    onDisconnect(); // Trigger wallet disconnection
    navigate('/'); // Navigate back to the main page
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, padding: '20px' }}>
        <Button variant="contained" color="secondary" onClick={handleDisconnect}>
          LogOut
        </Button>
      </div>
      <h1>Chain Hire B2B Marketplace</h1>
      {isVerified ? (
        <>
          <p>Wallet Address: {account}</p>
          <p>Verification Status: Access Granted</p>
          <h2>Welcome to the B2B Marketplace</h2>
          {/* Display interaction options for verified businesses */}
        </>
      ) : (
        <p>Please connect your MetaMask wallet to access the B2B Marketplace.</p>
      )}
    </div>
  );
};

export default B2BHomePage;
