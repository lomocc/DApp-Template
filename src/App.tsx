import { Web3ReactProvider } from '@web3-react/core';
import consolev from 'consolev';
import { format } from 'date-fns';
import preval from 'preval.macro';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Connector from './constants/Connector';
import { PrivateLayout } from './layouts';
import Index from './pages/index';
import Signin from './pages/signin';

/**
 * 打印项目信息
 */
consolev(
  `${process.env.REACT_APP_NAME}@${process.env.REACT_APP_VERSION}`,
  process.env.REACT_APP_SHA,
  format(preval`module.exports = Date.now();`, 'yyyy/MM/dd HH:mm:ss')
);

export default function App() {
  return (
    <Web3ReactProvider connectors={[Connector.COINBASE, Connector.METAMASK]}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Index />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/*" element={<PrivateLayout />} />
        </Routes>
      </BrowserRouter>
    </Web3ReactProvider>
  );
}
