import { formatEther } from '@ethersproject/units';
import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { useWeb3React } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import type { Connector } from '@web3-react/types';
import { ReactNode } from 'react';
import { ImSpinner } from 'react-icons/im';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import useWeb3Balance from '../../../data/useWeb3Balances';

function getName(connector: Connector) {
  if (connector instanceof MetaMask) return 'MetaMask';
  if (connector instanceof CoinbaseWallet) return 'Coinbase Wallet';
  return 'Unknown';
}

const chainNames: Record<string, ReactNode> = {
  1: (
    <div className="flex items-center gap-2">
      <div className="bg-teal-500 rounded-full aspect-square w-3 h-3"></div>
      <span>Ethereum Main Network</span>
    </div>
  ),
  3: (
    <div className="flex items-center gap-2">
      <div className="bg-rose-500 rounded-full aspect-square w-3 h-3"></div>
      <span>Ropsten Test Network</span>
    </div>
  ),
  4: (
    <div className="flex items-center gap-2">
      <div className="bg-yellow-400 rounded-full aspect-square w-3 h-3"></div>
      <span>Rinkeby Test Network</span>
    </div>
  ),
  5: (
    <div className="flex items-center gap-2">
      <div className="bg-blue-600 rounded-full aspect-square w-3 h-3"></div>
      <span>Goerli Test Network</span>
    </div>
  ),
  42: (
    <div className="flex items-center gap-2">
      <div className="bg-purple-500 rounded-full aspect-square w-3 h-3"></div>
      <span>Kovan Test Network</span>
    </div>
  ),
};

export default function Wallet() {
  const { connector, isActive, isActivating, account, chainId } =
    useWeb3React();
  const balance = useWeb3Balance();
  return (
    <div className="border border-amber-300 bg-amber-50 p-4 rounded-lg flex flex-col gap-4 items-center">
      {isActivating ? (
        <ImSpinner className="animate-spin" />
      ) : isActive ? (
        <>
          <div className="flex flex-col items-center gap-2">
            <div className="text-blue-600 font-bold">
              Wallet: {getName(connector)}
            </div>
            <div className="flex gap-4 justify-center items-center">
              <div>{chainNames[String(chainId)]}</div>
              <button
                className="px-4 py-2 border border-transparent bg-red-500 text-white text-sm font-normal shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 rounded-full"
                onClick={() => connector.deactivate()}
              >
                Disconnect
              </button>
            </div>
          </div>
          {account && (
            <div className="flex items-center gap-2 rounded-full py-2 px-4 bg-amber-100">
              <Jazzicon diameter={24} seed={jsNumberForAddress(account)} />
              <span>{account.replace(/^(\w{6}).*(\w{4})$/, '$1...$2')}</span>
            </div>
          )}
          <span>{formatEther(balance ?? '0')} ETH</span>
        </>
      ) : (
        <div className="flex flex-col p-4 gap-4 items-center justify-center">
          <button
            className="px-4 py-2 border border-transparent bg-blue-500 text-white text-sm font-normal shadow-sm hover:bg-blue-600 transition disabled:cursor-not-allowed rounded-full"
            onClick={() => connector.activate()}
          >
            Connect
          </button>
        </div>
      )}
    </div>
  );
}
