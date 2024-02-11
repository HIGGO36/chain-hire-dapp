// src/components/B2BHomePage.js
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { ethers } from 'ethers';

const B2BHomePage = () => {
  const [isVerified, setIsVerified] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        verifyAddress(address);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("MetaMask is not installed!");
    }
  };

  const verifyAddress = (address) => {
    // Placeholder for verification logic
    // Check if the address is in your list of verified businesses
    const verifiedAddresses = ['0x...', '0x...']; // Populate with your verified addresses
    if (verifiedAddresses.includes(address)) {
      setIsVerified(true);
    } else {
      alert("Your wallet is not verified for B2B access.");
    }
  };

  return (
    <div>
      <h1>Chain Hire B2B Marketplace</h1>
      {!isVerified ? (
        <Button variant="contained" color="primary" onClick={connectWallet}>
          Connect MetaMask Wallet
        </Button>
      ) : (
        <div>
          {/* Display interaction options for verified businesses here */}
          <h2>Welcome to the B2B Marketplace</h2>
        </div>
      )}
    </div>
  );
};

export default B2BHomePage;
