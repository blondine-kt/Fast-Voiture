import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";

import Map_directions from "../../(locs)/map_direction";
import * as Location from "expo-location";
import { dbdrivers } from "../../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  addDoc,
} from "firebase/firestore";
//interface pour recuperer les donnees de localisation
import { LocationState } from "@/assets/types";
import { Course } from "@/assets/types";
import { useUser } from "@/app/userauth";

export default function Services() {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const { userdata } = useUser();
  const [getOrigin, setOrigin] = useState<string | undefined>("");
  const [getDestination, setDestination] = useState<string | undefined>("");
  const [course, setCourse] = useState<Course>({
    chauffeur: userdata?.nom || '',
    passager: "",
    origin: getOrigin || '',
    destination: getDestination,
    immatriculation: userdata?.license_plate || '',
    prix: 0,
  });

  const [location, setLocation] = useState<LocationState>({
    username: "",
    origin: { latitude: 0, longitude: 0 },
    destination: { latitude: 0, longitude: 0 },
    info: { distance: { text: "", value: 0 }, temps: { text: "", value: 0 } },
    prix: 0.0,
  });

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://location-api-63ti.onrender.com/getdata"
      );
      const data = await response.json();
      console.log(data);

      const dynamicKey = Object.keys(data)[0];
      const fetchedItinerary = data[dynamicKey];

      if (fetchedItinerary) {
        setModalVisible(true);
        if (accepted) {
          setLocation(fetchedItinerary);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Failed to fetch data from the server");
    } finally {
      setLoading(false);
    }
  };

  //change les latitude et longitude en address
  const getLocationName = async (localisation: {
    latitude: number;
    longitude: number;
  }) => {
    let address;
    let info = await Location.reverseGeocodeAsync({
      latitude: localisation.latitude,
      longitude: localisation.longitude,
    });
    for (let item of info) {
      address = `${item.name} ${item.city} ${item.postalCode}`;
    }
    return address;
  };

  //ajout de la course dans firebase
  //firestoredb
  const addCourse = async (values: Course) => {
    if(values.origin !='' && values.destination != '' ){
      try {
        const docRef = await addDoc(collection(dbdrivers, "courses"), {
          chauffeur: values.chauffeur,
          passager: values.passager,
          origin: values.origin,
          destination: values.destination,
          immatriculation: values.immatriculation,
          prix: values.prix,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }else{
      console.log('No data')
    }
    
  };

  //change chaque fois que la localisation change
  useEffect(() => {
    const getinfo = async () => {
      setOrigin(await getLocationName(location.origin));
      setDestination(await getLocationName(location.destination));
    };
    getinfo();
    console.log("Location updated:", location);
  }, [location]);

  //pour afficher et cacher le map
  const toggleVisibility = () => {
    setIsActive((prevState) => !prevState);
  };

  // accepter la requete passager
  const handleAccept = () => {
    setAccepted(true);
    Alert.alert("Accepter", `${location.username}`);
    setCourse({
      chauffeur: userdata?.userName,
      passager: location.username,
      origin: getOrigin,
      destination: getDestination,
      immatriculation: userdata?.license_plate,
      prix: location.prix,
    });
    addCourse(course);
    setModalVisible(false);
  };

  // Refuser la requete
  const handleRefuse = () => {
    setAccepted(false);
    Alert.alert("Refuser", `${location.username}`);
    setModalVisible(false); // Close the modal
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Services</Text>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: isPressed ? "skyblue" : "dodgerblue" },
          ]}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          onPress={toggleVisibility}
        >
          <Text style={styles.buttonText}>Activer</Text>
        </Pressable>
      </View>
      <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => fetchData()}>
            <Text style={styles.text}>Trouver</Text>
          </TouchableOpacity>
        </View>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal if the user taps outside
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text
              style={styles.modalText}
            >{`Course Reçu: ${location.username}`}</Text>
            <Text style={styles.modalText}>{`Prix: ${location.prix}`}</Text>
            <Text
              style={styles.modalText}
            >{`Distance: ${location.info.distance.text}`}</Text>
            <Text
              style={styles.modalText}
            >{`Durée: ${location.info.temps.text}`}</Text>
            <View style={styles.buttonModalContainer}>
              <Button title="Accept" onPress={handleAccept} />
              <Button title="Refuse" onPress={handleRefuse} />
            </View>
          </View>
        </View>
      </Modal>

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
    justifyContent: "center",
    alignContent: "center",
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
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonModalContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
