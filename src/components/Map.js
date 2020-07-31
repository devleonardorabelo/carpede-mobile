import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';

import styles, { Colors } from '../global';

export const LocationMap = ({ latitude, longitude }) => {
  const currentRegion = {
    latitude,
    longitude,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  };

  return (
    <MapView style={styles.map} initialRegion={currentRegion} minZoomLevel={15}>
      <Marker coordinate={{ latitude, longitude }}>
        <MI name="map-marker" color={Colors.primary} size={48} />
      </Marker>
    </MapView>
  );
};
