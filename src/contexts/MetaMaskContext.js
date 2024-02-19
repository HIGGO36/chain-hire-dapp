// MetaMaskContext.js
import React, { createContext, useContext } from 'react';
import useMetaMask from '../hooks/useMetaMask';

const MetaMaskContext = createContext();

export const MetaMaskProvider = ({ children }) => {
  const { account, connectWallet, disconnectWallet } = useMetaMask();

  return (
    <MetaMaskContext.Provider value={{ account, connectWallet, disconnectWallet }}>
      {children}
    </MetaMaskContext.Provider>
  );
};

export const useMetaMaskContext = () => useContext(MetaMaskContext);
