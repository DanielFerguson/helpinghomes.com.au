import React, { Fragment, useState, useCallback, useRef, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    UsersIcon,
    XMarkIcon,
    MapPinIcon,
} from '@heroicons/react/24/outline'
import {
    HomeIcon,
    ExclamationTriangleIcon,
    PencilSquareIcon,
    PlusCircleIcon
} from '@heroicons/react/24/solid'
import { usePage, useForm } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import Map, { GeolocateControl, Marker } from 'react-map-gl';

const CreateOfferModal = ({ open, toggleFn }) => {
    const mapRef = useRef();
    const { auth } = usePage().props
    const { data, setData, post, processing, errors } = useForm({
        canTakeSingles: false,
        canTakeCouples: false,
        canTakeFamilies: false,
        canTakePets: 'false',
        lat: -37.8136,
        lng: 144.9631,
        type: 'HOUSING',
        user_id: auth.user.id
    })

    const onMapLoad = useCallback(() => {
        mapRef.current.on('move', () => {
            const coordinates = mapRef.current.getCenter();

            setData(data => ({ ...data, lat: coordinates.lat }));
            setData(data => ({ ...data, lng: coordinates.lng }));
        });
    }, []);

    function submit(e) {
        e.preventDefault()
        post('/offers', {
            onSuccess: () => toggleFn(false)
        })
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => toggleFn(false)}>
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
                                <form onSubmit={submit} className="space-y-6 divide-y divide-gray-200">
                                    <div className="space-y-6 divide-y divide-gray-200">
                                        <div>
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">Offer</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                This information will be displayed publicly so be careful what you share.
                                            </p>
                                        </div>

                                        <div className="pt-6">
                                            <legend className="sr-only">Location</legend>
                                            <div className="text-base font-medium text-gray-900" aria-hidden="true">
                                                Location
                                            </div>
                                            <div id='offer-location-select' className="h-64 w-full relative mt-4">
                                                <Map
                                                    ref={mapRef}
                                                    initialViewState={{
                                                        longitude: 144.9631,
                                                        latitude: -37.8136,
                                                        zoom: 5
                                                    }}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%'
                                                    }}
                                                    onLoad={onMapLoad}
                                                    mapStyle="mapbox://styles/mapbox/streets-v9"
                                                    mapboxAccessToken="pk.eyJ1IjoiZGFuaWVsZmVyZ3Vzb24iLCJhIjoiY2w5YXFjazNtMGp1ZTNwcXdtMjBlYTc2YyJ9.2Cz8UmqgWB4VpagnJ6_ATw"
                                                >
                                                    <Marker longitude={data.lng} latitude={data.lat} anchor="bottom" />
                                                    <GeolocateControl />
                                                </Map>
                                            </div>
                                        </div>

                                        <div className="pt-6">
                                            {/* Capacity */}
                                            <fieldset>
                                                <legend className="sr-only">Capacity</legend>
                                                <div className="text-base font-medium text-gray-900" aria-hidden="true">
                                                    Capacity
                                                </div>
                                                <p className="text-sm text-gray-500">Please select those that you could accomodate.</p>
                                                <div className="mt-4 space-y-4">
                                                    {/* Single */}
                                                    <div className="relative flex items-start">
                                                        <div className="flex h-5 items-center">
                                                            <input
                                                                id="capacity-single"
                                                                name="capacity-single"
                                                                type="checkbox"
                                                                checked={data.canTakeSingles}
                                                                onChange={e => setData('canTakeSingles', e.target.checked)}
                                                                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                            />
                                                        </div>
                                                        <div className="ml-3 text-sm">
                                                            <label htmlFor="capacity-single" className="font-medium text-gray-700">
                                                                Single
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {/* Couple */}
                                                    <div className="relative flex items-start">
                                                        <div className="flex h-5 items-center">
                                                            <input
                                                                id="capacity-couple"
                                                                name="capacity-couple"
                                                                type="checkbox"
                                                                checked={data.canTakeCouples}
                                                                onChange={e => setData('canTakeCouples', e.target.checked)}
                                                                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                            />
                                                        </div>
                                                        <div className="ml-3 text-sm">
                                                            <label htmlFor="capacity-couple" className="font-medium text-gray-700">
                                                                Couple
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {/* Family */}
                                                    <div className="relative flex items-start">
                                                        <div className="flex h-5 items-center">
                                                            <input
                                                                id="capacity-family"
                                                                name="capacity-family"
                                                                type="checkbox"
                                                                checked={data.canTakeFamilies}
                                                                onChange={e => setData('canTakeFamilies', e.target.checked)}
                                                                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                            />
                                                        </div>
                                                        <div className="ml-3 text-sm">
                                                            <label htmlFor="capacity-family" className="font-medium text-gray-700">
                                                                Family
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>

                                        <div className="pt-6">
                                            {/* Can Take Pets? */}
                                            <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4">
                                                <label htmlFor="can-take-pets" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                    Can you take pets?
                                                </label>
                                                <div className="mt-1 col-span-1 sm:mt-0">
                                                    <select
                                                        id="can-take-pets"
                                                        name="can-take-pets"
                                                        value={data.canTakePets}
                                                        onChange={e => setData('canTakePets', e.target.value)}
                                                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:max-w-xs sm:text-sm"
                                                    >
                                                        <option value="true">Yes</option>
                                                        <option value="false">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="pt-5">
                                        <div className="flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => toggleFn(false)}
                                                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                            >
                                                Create Offer
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

