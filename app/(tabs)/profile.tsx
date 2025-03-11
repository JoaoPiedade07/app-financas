import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const Settings = () => {
    return (
        <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile Screen</Text>
            <TouchableOpacity style={styles.profileIconContainer}>
                <Image 
                source={require('@/assets/images/logo.png')} 
                style={styles.profileIcon} 
            />
            </TouchableOpacity>
        </View>
    );
}; 

const styles = StyleSheet.create ({
    profileIconContainer: {
        position: 'absolute',
        top: 20, // Ajuste conforme sua margem superior
        right: 20,
        zIndex: 10,
      },
    profileIcon: {
        width: 70,
        height: 70,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#fff',
      },
});

export default Settings;