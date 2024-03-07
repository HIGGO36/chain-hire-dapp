import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography } from '@mui/material';
import MetaMaskConnectButton from './MetaMaskConnectButton';
import MintJobRoleNFTButton from '../../utils/MintJobRoleNFTButton';
import { ethers } from 'ethers';
import JobRoleNFTv5ABI from '../../utils/abis/JobRoleNFTv5ABI.json';

const EmployerPortal = () => {
  const [userAddress, setUserAddress] = useState('');
  const [latestTokenId, setLatestTokenId] = useState(null);
  const [latestNFT, setLatestNFT] = useState(null);
  const navigate = useNavigate();
  const contractAddress = process.env.REACT_APP_JOB_ROLE_NFT_V5_CONTRACT_ADDRESS;

  useEffect(() => {
    const storedAddress = localStorage.getItem('userAddress');
    if (storedAddress) {
      setUserAddress(storedAddress);
    }
  }, []);

  useEffect(() => {
    // This function remains mostly the same
    const fetchNFTDetails = async () => {
      if (latestTokenId) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, JobRoleNFTv5ABI, provider);
        const nftData = await contract.getJobRoleData(latestTokenId);
        
        // Process and set the NFT data with correct formatting for BigNumber objects
        const formattedNftData = {
          tokenId: latestTokenId.toString(),
          companyName: nftData.companyName,
          industry: nftData.industry,
          jobRoleTitle: nftData.jobRoleTitle,
          minSalary: ethers.utils.formatEther(nftData.minSalary),
          maxSalary: ethers.utils.formatEther(nftData.maxSalary),
          workLocationType: nftData.workLocationType,
          country: nftData.country,
          location: nftData.location,
          positionSummary: nftData.positionSummary,
          responsibilities: nftData.responsibilities,
          qualifications: nftData.qualifications,
          lifeSpan: nftData.lifeSpan.toString(),
        };
        
        setLatestNFT(formattedNftData);
      }
    };

    fetchNFTDetails();
  }, [latestTokenId, contractAddress]);

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
    // This triggers the useEffect to fetch and format the latest minted NFT details
  };

 return (
   <div style={{ position: 'relative', margin: '0 auto', width: '99%', maxWidth: '800px', height: '550px', backgroundColor: '#20336B', border: '10px solid #0E1D47', borderRadius: '10%', boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)', color: '#D4E774' }}>
     
      {latestNFT && (
       <Card style={{ position: 'absolute', top: '12%', left: '36%', padding: '10px', marginTop: '20px', backgroundColor: '#D7E5EB', color: '#031B25', zIndex: '9999' }}>
                <Typography variant="h6" style={{fontWeight: '650'}}>Last Job Role Minted</Typography>
                <Typography>Token ID: {latestNFT.tokenId}</Typography>
                <Typography>Company: {latestNFT.companyName}</Typography>
                <Typography>Industry: {latestNFT.industry}</Typography>
                <Typography>Job Role: {latestNFT.jobRoleTitle}</Typography>
                <Typography>Min Salary: {latestNFT.minSalary} ETH</Typography>
                <Typography>Max Salary: {latestNFT.maxSalary} ETH</Typography>
                <Typography>Location: {latestNFT.location}</Typography>
                <Typography>Responsibilities: {latestNFT.responsibilities}</Typography>
                <Typography>Qualifications: {latestNFT.qualifications}</Typography>
                <Typography>Life Span: {latestNFT.lifeSpan} days</Typography>
              </Card>
     )}
     
      <div style={{ position: 'absolute', top: '230px', left: '90px', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <MetaMaskConnectButton style={{ position: 'fixed', top: '-60px', left: '8px', fontSize: '14px', color: '#D4E774' }} onConnect={handleConnect} />
        {userAddress && (
          <>
            <MintJobRoleNFTButton userAddress={userAddress} onTokenMinted={handleTokenMinted} />
            <Button style={{ fontSize: '17px', backgroundColor: '#808183', border: '2px solid #113171', color: '#D4E774', textAlign: 'left' }} onClick={navigateToWallet}>COLLECTION</Button>
            {/* Removed BURN button for clarity, assuming it's not implemented here */}
            <Button style={{ fontSize: '17px', backgroundColor: '#808183', border: '2px solid #113171', color: '#D4E774', textAlign: 'left' }} onClick={navigateToMarketplace}>MARKETPLACE</Button>
            {/* Removed MANAGE LISTINGS button for clarity, assuming it's not implemented here */}
           
          </>
        )}
      </div>
    </div>
  );
};

export default EmployerPortal;
