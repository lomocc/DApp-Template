import { useWeb3React } from '@web3-react/core';
import React from 'react';
import { ImSpinner } from 'react-icons/im';
import ConnectCard from './components/ConnectCard';
import Wallet from './components/Wallet';

export default function Dashboard() {
  const { isActivating, isActive } = useWeb3React();
  return (
    <>
      {/* <div className="flex flex-col gap-4 border p-4">
        <WalletConnectButton config={Connector.COINBASE} />
        <WalletConnectButton config={Connector.METAMASK} />
      </div> */}

      {isActivating && <ImSpinner className="animate-spin" />}
      {isActive ? <Wallet /> : <ConnectCard />}

      {/* <Wallet />
      <ConnectCard /> */}
    </>
  );
}