const EditOfferModal = ({ open, toggleFn, offer }) => {
    const mapRef = useRef();
    const { auth } = usePage().props
    const { data, setData, patch, delete: destroy, processing } = useForm({
        canTakeSingles: offer.canTakeSingles,
        canTakeCouples: offer.canTakeCouples,
        canTakeFamilies: offer.canTakeFamilies,
        canTakePets: offer.canTakePets ? 'true' : 'false',
        lat: offer.lat,
        lng: offer.lng,
        type: offer.type,
        user_id: auth.user.id
    })

    const onMapLoad = useCallback(() => {
        mapRef.current.on('move', () => {
            const coordinates = mapRef.current.getCenter();

            setData(data => ({ ...data, lat: coordinates.lat }));
            setData(data => ({ ...data, lng: coordinates.lng }));
        });
    }, []);

    function submit(e) {
        e.preventDefault()

        patch(`/offers/${offer.id}`, {
            onSuccess: () => toggleFn(null),
        })
    }

    function deleteOffer() {
        destroy(`/offers/${offer.id}`, {
            onSuccess: () => toggleFn(null),
        })
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => toggleFn(null)}>
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
                                <form onSubmit={submit} className="space-y-6 divide-y divide-gray-200">
                                    <div className="space-y-6 divide-y divide-gray-200">
                                        <div>
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">Offer</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                This information will be displayed publicly so be careful what you share.
                                            </p>
                                        </div>

                                        <div className="pt-6">
                                            <legend className="sr-only">Location</legend>
                                            <div className="text-base font-medium text-gray-900" aria-hidden="true">
                                                Location
                                            </div>
                                            <div id='offer-location-select' className="h-64 w-full relative mt-4">
                                                <Map
                                                    ref={mapRef}
                                                    initialViewState={{
                                                        longitude: 144.9631,
                                                        latitude: -37.8136,
                                                        zoom: 5
                                                    }}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%'
                                                    }}
                                                    onLoad={onMapLoad}
                                                    mapStyle="mapbox://styles/mapbox/streets-v9"
                                                    mapboxAccessToken="pk.eyJ1IjoiZGFuaWVsZmVyZ3Vzb24iLCJhIjoiY2w5YXFjazNtMGp1ZTNwcXdtMjBlYTc2YyJ9.2Cz8UmqgWB4VpagnJ6_ATw"
                                                >
                                                    <Marker longitude={data.lng} latitude={data.lat} anchor="bottom" />
                                                    <GeolocateControl />
                                                </Map>
                                            </div>
                                        </div>

                                        <div className="pt-6">
                                            {/* Capacity */}
                                            <fieldset>
                                                <legend className="sr-only">Capacity</legend>
                                                <div className="text-base font-medium text-gray-900" aria-hidden="true">
                                                    Capacity
                                                </div>
                                                <p className="text-sm text-gray-500">Please select those that you could accomodate.</p>
                                                <div className="mt-4 space-y-4">
                                                    {/* Single */}
                                                    <div className="relative flex items-start">
                                                        <div className="flex h-5 items-center">
                                                            <input
                                                                id="capacity-single"
                                                                name="capacity-single"
                                                                type="checkbox"
                                                                checked={data.canTakeSingles}
                                                                onChange={e => setData('canTakeSingles', e.target.checked)}
                                                                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                            />
                                                        </div>
                                                        <div className="ml-3 text-sm">
                                                            <label htmlFor="capacity-single" className="font-medium text-gray-700">
                                                                Single
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {/* Couple */}
                                                    <div className="relative flex items-start">
                                                        <div className="flex h-5 items-center">
                                                            <input
                                                                id="capacity-couple"
                                                                name="capacity-couple"
                                                                type="checkbox"
                                                                checked={data.canTakeCouples}
                                                                onChange={e => setData('canTakeCouples', e.target.checked)}
                                                                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                            />
                                                        </div>
                                                        <div className="ml-3 text-sm">
                                                            <label htmlFor="capacity-couple" className="font-medium text-gray-700">
                                                                Couple
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {/* Family */}
                                                    <div className="relative flex items-start">
                                                        <div className="flex h-5 items-center">
                                                            <input
                                                                id="capacity-family"
                                                                name="capacity-family"
                                                                type="checkbox"
                                                                checked={data.canTakeFamilies}
                                                                onChange={e => setData('canTakeFamilies', e.target.checked)}
                                                                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                            />
                                                        </div>
                                                        <div className="ml-3 text-sm">
                                                            <label htmlFor="capacity-family" className="font-medium text-gray-700">
                                                                Family
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>

                                        <div className="pt-6">
                                            {/* Can Take Pets? */}
                                            <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4">
                                                <label htmlFor="can-take-pets" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                    Can you take pets?
                                                </label>
                                                <div className="mt-1 col-span-1 sm:mt-0">
                                                    <select
                                                        id="can-take-pets"
                                                        name="can-take-pets"
                                                        value={data.canTakePets}
                                                        onChange={e => setData('canTakePets', e.target.value)}
                                                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:max-w-xs sm:text-sm"
                                                    >
                                                        <option value="true">Yes</option>
                                                        <option value="false">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="pt-5">
                                        <div className="flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => toggleFn(null)}
                                                className="rounded-md bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => deleteOffer()}
                                                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                            >
                                                Update Offer
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

