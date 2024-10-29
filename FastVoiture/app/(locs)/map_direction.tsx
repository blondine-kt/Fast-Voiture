import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const Map_directions = () => {

    const api_key = process.env.EXPO_PUBLIC_API_KEY;

  const [destination, setDestination] = useState({
      latitude: 45.5405804,
      longitude: -73.5550988,
    });

  const [origin, setOrigin] = useState({
      latitude: 45.5528556,
      longitude: -73.5565604,
    });

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
      initialRegion={{
        latitude: 45.5018869,
        longitude: -73.56739189999999,
        latitudeDelta: 3,
        longitudeDelta: 1,
      }}
      >
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey="AIzaSyCzlmUr9hg0E2elKzaHqr9eV-UuX4jOlBI"
          strokeWidth={4}
          strokeColor="#35c3f5"
          mode={'DRIVING'}
        />
       <Marker
          coordinate={origin}
          title="Starting Point"
        />
        <Marker
          coordinate={destination}
          title="Destination Point"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Map_directions;
