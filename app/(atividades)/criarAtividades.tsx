import React, { useState } from 'react';
import { Card } from "react-native-paper";
import { Link } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Calendar, DateData } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

const Finances = () => {

    const [open, setOpen] = useState(false); //Open and close the calendar

    function handleOpen() {
      setOpen(!open);
    }

    return (
        <View>
            <Text style = { styles.title }>New Expense</Text>
            <Card style = { styles.card }>
                <Card.Content>
                    <input type="number" />
                    <Text style = { styles.title }>Recepies</Text>
                    <Text style = { styles.title }>Expense</Text>
                    <Text style = { styles.title }>Upcoming Bills</Text>
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
                    <TouchableOpacity onPress={handleOpen}>
                        <Text style={styles.transactionValue}>Set Date</Text>

                        <Modal
                        animationType='slide'
                        transparent={true}
                        visible={open}>
                            <View style={styles.centerView}>
                            <View style={styles.modalView}>

                            <ThemedView style={styles.calendarContainer}>
                                <Calendar 
                                onDayPress={(day: DateData) => console.log('Selected day:', day)}
                                markedDates={{ 
                                '25-02-2025': {selected: true, marked: true, selectedColor: 'blue'},
                                }}
                                />
                            </ThemedView>

                            <TouchableOpacity style={styles.button} onPress={handleOpen}>
                                <Text style={styles.buttonText}>Close Calendar</Text>
                            </TouchableOpacity>

                            </View>
                            </View>
                        </Modal>
                    </TouchableOpacity>
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
        fontSize: 18,
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
        marginRight: 15,
    },
    calendarContainer: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 3,
      },
    centerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '80%',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
    button: {
        marginTop: 10,
        height: 50,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
      },
})

export default Finances;