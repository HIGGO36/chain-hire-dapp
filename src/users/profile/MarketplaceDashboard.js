import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { Button, CssBaseline, Box, Container, ThemeProvider, createTheme, Typography, Grid, Card, CardContent } from '@mui/material';
import JobRoleNFTv5ABI from '../utils/abis/JobRoleNFTv5ABI.json';
import Marketplacev7ABI from '../utils/abis/Marketplacev7ABI.json';
import MetaMaskConnectButton from './components/MetaMaskConnectButton';
import { DashboardAppBar } from './components/DashboardAppBar';
import { DashboardDrawer } from './components/DashboardDrawer';

const defaultTheme = createTheme();

const MarketplaceDashboard = () => {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userAccount, setUserAccount] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const marketplaceContractAddress = process.env.REACT_APP_MARKETPLACE_V7_ADDRESS;
  const jobRoleNFTv5ContractAddress = process.env.REACT_APP_JOB_ROLE_NFT_V5_CONTRACT_ADDRESS;

  const connectMetaMask = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setUserAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting to MetaMask", error);
      alert("MetaMask is not installed. Please install it to use this app.");
    }
  };

const fetchNFTsFromMarketplace = useCallback(async () => {
  setIsLoading(true);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const marketplaceContract = new ethers.Contract(marketplaceContractAddress, Marketplacev7ABI, provider);

  try {
    // Example: Assuming your contract has a way to iterate over active listings
    // This is a placeholder logic, replace it with actual function calls to your contract
    const activeListings = await marketplaceContract.getActiveListings();
    const items = [];
    
    for (let tokenId of activeListings) {
      const listing = await marketplaceContract.listings(tokenId);
      if (listing.active) {
        const jobRoleNFTContract = new ethers.Contract(jobRoleNFTv5ContractAddress, JobRoleNFTv5ABI, provider);
        const nftData = await jobRoleNFTContract.getJobRoleData(tokenId);
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
          lifeSpan: nftData.lifeSpan.toString(),
          sellerAddress: listing.seller,
          price: ethers.utils.formatEther(listing.price),
        });
      }
    }

    setNfts(items.sort((a, b) => parseInt(a.tokenId) - parseInt(b.tokenId)));
  } catch (error) {
    console.error("Error fetching NFTs from marketplace:", error);
  } finally {
    setIsLoading(false);
  }
}, [marketplaceContractAddress, jobRoleNFTv5ContractAddress]);


  useEffect(() => {
    if (window.ethereum) {
      connectMetaMask();
      fetchNFTsFromMarketplace();
    }
  }, [fetchNFTsFromMarketplace]);


  const buyNFT = async (tokenId, price) => {
    if (!window.ethereum || !userAccount) {
      alert("Please connect to MetaMask to buy NFTs.");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const marketplaceContract = new ethers.Contract(marketplaceContractAddress, Marketplacev7ABI, signer);

    try {
      const totalPrice = ethers.utils.parseUnits(price, 'ether').add(ethers.utils.parseUnits("0.001", 'ether')); // Including the royalties fee
  const transaction = await marketplaceContract.buyNFT(tokenId, { value: totalPrice.toString() });
  await transaction.wait();

  alert("NFT purchased successfully!");
  // Refresh the NFT listings to reflect the change
  fetchNFTsFromMarketplace();
} catch (error) {
  console.error("Purchase failed:", error);
  alert(`There was an error processing your purchase: ${error.message}`);
}
     
};

return (
<ThemeProvider theme={defaultTheme}>
<CssBaseline />
<Box sx={{ display: 'flex' }}>
<DashboardAppBar open={drawerOpen} handleDrawerOpen={() => setDrawerOpen(true)} />
<DashboardDrawer open={drawerOpen} handleDrawerClose={() => setDrawerOpen(false)} />
<Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: '100vh', background: 'linear-gradient(to right, #9FA8AC, #FFFFFF)' }}>
<Container maxWidth="lg">
<Typography variant="h4" gutterBottom sx={{ color: 'darkblue', marginTop: "50px", marginBottom: 2, fontFamily: 'Roboto' }}>
Marketplace Listings
</Typography>
<MetaMaskConnectButton onConnect={connectMetaMask} />
{isLoading ? (
<Typography sx={{ textAlign: 'center', color: 'darkblue' }}>Loading NFTs...</Typography>
) : nfts.length > 0 ? (
<Grid container spacing={4} justifyContent="center">
{nfts.map((nft, index) => (
<Grid item xs={12} sm={6} md={4} key={index}>
<Card variant="outlined" sx={{ wordWrap: 'break-word', padding: '20px', bgcolor: '#f5f5f5', color: 'darkblue', fontFamily: 'Roboto', boxShadow: '5px 5px 15px rgba(0,0,0,0.2)', '&:hover, &:focus': { opacity: 0.8 } }}>
<CardContent>
<Typography variant="h6" component="div" gutterBottom sx={{ color: 'darkblue' }}>
{nft.companyName}
</Typography>
  <Typography variant="subtitle1" gutterBottom sx={{ color: 'darkblue' }}>Job Role: {nft.jobRoleTitle}</Typography>
  <Typography variant="body2" gutterBottom>Industry: {nft.industry}</Typography>
  <Typography variant="body2" gutterBottom>Location: {nft.location}, {nft.country}</Typography>
  <Typography variant="body2" gutterBottom>Salary: {nft.minSalary} - {nft.maxSalary} ETH</Typography>
  <Typography variant="body2" gutterBottom>Work Location: {nft.workLocationType}</Typography>
  <Typography variant="body2" gutterBottom>Position Summary: {nft.positionSummary}</Typography>
  <Typography variant="body2" gutterBottom>Responsibilities: {nft.responsibilities}</Typography>
  <Typography variant="body2" gutterBottom>Qualifications: {nft.qualifications}</Typography>
  <Typography variant="body2" gutterBottom>Seller: {nft.sellerAddress}</Typography>
  <Typography variant="body2" gutterBottom>Price: {nft.price} ETH</Typography>
<Button
variant="contained"
color="primary"
onClick={() => buyNFT(nft.tokenId, nft.price)}
sx={{ marginTop: '10px' }}
>
Buy
</Button>
</CardContent>
</Card>
</Grid>
))}
</Grid>
) : (
<Typography variant="body1" sx={{ textAlign: 'center', color: 'darkblue', marginTop: '20px' }}>
No listings found.
</Typography>
)}
</Container>
</Box>
</Box>
</ThemeProvider>
);
};

export default MarketplaceDashboard;