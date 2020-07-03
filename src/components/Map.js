import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../global';
import Loading from '../components/Loading';


export function LocationMap(props) {

    const [ currentRegion, setCurrentRegion ] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
    });
    const [ latitude, setLatitude ] = useState(props.latitude);
    const [ longitude, setLongitude ] = useState(props.longitude);

    useEffect(() => {

        async function loadInititalPosition() {

            setCurrentRegion({
                latitude,
                longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04,
            })
            
        }
        loadInititalPosition();
    }, [])

    return(
        <MapView
            style={styles.map} 
            initialRegion={currentRegion}
            minZoomLevel={15}
        >
            <Marker coordinate={{latitude, longitude}}>
                <MI
                    name={'map-marker'}
                    color={'#FF4700'}
                    size={48}
                />
            </Marker>
        </MapView>
    )
}