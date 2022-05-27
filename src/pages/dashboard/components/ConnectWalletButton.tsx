import type { Web3ReactHooks } from '@web3-react/core';
import type { Connector, Web3ReactStore } from '@web3-react/types';
import React, { HTMLProps, useCallback } from 'react';
import { useLatest } from 'react-use';

interface Props extends HTMLProps<HTMLButtonElement> {
  config: [Connector, Web3ReactHooks, Web3ReactStore];
}
export default function ConnectButton({ config, children, ...props }: Props) {
  const [connector] = config;
  const connectorRef = useLatest(connector);
  const onClick = useCallback(() => {
    connectorRef.current.activate();
  }, []);

  return (
    <button {...props} type="button" onClick={onClick}>
      {children}
    </button>
  );
}
