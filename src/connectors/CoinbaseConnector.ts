import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { initializeConnector } from '@web3-react/core';

export default initializeConnector<CoinbaseWallet>(
  actions =>
    new CoinbaseWallet(
      actions,
      {
        url: `https://mainnet.infura.io/v3/${process.env.REACT_APP_WEB3_INFURA_PROJECT_ID}`,
        appName: process.env.REACT_APP_NAME ?? 'Unknown',
      },
      true
    )
);
