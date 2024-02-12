import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const useMetaMask = () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log('MetaMask is not installed!');
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);

    const getAccounts = async () => {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        console.log("user is connected");
        setAccount(accounts[0]);
      } else {
        console.log("user not connected");
        setAccount(null);
      }
    };

    // Call getAccounts to set the initial account
    getAccounts();

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        console.log("user not connected");
        setAccount(null);
      } else {
        console.log("user is connected");
        setAccount(accounts[0]);
      }
    };

    // Listen for account changes
    ethereum.on('accountsChanged', handleAccountsChanged);

    // Cleanup function to remove the listener
    return () => ethereum.removeListener('accountsChanged', handleAccountsChanged);
  }, []);

  const connectWallet = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert('Please install MetaMask to use this feature.');
      return;
    }
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
      // The 'accountsChanged' event will update the state
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  const disconnectWallet = () => {
    // Simulate wallet disconnection by resetting the account state
    setAccount(null);
    console.log("Wallet disconnected");
    // Additional cleanup or state reset actions can be performed here
  };

  return { account, connectWallet, disconnectWallet };
};

export default useMetaMask;