const CreateReportModal = ({ open, toggleFn }) => {
    const mapRef = useRef();
    const { auth } = usePage().props
    const { data, setData, post, processing, errors } = useForm({
        lat: -37.8136,
        lng: 144.9631,
        type: 'ROAD_DAMAGE',
        user_id: auth.user.id
    })

    const onMapLoad = useCallback(() => {
        mapRef.current.on('move', () => {
            const coordinates = mapRef.current.getCenter();

            setData(data => ({ ...data, lat: coordinates.lat }));
            setData(data => ({ ...data, lng: coordinates.lng }));
        });
    }, []);

    function submit(e) {
        e.preventDefault()
        post('/points-of-interest', {
            onSuccess: () => toggleFn(false)
        })
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => toggleFn(false)}>
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
                                <form onSubmit={submit} className="space-y-6 divide-y divide-gray-200">
                                    <div className="space-y-6 divide-y divide-gray-200">
                                        <div>
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">Report</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                We will display this on the map - thank you for helping keep us safe.
                                            </p>
                                        </div>

                                        <div className="pt-6">
                                            <legend className="sr-only">Location</legend>
                                            <div className="text-base font-medium text-gray-900" aria-hidden="true">
                                                Location
                                            </div>
                                            <div id='offer-location-select' className="h-64 w-full relative mt-4">
                                                <Map
                                                    ref={mapRef}
                                                    initialViewState={{
                                                        longitude: 144.9631,
                                                        latitude: -37.8136,
                                                        zoom: 5
                                                    }}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%'
                                                    }}
                                                    onLoad={onMapLoad}
                                                    mapStyle="mapbox://styles/mapbox/streets-v9"
                                                    mapboxAccessToken="pk.eyJ1IjoiZGFuaWVsZmVyZ3Vzb24iLCJhIjoiY2w5YXFjazNtMGp1ZTNwcXdtMjBlYTc2YyJ9.2Cz8UmqgWB4VpagnJ6_ATw"
                                                >
                                                    <Marker longitude={data.lng} latitude={data.lat} anchor="bottom" />
                                                    <GeolocateControl />
                                                </Map>
                                            </div>
                                        </div>

                                        <div className="pt-6">
                                            {/* Hazard Type */}
                                            <fieldset>
                                                <legend className="sr-only">Hazard Type</legend>
                                                <div className="text-base font-medium text-gray-900" aria-hidden="true">
                                                    Hazard Type
                                                </div>
                                                <p className="text-sm text-gray-500">Please select the type of hazard.</p>
                                                <div className="mt-4 space-y-4">
                                                    {/* Single */}
                                                    <select
                                                        id="type"
                                                        name="type"
                                                        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                                                        defaultValue="ROAD_DAMAGE"
                                                        value={data.type}
                                                        onChange={e => setData('type', e.target.value)}
                                                    >
                                                        <option value="ROAD_DAMAGE">Road Damage</option>
                                                    </select>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="pt-5">
                                        <div className="flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => toggleFn(false)}
                                                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                            >
                                                Report Hazard
                                            </button>
                                        </div>
                                    </div>
                                </form>
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

