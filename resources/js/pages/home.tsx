import React from "react";
import Map from 'react-map-gl';
import SidebarLayout from '../components/sidebar-layout.tsx'

const Home = () => {
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
                />
            </div>
        </SidebarLayout>
    );
}

export default Home;
