import React, { useState } from "react";
import { View, Text, TouchableOpacity,Image } from "react-native";


const GfGApp = () => {

    return (
        <View style={{ marginTop: 200 }}>
            
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderColor: 'red',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 70,
                    position: 'absolute',
                    top: 390,
                    right: 20,
                    height: 70,
                    borderRadius: 100,
                }}
                onPress={() => { alert('Button is pressed') }}
            >
                <Image source={require( '../../assets/images/bot-audrey.png')} alt="Chatbot"/>
            </TouchableOpacity>
        </View>
    );
};

export default GfGApp;