import React, { } from "react";
import Map, { Source, Layer, GeolocateControl, NavigationControl, ScaleControl } from 'react-map-gl';
import SidebarLayout from '../components/sidebar-layout.tsx';
import useSWR from 'swr';
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data)

const offersLayerStyle = {
    id: 'offers-layer',
    type: 'symbol',
    source: 'offers',
    layout: {
        'icon-image': 'offer-housing',
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

const Home = () => {
    const { data: offers, error: offersError } = useSWR('/api/offers', fetcher);
    const { data: pointsOfInterest, error: pointsOfInterestError } = useSWR('/api/points-of-interest', fetcher);

    // TODO: Do something with errors

    // TODO: Add on-click events
    // Load images for layers
    const loadMap = (event) => {
        const map = event.target;

        map.loadImage('/assets/map/offer-assistance.png', (error, image) => {
            if (error || image === undefined) throw error;
            map.addImage('offer-assistance', image);
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

        // TODO
        // // When a click event occurs on a feature in the places layer, open a popup at the
        // // location of the feature, with description HTML from its properties.
        // map.on('click', 'point', (e) => {
        //     // Copy coordinates array.
        //     // @ts-ignore
        //     const coordinates = e.features[0].geometry.coordinates.slice();
        //     // @ts-ignore
        //     const description = e.features[0].properties.description;

        //     // Ensure that if the map is zoomed out such that multiple
        //     // copies of the feature are visible, the popup appears
        //     // over the copy being pointed to.
        //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        //     }

        //     // @ts-ignore
        //     const type = startCase(e.features[0].properties.hazardType.toLowerCase());

        //     new mapboxgl.Popup({
        //         closeButton: false
        //     })
        //         .setLngLat(coordinates)
        //         // @ts-ignore
        //         .setHTML(`<p>${type}</p><p>Created ${dayjs().to(e.features[0].properties.createdAt)}.</p>`)
        //         .addTo(map);
        // });

        // // Change the cursor to a pointer when the mouse is over the point layer.
        // map.on('mouseenter', 'point', () => {
        //     map.getCanvas().style.cursor = 'pointer';
        // });

        // // Change it back to a pointer when it leaves.
        // map.on('mouseleave', 'point', () => {
        //     map.getCanvas().style.cursor = '';
        // });
    }

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
    );
}

export default Home;
