// Import necessary modules
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import MetaMaskConnectButton from './MetaMaskConnectButton';
import MintJobRoleNFTButton from '../../utils/MintJobRoleNFTButton';

const EmployerPortal = () => {
  const [userAddress, setUserAddress] = useState('');
  const [latestTokenId, setLatestTokenId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAddress = localStorage.getItem('userAddress');
    if (storedAddress) {
      setUserAddress(storedAddress);
    }
  }, []);

  const handleConnect = (account) => {
    setUserAddress(account);
    localStorage.setItem('userAddress', account);
  };

  const navigateToWallet = () => {
    navigate('/JobRoleNFTWallet');
  };

  const handleTokenMinted = (tokenId) => {
    setLatestTokenId(tokenId);
  };

  return (
    <div style={{ position: 'relative', margin: '0 auto', width: '99%', maxWidth: '800px', height: '550px', backgroundColor: 'black', border: '10px solid white', borderRadius: '10%', boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)' }}>
      <div style={{ position: 'absolute', top: '270px', left: '90px', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <MetaMaskConnectButton onConnect={handleConnect} />
        <Button style={{ backgroundColor: 'yellow', color: 'black', borderRadius: '50%', padding: '16px', margin: '4px' }}>Options</Button>
        {userAddress && (
          <>
            <MintJobRoleNFTButton style={{ backgroundColor: 'yellow', color: 'black', borderRadius: '50%', padding: '16px', margin: '4px' }} userAddress={userAddress} onTokenMinted={handleTokenMinted} />
            <Button style={{ backgroundColor: 'yellow', color: 'black', borderRadius: '50%', padding: '16px', margin: '4px' }}>SELL</Button>
            <Button style={{ backgroundColor: 'yellow', color: 'black', borderRadius: '50%', padding: '16px', margin: '4px' }}>LIST</Button>
            <Button style={{ backgroundColor: 'yellow', color: 'black', borderRadius: '50%', padding: '16px', margin: '4px' }}>BURN</Button>
            <Button style={{ backgroundColor: 'yellow', color: 'black', borderRadius: '50%', padding: '16px', margin: '4px' }} onClick={navigateToWallet}>Collections</Button>
            {/* Render the latest token ID */}
            <div style={{ color: 'white' }}>Latest Token ID: {latestTokenId}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployerPortal;
