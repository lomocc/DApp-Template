import type { Web3ReactHooks } from '@web3-react/core';
import type { Connector, Web3ReactStore } from '@web3-react/types';
import React, { useEffect } from 'react';
import { ImSpinner } from 'react-icons/im';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

interface Props {
  config: [Connector, Web3ReactHooks, Web3ReactStore];
}
export default function WalletConnectButton({ config }: Props) {
  const [
    connector,
    {
      useChainId,
      useAccounts,
      useError,
      useIsActivating,
      useIsActive,
      useProvider,
      useENSNames,
    },
  ] = config;

  const chainId = useChainId();
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  // attempt to connect eagerly on mount
  useEffect(() => {
    connector.connectEagerly?.();
  }, []);

  return (
    <div className="border border-amber-300 bg-amber-50 p-4 rounded-lg flex flex-col gap-4 items-center">
      {isActivating ? (
        <ImSpinner className="animate-spin" />
      ) : isActive ? (
        <>
          <div className="flex gap-4 justify-center items-center">
            <div className="text-blue-600 font-bold">chainId: {chainId}</div>
            <button
              className="px-4 py-2 border border-transparent bg-red-500 text-white text-sm font-normal shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 rounded-full"
              onClick={() => connector.deactivate()}
            >
              Disconnect
            </button>
          </div>
          {accounts?.map(account => (
            <div
              key={account}
              className="flex items-center gap-2 rounded-full py-2 px-4 bg-amber-100"
            >
              <Jazzicon diameter={24} seed={jsNumberForAddress(account)} />
              <span>{account.replace(/^(\w{6}).*(\w{4})$/, '$1...$2')}</span>
            </div>
          ))}
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
