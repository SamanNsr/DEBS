import React, { useState, useEffect } from 'react';

export const AccountContext = React.createContext();

let eth;

if (typeof window !== 'undefined') {
  eth = window.ethereum;
}

export const AccountProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const connectWallet = async (metamask = eth) => {
    try {
      if (!metamask) return alert('Please install MetaMask');
      const accounts = await metamask.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error('No ethereum Object');
    }
  };

  const checkIfWalletConnected = async (metamask = eth) => {
    try {
      if (!metamask) return alert('Please install MetaMask');
      const accounts = await metamask.request({ method: 'eth_accounts' });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log('Wallet is already connected!');
      }
    } catch (error) {
      console.error(error);
      throw new Error('No ethereum Object');
    }
  };

  return (
    <AccountContext.Provider
      value={{
        currentAccount,
        connectWallet,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
