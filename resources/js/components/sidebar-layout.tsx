import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    UsersIcon,
    XMarkIcon,
    PlusIcon
} from '@heroicons/react/24/outline'
import { usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'

const CreateModal = ({ open, toggleFn }) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={toggleFn}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                        <PlusIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                            Create an Offer or Report
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                If you can provide temporary emergency accomodation or report a danger like road damage, please report it here.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    {/* TODO: add here */}

                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                        onClick={() => toggleFn(false)}
                                    >
                                        Go back to dashboard
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

const AuthModal = ({ open, toggleFn }) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={toggleFn}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                        <UsersIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                            Login
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Login with your preferred platform to create an offer, request offer details and more.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 grid gap-3">
                                    <a
                                        href="/auth/redirect/github"
                                        className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                    >
                                        <img className="-ml-1 mr-3 h-5 w-5 text-white" src='/assets/icons/github.svg' />
                                        Github (Dev Only)
                                    </a>
                                    <a
                                        href="/auth/redirect/apple"
                                        className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                    >
                                        <img className="-ml-1 mr-3 h-5 w-5 text-white" src='/assets/icons/apple.svg' />
                                        Apple
                                    </a>
                                    <a
                                        href="/auth/redirect/facebook"
                                        className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                    >
                                        <img className="-ml-1 mr-3 h-5 w-5 text-white" src='/assets/icons/facebook.svg' />
                                        Facebook
                                    </a>
                                    <a
                                        href="/auth/redirect/google"
                                        className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                    >
                                        <img className="-ml-1 mr-3 h-5 w-5 text-white" src='/assets/icons/google.svg' />
                                        Google
                                    </a>
                                    <a
                                        href="/auth/redirect/twitter"
                                        className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                    >
                                        <img className="-ml-1 mr-3 h-5 w-5 text-white" src='/assets/icons/twitter.svg' />
                                        Twitter
                                    </a>
                                    <button
                                        className="inline-flex w-full justify-center px-4 py-2 text-sm hover:text-green-600"
                                        onClick={() => toggleFn(false)}
                                    >
                                        Back to map
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default function SidebarLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(true)
    const { auth } = usePage().props

    const logoutFn = () => {
        Inertia.visit('/logout', {
            method: 'post',
        });
    };

    return (
        <div className='text-gray-900'>
            {/* Create modal */}
            <CreateModal open={createModalOpen} toggleFn={setCreateModalOpen} />

            {/* Auth modal */}
            <AuthModal open={authModalOpen} toggleFn={setAuthModalOpen} />

            {/* Sidebar */}
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
                                {auth.user && (
                                    <div className="flex flex-shrink-0 border-t p-4">
                                        <button onClick={() => logoutFn()} className="group block flex-shrink-0 ml-2">
                                            <p className="text-base font-medium ">{auth.user.name}</p>
                                            <p className="text-sm font-medium text-gray-400 group-hover:">Logout</p>
                                        </button>
                                    </div>
                                )}
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
                            {!auth.user && (
                                <div className="px-4 grid gap-3 py-6">
                                    <h2 className='text-lg font-medium'>Register an offer</h2>
                                    <p className='text-sm font-normal'>Please login to create an offer.</p>
                                    <button
                                        type="button"
                                        onClick={() => setAuthModalOpen(true)}
                                        className="inline-flex items-center rounded-md border border-transparent bg-green-100 px-3 py-2 text-sm font-medium leading-4 text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                    >
                                        Login
                                    </button>
                                </div>
                            )}
                            {/* Submit an offer */}
                            {auth.user && (
                                <div className="px-4 py-6">
                                    <button
                                        type="button"
                                        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mx-auto h-12 w-12 text-gray-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="mt-2 block text-sm font-medium text-gray-900">Create an offer or report</span>
                                    </button>
                                </div>
                            )}
                            {/* Link to give page */}
                            <div className="px-4 grid gap-3 py-6">
                                <h2 className='text-lg font-medium'>Other ways to help</h2>
                                <p className='text-sm'>Not everyone can offer accomodation, however there are other ways to make an immediate, meaningful impact in this time of crisis.</p>
                                <p className='text-sm'>Each of these organisations are helping communities affected by natural disaster right now - <b>and they need our help.</b></p>
                                <a
                                    href="/help"
                                    className="inline-flex items-center rounded-md mt-2 border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    Find out how
                                </a>
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
                    {auth.user && (
                        <div className="flex flex-shrink-0 border-t p-4">
                            <button onClick={() => logoutFn()} className="group block w-full flex-shrink-0 ml-2">
                                <p className="text-sm font-medium ">{auth.user.name}</p>
                                <p className="text-xs font-medium text-gray-400 group-hover:">Logout</p>
                            </button>
                        </div>
                    )}
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
