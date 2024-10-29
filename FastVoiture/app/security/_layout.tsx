import { Stack } from 'expo-router';
import React from 'react';



export default function SecurityLayout() {
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
       
       <Stack.Screen name="security-page" options={{title:"Sécurité"}} />
       <Stack.Screen name="register-image" options={{title:"Enregistrer une Image"}}/>
       <Stack.Screen name="modifypassword" options={{title:"Modifier Mot de passe"}}/>
       <Stack.Screen name='register-voice' options={{title:'Enregistrer votre voix'}}/>
    </Stack>
    
  );
}
