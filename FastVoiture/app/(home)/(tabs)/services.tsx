import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

import {useUser} from '../../userauth';
import Map_directions from '@/app/(locs)/map_direction';

export default function Services(){
 
    return (
      <View style={styles.container}>
        <View> 
      <Text  style={styles.header}>Services</Text>
      </View>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>
            Sécurité
        </Text>
     </TouchableOpacity>
     <View style={styles.map_container}>
       <Map_directions/>
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
      map_container:{
        flex: 1

      },
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
) ;



