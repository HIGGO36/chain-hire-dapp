import React from 'react';
import { Button } from '@material-ui/core';
import { useMetaMaskContext } from '../contexts/MetaMaskContext';

const MetaMaskWallet = () => {
  const { account, connectWallet, disconnectWallet } = useMetaMaskContext();

  return (
    <div>
      {!account ? (
        <Button variant="contained" color="primary" onClick={connectWallet}>
          Connect MetaMask Wallet
        </Button>
      ) : (
        <>
          <Button variant="contained" color="secondary" disabled>
            Connected - {account.substring(account.length - 4)}
          </Button>
          <Button variant="contained" color="primary" onClick={disconnectWallet}>
            Disconnect Wallet
          </Button>
        </>
      )}
    </div>
  );
};

export default MetaMaskWallet;
