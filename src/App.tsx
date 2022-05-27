import { Web3ReactProvider } from '@web3-react/core';
import consolev from 'consolev';
import { format } from 'date-fns';
import preval from 'preval.macro';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CoinbaseConnector from './connectors/CoinbaseConnector';
import MetamaskConnector from './connectors/MetamaskConnector';
import { PrivateLayout } from './layouts';
import Signin from './pages/signin';

/**
 * print the version of the app
 */
consolev(
  `${process.env.REACT_APP_NAME}@${process.env.REACT_APP_VERSION}`,
  process.env.REACT_APP_SHA,
  format(preval`module.exports = Date.now();`, 'yyyy/MM/dd HH:mm:ss')
);

export default function App() {
  return (
    <Web3ReactProvider
      connectors={[CoinbaseConnector, MetamaskConnector]}
      // allow the user to change the network
      network="any"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/*" element={<PrivateLayout />} />
        </Routes>
      </BrowserRouter>
    </Web3ReactProvider>
  );
}
