import React,{useEffect, useState} from "react";
import { StyleSheet, View,Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from 'expo-location';

export default function MapScreen() {

  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }







  return (
    <View style={styles.container}>

    <Text style={styles.paragraph}>Your location: {text}</Text>


      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="My Location"
          description="This is a marker in San Francisco"
        />
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="Marker 1"
        />
        <Marker
          coordinate={{ latitude: 37.75825, longitude: -122.4624 }}
          title="Marker 2"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: "100%",
    height: "60%",
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});
