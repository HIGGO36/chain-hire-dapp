import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { Button, CssBaseline, Box, Container,  Modal, ThemeProvider, createTheme, Typography, Grid, Card, CardContent, TextField } from '@mui/material';

import JobRoleNFTv5ABI from '../utils/abis/JobRoleNFTv5ABI.json';
import Marketplacev7ABI from '../utils/abis/Marketplacev7ABI.json';
import MetaMaskConnectButton from './components/MetaMaskConnectButton';
import { DashboardAppBar } from './components/DashboardAppBar';
import { DashboardDrawer } from './components/DashboardDrawer';

const defaultTheme = createTheme();

const WalletDashboard = () => {
const [nfts, setNfts] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [connectedAccount, setConnectedAccount] = useState(localStorage.getItem('userAddress') || null);
const [recipientAddress, setRecipientAddress] = useState('');
const contractAddress = process.env.REACT_APP_JOB_ROLE_NFT_V5_CONTRACT_ADDRESS;
const marketplaceContractAddress = process.env.REACT_APP_MARKETPLACE_V7_ADDRESS;
  
const [drawerOpen, setDrawerOpen] = useState(false);
const toggleDrawerOpen = () => setDrawerOpen(true);
const toggleDrawerClose = () => setDrawerOpen(false);

const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedTokenId, setSelectedTokenId] = useState(null);


const fetchNFTs = useCallback(async (account) => {
if (!window.ethereum || !account) {
setIsLoading(false);
return;
  }

setIsLoading(true);
const provider = new ethers.providers.Web3Provider(window.ethereum);
const nftContract = new ethers.Contract(contractAddress, JobRoleNFTv5ABI, provider);

try {
const balance = await nftContract.balanceOf(account);
const items = [];
for (let i = 0; i < balance.toNumber(); i++) {
const tokenId = await nftContract.tokenOfOwnerByIndex(account, i);
const nftData = await nftContract.getJobRoleData(tokenId);
items.push({
tokenId: tokenId.toNumber(),
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
listingPrice: '', // Initialize listingPrice as empty
});
}

// Sort items by tokenId in ascending order
items.sort((a, b) => a.tokenId - b.tokenId);

setNfts(items);
} catch (error) {
console.error("Error fetching NFTs:", error);
} finally {
setIsLoading(false);
}
}, [contractAddress]);

useEffect(() => {
if (connectedAccount) {
fetchNFTs(connectedAccount);
}
}, [connectedAccount, fetchNFTs]);
  

  const listNFT = async (tokenId, price) => {
  if (!window.ethereum || !connectedAccount) {
    alert("Ethereum object not found or wallet not connected.");
    return;
  }

  if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
    alert("Please enter a valid positive number for the price.");
    return;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    // Ensure the marketplace contract is approved to manage the user's NFTs
    const jobRoleNFTContract = new ethers.Contract(contractAddress, JobRoleNFTv5ABI, signer);
    const isApprovedForAll = await jobRoleNFTContract.isApprovedForAll(connectedAccount, marketplaceContractAddress);
    if (!isApprovedForAll) {
      console.log('Approving marketplace to manage NFTs...');
      const approvalTx = await jobRoleNFTContract.setApprovalForAll(marketplaceContractAddress, true);
      await approvalTx.wait();
    }

    // Listing NFT
    const marketplaceContract = new ethers.Contract(marketplaceContractAddress, Marketplacev7ABI, signer);
    const listingPriceWei = ethers.utils.parseEther(price);
    const totalValue = ethers.utils.parseEther("0.001"); // Adjust based on contract's requirements

    console.log(`Listing NFT with Token ID ${tokenId} for ${price} ETH, including any required fees...`);
    const transaction = await marketplaceContract.listJobRoleNFT(tokenId, listingPriceWei, { value: totalValue });
    await transaction.wait();

    console.log(`NFT with Token ID ${tokenId} is now listed.`);
    alert(`NFT with Token ID ${tokenId} is successfully listed for ${price} ETH, including required fees.`);

    // Automatically refresh the list of NFTs to reflect the latest state
    await fetchNFTs(connectedAccount);
  } catch (error) {
    console.error("Failed to list NFT:", error);
    alert(`Failed to list NFT: ${error.message}`);
  }
  };
  
  const handleRecipientAddressChange = (event) => {
  setRecipientAddress(event.target.value);
  };
  
  const sendNFT = async (tokenId) => {
  if (!recipientAddress) {
    alert('Please enter a recipient address.');
    return;
  }
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(contractAddress, JobRoleNFTv5ABI, signer);

    const transaction = await nftContract.transferFrom(connectedAccount, recipientAddress, tokenId);
    await transaction.wait();

    alert(`NFT with Token ID ${tokenId} has been successfully sent to ${recipientAddress}.`);
    // Optionally refresh the NFT list here
  } catch (error) {
    console.error('Failed to send NFT:', error);
    alert(`Failed to send NFT: ${error.message}`);
  }
};


