import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';

export default function useWeb3Balance() {
  const { account, provider } = useWeb3React();
  const { data } = useSWR(
    provider && account ? [provider, account] : null,
    (provider, account) => provider.getBalance(account)
  );
  return data;
}
