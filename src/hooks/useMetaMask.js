import { useState, useEffect } from 'react';
// Removed import { ethers } from 'ethers'; since it's not used

const useMetaMask = () => {
  const [account, setAccount] = useState(null);
  // Removed const [error, setError] = useState(''); since it's not used

  useEffect(() => {
    // Check if MetaMask is installed on user's browser
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      connectWallet();
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const connectWallet = async () => {
    try {
      // const provider = new ethers.providers.Web3Provider(window.ethereum); // Removed since 'ethers' is not used
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        console.error('No accounts found'); // Changed from setError to console.error
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error); // Kept for error logging
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask.');
      setAccount(null);
    } else {
      setAccount(accounts[0]);
    }
  };

  const handleChainChanged = (_chainId) => {
    window.location.reload();
  };

  return { account, connectWallet, disconnectWallet };
};

export default useMetaMask;
