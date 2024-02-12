// src/hooks/useB2BVerification.js

import { useState, useEffect } from 'react';

const useB2BVerification = (account) => {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyAccount = () => {
      // Adding the provided address to the list of verified addresses
      const verifiedAddresses = [
        '0x516c1c62ee8dbf726b6b11f0acd77e90837c8403',
        // Add other addresses as needed
      ];

      if (verifiedAddresses.includes(account)) {
        setIsVerified(true);
      } else {
        setIsVerified(false);
      }
    };

    if (account) {
      verifyAccount();
    }
  }, [account]);

  return isVerified;
};

export default useB2BVerification;
