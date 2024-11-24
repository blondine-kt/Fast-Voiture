import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

interface Location {
  latitude: number;
  longitude: number;
}
interface Info {
  distance: {
    text: string;
    value: number;
  };
  temps: {
    text: string;
    value: number;
  };
 
}

interface LocationState {
  username:string
  origin: Location;
  destination: Location;
  info: Info;
  prix: number;
}



interface LocationComponentProps {
  location: LocationState;
}
const Map_directions:React.FC<LocationComponentProps> = ({ location }) => {
  

     

    useEffect(() => {
      console.log("Location updated:", location);
    }, [location]);

    

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
      initialRegion={{
        latitude: 45.5018869,
        longitude: -73.56739189999999,
        latitudeDelta:  0.008,
        longitudeDelta: 0.003,
      }}
      >
        <MapViewDirections
          origin={location.origin}
          destination={location.destination}
          apikey="AIzaSyCzlmUr9hg0E2elKzaHqr9eV-UuX4jOlBI"
          strokeWidth={4}
          strokeColor="#35c3f5"
          mode={'DRIVING'}
        />
        
       <Marker
          coordinate={location.origin}
          title="Starting Point"
        />
        <Marker
          coordinate={location.destination}
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
