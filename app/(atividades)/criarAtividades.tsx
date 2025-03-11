import React from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Finances = () => {
    return (
        <View style = {{ flex: 1, alignItems: 'center' }}>
            <Text>New Expense</Text>
            <input type="number" />
            <Text>Category</Text>
            <Text>Date</Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    createButton: {
        position: 'absolute',
        bottom: 90,
        alignSelf: 'center', // 🔹 Ajuste para ficar acima da tabBar
        height: 50,
        width: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007bff',
        elevation: 5, // 🔹 Sombra para destacar o botão
    },
    buttonText: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'center',
        
    },
})

export default Finances;