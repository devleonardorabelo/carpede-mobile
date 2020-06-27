import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import styles from '../global';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';

export function LocationMap(props) {

    const [ currentRegion, setCurrentRegion ] = useState(null);
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
        <MapView style={styles.map} initialRegion={currentRegion} minZoomLevel={15}>
            <Marker coordinate={{latitude, longitude}}>
                <MI
                    name={'map-marker'}
                    color={'#639DFF'}
                    size={48}
                />
            </Marker>
        </MapView>
    )
}