import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
} from "react-native";
import { dbdrivers } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { useUser } from "../userauth";

function Summary() {
  const { userdata } = useUser();
  const [courses, setCourses] = useState<any[]>([]);
  const username = userdata?.userName || "";

  //retrouver les course dans la db firebase

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(dbdrivers, "products"),
          where("username", "==", username)
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
    };

    if (username) {
      // Fetch only if username is provided

      fetchProducts();
    }
  }, [username]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.chauffeur}</Text>

      <Text style={styles.title}>${item.passager}</Text>

      <Text style={styles.price}>${item.origin}</Text>

      <Text style={styles.price}>${item.destination}</Text>

      <Text style={styles.price}>${item.immatriculation}</Text>

      <Text style={styles.price}>${item.prix}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",

    alignItems: "center",

    justifyContent: "center",
  },

  item: {
    padding: 10,

    marginVertical: 8,

    marginHorizontal: 16,

    backgroundColor: "#f9c2ff",

    borderRadius: 5,
  },

  title: {
    fontSize: 16,
  },

  price: {
    fontSize: 14,

    color: "#888",
  },
});

export default Summary;
