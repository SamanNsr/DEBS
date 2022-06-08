import { ethers } from 'ethers';
import React, { useState, useEffect, useRef } from 'react';
import { contracts, networks } from '../constants';

export const AccountContext = React.createContext();

let eth;

if (typeof window !== 'undefined') {
  eth = window.ethereum;
}

const getEthereumContract = (contractAddress, contractABI) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    return contract;
  } catch (error) {
    throw new Error(error);
  }
};

export const AccountProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [storageContract, setStorageContract] = useState();
  const [storageContractExist, setStorageContractExist] = useState(false);

  const { storageFactoryAddress, storageFactoryABI } = contracts;
  const factoryContract = useRef();

  useEffect(() => {
    const connectNetwork = async () => {
      try {
        await switchNetwork();
        factoryContract.current = getEthereumContract(
          storageFactoryAddress,
          storageFactoryABI,
        );
      } catch (error) {
        console.log(error);
      }
    };

    connectNetwork();
  }, []);

  useEffect(() => {
    const connectUser = async () => {
      try {
        const isConnected = await checkIfWalletConnected();
        if (isConnected) await computeStorageContract();
      } catch (error) {
        console.log(error);
      }
    };
    connectUser();
  }, [factoryContract]);

  useEffect(() => {
    const networkChanged = async () => {
      alert('Network changed');
    };
    if (eth) eth.on('chainChanged', networkChanged);

    return () => {
      if (eth) {
        eth.removeListener('chainChanged', networkChanged);
      }
    };
  }, []);

  const switchNetwork = async () => {
    try {
      await eth.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: networks.bscTestnet.chainId }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await eth.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                ...networks.bscTestnet,
              },
            ],
          });
        } catch (addError) {
          alert("Couldn't add Binance Smart Chain Testnet to MetaMask. Please try again.");
        }
      }
    }
  };

  const connectWallet = async (metamask = eth) => {
    try {
      if (!metamask) return alert('Please install MetaMask');
      const accounts = await metamask.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
      await computeStorageContract();
    } catch (error) {
      console.error(error);
      throw new Error('No ethereum Object');
    }
  };

  const checkIfWalletConnected = async (metamask = eth) => {
    try {
      if (!metamask) return alert('Please install MetaMask');
      const accounts = await metamask.request({ method: 'eth_accounts' });
      console.log(accounts);
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log('Wallet is already connected!');
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      throw new Error('No ethereum Object');
    }
  };

  const computeStorageContract = async () => {
    try {
      const addr = await factoryContract.current.computeAddress();
      const contract = getEthereumContract(addr, contracts.storageABI);
      setStorageContract(contract);
      console.log('contract', contract);
      try {
        const name = await contract.name();
        if (name === 'Storage') {
          setStorageContractExist(true);
        }
      } catch (error) {
        console.log('test');
      }
    } catch (error) {
      console.log(error);
      throw new Error('Can not compute the storage contract address');
    }
  };

  const deployStorageContract = async () => {
    try {
      await factoryContract.current.deployStorage();
      setStorageContractExist(true);
    } catch (error) {
      console.log(error);
      throw new Error('Can not deploy the storage contract');
    }
  };

  return (
    <AccountContext.Provider
      value={{
        currentAccount,
        connectWallet,
        factoryContract: factoryContract.current,
        storageContract,
        storageContractExist,
        deployStorageContract,
        setStorageContractExist,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
