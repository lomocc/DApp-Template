import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';

export default {
  METAMASK: initializeConnector<MetaMask>(
    actions => new MetaMask(actions, true)
  ),
  COINBASE: initializeConnector<CoinbaseWallet>(
    actions =>
      new CoinbaseWallet(
        actions,
        {
          url: `https://mainnet.infura.io/v3/${process.env.REACT_APP_WEB3_INFURA_PROJECT_ID}`,
          // @ts-ignore
          appName: 'web3-react',
        },
        true
      )
  ),
};
