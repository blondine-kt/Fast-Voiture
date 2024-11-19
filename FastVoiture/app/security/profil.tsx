import React from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import DriverInfo from './info-perso';

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <DriverInfo />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
