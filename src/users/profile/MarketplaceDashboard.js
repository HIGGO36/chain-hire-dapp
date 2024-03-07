import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CssBaseline, Box, Container, ThemeProvider, createTheme, Typography, Grid, Card, CardContent } from '@mui/material';
import JobRoleNFTv5ABI from '../utils/abis/JobRoleNFTv5ABI.json';
import MarketplaceListingv2ABI from '../utils/abis/MarketplaceListingv2ABI.json';
import { DashboardAppBar } from './components/DashboardAppBar';
import { DashboardDrawer } from './components/DashboardDrawer';

const defaultTheme = createTheme();

const MarketplaceDashboard = () => {
const [nfts, setNfts] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const jobRoleNFTv5ContractAddress = "0xe0F7d8CB983835Ed9Ca71c4B828D52B5fAd37EE7"; // Replace with actual contract address
const marketplaceListingv2ContractAddress = "0x3221BFFd172466fD8CC35e974cC3075A29EBba10"; // Replace with actual contract address
const listingWalletAddress = "0x2CcF368e5C6681D186e1C0d85F0Bcb55A31cEFe3"; // Listing wallet address

const [drawerOpen, setDrawerOpen] = useState(false);
const toggleDrawerOpen = () => setDrawerOpen(true);
const toggleDrawerClose = () => setDrawerOpen(false);

const fetchNFTsOwnedByListingWallet = async () => {
if (!window.ethereum) {
setIsLoading(false);
return;
}

setIsLoading(true);
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(jobRoleNFTv5ContractAddress, JobRoleNFTv5ABI, provider);
const marketplaceListingContract = new ethers.Contract(marketplaceListingv2ContractAddress, MarketplaceListingv2ABI, provider);

try {
const balance = await contract.balanceOf(listingWalletAddress);
const items = [];

for (let i = 0; i < balance.toNumber(); i++) {
const tokenId = await contract.tokenOfOwnerByIndex(listingWalletAddress, i);
const nftData = await contract.getJobRoleData(tokenId);
const listing = await marketplaceListingContract.listings(tokenId);
const price = ethers.utils.formatEther(listing.price);

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
price, // Correctly fetch and format the price from the listing
});
}

setNfts(items.sort((a, b) => parseInt(a.tokenId) - parseInt(b.tokenId)));
} catch (error) {
console.error("Error fetching NFTs owned by listing wallet:", error);
} finally {
setIsLoading(false);
}
};

useEffect(() => {
fetchNFTsOwnedByListingWallet();
}, []);

return (
<ThemeProvider theme={defaultTheme}>
<CssBaseline />
<Box sx={{ display: 'flex' }}>
<DashboardAppBar open={drawerOpen} handleDrawerOpen={toggleDrawerOpen} />
<DashboardDrawer open={drawerOpen} handleDrawerClose={toggleDrawerClose} />
<Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: '100vh', background: 'linear-gradient(to right, #9FA8AC, #FFFFFF)' }}>
<Container maxWidth="lg">
<Typography variant="h4" gutterBottom sx={{ color: 'darkblue', marginTop: 2, marginBottom: 2, fontFamily: 'Roboto' }}>
Marketplace Listings
</Typography>
{isLoading ? (
<Typography sx={{ textAlign: 'center', color: 'darkblue' }}>Loading NFTs...</Typography>
) : nfts.length > 0 ? (
<Grid container spacing={4} justifyContent="center">
{nfts.map((nft, index) => (
<Grid item xs={12} sm={6} md={4} key={index}>
<Card variant="outlined" sx={{ padding: '20px', bgcolor: '#f5f5f5', color: 'darkblue', fontFamily: 'Roboto', boxShadow: '5px 5px 15px rgba(0,0,0,0.2)', '&:hover, &:focus': { opacity: 0.8 } }}>
<CardContent>
<Typography variant="h5" gutterBottom>Token ID: {nft.tokenId}</Typography>
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
<Typography variant="body2" style={{ marginTop: '10px', fontWeight: 'bold' }}>Listed Price: {nft.price} ETH</Typography>
</CardContent>
</Card>
</Grid>
))}
</Grid>
) : (
<Typography sx={{ textAlign: 'center', color: 'darkblue', marginTop: '20px' }}>No listed NFTs found.</Typography>
)}
</Container>
</Box>
</Box>
</ThemeProvider>
);
};

export default MarketplaceDashboard;
