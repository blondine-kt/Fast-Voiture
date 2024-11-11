import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,

} from "react-native";
import { TextInput } from "react-native-paper";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosError } from "axios";

import { useUser } from "../../userauth";
import Map_directions from "../../(locs)/map_direction";

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

export default function Services() {
  const [isActive, setIsActive] = useState(false);

  const [location, setLocation] = useState<LocationState>({
    ori: { latitude: 0, longitude: 0 },
    dest: { latitude: 0, longitude: 0 },
    info: { distance: "", temps: "" },
  });

  interface FormValues {
    origin: string;
    destination: string;
  }

  const validationSchema = Yup.object().shape({
    origin: Yup.string().required("Le depart est requis"),
    destination: Yup.string().required("La destination  est requise"),
  });

  useEffect(() => {
    console.log("Location updated:", location);
  }, [location]);

  

  const onSubmit = async (data: FormValues) => {
    if (data != null) {
      const dataInfo = {
        origin: data.origin,
        destination: data.destination,
      };

      try {
        const response = await fetch('http://192.168.2.11:8060/getitenary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }, body: JSON.stringify(dataInfo),
        });

        const responseData = await response.json();
        console.log("Received data:", responseData);

        // Set the location state with the response data
        setLocation({
          dest: { latitude: responseData.destination.latitude, longitude: responseData.destination.longitude },
          info: { distance: responseData.info.distance, temps: responseData.info.temps },
          ori: { latitude: responseData.origin.latitude, longitude: responseData.origin.longitude },
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Services</Text>
        <Button title="active" onPress={() => setIsActive(true)} />
      </View>
      <View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            
            <TextInput
              label="Depart"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={styles.inputs}
              error={!!errors.origin}
            />
          )}
          name="origin"
          rules={{ required: true }}
        />
        {errors.origin && <Text>{errors.origin.message}</Text>}
        
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Destination"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={styles.inputs}
              error={!!errors.destination}
            />
          )}
          name="destination"
          rules={{ required: true }}
        />
        {errors.destination && <Text>{errors.destination.message}</Text>}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.text}>Trouver</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      
      {isActive && (
        <View style={styles.map_container}>
          <Map_directions location={location} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  map_container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontStyle: "normal",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "sans-serif-condensed",
    padding: 10,
  },
  wrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  items: {
    marginTop: 30,
  },
  itemText: {
    maxWidth: "80%",
  },
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    borderColor: "#2a9ec6",
  },
  buttonContainer: {
    backgroundColor: "#5faaaa",
    margin: 10,
    borderStyle: "solid",
    borderRadius: 10,
    alignItems: "center",
    padding: 5,
    opacity: 0.4,
    
  },
  button: {
    alignItems: "center",
    justifyContent:"center",
    alignContent:"center"
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
  },
  inputs: {
    height: 45,
    borderColor: "#2a9ec6",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 10,
  },
});
