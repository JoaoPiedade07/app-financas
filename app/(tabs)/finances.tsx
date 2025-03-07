import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Finances = () => {
    return (
        <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Finances Screen</Text>
            {/* 🔹 Botão flutuante FIXO no fundo da tela */}
            <TouchableOpacity style={styles.createButton}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
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