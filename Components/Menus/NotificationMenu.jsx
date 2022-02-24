import React, { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import { XIcon, ChatAltIcon, ChevronRightIcon } from '@heroicons/react/solid'

function NotificationMenu({ show, setShow, requests, error, loading }) {
    return (
        <>
            {/* Global notification live region, render this permanently at the end of the document */}
            <div
                aria-live="assertive"
                className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start mt-12 w-full"
            >
                <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                    {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                    <Transition
                        show={show}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className={`max-w-sm bg-white w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5`}>
                            <div className="flex flex-row items-center w-full justify-between px-4 py-2">
                                <p className="text-gray-900 font-bold text-lg">Notifications</p>
                                <div className="ml-4 flex">
                                    <button
                                        className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 outline-none"
                                        onClick={() => {
                                            setShow(false)
                                        }}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-2">
                                <div className="flex items-start">
                                    <div className="flex flex-col flex-1">
                                        <div className="flex flex-row items-center justify-between p-2 cursor-pointer hover:bg-gray-100">
                                            <div className="flex flex-row items-center">
                                                <ChatAltIcon height={20} width={20} className='text-gray-700' />
                                                <p className='text-gray-700 font-semibold ml-2'>View All Messages</p>
                                            </div>
                                            <ChevronRightIcon height={20} width={20} />
                                        </div>
                                        <p className='text-sm text-gray-700 text-center font-semibold my-2'>Notifications</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Transition>
                </div>
            </div>
        </>
    )
}

export default NotificationMenu