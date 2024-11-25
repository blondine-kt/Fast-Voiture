import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  Alert,
  Button,
  ScrollView
} from "react-native";
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
import { useUser } from "../../userauth";


function Summary() {
  const { userdata } = useUser();
  const [voir, setVoir] = useState<boolean>(false)
  const [courses, setCourses] = useState<any[]>([]);
  const username = userdata?.userName || "";

  //retrouver les course dans la db firebase

  useEffect(() => {
    const fetchProducts = async () => {
        if(username){
            try {
                const q = query(
                  collection(dbdrivers, "courses"),
                  where("chauffeur", "==", username)
                ); 
        
                const querySnapshot = await getDocs(q);
        
                const fetchedProducts = querySnapshot.docs.map((doc) => ({
                  id: doc.id,
        
                  ...doc.data(),
                }));
        
                setCourses(fetchedProducts);
              } catch (error) {
                console.error("Error fetching courses:", error);
              }
        } else{
            Alert.alert('Aucun Conducteur Trouvé')
        }
      
    };

    if (username) {
      // Fetch only if username is provided

      fetchProducts();
    }
  }, [username]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text style={styles.title}>Chauffeur: {item.chauffeur}</Text>

      <Text style={styles.title}>Passager: {item.passager}</Text>

      <Text style={styles.price}>Départ: {item.origin}</Text>

      <Text style={styles.price}>Destination: {item.destination}</Text>

      <Text style={styles.price}>Immatriculation: {item.immatriculation}</Text>

      <Text style={styles.price}>Prix: ${item.prix}</Text>
    </View>
  );

  return (
    < SafeAreaView style={styles.container}>
      <FlatList
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#E8EAED',

    padding: 20,

    
  },

  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderWidth:2,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderColor: "#2a9ec6",
  },

  title: {
    fontSize: 16,
  },

  price: {
    fontSize: 14,

    color: "#12082d",
  },
});

export default Summary;
