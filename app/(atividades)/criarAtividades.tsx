import React, { useState, useRef } from 'react';
import { Card } from "react-native-paper";
import { Link } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList, Dimensions } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Calendar, DateData } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

const categories = [
    { label: "Home", color: "#FF5733" },
    { label: "Food", color: "#33FF57" },
    { label: "Transporte", color: "#3357FF" },
    { label: "Personal", color: "#FF33A1" },
];

const Finances = () => {

    const [open, setOpen] = useState(false); 
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [modalVisible, setModalVisible] = useState(false);
    const dropdownRef = useRef<View>(null); // Definir um ref corretamente tipado
    const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0, width: 0 });
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState("Expense");

    const openDropdown = () => {
        if (dropdownRef.current) {
            dropdownRef.current.measure((fx, fy, width, height, px, py) => {
                const dropdownHeight = categories.length * 40; // Aproximadamente 40px por item
                let newY = py + height; // Posição abaixo do botão
                let newX = px;
                
                // Ajustar a posição para não sair da tela na vertical
                if (newY + dropdownHeight > screenHeight) {
                    newY = py - dropdownHeight - 10; // Move para cima se ultrapassar a tela
                }
    
                // Ajustar a posição para não sair da tela na horizontal
                if (newX + width > screenWidth - 10) {
                    newX = screenWidth - width - 10; // Mantém dentro da tela
                }
                if (newX < 10) {
                    newX = 10; // Margem mínima para não colar na borda esquerda
                }
    
                setDropdownPosition({ x: newX, y: newY, width });
                setModalVisible(true);
            });
        }
    };    

    function handleOpen() {
        setOpen(!open);
    }

    return (
        <View>
            <Text style = { styles.title }>New Expense</Text>
            <Card style = { styles.card }>
                <Card.Content>
                    <input type="number" />
                    <View style={styles.switcherContainer}>
                    {["Recepies", "Expense"].map((type) => (
                        <TouchableOpacity 
                            key={type} 
                            style={[
                                styles.switcherButton, 
                                selectedType === type && styles.switcherButtonActive
                            ]}
                            onPress={() => setSelectedType(type)}
                        >
                            <Text style={[
                                styles.switcherText, 
                                selectedType === type && styles.switcherTextActive
                            ]}>
                                {type}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                </Card.Content>
            </Card>
            <Text style={styles.title}>Category</Text>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.transactionRow}>
                        <View style={styles.transactionInfo}>
                            <View style={[styles.iconContainerWeak, { backgroundColor: '#4CAF50' }]}>
                                <Ionicons name="pricetag-outline" size={18} color="white" />
                            </View>
                            <Text style={styles.transactionName}>Category</Text>
                        </View>
                        <TouchableOpacity ref={dropdownRef} onPress={openDropdown}>
                            <View style={styles.transactionInfo}>
                                <View style={[styles.colorBox, { backgroundColor: selectedCategory.color }]}></View>
                                <Text style={styles.transactionValue}>{selectedCategory.label}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Card.Content>
            </Card>

            {/* Modal Dropdown */}
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity 
                    style={styles.overlay} 
                    activeOpacity={1} 
                    onPress={() => setModalVisible(false)}
                >
                    <View style={[styles.dropdownModal, { top: dropdownPosition.y, left: dropdownPosition.x }]}>
                        <FlatList 
                            data={categories}
                            keyExtractor={(item) => item.label}
                            contentContainerStyle={{ flexGrow: 1 }} // 🔹 Evita que a lista estique
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                    style={styles.categoryItem} 
                                    onPress={() => {
                                        setSelectedCategory(item);
                                        setModalVisible(false);
                                    }}>
                                    <View style={[styles.colorBox, { backgroundColor: item.color }]}></View>
                                    <Text style={styles.transactionValue}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>

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
                        <Text style={styles.transactionValue}>
                            {selectedDate ? selectedDate : "Set Date"}
                        </Text>
                    </TouchableOpacity>

                        <Modal
                        animationType='slide'
                        transparent={true}
                        visible={open}>
                            <View style={styles.centerView}>
                            <View style={styles.modalView}>

                            <ThemedView style={styles.calendarContainer}>
                            <Calendar 
                                onDayPress={(day: DateData) => {
                                    setSelectedDate(day.dateString); // Atualiza a data escolhida
                                    setOpen(false); // Fecha o modal
                                }}
                                markedDates={{ 
                                    [selectedDate || '']: { selected: true, marked: true, selectedColor: '#007bff' },
                                }}
                            />
                            </ThemedView>

                            <TouchableOpacity style={styles.button} onPress={handleOpen}>
                                <Text style={styles.buttonText}>Close Calendar</Text>
                            </TouchableOpacity>

                            </View>
                            </View>
                        </Modal>
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
        marginRight: 20,
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
    switcherContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#EEE",
        borderRadius: 10,
        marginVertical: 10,
        padding: 5,
    },
    switcherButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 8,
    },
    switcherButtonActive: {
        backgroundColor: "#007bff",
    },
    switcherText: {
        fontSize: 16,
        color: "#333",
    },
    switcherTextActive: {
        color: "#FFF",
        fontWeight: "bold",
    },    
})

export default Finances;