const SendNFTModal = ({ isOpen, onClose, onSend }) => (
  <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Send NFT
      </Typography>
      <TextField
        autoFocus
        margin="dense"
        id="recipientAddress"
        label="Recipient Address"
        type="text"
        fullWidth
        variant="outlined"
        value={recipientAddress}
        onChange={handleRecipientAddressChange}
        sx={{ mt: 2 }}
      />
      <Button onClick={() => onSend(selectedTokenId)} sx={{ mt: 2 }}>
        Send NFT
      </Button>
    </Box>
  </Modal>
);

  
const burnNFT = async (tokenId) => {
if (!window.ethereum || !connectedAccount) return;

try {
const provider = new ethers.providers.Web3Provider(window.ethereum);
await provider.send("eth_requestAccounts", []);
const signer = provider.getSigner();
const nftContract = new ethers.Contract(contractAddress, JobRoleNFTv5ABI, signer);

const transaction = await nftContract.burn(tokenId);
await transaction.wait();

alert(`NFT with Token ID ${tokenId} has been successfully burned.`);

// Refresh the NFT list after burning
fetchNFTs(connectedAccount);
} catch (error) {
console.error("Error burning NFT:", error);
alert("There was an error burning the NFT.");
}
};

const handleListingPriceChange = (index, value) => {
  // This regular expression allows digits, at most one decimal point, and ensures the value isn't negative
  const validNumberRegex = /^\d*\.?\d*$/;

  // Check if the input value matches the pattern for a valid number
  if (validNumberRegex.test(value)) {
    // Update the state only if the value is a valid number
    const updatedNfts = nfts.map((nft, idx) => {
      if (idx === index) {
        return { ...nft, listingPrice: value };
      }
      return nft;
    });

    setNfts(updatedNfts);
  } else if (value === '') {
    // Allow clearing the input field
    const updatedNfts = nfts.map((nft, idx) => {
      if (idx === index) {
        return { ...nft, listingPrice: '' };
      }
      return nft;
    });

    setNfts(updatedNfts);
  }
  // If the value does not match the valid number pattern, don't update the state
  // This effectively prevents invalid input from being entered
};

return (
<ThemeProvider theme={defaultTheme}>
<CssBaseline />
<Box sx={{ display: 'flex' }}>

<DashboardAppBar open={drawerOpen} handleDrawerOpen={toggleDrawerOpen} />
<DashboardDrawer open={drawerOpen} handleDrawerClose={toggleDrawerClose} />
<Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: '100vh', margin: '50px 0px 20px 0px', background: 'linear-gradient(to right, #9FA8AC, #FFFFFF)' }}>
<Container maxWidth="lg" sx={{ marginTop: 2 }}> {/* Adjust marginTop if needed */}
<MetaMaskConnectButton onConnect={setConnectedAccount} />
<Typography variant="h4" gutterBottom sx={{ color: 'darkblue', marginTop: 2, marginBottom: 2, fontFamily: 'Roboto' }}>
Unlisted: JOB ROLES
</Typography>
{isLoading ? (
<Typography sx={{ textAlign: 'center', color: 'darkblue' }}>Loading NFTs...</Typography>
) : nfts.length > 0 ? (
<Grid container spacing={4} justifyContent="center">
{nfts.map((nft, index) => (
<Grid item xs={12} sm={6} md={4} key={index}>
<Card variant="outlined" sx={{ padding: '20px', bgcolor: '#f5f5f5', color: 'darkblue', fontFamily: 'Roboto', boxShadow: '5px 5px 15px rgba(0,0,0,0.2)', border: '5px solid transparent', backgroundImage: `linear-gradient(#f5f5f5, #f5f5f5), linear-gradient(to right, darkblue, #f5f5dc)`, backgroundOrigin: 'border-box', backgroundClip: 'content- box, border- box', '&:hover, &:focus': {opacity: 0.8 }, position: 'relative', overflow: 'hidden' }}>

<CardContent sx={{ position: 'relative', zIndex: 1 }}>
<Typography variant="h5">Token ID: {nft.tokenId}</Typography>
<Typography variant="subtitle1">Company: {nft.companyName}</Typography>
<Typography variant="body2">Industry: {nft.industry}</Typography>
<Typography variant="body2">Job Role: {nft.jobRoleTitle}</Typography>
<Typography variant="body2">Min Salary: {nft.minSalary} ETH</Typography>
<Typography variant="body2">Max Salary: {nft.maxSalary} ETH</Typography>
<Typography variant="body2">Location Type: {nft.workLocationType}</Typography>
<Typography variant="body2">Country: {nft.country}</Typography>
<Typography variant="body2">Location: {nft.location}</Typography>
<Typography variant="body2">Position Summary: {nft.positionSummary}</Typography>
<Typography variant="body2">Responsibilities: {nft.responsibilities}</Typography>
<Typography variant="body2">Qualifications: {nft.qualifications}</Typography>
<Typography variant="body2">Life Span: {nft.lifeSpan} days</Typography>
        
<TextField label="Listing Price (ETH)" type="text" variant="outlined" size="small" fullWidth value={nft.listingPrice}
onChange={(e) => handleListingPriceChange(index, e.target.value)} sx={{ my: 2 }} />

<Button variant="contained" color="primary" onClick={() => { setSelectedTokenId(nft.tokenId); setIsModalOpen(true);}}>Send</Button>
<SendNFTModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSend={(tokenId) => { sendNFT(tokenId); setIsModalOpen(false);}}/>
<Button variant="contained" color="primary" onClick={() => listNFT(nft.tokenId, nft.listingPrice)}>List</Button>
<Button variant="contained" color="secondary" onClick={() => burnNFT(nft.tokenId)} sx={{ ml: 1 }}>Burn</Button>     

</CardContent>
</Card>
</Grid>
))}
</Grid>
) : (
<Typography sx={{ color: 'darkblue', marginTop: '20px', textAlign: 'center' }}>No NFTs found or wallet not connected.</Typography>
)}
</Container>
</Box>
</Box>
</ThemeProvider>
);
};

export default WalletDashboard;