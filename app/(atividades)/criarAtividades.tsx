import React from 'react';
import { Card } from "react-native-paper";
import { Link } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Finances = () => {
    return (
        <View>
            <Text style = { styles.title }>New Expense</Text>
            <Card style = { styles.card }>
                <Card.Content>
                    <input type="number" />
                </Card.Content>
            </Card>
            <Text style = { styles.title }>Category</Text>
            <Card style = { styles.card }>
                <Card.Content>
                <View style={styles.transactionRow}>
                    <View style={styles.transactionInfo}>
                        <View style={[styles.iconContainerWeak, { backgroundColor: '#4CAF50' }]}>
                            <Ionicons name="pricetag-outline" size={18} color="white" />
                        </View>
                        <View>
                            <Text style={styles.transactionName}>Category</Text>
                        </View>
                    </View>
                    <Text style={ styles.transactionValue }>Home</Text>
                </View>
                </Card.Content>
            </Card>
            <Text style = { styles.title }>Date</Text>
            <Card style = { styles.card }>
                <Card.Content>
                <View style={styles.transactionRow}>
                    <View style={styles.transactionInfo}>
                        <View style={[styles.iconContainerWeak, { backgroundColor: '#4CAF50' }]}>
                            <Ionicons name="calendar-outline" size={18} color="white" />
                        </View>
                        <View>
                            <Text style={ styles.transactionName }>Date</Text>
                        </View>
                    </View>
                    <Text style={ styles.transactionValue }>11/03/2025</Text>
                </View>
                </Card.Content>
            </Card>
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
    card: {
        margin: 10,
        borderRadius: 10,
        elevation: 4,
        backgroundColor: "white",
    },
    title: {
        fontSize: 18,
        marginLeft: 15,
        marginTop: 10,
        color: '#666',
    },
    iconContainerWeak: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        marginLeft: 10, // Espaço entre o ícone e o texto
    },
    transactionName: {
        fontSize: 16,
        color: '#333',
        marginBottom: 4, // Espaçamento entre nome e data
        marginLeft: 5,
    },
    transactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    transactionInfo: {
        flexDirection: 'row', // Para alinhar ícone e texto lado a lado
        alignItems: 'center', // Centraliza verticalmente
    },
    transactionValue: {
        fontSize: 16,
        //fontWeight: 'bold',
        marginRight: 15,
    },
})

export default Finances;