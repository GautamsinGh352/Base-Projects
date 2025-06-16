import React from 'react';
import {
  WagmiConfig,
  createConfig,
  configureChains
} from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import {
  getDefaultWallets,
  RainbowKitProvider,
  ConnectButton
} from '@rainbow-me/rainbowkit';

import '@rainbow-me/rainbowkit/styles.css';

const { chains, publicClient } = configureChains(
  [sepolia],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Base dApp',
  projectId: '1df0755da43715e85ef7dc8112a97f2d', // Paste your real WalletConnect Project ID here
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <ConnectButton />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
