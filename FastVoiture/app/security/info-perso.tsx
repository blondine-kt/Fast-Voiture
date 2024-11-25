import { Driver } from "@/assets/types";
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Button, TextInput, Alert, Pressable } from 'react-native';

import axios, { AxiosError } from 'axios';
import ModifyPassword  from './modifier'
import { useUser } from "../userauth";
import { Divider } from "react-native-paper";


const DriverInfo: React.FC = () => {
  const {user,userdata} = useUser();
  const [userInfo,setUserInfo] = useState({
    userName:userdata?.userName,
    nom:userdata?.nom,
    email:userdata?.email,
    phone:userdata?.phone,


  })
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState<boolean>(false);
 
  
  //pour afficher et cacher le map
  const toggleVisibility = () =>{
    setIsActive((prevState) => !prevState)
  }
  
  

  // Modifier les infos du conducteur
  const ModifyUserData = async() => {
   if(userInfo){
    try{
         
      const response = await axios.post("http://192.168.2.11:8050/update",{ 
        'userName': userInfo.userName,
        'nom':userInfo.nom,
        'email':userInfo.email,
        'phone': userInfo.phone
      });
      if(response.status == 200){
        const result = await response;
        console.log(result);
        Alert.alert("Info Modifié avec Succès");
        
      }
     

    }catch (error) {
      const axiosError = error as AxiosError; 

      if (axiosError.response) {
        console.error("Error data:", axiosError.response.data);
      } else {
        console.error("Error:", axiosError);
      }
    }
   }
  };
  const handleInputChange = (field: keyof typeof userInfo, value: string) => {
    setUserInfo(prevState => ({
      ...prevState,
      [field]: value 
    }));
  };
 

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mes Informations</Text>

      { userdata && (
        <View style={styles.driverInfo}>
        <Text style={styles.label}>Username: </Text>
        <TextInput
        style={styles.input}
        value={userInfo.userName}
      />
        <Text style={styles.label}>Name: </Text>
        <TextInput
        style={styles.input}
        value={userInfo.nom}
        onChangeText={text => handleInputChange("nom",text)}
      />
        <Text style={styles.label}>Email: </Text>
        <TextInput
        style={styles.input}
        value={userInfo.email}
        onChangeText={text => handleInputChange("email",text)}
      />
      <Text style={styles.label}>Phone: </Text>
        <TextInput
        style={styles.input}
        value={userInfo.phone}
        onChangeText={text => handleInputChange("phone",text)}
        />
        </View>
      )}
      <Button title="Modifier" onPress={ModifyUserData}/>

      <Divider/>
      <Pressable
        style={ [
          styles.button,
          { backgroundColor: isPressed ? 'skyblue' : 'dodgerblue' },
         
        ]}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}

        onPress={toggleVisibility}>
          <Text style={styles.label}>Activer</Text>
        </Pressable>
       {isActive &&(
         <ModifyPassword/>
       )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    alignItems: "center",
    justifyContent:"center",
    alignContent:"center"
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    width: '80%',
    paddingLeft: 10,
  },
  driverInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default DriverInfo;
