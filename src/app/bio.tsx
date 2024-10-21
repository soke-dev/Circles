'use client';


import { Avatar } from '@/components/avatar';
import { getAccount, Profile } from '@/lib/account';
import { useAddress } from '@thirdweb-dev/react';
import React, { useEffect, useState } from 'react'
import { LOGO_URL } from './config';

export default function Bio() {
     const address = useAddress();
     const [account, setState] = useState<Profile | null>();
     useEffect(() => {
          getAccount(address).then(setState)

     }, [address]);
     return (

          <span className="flex min-w-0 items-center gap-3">
               <Avatar src={account?.avatar ?? LOGO_URL} className="size-10" square alt="" />
               <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">  {account?.name}</span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                         {account?.twitter}
                    </span>
               </span>
          </span>

     )
}
