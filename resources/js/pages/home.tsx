import React from "react";
import Map, { Source, Layer } from 'react-map-gl';
import SidebarLayout from '../components/sidebar-layout.tsx';
import useSWR from 'swr';
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data)

// TODO: Extract out into offer layer component
const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
        'circle-radius': 10,
        'circle-color': '#007cbf'
    }
};

const Home = () => {
    const { data, error } = useSWR('/api/offers', fetcher);

    // TODO: Add error

    return (
        <SidebarLayout>
            <div className="h-full w-full relative">
                <Map
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
                    <Source id="my-data" type="geojson" data={data}>
                        <Layer {...layerStyle} />
                    </Source>
                </Map>
            </div>
        </SidebarLayout>
    );
}

export default Home;