const AccomodateTypeBadges = ({ offer }) => {
    let badges = [];

    if (offer.canTakeSingles && offer.canTakeCouples && offer.canTakeFamilies) {
        return (
            <span key="everyone" className="inline-flex items-center rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-3 w-3 text-indigo-400" viewBox="0 0 512 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                Everyone
            </span>
        )
    }

    if (offer.canTakeSingles) {
        badges.push(
            <span key="singles" className="inline-flex items-center rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-3 w-3 text-indigo-400" viewBox="0 0 512 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                Singles
            </span>
        )
    }

    if (offer.canTakeCouples) {
        badges.push(
            <span key="couples" className="inline-flex items-center rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-3 w-3 text-indigo-400" viewBox="0 0 512 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                Couples
            </span>
        )
    }

    if (offer.canTakeFamilies) {
        badges.push(
            <span key="families" className="inline-flex items-center rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-3 w-3 text-indigo-400" viewBox="0 0 512 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                Families
            </span>
        )
    }

    return badges;
}

const OffersPanelSection = ({ offers, setCreateModalOpen, selectOffer }) => {
    if (offers.length === 0) {
        return (
            <div className="px-4 py-6">
                <button
                    type="button"
                    onClick={() => setCreateModalOpen(true)}
                    className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 px-12 py-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    <PlusCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <span className="mt-2 block text-sm font-medium text-gray-900">Create an offer</span>
                </button>
            </div>
        )
    }

    return (
        <div className="px-4 pt-6 pb-3">
            <h2 className='text-lg font-medium'>Your offers</h2>
            <ul role="list" className="divide-y divide-gray-200 text-sm">
                {offers.map((offer) => (
                    <li key={offer.id} className="py-4 grid gap-2">
                        <div className='flex justify-between'>
                            <div className="flex items-center">
                                <HomeIcon className='h-5 w-5 mr-2' />
                                <span>Offer of Accomodation</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => selectOffer(offer)}>
                                    <PencilSquareIcon className="h-3.5 w-3.5 text-gray-400 hover:text-gray-900 transition duration-75 cursor-pointer" />
                                </button>
                                <MapPinIcon className="h-3.5 w-3.5 text-gray-400 hover:text-gray-900 transition duration-75 cursor-pointer" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <AccomodateTypeBadges offer={offer} />
                            {offer.canTakePets && (
                                <span className="inline-flex items-center rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-3 w-3 text-indigo-400" viewBox="0 0 512 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                                    Pets
                                </span>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            {offers.length < 3 && (
                <button
                    onClick={() => setCreateModalOpen(true)}
                    className="inline-flex w-full items-center rounded-md mt-2 border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    Create another offer
                </button>
            )}
        </div>
    )
}

const ReportsPanelSection = ({ reports }) => {
    if (reports.length === 0) {
        return;
    }

    const deleteReport = (id) => {
        Inertia.delete(`/points-of-interest/${id}`);
    }

    return (
        <div className="px-4 pt-6 pb-3">
            <h2 className='text-lg font-medium'>Your reports</h2>
            <ul role="list" className="divide-y divide-gray-200 text-sm">
                {reports.map((report) => (
                    <li key={report.id} className="py-4 grid gap-2">
                        <div className='flex justify-between'>
                            <div className="flex items-center">
                                <ExclamationTriangleIcon className='h-5 w-5 mr-2' />
                                <span>Report</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => deleteReport(report.id)}>
                                    <XMarkIcon className="h-3.5 w-3.5 text-gray-400 hover:text-gray-900 transition duration-75 cursor-pointer" />
                                </button>
                                <MapPinIcon className="h-3.5 w-3.5 text-gray-400 hover:text-gray-900 transition duration-75 cursor-pointer" />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const LoginPanelSection = ({ toggleFn }) => {
    return (
        <div className="px-4 grid gap-3 py-6">
            <h2 className='text-lg font-medium'>Register an offer</h2>
            <p className='text-sm font-normal'>Please login to create an offer.</p>
            <button
                type="button"
                onClick={() => toggleFn(true)}
                className="inline-flex items-center rounded-md border border-transparent bg-green-100 px-3 py-2 text-sm font-medium leading-4 text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
                Login
            </button>
        </div>
    );
}

export default function SidebarLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [createOfferModalOpen, setCreateOfferModalOpen] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [createReportModalOpen, setCreateReportModalOpen] = useState(false);
    const { auth, offers, reports } = usePage().props

    const logoutFn = () => {
        Inertia.visit('/logout', {
            method: 'post',
        });
    };

    return (
        <div className='text-gray-900'>
            {/* Modals */}
            <CreateOfferModal open={createOfferModalOpen} toggleFn={setCreateOfferModalOpen} />
            <CreateReportModal open={createReportModalOpen} toggleFn={setCreateReportModalOpen} />
            {selectedOffer !== null && <EditOfferModal open={true} toggleFn={setSelectedOffer} offer={selectedOffer} />}

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
                                    <div className='px-4 mt-2'>
                                        <p className='text-gray-400 italic text-xs'>Proudly by Helping Group</p>
                                    </div>
                                    <nav className="flex-1 space-y-1 divide-y">
                                        {/* TODO */}
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
                                {auth.user && (
                                    <div className="flex flex-shrink-0 border-t p-4">
                                        <button onClick={() => logoutFn()} className="group block w-full flex-shrink-0 ml-2">
                                            <p className="text-sm font-medium ">{auth.user.name}</p>
                                            <p className="text-xs font-medium text-gray-400 group-hover:">Logout</p>
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
            <div className="hidden md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
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
                            {/* Login */}
                            {auth.user === false && <LoginPanelSection toggleFn={setAuthModalOpen} />}

                            {/* Offers */}
                            {auth.user && <OffersPanelSection offers={offers} setCreateModalOpen={setCreateOfferModalOpen} selectOffer={setSelectedOffer} />}

                            {/* Reports */}
                            {auth.user && <ReportsPanelSection reports={reports} setCreateModalOpen={setCreateReportModalOpen} />}

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
            <div className="flex flex-1 flex-col md:pl-72 h-screen">
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
