
import { useState } from "react"
import React from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useUser } from '../userauth'; 
import axios, { AxiosError } from "axios";


function ModifyPassword() {
    const [password,setPassword] = useState<string>('')
    const [confirmpassword, setConfirmPassword] = useState<string>('')
    const {userdata } = useUser();

    
    const handlePasswordChange = (text: string) => {
        setPassword(text);
      };
    
      const handleConfirmChange = (text: string)=>{
        setConfirmPassword(text);
      }
      const ModifyUserPassword = async() => {
        if(password == confirmpassword){
            try{
                 
              const response = await axios.post("http://192.168.2.11:8050//update_password",{ 
                'userName': userdata?.userName,
                'password':password,

              });
              if(response.status == 200){
                const result = await response;
                console.log(result);
                Alert.alert("Mot de Passe Modifié avec Succès");
                
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
           else{
            Alert.alert("Erreur","Les mot de pass sont dofferent!")
           }
          }; 
      


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier Mot de Passe:</Text>

      <View style={styles.inputContainer}>
        <Text>Nouveau mot de passe:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
          
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Confirmer nouveau mot de passe:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={confirmpassword}
          onChangeText={handleConfirmChange}
          
        /> 
      </View>
      <Button title="Modifier Mot de Passe" onPress={ModifyUserPassword} />
      </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: 'center',
    },
    inputContainer: {
      marginBottom: 12,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
    },
    error: {
      color: 'red',
      marginTop: 4,
    },
  });
export default ModifyPassword