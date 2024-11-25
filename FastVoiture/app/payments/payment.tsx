import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

const PayPalPage = () => {
  const [approvalUrl, setApprovalUrl] = useState<string | null>(null);

  // Function to create the PayPal payment by calling FastAPI
  const createPayment = async () => {
    try {
      const response = await fetch('http://192.168.2.11:8000/create-paypal-payment/?amount=50.00&currency=CAD', {
        method: 'POST',
      });
      const data = await response.json();
      console.log(data)

      if (data.approval_url) {
        setApprovalUrl(data.approval_url);
      } else {
        Alert.alert('Error', 'Failed to create PayPal payment');
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Pay with PayPal</Text>
      <Button title="Proceed to PayPal" onPress={createPayment} />

      {approvalUrl && (
        <WebView
          source={{ uri: approvalUrl }}
          style={{ marginTop: 20, width: '100%', height: 400 }}
        />
      )}
    </View>
  );
};

export default PayPalPage;
