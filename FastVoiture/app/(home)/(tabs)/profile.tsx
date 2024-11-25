
import React from 'react'
import { View,Text, StyleSheet, TouchableOpacity,AlertButton,Alert, } from 'react-native'
import { useRouter } from 'expo-router';

import {useUser} from '../../userauth';




export default function ProfileScreen() {
    const {user,signOut} = useUser()
    const router = useRouter()

    const goback =()=>{
       if(user){
        signOut()
        router.push("/")
       }
    }

    //button pour se deconnecter
    const toDisconnect = () =>
      Alert.alert('Déconnexion', 'Voulez-vous vraiment vous déconnecter ?', [
        {
          text: 'Non',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Oui', onPress: () => goback()},
      ]);
  
    return (
     <View style={styles.container}>
        { /* View containing user name */ } 
     {user &&
     <View> 
     <Text  style={styles.header}>Acceuil {user?.name}</Text>
     </View>}
     <View style={styles.wrapper}>
     <View style={styles.items}>
     <TouchableOpacity style={styles.item} onPress={
        () => router.push('/security/security-page')}>
        <Text style={styles.itemText}>
            Sécurité
        </Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.item} onPress={() => router.push('/security/profil')}>
        <Text style={styles.itemText}>
            Profil
        </Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.item} onPress={() => router.push('/(locs)/mapsview')}>
        <Text style={styles.itemText}>
            Ajouter Adresse
        </Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>
            Paramètres
        </Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.item} onPress={() => toDisconnect()}>
        <Text style={styles.itemText}>
            Déconnexion
        </Text>
     </TouchableOpacity>
     </View>
     </View>
     </View>
    )
  
}








const styles = StyleSheet.create(
    {
        container:{
          flex: 1,
          backgroundColor: '#E8EAED',
          
    
        } ,
        header:{
          fontSize:24,
          fontStyle:"normal",
          textAlign:"center",
          fontWeight:"bold",
          fontFamily:'sans-serif-condensed',
          padding:10,
    
    
        },
        wrapper:{
          paddingTop: 80,
          paddingHorizontal: 20,
          
          
        },
        items:{
          marginTop: 30,
    
        },
        itemText: {
          maxWidth: '80%',
        },
        item: {
          backgroundColor: '#FFF',
          padding: 15,
          borderWidth:2,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
          borderColor: "#2a9ec6",
          
        },
      }
) 
  

