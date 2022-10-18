import React, { useState, Fragment, useRef } from "react";
import Map, { Source, Layer, GeolocateControl, NavigationControl, ScaleControl } from 'react-map-gl';
import SidebarLayout from '../components/sidebar-layout.tsx';
import useSWR from 'swr';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react'
import { startCase } from 'lodash';
import { FlagIcon } from "@heroicons/react/24/outline";
import { useForm } from '@inertiajs/inertia-react';
import toast, { Toaster } from 'react-hot-toast';
import { usePage } from '@inertiajs/inertia-react'

const fetcher = url => axios.get(url).then(res => res.data)

const offersLayerStyle = {
    id: 'offers-layer',
    type: 'symbol',
    source: 'offers',
    layout: {
        'icon-image': [
            'match',
            ['get', 'offerType'],
            'HOUSING',
            'offer-housing',
            'TRANSPORT_ASSISTANCE',
            'offer-shelter-livestock',
            'offer-assistance',
        ],
        'icon-size': 0.06
    }
};

const pointsOfInterestLayerStyle = {
    id: 'points-of-interest-layer',
    type: 'symbol',
    source: 'points-of-interest',
    layout: {
        'icon-image': [
            'match',
            ['get', 'type'],
            'RELIEF_CENTER',
            'point-of-interest-relief-center',
            'SANDBAGGING_SITE',
            'point-of-interest-sandbagging-site',
            'ROAD_DAMAGE',
            'danger-road-damage',
            'point-of-interest',
        ],
        'icon-size': 0.06
    }
};

const AccomodateTypeBadges = ({ offer }) => {
    let badges = [];

    if (offer.canTakeSingles && offer.canTakeCouples && offer.canTakeFamilies) {
        return (
            <span key="anyone" className="inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-3 w-3 text-green-400" viewBox="0 0 512 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                Anyone
            </span>
        )
    }

    if (offer.canTakeSingles) {
        badges.push(
            <span key="singles" className="inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-3 w-3 text-green-400" viewBox="0 0 512 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                Singles
            </span>
        )
    }

    if (offer.canTakeCouples) {
        badges.push(
            <span key="couples" className="inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-3 w-3 text-green-400" viewBox="0 0 512 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                Couples
            </span>
        )
    }

    if (offer.canTakeFamilies) {
        badges.push(
            <span key="families" className="inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-3 w-3 text-green-400" viewBox="0 0 512 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                Families
            </span>
        )
    }

    return badges;
}

const HousingOfferDetails = ({ offer }) => {
    const [contactDetails, setContactDetails] = useState(null);

    const fetchContactDetails = async () => {
        const response = await axios.get(`/offers/${offer.id}`);
        setContactDetails(response.data);
    }

    return (
        <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Can help</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex gap-2">
                    <AccomodateTypeBadges offer={offer} />
                </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Can take pets</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {offer.canTakePets ? (
                        <span key="singles" className="inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-3 w-3 text-green-400" viewBox="0 0 512 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                            Yes
                        </span>
                    ) : (
                        <span>No</span>
                    )}
                </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 items-center">
                <dt className="text-sm font-medium text-gray-500">Contact</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {contactDetails === null ? (
                        <button
                            type="button"
                            onClick={() => fetchContactDetails()}
                            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Request Contact Details
                        </button>
                    ) : (
                        <a
                            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            href={`tel:+${contactDetails.mobile_number}`}
                        >Call Offerer Now</a>
                    )}
                </dd>
            </div>
        </dl>
    );
}

const LivestockTransportOfferDetails = ({ offer }) => {
    const [contactDetails, setContactDetails] = useState(null);

    const fetchContactDetails = async () => {
        const response = await axios.get(`/offers/${offer.id}`);
        setContactDetails(response.data);
    }

    return (
        <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Notes</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {offer.notes}
                </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 items-center">
                <dt className="text-sm font-medium text-gray-500">Contact</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {contactDetails === null ? (
                        <button
                            type="button"
                            onClick={() => fetchContactDetails()}
                            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Request Contact Details
                        </button>
                    ) : (
                        <a
                            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            href={`tel:+${contactDetails.mobile_number}`}
                        >Call Offerer Now</a>
                    )}
                </dd>
            </div>
        </dl>
    )
}

