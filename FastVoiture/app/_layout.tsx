import { Stack } from 'expo-router';
import React from 'react';
import { UserProvider } from './userauth';
import { StripeProvider } from '@stripe/stripe-react-native';

export default function RootLayout() {
  return (
    <StripeProvider publishableKey="pk_test_51QMJDV4aM5nW2CxvYb1Pkxm24p2NdeI6xp0D83oniKatv5mA2fE2O7mY15iBlXMeK7jVG7WqZBUFAmT0uWkQAnPI00yYOjBi4V"> 
    <UserProvider>
    <Stack>
      <Stack.Screen name="(home)" options={{ headerShown: false }}/>
      <Stack.Screen name = "security" options={{ headerShown: false }}/>
      <Stack.Screen name ="(locs)" options={{ headerShown: false }}/>
      <Stack.Screen name = "userauth" options={{ headerShown: false }}/>
      <Stack.Screen name = "payments" options={{ headerShown: false }}/>
    </Stack>
    </UserProvider>
    </StripeProvider>
  );
}
