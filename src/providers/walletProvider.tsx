'use client';

import {
     ThirdwebProvider,
     metamaskWallet,
     coinbaseWallet,
     walletConnect, okxWallet, rainbowWallet, zerionWallet,
} from "@thirdweb-dev/react";
import { Ethereum, Polygon,BaseSepoliaTestnet } from "@thirdweb-dev/chains";


export const ContractAddress = "0x5D263079F0b56493eAD02f3b89ff9DCa39e50F9d"
export const clientId = "b8200da8df9bf00951af6798aef7bea0"

export default function WalletProvider({ children }: { children: React.ReactNode }) {
     return (
          <ThirdwebProvider
               activeChain="base-sepolia-testnet"
               clientId={clientId}
               supportedChains={[BaseSepoliaTestnet]}
               autoConnect={true}
               supportedWallets={[
                    metamaskWallet({
                         recommended: true,
                    }),
                    coinbaseWallet(),
                    walletConnect(), okxWallet(), rainbowWallet(), zerionWallet()
               ]}
          >
               {children}
          </ThirdwebProvider>
     );
}
