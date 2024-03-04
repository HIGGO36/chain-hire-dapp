import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import JobRoleNFTv4ABI from '../utils/abis/JobRoleNFTv4ABI.json';
import MetaMaskConnectButton from '../profile/components/MetaMaskConnectButton';

const JobRoleNFTWallet = () => {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [connectedAccount, setConnectedAccount] = useState(localStorage.getItem('userAddress') || null);
  const contractAddress = process.env.REACT_APP_JOB_ROLE_NFT_V4_CONTRACT_ADDRESS;

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
          // Use ethers.js utility function to convert BigNumber to string
          minSalary: ethers.utils.formatEther(nftData.minSalary),
          maxSalary: ethers.utils.formatEther(nftData.maxSalary),
          workLocationType: nftData.workLocationType,
          country: nftData.country,
          location: nftData.location,
          positionSummary: nftData.positionSummary,
          responsibilities: nftData.responsibilities,
          qualifications: nftData.qualifications,
          // Convert BigNumber to string for display
          lifeSpan: nftData.lifeSpan.toString(),
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

  const handleAccountConnect = useCallback((account) => {
    setConnectedAccount(account);
    localStorage.setItem('userAddress', account);
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3, color: 'black', minHeight: '100vh' }}>
      <MetaMaskConnectButton onConnect={handleAccountConnect} />
      <Typography variant="h4" gutterBottom style={{ color: 'black', marginTop: '20px' }}>
        Your JobRoleNFTs
      </Typography>
      {isLoading ? (
        <Typography style={{ textAlign: 'center', color: 'black' }}>Loading NFTs...</Typography>
      ) : nfts.length > 0 ? (
        <Grid container spacing={2}>
        {nfts.map((nft, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
        <Card variant="outlined" sx={{ padding: '20px', bgcolor: 'rgba(255, 255, 255, 0.8)', color: 'black' }}>
        <CardContent>
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
        </CardContent>
        </Card>
        </Grid>
        ))}
        </Grid>
        ) : (
        <Typography style={{ color: 'white', marginTop: '20px', textAlign: 'center' }}>No NFTs found or wallet not connected.</Typography>
        )}
        </Box>
        );
        };

        export default JobRoleNFTWallet;
