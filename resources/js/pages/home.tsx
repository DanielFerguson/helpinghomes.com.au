import React, { useEffect, useRef, useCallback } from "react";
import Map, { Source, Layer, GeolocateControl, NavigationControl, ScaleControl } from 'react-map-gl';
import SidebarLayout from '../components/sidebar-layout.tsx';
import useSWR from 'swr';
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data)

// TODO: Extract out into offer layer component
const offersLayerStyle = {
    id: 'offers-layer',
    type: 'symbol',
    source: 'offers',
    layout: {
        'icon-image': 'offer-housing',
        // 'circle-radius': 10,
        // 'circle-color': '#007cbf'
    }
};

const pointsOfInterestLayerStyle = {
    id: 'points-of-interest-layer',
    type: 'symbol',
    source: 'points-of-interest',
    layout: {
        'icon-image': 'point-of-interest-relief-center',
        // 'circle-radius': 10,
        // 'circle-color': '#eab308'
    }
};

const Home = () => {
    const mapRef = useRef();
    const { data: offers, error: offersError } = useSWR('/api/offers', fetcher);
    const { data: pointsOfInterest, error: pointsOfInterestError } = useSWR('/api/points-of-interest', fetcher);

    // TODO: Do something with errors

    // Load images for layers
    const onMapLoad = useCallback(() => {
        if (mapRef.current === undefined) return;

        const map = mapRef.current;

        map.on('move', () => {
            map.loadImage('/assets/map/offer-assistance.png', (error, image) => {
                if (error) throw error;
                if (!map.hasImage('offer-assistance')) map.addImage('offer-assistance', image);
            });

            map.loadImage('/assets/map/offer-housing.png', (error, image) => {
                if (error) throw error;
                if (!map.hasImage('offer-housing')) map.addImage('offer-housing', image);
            });

            map.loadImage('/assets/map/point-of-interest-relief-center.png', (error, image) => {
                if (error) throw error;
                if (!map.hasImage('point-of-interest-relief-center')) map.addImage('point-of-interest-relief-center', image);
            });
        });
    }, []);

    // useEffect(() => {
    //     if (_mapRef === null || _mapRef.current === null) return;

    //     const map = _mapRef.current.getMap();

    //     map.loadImage('/assets/map/offer-assistance.png', (error, image) => {
    //         if (error) throw error;
    //         if (!map.hasImage('offer-assistance')) map.addImage('offer-assistance', image);
    //     });

    //     map.loadImage('/assets/map/offer-housing.png', (error, image) => {
    //         if (error) throw error;
    //         if (!map.hasImage('offer-housing')) map.addImage('offer-housing', image);
    //     });

    //     map.loadImage('/assets/map/point-of-interest-relief-center.png', (error, image) => {
    //         if (error) throw error;
    //         if (!map.hasImage('point-of-interest-relief-center')) map.addImage('point-of-interest-relief-center', image);
    //     });
    // }, [_mapRef]);

    return (
        <SidebarLayout>
            <div className="h-full w-full relative">
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
    );
}

export default Home;
