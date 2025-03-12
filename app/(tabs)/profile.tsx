import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, Dimensions, FlatList } from 'react-native';
import { Card } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
 
const Profile = () => {

    return (
        <View>
            <Link href={ '/(profile)/settings' } style={styles.settingsIcon}>
                <Ionicons name="menu-outline" size={28} color="black" />
            </Link>
            <TouchableOpacity style={styles.profileIconContainer}>
                <Image 
                source={require('@/assets/images/logo.png')} 
                style={styles.profileIcon} 
            />
            </TouchableOpacity>
            <Text>Name</Text>

            <Text style={styles.title}>Category</Text>
            <Card style={styles.card}>
                <Link href = { '/(profile)/categorias' }>
                    <Card.Content>
                        <View style={styles.transactionRow}>
                            <View style={styles.transactionInfo}>
                                <View style={[styles.iconContainerWeak, { backgroundColor: '#4CAF50' }]}>
                                    <Ionicons name="pricetag-outline" size={18} color="white" />
                                </View>
                                <Text style={styles.transactionName}>Category</Text>
                            </View>
                        </View>
                    </Card.Content>
                </Link>
            </Card>
            
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
    settingsIcon: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 10, // Garante que o ícone fique acima de outros elementos
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
        marginLeft: 0, // Espaço entre o ícone e o texto
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
        marginRight: 20,
    },
    colorBox: {
        width: 10,
        height: 10,
        borderRadius: 10,
        marginRight: 8,
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)', // Leve escurecimento para destacar a dropdown
    },
    dropdownModal: {
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 10,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        minWidth: 120, // 🔹 Define um tamanho mínimo
        maxWidth: 200, // 🔹 Define um tamanho máximo para não esticar demais
    },   
});

export default Profile;