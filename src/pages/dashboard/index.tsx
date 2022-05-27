import { useWeb3React } from '@web3-react/core';
import React from 'react';
import { ImSpinner } from 'react-icons/im';
import ConnectWalletCard from './components/ConnectWalletCard';
import Wallet from './components/Wallet';

export default function Dashboard() {
  const { isActivating, isActive } = useWeb3React();
  return (
    <>
      {isActivating && <ImSpinner className="animate-spin" />}
      {isActive ? <Wallet /> : <ConnectWalletCard />}
    </>
  );
}
