import { Stack } from 'expo-router';
import React from 'react';



export default function LocationLayout() {
  return (
    
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2a9ec6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
       
       <Stack.Screen name="mapsview" options={{title:"Carte"}} />
       <Stack.Screen name="reqtask" options={{title:"BackFetch"}} />
      
    </Stack>
    
  );
}
