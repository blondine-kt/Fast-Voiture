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
  distance: string;
  temps: string;
}

interface LocationState {
  ori: Location;
  dest: Location;
  info: Info;
}

interface LocationComponentProps {
  location: LocationState;
}
const Map_directions:React.FC<LocationComponentProps> = ({ location }) => {

  

    const { width, height } = Dimensions.get('window');
    
    
    const ASPECT_RATIO = width / height;
    const latitude_delta = 0.0922
    const longitude_delta = latitude_delta * ASPECT_RATIO

    const api_key = process.env.EXPO_PUBLIC_API_KEY;

  const [destination, setDestination] = useState({
      latitude: 45.5405804 ,
      longitude: -73.5550988,
    });

  const [origin, setOrigin] = useState({
      latitude: 45.5528556,
      longitude:  -73.5565604,
    });
     

    useEffect(() => {
      console.log("Location updated:", location);
    }, [location]);

    

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
      initialRegion={{
        latitude: 45.5018869,
        longitude: -73.56739189999999,
        latitudeDelta:  0.004,
        longitudeDelta: 0.002,
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
          coordinate={location.ori}
          title="Starting Point"
        />
        <Marker
          coordinate={location.dest}
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
