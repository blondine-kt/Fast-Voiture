import React, { useState } from "react";
import * as Notifications from "expo-notifications";
import {
  View,
  Button,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { dbdrivers } from "../firebaseConfig";
import { collection, query, where, getDocs, setDoc, doc,addDoc } from 'firebase/firestore';
import { router } from "expo-router";

const MyForm = () => {
  //using fetch to connect with fast server

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Nom d'utilisateur est requis"),
    name: Yup.string().required("Nom requis"),
    surname: Yup.string().required("Prenom est requis"),
    email: Yup.string().email("Email invalide").required("Email est requis"),
    password: Yup.string()
      .min(6, "Le mot de passe doit contenir au moins 6 carateres")
      .required("Le mot de passe est requis"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Le mot de passe pas similaire")
      .required("Confirmer votre mot de passe"),
    phone: Yup.string()
      .min(10, "Le numero doit contenir 10 chiffre")
      .required("Le numero de telephone est requis"),
    license_plate: Yup.string().required(
      "Le numero d'immatriculation est requis"
    ),
    driver_license: Yup.string().required("Le numero du permis est requis"),
  });

  //unique username verification
  const usernameExists = async (username) => {
    const q = query(collection(dbdrivers, 'drivers'), where('username', '==', username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Returns true if username exists
  };

  //firestoredb
  const addDriver = async(values)=>{
    const exists = await usernameExists(values.userName);
  if(exists == false){
    try {
      const docRef = await addDoc(collection(dbdrivers, "drivers"), {
        username: values.userName,
        nom: values.nom,
        password: values.password,
        email: values.email,
        phone: values.phone,
        license_plate: values.license_plate,
        driver_license: values.driver_license,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
   }
  }else{
    Alert.alert("Erreur","Username existe deja")
  }
    
  }
    
  
  const handleSubmit = async (values) => {
    const formData = { ...values };
    const Driver = {
      'userName': formData.username,
      'nom': formData.name + " " + formData.surname,
      'password': formData.password,
      'email': formData.email,
      'phone': formData.phone,
      'license_plate': formData.license_plate,
      'driver_license': formData.driver_license,
    };
    
    if (Driver != null) {
      try {
        const response = await axios.post("http://192.168.43.75:8050/", {
          userName: formData.username,
          nom: formData.name + " " + formData.surname,
          password: formData.password,
          email: formData.email,
          phone: formData.phone,
          license_plate: formData.license_plate,
          driver_license: formData.driver_license,
        });

        if (response.status != 200) {
          throw new Error(`Response not ok! status: ${response.status}`);
        }
        else{
          addDriver(Driver)
          const result = await response;
          console.log(result);
          // Second, call the method
          router.push('/(home)/signin')
        }
        
      } catch (error) {
        if (error.response) {
          console.error("Error data:", error.response.data);
        } else {
          console.error("Error:", error);
        }
      }
    } else {
      Alert.alert("Vous devez entrer vos informations");
    }
  };
 

  return (
    <ScrollView>
      <Formik
        initialValues={{
          username: "",
          name: "",
          surname: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          license_plate: "",
          driver_license: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={styles.container}>
            <TextInput
              placeholder="Nom d'utilisateur"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              style={styles.input}
            />
            {errors.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}

            <TextInput
              placeholder="Nom"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              style={styles.input}
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <TextInput
              placeholder="Prenom"
              onChangeText={handleChange("surname")}
              onBlur={handleBlur("surname")}
              value={values.surname}
              style={styles.input}
            />
            {errors.surname && (
              <Text style={styles.error}>{errors.surname}</Text>
            )}

            <TextInput
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              style={styles.input}
              keyboardType="email-address"
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              placeholder="Mot de passe"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              style={styles.input}
              secureTextEntry
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <TextInput
              placeholder="Confirmer Mot de passe"
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              style={styles.input}
              secureTextEntry
            />
            {errors.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}

            <TextInput
              placeholder="Telephone"
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              value={values.phone}
              style={styles.input}
              keyboardType="phone-pad"
            />
            {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

            <TextInput
              placeholder="Numero d'immatriculation"
              onChangeText={handleChange("license_plate")}
              onBlur={handleBlur("license_plate")}
              value={values.license_plate}
              style={styles.input}
            />
            {errors.license_plate && (
              <Text style={styles.error}>{errors.license_plate}</Text>
            )}

            <TextInput
              placeholder="Numero de Permis de Conduire"
              onChangeText={handleChange("driver_license")}
              onBlur={handleBlur("driver_license")}
              value={values.driver_license}
              style={styles.input}
            />
            {errors.driver_license && (
              <Text style={styles.error}>{errors.driver_license}</Text>
            )}

            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 15,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default MyForm;
