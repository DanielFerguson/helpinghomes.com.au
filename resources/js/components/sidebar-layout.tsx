import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
    { name: 'Team', href: '#', icon: UsersIcon, current: false },
    { name: 'Projects', href: '#', icon: FolderIcon, current: false },
    { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    { name: 'Documents', href: '#', icon: InboxIcon, current: false },
    { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SidebarLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className='text-gray-900'>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2 text-white">
                                        <button
                                            type="button"
                                            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 " aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                                    <div className="flex flex-shrink-0 gap-3 items-center px-4">
                                        <img
                                            className="h-8 w-auto"
                                            src="/icon.svg"
                                            alt="Helping Homes"
                                        />
                                        <h1 className='font-brand text-green-600'>Helping Homes</h1>

                                    </div>
                                    <nav className="mt-5 space-y-1 px-2">
                                        {/* TODO: Navigation */}
                                    </nav>
                                </div>
                                <div className="flex flex-shrink-0 border-t p-4">
                                    <a href="#" className="group block flex-shrink-0">
                                        <div className="flex items-center">
                                            <div>
                                                <img
                                                    className="inline-block h-10 w-10 rounded-full"
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-base font-medium ">Tom Cook</p>
                                                <p className="text-sm font-medium text-gray-400 group-hover:">Logout</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="w-14 flex-shrink-0" aria-hidden="true">
                            {/* Force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex min-h-0 flex-1 flex-col">
                    <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                        <div className="flex flex-shrink-0 gap-3 items-center px-4">
                            <img
                                className="h-8 w-auto"
                                src="/icon.svg"
                                alt="Helping Homes"
                            />
                            <h1 className='font-brand text-green-600'>Helping Homes</h1>
                        </div>
                        <div className='px-4 mt-2'>
                            <p className='text-gray-400 italic text-xs'>Proudly by Helping Group</p>
                        </div>
                        <nav className="flex-1 space-y-1 divide-y">
                            {/* Register to sign up */}
                            <div className="px-4 grid gap-3 py-6">
                                <h2 className='text-lg font-medium'>Register an offer</h2>
                                <p className='text-sm font-normal'>Please login to create an offer.</p>
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md border border-transparent bg-green-100 px-3 py-2 text-sm font-medium leading-4 text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    Login
                                </button>
                            </div>
                            {/* Link to give page */}
                            <div className="px-4 grid gap-3 py-6">
                                <h2 className='text-lg font-medium'>Other ways to help</h2>
                                <p className='text-sm'>Not everyone can offer accomodation, however there are other ways to make an immediate, meaningful impact in this time of crisis.</p>
                                <p className='text-sm'>Each of these organisations are helping communities affected by natural disaster right now - <b>and they need our help.</b></p>
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Find out how
                                </button>
                            </div>
                            {/* Assistance */}
                            <div className="px-4 grid gap-3 py-6">
                                <h2 className='text-lg font-medium'>Get assistance</h2>
                                <p className='text-sm text-red-600 font-bold'>If you need urgent assistance, please call 000 immediately.</p>
                                <p className='text-sm'>There are other fantastic organisations who are helping in so many ways, and we want to recognise them, and enable people find the help they need.</p>
                            </div>
                        </nav>
                    </div>
                    {/* TODO: Only if authenticated */}
                    <div className="flex flex-shrink-0 border-t p-4">
                        <a href="#" className="group block w-full flex-shrink-0">
                            <div className="flex items-center">
                                <div>
                                    <img
                                        className="inline-block h-9 w-9 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium ">Tom Cook</p>
                                    <p className="text-xs font-medium text-gray-400 group-hover:">Logout</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div >
            <div className="flex flex-1 flex-col md:pl-64 h-screen">
                <div className="sticky top-0 z-10 p-1 md:hidden">
                    <button
                        type="button"
                        className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div >
    )
}
