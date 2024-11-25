import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import DriverInfo from './info-perso';

const Profil: React.FC = () => {
  return (
    < SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <DriverInfo />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profil;
