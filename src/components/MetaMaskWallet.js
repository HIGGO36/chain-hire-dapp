import React from 'react';
import { Button } from '@material-ui/core';
import useMetaMask from '../hooks/useMetaMask';

const MetaMaskWallet = () => {
  const { account, connectWallet, disconnectWallet } = useMetaMask();

  return (
    <div>
      {!account ? (
        <Button variant="contained" color="primary" onClick={connectWallet}>
          Connect MetaMask Wallet
        </Button>
      ) : (
        <>
          <Button variant="contained" color="secondary" disabled>
            Connected
          </Button>
          <p>Account: {account}</p>
          {/* If you want to provide a disconnect button */}
          <Button variant="contained" color="primary" onClick={disconnectWallet}>
            Disconnect Wallet
          </Button>
        </>
      )}
    </div>
  );
};

export default MetaMaskWallet;