const OfferModal = ({ open, toggleFn, offer }) => {
    const { post } = useForm({
        reason: null,
    });

    if (offer === null) return;

    const report = (e) => {
        e.preventDefault()

        const toastId = toast.loading('Reporting...');

        post(`/offers/${offer.id}/report`, {
            onSuccess: () => toast.success('We\'ve logged your report.', { id: toastId }),
            onError: () => toast.error('Whoops... something went wrong.', { id: toastId })
        })
    }

    const description = {
        'HOUSING': 'If you have been displaced due to natural disaster and need temporary accomodation, this Good Samaritan has offered to help.',
        'TRANSPORT_ASSISTANCE': 'If you have livestock and need help transporting them to a place of safety, this Good Samaritan has offered to help.',
    };

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
                                {/* Details */}
                                <div className="overflow-hidden bg-white">
                                    <div className="pb-5 flex flex-col items-between justify-center">
                                        <form onSubmit={report} className="flex items-center justify-between">
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">Offer of {startCase(offer.offerType.toLowerCase())}</h3>
                                            <button type="submit">
                                                {/* TODO: Add confirmation window */}
                                                <FlagIcon className="w-4 h-4" />
                                            </button>
                                        </form>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">{description[offer.offerType]}</p>
                                    </div>
                                    <div className="border-t border-gray-200 py-5 sm:p-0">
                                        {offer.offerType === 'HOUSING' && <HousingOfferDetails offer={offer} />}
                                        {offer.offerType === 'TRANSPORT_ASSISTANCE' && <LivestockTransportOfferDetails offer={offer} />}
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

const PointOfInterestModal = ({ open, toggleFn, pointOfInterest }) => {
    const { post } = useForm({
        reason: '',
    });

    if (pointOfInterest === null) return;

    // TODO: Add the ability for users to add a reason before saving.
    const report = (e) => {
        e.preventDefault()

        const toastId = toast.loading('Reporting...');

        post(`/points-of-interest/${pointOfInterest.id}/report`, {
            onSuccess: () => toast.success('We\'ve logged your report.', { id: toastId }),
            onError: () => toast.error('Whoops... something went wrong.', { id: toastId })
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
                                {/* Details */}
                                <div className="overflow-hidden bg-white">
                                    <div className="pb-5">
                                        <form onSubmit={report} className="flex items-center justify-between">
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">{startCase(pointOfInterest.type.toLowerCase())}</h3>
                                            <button type="submit">
                                                {/* TODO: Add confirmation window */}
                                                <FlagIcon className="w-4 h-4" />
                                            </button>
                                        </form>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">{pointOfInterest.name}</p>
                                    </div>
                                    <div className="border-t border-gray-200 py-5 sm:p-0">
                                        {/* Directors - Take me there */}
                                        <dl className="sm:divide-y sm:divide-gray-200">
                                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 items-center">
                                                <dt className="text-sm font-medium text-gray-500">Directions</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex gap-2">
                                                    <a
                                                        href={`https://www.google.com/maps/dir//${pointOfInterest.lat},${pointOfInterest.lng}`} target="_blank" rel="noopener noreferrer"
                                                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                                    >
                                                        Take Me There
                                                    </a>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

const LoginMessageModal = ({ open, toggleFn }) => {
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
                                {/* Details */}
                                <div className="overflow-hidden text-center bg-white">
                                    <p>Please login to see more details.</p>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

const Home = () => {
    const { auth } = usePage().props
    const map = useRef();
    const [selectedOffer, selectOffer] = useState(null);
    const [selectedPointOfInterest, selectPointOfInterest] = useState(null);
    const [showLoginMessageModal, setShowLoginMessageModal] = useState(false);

    const { data: offers } = useSWR('/offers', fetcher);
    const { data: pointsOfInterest } = useSWR('/points-of-interest', fetcher);

    // Load images for layers
    const loadMap = (event) => {
        const map = event.target;

        map.loadImage('/assets/map/offer-assistance.png', (error, image) => {
            if (error || image === undefined) throw error;
            map.addImage('offer-assistance', image);
        });

        map.loadImage('/assets/map/offer-shelter-livestock.png', (error, image) => {
            if (error || image === undefined) throw error;
            map.addImage('offer-shelter-livestock', image);
        });

        map.loadImage('/assets/map/offer-transport-livestock.png', (error, image) => {
            if (error || image === undefined) throw error;
            map.addImage('offer-transport-livestock', image);
        });

        map.loadImage('/assets/map/offer-housing.png', (error, image) => {
            if (error || image === undefined) throw error;
            map.addImage('offer-housing', image);
        });

        map.loadImage('/assets/map/point-of-interest.png', (error, image) => {
            if (error || image === undefined) throw error;
            map.addImage('point-of-interest', image);
        });

        map.loadImage('/assets/map/point-of-interest-relief-center.png', (error, image) => {
            if (error || image === undefined) throw error;
            map.addImage('point-of-interest-relief-center', image);
        });

        map.loadImage('/assets/map/point-of-interest-sandbagging-site.png', (error, image) => {
            if (error || image === undefined) throw error;
            map.addImage('point-of-interest-sandbagging-site', image);
        });

        map.loadImage('/assets/map/danger-road-damage.png', (error, image) => {
            if (error || image === undefined) throw error;
            map.addImage('danger-road-damage', image);
        });

        map.loadImage('/assets/map/danger-unknown.png', (error, image) => {
            if (error || image === undefined) throw error;
            map.addImage('danger-unknown', image);
        });

        map.on('click', 'offers-layer', (e) => {
            if (!auth.user) {
                setShowLoginMessageModal(true);
                return;
            }

            selectOffer(e.features[0].properties);
        });

        map.on('mouseenter', 'offers-layer', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'offers-layer', () => {
            map.getCanvas().style.cursor = '';
        });

        map.on('click', 'points-of-interest-layer', (e) => {
            selectPointOfInterest(e.features[0].properties);
        });

        map.on('mouseenter', 'points-of-interest-layer', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'points-of-interest-layer', () => {
            map.getCanvas().style.cursor = '';
        });
    }

    const flyToPoint = (lat, lng) => {
        map.current.flyTo({
            center: [lng, lat],
            zoom: 15
        });
    }

    return (
        <>
            <Toaster />
            <SidebarLayout flyTo={flyToPoint}>
                <OfferModal open={selectedOffer !== null} toggleFn={selectOffer} offer={selectedOffer} />
                <PointOfInterestModal open={selectedPointOfInterest !== null} toggleFn={selectPointOfInterest} pointOfInterest={selectedPointOfInterest} />
                <LoginMessageModal open={showLoginMessageModal} toggleFn={setShowLoginMessageModal} />

                <div className="h-full w-full relative">
                    <Map
                        ref={map}
                        initialViewState={{
                            longitude: 144.9631,
                            latitude: -37.8136,
                            zoom: 5
                        }}
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                        onLoad={(event) => loadMap(event)}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken="pk.eyJ1IjoiZGFuaWVsZmVyZ3Vzb24iLCJhIjoiY2w5YXFjazNtMGp1ZTNwcXdtMjBlYTc2YyJ9.2Cz8UmqgWB4VpagnJ6_ATw"
                    >
                        <GeolocateControl />
                        <NavigationControl />
                        <ScaleControl />
                        <Source id="offers" type="geojson" data={offers}>
                            <Layer {...offersLayerStyle} />
                        </Source>
                        <Source id="points-of-interest" type="geojson" data={pointsOfInterest}>
                            <Layer {...pointsOfInterestLayerStyle} />
                        </Source>
                    </Map>
                </div>
            </SidebarLayout>
        </>
    );
}

export default Home;
