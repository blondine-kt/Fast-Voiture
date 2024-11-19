import { Driver } from "@/assets/types";
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useUser } from "../userauth";


const DriverInfo: React.FC = () => {
  const [userName, setUsername] = useState<string>('');
  const [driver, setDriver] = useState<Driver | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const user = useUser();
  const name = user.user?.name ?? ''
  

  // Fetch driver data from FastAPI
  const fetchDriverData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<Driver>(`http://192.168.2.11:8050/driver/${userName}`);
      setDriver(response.data);
    } catch (err) {
      setError('Driver not found or error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (name !== userName) {  
      setUsername(name);
    }
  }, [name, userName]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Driver Information</Text>
      
      <TextInput
        style={styles.input}
        value={user.user?.name}
      />

      <Button title="Mes Info" onPress={fetchDriverData} />

      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}

      {driver && !loading && !error && (
        <View style={styles.driverInfo}>
          <Text><strong>Username:</strong> {driver.userName}</Text>
          <Text><strong>Name:</strong> {driver.nom}</Text>
          <Text><strong>Email:</strong> {driver.email}</Text>
          <Text><strong>Phone:</strong> {driver.phone}</Text>
          <Text><strong>License Number:</strong> {driver.license_plate}</Text>
        </View>
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
