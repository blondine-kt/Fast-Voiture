import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React, { useRef } from 'react';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera'
import { faRotateLeft} from '@fortawesome/free-solid-svg-icons/faRotateLeft'
import * as FileSystem from 'expo-file-system';

import { useUser } from "../userauth";
import { router } from 'expo-router';


export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const camRef = useRef<CameraView>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const { setUser } = useUser();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
  async function takePicture() {
    
    if (camRef && camRef.current) {
      const data = await camRef.current.takePictureAsync({
        quality:1,
        exif:false
      });
      
      if (data) {
        setCapturedPhoto(data.uri);

        setModalIsOpen(true);
        CompareuploadImage(data.uri)
      } else {
        console.error('No data returned from takePictureAsync');
      }
    }
    } 

    const CompareuploadImage = async (uri: string) => {
      const formData = new FormData();

       // Use FileSystem to read the file as a blob
    const response = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
     
    const base64Blob = `data:image/jpeg;base64,${response}`;

      formData.append('file', {
        uri: uri,
        name: 'photo.jpeg', 
        type: 'image/jpeg', 
      } as unknown as Blob);
  
      try {
        const response = await fetch('http://192.168.43.75:5001/login', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        const responseData = await response.json();
        if (response.ok) {
        console.log(responseData.message);
        const user ={
          'name': responseData.username,
          'password':"",
        }
        setUser(user)
        router.push('/(home)/(tabs)/acceuil')
      
        } else {
          console.log(responseData.error)
          Alert.alert('Upload failed', responseData.error);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        Alert.alert('Upload failed', 'Something went wrong!');
      }
    };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={camRef} >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
          <FontAwesomeIcon icon={faCamera} />
          </TouchableOpacity>
           </View>
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <FontAwesomeIcon icon={faRotateLeft} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    height: 50,
    width: 50,
    flexDirection:'column-reverse',
    backgroundColor: 'white',
    margin: 50,
    borderCurve:'circular',
    borderColor:'gray',
    borderStyle:'solid',
    borderWidth:3,
    borderRadius: 35,
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
  },
  button: {
    alignItems: 'center',
    alignContent:'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
