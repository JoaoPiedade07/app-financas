import React from 'react';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const Finances = () => {
    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>Transactions</Text>
            <View style={styles.transactionRow}>
                    <View style={styles.transactionInfo}>
                        <View style={[styles.iconContainerWeak, { backgroundColor: '#4CAF50' }]}>
                            <Ionicons name="arrow-up-outline" size={18} color="white" />
                        </View>
                        <View>
                            <Text style={styles.transactionName}>App UI</Text>
                            <Text style={styles.transactionDate}>12 Set 2025</Text>
                        </View>
                    </View>
                    <Text style={[styles.transactionValue, styles.positive]}>+10.000</Text>
                </View>
                <View style={styles.transactionRow}>
                    <View style={styles.transactionInfo}>
                        <View style={[styles.iconContainerWeak, { backgroundColor: '#F44336' }]}>
                            <Ionicons name="arrow-down-outline" size={18} color="white" />
                        </View>
                        <View>
                            <Text style={styles.transactionName}>Food Shopping</Text>
                            <Text style={styles.transactionDate}>23 Dec 2025</Text>
                        </View>
                    </View>
                    <Text style={[styles.transactionValue, styles.negative]}>-30.45</Text>
                </View>
                <View style={styles.transactionRow}>
                    <View style={styles.transactionInfo}>
                        <View style={[styles.iconContainerWeak, { backgroundColor: '#F44336' }]}>
                            <Ionicons name="arrow-down-outline" size={18} color="white" />
                        </View>
                        <View>
                            <Text style={styles.transactionName}>Shopping</Text>
                            <Text style={styles.transactionDate}>10 Set 2025</Text>
                        </View>
                    </View>
                    <Text style={[styles.transactionValue, styles.negative]}>-120.99</Text>
                </View>
                <View style={styles.transactionRow}>
                    <View style={styles.transactionInfo}>
                        <View style={[styles.iconContainerWeak, { backgroundColor: '#4CAF50' }]}>
                            <Ionicons name="arrow-up-outline" size={18} color="white" />
                        </View>
                        <View>
                            <Text style={styles.transactionName}>Visual Design</Text>
                            <Text style={styles.transactionDate}>08 Set 2025</Text>
                        </View>
                    </View>
                    <Text style={[styles.transactionValue, styles.positive]}>+300.00</Text>
                </View>
            </ScrollView>
            {/* 🔹 Botão flutuante FIXO no fundo da tela */}
            <TouchableOpacity style={styles.createButton}>
                <Link href={ '/(atividades)/criarAtividades' } style = { styles.buttonText }>+</Link>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create ({
    screen: {
        flex: 1, // Ocupa toda a tela
    },
    scrollContainer: {
        paddingBottom: 80, // Garante espaço para o botão
    },
    title: {
        fontSize: 18,
        marginLeft: 15,
        marginTop: 10,
        color: '#666',
    },
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
    transactionName: {
        fontSize: 16,
        color: '#333',
        marginBottom: 4, // Espaçamento entre nome e data
        marginLeft: 5,
    },
    transactionDate: {
        fontSize: 12,
        color: '#666',
        marginLeft: 5,
    },
    transactionValue: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 15,
    },
    positive: {
        color: '#4CAF50',
    },
    negative: {
        color: '#F44336',
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
})

export default Finances;