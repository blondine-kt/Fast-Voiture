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

import { useUser } from "../../userauth";
import Map_directions from "../../(locs)/map_direction";

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
  username: string
  origin: Location;
  destination: Location;
  info: Info;
  prix: number;
}

export default function Services() {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [accepted, setAccepted] =useState(false);

  const [location, setLocation] = useState<LocationState>({
    username:'',
    origin: { latitude: 0, longitude: 0 },
    destination: { latitude: 0, longitude: 0 },
    info: { distance: {text:"",value:0}, temps:{text:"",value:0} },
    prix: 0.00,
  });

  const fetchData = async () => {
    setLoading(true);  

    try {
      const response = await fetch('https://location-api-63ti.onrender.com/getdata'); 
      const data = await response.json();
      console.log(data)

      
      const dynamicKey = Object.keys(data)[0]; 
      const fetchedItinerary = data[dynamicKey];

      
      if (fetchedItinerary) {
        setModalVisible(true)
        if(accepted){
        setLocation(fetchedItinerary);
        }

      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data from the server');
    } finally {
      setLoading(false); 
    }
  };

  
  
  useEffect(() => {
    console.log("Location updated:", location);
  }, [location]);

  

  
  //pour afficher et cacher le map
  const toggleVisibility = () =>{
    setIsActive((prevState) => !prevState)
  }

  // accepter la requete passager
  const handleAccept = () => {
    setAccepted(true);
    Alert.alert('Accepter', `${location.username}`);
    setModalVisible(false); 
  };

  // Refuser la requete
  const handleRefuse = () => {
    setAccepted(false)
    Alert.alert('Refuser', `${location.username}`);
    setModalVisible(false); // Close the modal
  };

  

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Services</Text>
        <Pressable
        style={ [
          styles.button,
          { backgroundColor: isPressed ? 'skyblue' : 'dodgerblue' },
         
        ]}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}

        onPress={toggleVisibility}>
          <Text style={styles.buttonText}>Activer</Text>
        </Pressable>

      </View>
      <View>
  
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={()=> fetchData()}
          >
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
            <Text style={styles.modalText}>{`Course Reçu: ${location.username}`}</Text>
            <Text style={styles.modalText}>{`Prix: ${location.prix}`}</Text>
            <Text style={styles.modalText}>{`Distance: ${location.info.distance.text}`}</Text>
             <Text style={styles.modalText}>{`Durée: ${location.info.temps.text}`}</Text>
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonModalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
