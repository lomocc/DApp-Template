import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';

export default function useWeb3Balance() {
  const { account, provider, chainId } = useWeb3React();
  const { data } = useSWR(
    provider && account && chainId ? [provider, account, chainId] : null,
    ([provider, account, chainId]) => provider.getBalance(account)
  );
  return data;
}
