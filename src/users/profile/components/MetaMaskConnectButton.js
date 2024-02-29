// src/users/profile/components/MetaMaskConnectButton.js
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

const MetaMaskConnectButton = ({ onConnect, className }) => {
    const [connectedAccount, setConnectedAccount] = useState(null);

    useEffect(() => {
        const checkConnection = async () => {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    setConnectedAccount(accounts[0]);
                } else {
                    setConnectedAccount(null);
                }
            } catch (error) {
                console.error('Error checking MetaMask connection:', error);
                setConnectedAccount(null);
            }
        };

        checkConnection();
    }, []);

    const handleConnect = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length > 0) {
                setConnectedAccount(accounts[0]);
                onConnect(accounts[0]);
            } else {
                setConnectedAccount(null);
            }
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            setConnectedAccount(null);
        }
    };

    // Function to truncate and format the wallet address
    const formatAddress = (address) => 
        `${address.slice(0, 6)}...${address.slice(-4)}`;

    return (
        <Button
            variant="outlined"
            onClick={handleConnect}
            sx={{
                backgroundColor: connectedAccount ? 'orange' : 'white',
                color: 'black',
                fontWeight: connectedAccount ? 'bold' : 'normal',
                position: 'fixed',
                top: '-70px',
                left: '0',
                borderRadius: '27px 27px 27px 0px',
                width: '140px',
                overflow: 'hidden',
                display: 'block',
                // transform: 'rotate(90deg)',
                 '&:hover, &:focus': {
                    backgroundColor: 'white',
                    color: 'black',
                },
            }}
            className={className}>
            {connectedAccount ? `Connected: ${formatAddress(connectedAccount)}` : 'Connect MetaMask'}
        </Button>
    );
};

export default MetaMaskConnectButton;
