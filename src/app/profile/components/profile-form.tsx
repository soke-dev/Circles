'use client';
import { Button } from '@/components/button';
import { Divider } from '@/components/divider';
import { Heading, Subheading } from '@/components/heading';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { createAccount, getAccount, Profile, updateAccount } from '@/lib/account';
import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect, useState } from 'react';
import CreateAccount from './create-account';
// const connedWallet = useConnectedWallet();



export default function ProfileForm() {


     const address = useAddress();

     const [state, setState] = useState<Partial<Profile>>({})
     const [isLoading, setIsLoading] = useState(false);


     useEffect(() => {
          if (!address) {
               return;
          }
          getProfile(address);
     }, [address]);

     const getProfile = async (wallet: string) => {
          const acc = await getAccount(wallet);
          if (acc) {
               console.log(acc)
               setState(acc);
               return;
          }
          // create a new account
          const newAccount = await createAccount(wallet);
          if (newAccount) {
               setState(newAccount);
          }
     }


     const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const name = data.get('name') as string;
          const twitter = data.get('twitter') as string;
          const discord = data.get('discord') as string;

          if (!address) return;
          setIsLoading(true);
          try {
               const update = await updateAccount(address, { name, twitter, discord });
               setState(update);
          } catch (err) {
               console.log(err)
          }
          setIsLoading(false);
     }


     if (!address) return <CreateAccount />

     return (
          <form onSubmit={onSubmit} className="mx-auto max-w-4xl">
               <Heading>Account info</Heading>
               <Divider className="my-10 mt-6" />

               <span className="inline-block h-14 w-14 overflow-hidden rounded-full bg-gray-100">

                    <img src={state?.avatar ?? ''} alt="avatar" />
               </span>

               <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="space-y-1">
                         <Subheading>Nickname </Subheading>
                         <Text>This will be displayed on your public profile.</Text>
                    </div>
                    <div>
                         <Input aria-label="name" name="name" value={state?.name ?? ''} />
                    </div>
               </section>

               <Divider className="my-10" soft />

               <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="space-y-1">
                         <Subheading>Twitter Handle</Subheading>
                         <Text>This will be displayed on your public profile.</Text>
                    </div>
                    <div>
                         <Input aria-label="Twitter Handle" name="twitter" defaultValue={state?.twitter ?? ''} />
                    </div>
               </section>

               <Divider className="my-10" soft />

               <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="space-y-1">
                         <Subheading>Discord Handle</Subheading>
                         <Text>This will be displayed on your public profile.</Text>
                    </div>
                    <div>
                         <Input aria-label="Discord Handle" name="discord" defaultValue={state?.discord ?? ''} />
                    </div>
               </section>

               <Divider className="my-10" soft />




               {/* <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="space-y-1">
                         <Subheading>Currency</Subheading>
                         <Text>The currency that your organization will be collecting.</Text>
                    </div>
                    <div>
                         <Select aria-label="Currency" name="currency" defaultValue="cad">
                              <option value="cad">CAD - Canadian Dollar</option>
                              <option value="usd">USD - United States Dollar</option>
                         </Select>
                    </div>
               </section> */}

               {/* <Divider className="my-10" soft /> */}

               <div className="flex justify-end gap-4">

                    <Button isLoading={isLoading} type="submit">Save changes</Button>
               </div>
          </form>
     )
}
