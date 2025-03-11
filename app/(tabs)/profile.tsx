import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const Settings = () => {
    return (
        <View>
            <TouchableOpacity style={styles.profileIconContainer}>
                <Image 
                source={require('@/assets/images/logo.png')} 
                style={styles.profileIcon} 
            />
            </TouchableOpacity>
            <Text style = {{ flex: 1, alignContent: 'center' }}>Name</Text>
        </View>
    );
}; 

const styles = StyleSheet.create ({
    profileIconContainer: {
        //position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,  
      },
    profileIcon: {
        width: 120,
        height: 120,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#fff',
      },
});

export default Settings;