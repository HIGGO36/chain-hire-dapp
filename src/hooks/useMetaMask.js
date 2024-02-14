import { useState, useEffect } from 'react';

const useMetaMask = () => {

    const [account, setAccount] = useState(null);

    // Function to manually connect to MetaMask
    const connectWallet = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length > 0) {
                setAccount(accounts[0]);
            } else {
                console.error('No accounts found');
            }
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
        }
  };
  
   // Function to "disconnect" the wallet, which for the UI's purpose will just reload the page
    const disconnectWallet = () => {
        // Simply reload the page to reset the application state
        window.location.reload();
    };

    // Handle accounts changing
    const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
            console.log('Please connect to MetaMask.');
            setAccount(null);
        } else {
            setAccount(accounts[0]);
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', () => window.location.reload());
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                window.ethereum.removeListener('chainChanged', () => window.location.reload());
            }
        };
    }, []);

  return { account, connectWallet, disconnectWallet };
};

export default useMetaMask;
