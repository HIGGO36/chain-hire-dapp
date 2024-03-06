import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { Button, CssBaseline, Box, Container, ThemeProvider, createTheme, Typography, Grid, Card, CardContent, TextField } from '@mui/material';
import JobRoleNFTv4ABI from '../utils/abis/JobRoleNFTv4ABI.json';
import MarketplaceListingABI from '../utils/abis/MarketplaceListingABI.json'; 
import MetaMaskConnectButton from './components/MetaMaskConnectButton';
import { DashboardAppBar } from './components/DashboardAppBar';
import { DashboardDrawer } from './components/DashboardDrawer';

const defaultTheme = createTheme();

const WalletDashboard = () => {
const [nfts, setNfts] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [connectedAccount, setConnectedAccount] = useState(localStorage.getItem('userAddress') || null);
const contractAddress = process.env.REACT_APP_JOB_ROLE_NFT_V4_CONTRACT_ADDRESS;
const marketplaceListingAddress = process.env.REACT_APP_MARKETPLACE_LISTING_CONTRACT_ADDRESS; 
const [drawerOpen, setDrawerOpen] = useState(false);
// Update your toggle functions to use 'setDrawerOpen'
const toggleDrawerOpen = () => setDrawerOpen(true);
const toggleDrawerClose = () => setDrawerOpen(false);

const fetchNFTs = useCallback(async (account) => {
  if (!window.ethereum || !account) {
    setIsLoading(false);
    return;
  }
  setIsLoading(true);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, JobRoleNFTv4ABI, provider);

  try {
    const balance = await contract.balanceOf(account);
    const items = [];
    for (let i = 0; i < balance.toNumber(); i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(account, i);
      const nftData = await contract.getJobRoleData(tokenId);
      items.push({
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
        lifeSpan: nftData.lifeSpan.toString(), // Assuming lifeSpan is already a BigNumber and needs to be converted to string
      });
    }
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
    
    console.log("Marketplace Listing Address:", marketplaceListingAddress);
  
const checkAndRequestApproval = async (tokenId, signer) => {
    const jobRoleNFTContract = new ethers.Contract(contractAddress, JobRoleNFTv4ABI, signer);
    const approvalStatus = await jobRoleNFTContract.getApproved(tokenId);

    if (approvalStatus !== marketplaceListingAddress) {
        const approvalTx = await jobRoleNFTContract.approve(marketplaceListingAddress, tokenId);
        await approvalTx.wait();
        console.log(`Token ID ${tokenId} approved for transfer by MarketplaceListing.`);
    } else {
        console.log(`Token ID ${tokenId} already approved for transfer.`);
    }
};

const listNFT = async (tokenId, price) => {
    if (!window.ethereum || !connectedAccount) return;

    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        
        // Pass signer as an argument
        await checkAndRequestApproval(tokenId, signer);

        const marketplaceContract = new ethers.Contract(marketplaceListingAddress, MarketplaceListingABI, signer);
        const listingPriceWei = ethers.utils.parseEther(price.toString());
        const transaction = await marketplaceContract.listJobRoleNFT(tokenId, listingPriceWei, { value: ethers.utils.parseEther("0.0005") });
        await transaction.wait();

        alert(`NFT with Token ID ${tokenId} is now listed for ${price} ETH.`);
    } catch (error) {
        console.error("Error listing NFT:", error);
        alert("There was an error listing your NFT.");
    }
};


  const handleListingPriceChange = (index, value) => {
    const updatedNfts = [...nfts];
    updatedNfts[index].listingPrice = value;
    setNfts(updatedNfts);
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
    Your JobRoleNFTs
    </Typography>
    {isLoading ? (
    <Typography sx={{ textAlign: 'center', color: 'darkblue' }}>Loading NFTs...</Typography>
    ) : nfts.length > 0 ? (
    <Grid container spacing={4} justifyContent="center">
    {nfts.map((nft, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>  
    <Card variant="outlined" sx={{ padding: '20px', bgcolor: '#f5f5f5', color: 'darkblue', fontFamily: 'Roboto', boxShadow: '5px 5px 15px rgba(0,0,0,0.2)', border: '5px solid transparent', backgroundImage: `linear-gradient(#f5f5f5, #f5f5f5), linear-gradient(to right, darkblue, #f5f5dc)`, backgroundOrigin: 'border-box', backgroundClip: 'content-box, border-box', '&:hover, &:focus': { opacity: 0.8 }, 
    position: 'relative', overflow: 'hidden' }}>
                  
<CardContent sx={{ position: 'relative', zIndex: 1 }}>
{/* Displaying the NFT data */}
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
<TextField label="Listing Price (ETH)" type="number" variant="outlined" size="small"
fullWidth
value={nft.listingPrice} onChange={(e) => handleListingPriceChange(index, e.target.value)} sx={{ my: 2 }} />
<Button variant="contained" color="primary" onClick={() => listNFT(nft.tokenId, nft.listingPrice)}>
List</Button>
</CardContent>
</Card>
</Grid>
))}
</Grid>
) : (
<Typography sx={{ color: 'darkblue', marginTop: '20px', textAlign: 'center' }}>No NFTs found or wallet not connected.</Typography>
)}
</Container>  </Box>
</Box>
</ThemeProvider>
);
};

export default WalletDashboard;
