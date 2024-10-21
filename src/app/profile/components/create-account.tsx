


import ConnectWallet from '@/components/connectWallet'
import { Divider } from '@/components/divider'
import { Heading } from '@/components/heading'
import React from 'react'

export default function CreateAccount() {


     return (
          <div className=''>
               <Heading>Account info</Heading>
               <Divider className="my-10 mt-6" />
               <div className='w-full flex flex-col h-full space-y-6 justify-center items-center'>
                    <p>
                         Connect wallet to setup an account
                    </p>

                    <ConnectWallet />
               </div>
          </div>
     )
}
