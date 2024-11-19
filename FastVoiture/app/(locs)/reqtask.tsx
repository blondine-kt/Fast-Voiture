import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, StyleSheet, Alert } from 'react-native';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

// The name of your background fetch task
const BACKGROUND_FETCH_TASK = 'background-fetch-task';

// Background fetch task
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    // Perform your server request (fetch data from your server)
    const response = await fetch('');
    const data = await response.json();

    // You can process or log your data (in this case, we'll show it in a modal)
    console.log('Data fetched:', data);

    // Return NewData to signal that the background task was successful
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error('Error fetching data:', error);
    // Return Failed if there's an error fetching the data
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

const RetriveTask = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fetchedData, setFetchedData] = useState('');

  useEffect(() => {
    const registerBackgroundFetch = async () => {
      // Register the background fetch task with a minimum interval of 5 seconds (may not run every 5 seconds on iOS)
      try {
        await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
          minimumInterval: 5, // Minimum interval in seconds
          stopOnTerminate: false, // Keep running when the app is terminated
          startOnBoot: true, // Start fetch task on device reboot
        });
        console.log('Background Fetch task registered');
      } catch (error) {
        console.error('Failed to register background fetch task:', error);
      }
    };

    // Register background fetch when the app mounts
    registerBackgroundFetch();

    return () => {
      // Cleanup when the app unmounts
      BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
    };
  }, []);

  // Function to show the fetched data in the modal
  const showFetchedData = (data: string) => {
    setFetchedData(data);
    setModalVisible(true);
  };

  // Function to handle Accept action
  const handleAccept = () => {
    Alert.alert('Accepted', `You accepted the message: ${fetchedData}`);
    setModalVisible(false); // Close the modal
  };

  // Function to handle Refuse action
  const handleRefuse = () => {
    Alert.alert('Refused', 'You refused the message.');
    setModalVisible(false); // Close the modal
  };

  return (
    <View style={styles.container}>
      <Text>Background Fetch Example</Text>

      {/* Modal for displaying the message */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal if the user taps outside
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{fetchedData}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Accept" onPress={handleAccept} />
              <Button title="Refuse" onPress={handleRefuse} />
            </View>
          </View>
        </View>
      </Modal>

      <Button
        title="Simulate Data Fetch"
        onPress={() => showFetchedData(fetchedData)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default RetriveTask;
