'use client';

import { CONTRACT_ADDRESS, TEST_CHAIN_ID } from '@/app/config';
import { ChainId, toWei, useAddress, useChain, useContract, useContractWrite, useSigner, useSwitchChain, useTokenBalance } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { ChangeEvent, useState } from 'react';
import { Button } from './button';
import Drawer from './drawer';
import { Input } from './input';
import { allowance } from "thirdweb/extensions/erc20";




type DepositProps = {
     circleId: string
     currency: "ETH" | "USDT" | "USDC",
     min: number;
}


export default function DepositFunds({ circleId }: DepositProps) {
     const [amountInETH, setAmountInETH] = useState();
     const [isDepositOpen, setIsDepositOpen] = useState(false);
     const chain = useChain();
     const signer = useSigner();
     const switchChain = useSwitchChain();
     const address = useAddress();

     const { contract, isLoading, error } = useContract(CONTRACT_ADDRESS);

     const { mutateAsync, isLoading: writeLoading, error: writeError } = useContractWrite(
          contract,
          "depositETH",
     );

     // const { usdcContract } = useContract("0x036CbD53842c5426634e7929541eC2318f3dCF7e");
     // const { usdcBalance, isLoading: isLoadingBalance, error: errorBalance } = useTokenBalance(
     //      usdcContract,
     //      address,
     // );

     const openDeposit = () => {
          setIsDepositOpen(true);
     }

     const onClose = () => {
          setIsDepositOpen(false);
     }

     const getUsdtPayable = (amount: string) => {
          return ethers.utils.parseUnits(amount, 6);
     }

     const confirmBalance = async () => {
          // if (!signer) return;
          // const contract: any = await getUSDTContract();
          // const userBalance = await contract?.balanceOf(signer.getAddress());
          // console.log({ userBalance })
     }
     const onDeposit = async (amount: string) => {
          confirmBalance()
          if (!chain || chain.chainId !== TEST_CHAIN_ID || !chain.testnet) {
               await switchChain(TEST_CHAIN_ID);
          }
          const amountToDeposit = ethers.utils.parseEther(amount);

          // await mutateAsync({
          //      args: [3],
          // })

          return true;

     }

     const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          const data = new FormData(e.target as any);
          console.log(data);
          const amount = data.get('amountInETH') as string;
          console.log({ amount });

          if (!amount || !address) return;

          await onDeposit(amount);
          await saveToAPi({ circleId, wallet: address as string, amount: Number(amount) ?? 0 });
          // const deposit = await depositToCircle()
     }



     const saveToAPi = async (body: any) => {
          try {
               console.log({ body })
               const res = await fetch('/api/circle', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body), // Send data to the API
               });

               const data = await res.json();
               console.log(data.message);  // Display the server response
          } catch (error) {
               console.error('Error:', error);
          }
     }

     return (
          <div>
               <Button onClick={openDeposit} >Deposit to start saving</Button>
               {
                    <Drawer title='Deposit' isOpen={isDepositOpen} onClose={onClose}>
                         <form onSubmit={onSubmit}>

                              <h3>How mush do you want to save</h3>
                              {/* <Divider /> */}
                              <br />

                              <Input name='amountInETH' type='number' aria-required required />
                              <br />
                              {/* {(isLoading || writeLoading) && <p>Is loading contract</p>} */}
                              {error && <p className='text-red-500'>{JSON.stringify(error)}</p>}
                              <Button isLoading={isLoading || writeLoading} type='submit'>
                                   Proceed
                              </Button>

                         </form>

                    </Drawer>
               }
          </div>
     )
}
