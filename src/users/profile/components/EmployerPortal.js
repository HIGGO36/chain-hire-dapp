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
    navigate('/WalletDashboard');
  };

    const navigateToMarketplace = () => {
    navigate('/MarketplaceDashboard');
  };

  const handleTokenMinted = (tokenId) => {
    setLatestTokenId(tokenId);
  };

  return (
    <div style={{ position: 'relative', margin: '0 auto', width: '99%', maxWidth: '800px', height: '550px', backgroundColor: '#20336B', border: '10px solid #0E1D47', borderRadius: '10%', boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)', color: '#D4E774' }}>
      <div style={{ position: 'absolute', top: '230px', left: '90px', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <MetaMaskConnectButton style={{ position: 'fixed', top: '-60px', left: '8px', fontSize: '14px', color: '#D4E774' }} onConnect={handleConnect} />
        {userAddress && (
             <>
            <MintJobRoleNFTButton userAddress={userAddress} onTokenMinted={handleTokenMinted} />
            <Button style={{ fontSize: '17px', backgroundColor: '#808183', border: '2px solid #113171', color: '#D4E774', textAlign: 'left' }} onClick={navigateToWallet}>COLLECTION</Button>
               <Button style={{ fontSize: '17px', color: '#D4E774', textAlign: 'left' }}>BURN</Button>
              <Button style={{ fontSize: '17px', backgroundColor: '#808183', border: '2px solid #113171', color: '#D4E774', textAlign: 'left' }} onClick={navigateToMarketplace}>MARKETPLACE</Button>
            <Button style={{ fontSize: '17px', color: '#D4E774', textAlign: 'left' }}>MANAGE LISTINGS</Button>
            <div>
              {/* Render the latest token ID */}
              <div style={{ color: 'white', margin: '0 0 0 12px', position: 'absolute', top: '384px', fontSize: '18px' }}>Latest Token ID: {latestTokenId}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployerPortal;
