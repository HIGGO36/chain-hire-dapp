import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionSummary, AccordionDetails, Box, Button, Card, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MetaMaskConnectButton from './MetaMaskConnectButton';
import MintJobRoleNFTButton from '../../utils/MintJobRoleNFTButton';
import { ethers } from 'ethers';
import JobRoleNFTv5ABI from '../../utils/abis/JobRoleNFTv5ABI.json';

const EmployerPortal = () => {
const [userAddress, setUserAddress] = useState('');
const [latestNFT, setLatestNFT] = useState(() => {
const savedNFT = localStorage.getItem('latestNFT');
    return savedNFT ? JSON.parse(savedNFT) : null;
  });
  const navigate = useNavigate();
  const contractAddress = process.env.REACT_APP_JOB_ROLE_NFT_V5_CONTRACT_ADDRESS;

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
  const fetchNFTDetails = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, JobRoleNFTv5ABI, provider);
  const nftData = await contract.getJobRoleData(tokenId);

  const formattedNftData = {
  tokenId: tokenId.toString(),
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
  localStorage.setItem('latestNFT', JSON.stringify(formattedNftData));
  };

  fetchNFTDetails();
  };

 const scrollableTextStyle = {
    maxHeight: '110px',
    overflowY: 'auto',
    padding: '5px',
    border: '1px solid #ccc',
    marginBottom: '8px', // Give some space between the boxes
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  };

  // Function to truncate text to a maximum character count
function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
  }
  
  //  usage of truncateText function
  const companyName = truncateText(latestNFT.companyName, 20);
  const jobRoleTitle = truncateText(latestNFT.jobRoleTitle, 20);
  const industry = truncateText(latestNFT.industry, 20);
  const workLocationType = truncateText(latestNFT.workLocationType, 20);
  const location = truncateText(latestNFT.location, 20);
  const country = truncateText(latestNFT.country, 20);
  
  return (
    <div style={{ position: 'relative', margin: '0 auto', width: '99%', maxWidth: '800px', height: '600px', backgroundColor: '#20336B', border: '10px solid #0E1D47', borderRadius: '10%', boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)', color: '#D4E774' }}>
      
<Typography variant="h6" style={{ fontWeight: '650', position: 'relative', left: '20px', top: '15px', fontSize: '21px', fontFamily: 'math' }}>Last Minted: Job Role</Typography>
<Typography style={{ fontWeight: '600', color: 'white', position: 'relative', top: '20px', left: '20px', fontSize: '19px' }}>Token ID: {latestNFT.tokenId}</Typography>
      
{latestNFT && (
<Card style={{ position: 'absolute', top: '-18px', left: '31%', maxWidth: '300px', height: '576px', padding: '10px', marginTop: '20px', backgroundColor: '#D7E5EB', color: '#031B25' }}>
<Typography style={{ fontWeight: '600', marginBottom: '6px', marginTop: '6px', fontSize: '18px' }}>Min Salary: {latestNFT.minSalary} ETH</Typography>
<Typography style={{ fontWeight: '600', marginBottom: '6px', fontSize: '18px' }}>Max Salary: {latestNFT.maxSalary} ETH</Typography>

<Typography style={{ fontWeight: '600', marginBottom: '0px' }} variant="subtitle1" gutterBottom>Position Summary:</Typography>
<Box sx={scrollableTextStyle}>
<Typography variant="body2" style={{ background: 'white', padding: '5px', border: '2px solid grey', fontSize: '14px' }}>{latestNFT.positionSummary}</Typography>
</Box>
<Typography style={{ fontWeight: '600', marginBottom: '0px' }} variant="subtitle1" gutterBottom>Responsibilities:</Typography>
<Box sx={scrollableTextStyle}>
<Typography variant="body2" style={{ background: 'white', padding: '5px', border: '2px solid grey', fontSize: '14px' }}>{latestNFT.responsibilities}</Typography>
</Box>
<Typography style={{ fontWeight: '600', marginBottom: '0px' }} variant="subtitle1" gutterBottom>Qualifications:</Typography>
<Box sx={scrollableTextStyle}>
<Typography variant="body2" style={{ background: 'white', padding: '5px', border: '2px solid grey', fontSize: '14px' }}>{latestNFT.qualifications}</Typography>
</Box>

<Typography style={{ fontWeight: '650', marginTop: '10px', marginBottom: '10px', fontSize: '19px' }}>Life Span: {latestNFT.lifeSpan} days</Typography>
        </Card>
      )}
<div style={{ position: 'absolute', top: '230px', left: '90px', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
<MetaMaskConnectButton style={{ position: 'fixed', top: '-60px', left: '8px', fontSize: '14px', color: '#D4E774' }} onConnect={handleConnect} />
{userAddress && (
<>
<MintJobRoleNFTButton userAddress={userAddress} onTokenMinted={handleTokenMinted} />
<Button style={{ fontSize: '17px', backgroundColor: '#808183', border: '2px solid #113171', color: '#D4E774', textAlign: 'left' }} onClick={navigateToWallet}>COLLECTION</Button>
<Button style={{ fontSize: '17px', backgroundColor: '#808183', border: '2px solid #113171', color: '#D4E774', textAlign: 'left' }} onClick={navigateToMarketplace}>MARKETPLACE</Button>              
</>        
)}
</div>
<>
<div style={{ width: '18%', right: '10px', top: '40px', position: 'absolute'}}>
<Accordion>
<AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Typography>Company</Typography>
</AccordionSummary>
<AccordionDetails>
<Typography>{companyName}</Typography>
</AccordionDetails>
</Accordion>

<Accordion>
<AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Typography>Job Role</Typography>
</AccordionSummary>
<AccordionDetails>
<Typography>{jobRoleTitle}</Typography>
</AccordionDetails>
</Accordion>

<Accordion>
<AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Typography>Industry</Typography>
</AccordionSummary>
<AccordionDetails>
<Typography>{industry}</Typography>
</AccordionDetails>
</Accordion>

<Accordion>
<AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Typography>Location</Typography>
</AccordionSummary>
<AccordionDetails>
<Typography>{location}</Typography>
</AccordionDetails>
</Accordion>

<Accordion>
<AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Typography>Type</Typography>
</AccordionSummary>
<AccordionDetails>
<Typography>{workLocationType}</Typography>
</AccordionDetails>
</Accordion>

<Accordion>
<AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Typography>Country</Typography>
</AccordionSummary>
<AccordionDetails>
<Typography>{country}</Typography>
</AccordionDetails>
</Accordion>

</div>
</>
</div>
);
};
export default EmployerPortal;
