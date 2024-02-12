import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MetaMaskWallet from './components/MetaMaskWallet';
import B2BHomePage from './components/B2BHomePage';
import useMetaMask from './hooks/useMetaMask';
import useB2BVerification from './hooks/useB2BVerification';

const App = () => {
  const { account, connectWallet, disconnectWallet } = useMetaMask();
  const isVerified = useB2BVerification(account);

  // Since we're using Router here, there's no need to directly use useNavigate.
  // Navigation logic can be adjusted based on state directly within the Routes and Route components.

  return (
    <Router>
      <Routes>
        <Route path="/" element={!account ? <MetaMaskWallet onConnected={connectWallet} onDisconnected={disconnectWallet} /> : (isVerified ? <Navigate replace to="/b2b-home" /> : <p>Verifying...</p>)} />
        <Route path="/b2b-home" element={isVerified ? <B2BHomePage account={account} onDisconnect={disconnectWallet} /> : <Navigate replace to="/" />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
