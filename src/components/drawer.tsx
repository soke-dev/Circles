'use client'

import { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Drawer({ children, isOpen, onClose, title }: { isOpen: boolean, onClose: () => void, title: string, children: any }) {


     return (
          <Dialog open={isOpen} onClose={(e) => onClose()} className="relative z-10">
               <div className="fixed inset-0" />

               <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                         <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                              <DialogPanel
                                   transition
                                   className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                              >
                                   <div className="flex h-full flex-col overflow-y-scroll bg-zinc-800 py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                             <div className="flex items-start justify-between">
                                                  <DialogTitle className="text-base font-semibold leading-6 text-gray-300"> {title}</DialogTitle>
                                                  <div className="ml-3 flex h-7 items-center">
                                                       <button
                                                            type="button"
                                                            onClick={() => onClose()}
                                                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                       >
                                                            <span className="absolute -inset-2.5" />
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                                       </button>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">{children}</div>
                                   </div>
                              </DialogPanel>
                         </div>
                    </div>
               </div>
          </Dialog>
     )
}
