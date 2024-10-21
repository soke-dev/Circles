'use client';

import {
     ThirdwebProvider,
     metamaskWallet,
     coinbaseWallet,
     walletConnect,
     Web3Button,
     useConnect, useConnectedWallet,
     SmartContract,
} from "@thirdweb-dev/react";
import { Button } from "./button";
import WalletProvider, { ContractAddress } from "@/providers/walletProvider";


const walletConfig = metamaskWallet();

export default function ConnectWallet() {


     const wallets = useConnectedWallet();

     return (


          <Web3Button
               contractAddress={ContractAddress}
               action={async (contract) => contract.call("myFunctionName")}
          >
               connected wallet
          </Web3Button>

     );
}
