import React, { useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, TextInput, Button, Dimensions, FlatList } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { BarChart } from '@mui/x-charts/BarChart';


const categories = [
    { label: "Home", color: "#FF5733" }, //Color - Red
    { label: "Food", color: "#33FF57" }, //Color - Green
    { label: "Transporte", color: "#3357FF" }, //Color - Blue
    { label: "Personal", color: "#FF33A1" }, //Color - Pink
];

const data = [
    { label: 'Recepies', value: 50 },
    { label: 'Expenses', value: 80 },
  ];

const Finances = () => {
    const [transactions, setTransactions] = useState([
        { id: 1, name: 'App UI', date: '12 Set 2025', value: 10000, type: 'Recepies' },
        { id: 2, name: 'Food Shopping', date: '23 Dec 2025', value: -30.45, type: 'Expense' },
        { id: 3, name: 'Shopping', date: '10 Set 2025', value: -120.99, type: 'Expense' },
        { id: 4, name: 'Visual Design', date: '08 Set 2025', value: 300, type: 'Recepies' }
    ]);

    const [open, setOpen] = useState(false); 
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleCategories, setModalVisibleCategories] = useState(false);
    const dropdownRef = useRef<View>(null); // Definir um ref corretamente tipado
    const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0, width: 0 });
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState('Expense'); // Default como despesa
    const [newTransaction, setNewTransaction] = useState({ name: '', date: '', value: '' });
    const [calendarVisible, setCalendarVisible] = useState(false);

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
                setModalVisibleCategories(true);
            });
        }
    };

    const addTransaction = () => {
        if (!newTransaction.name || !newTransaction.date || !newTransaction.value) return;

        const newEntry = {
            id: transactions.length + 1,
            name: newTransaction.name,
            date: newTransaction.date,
            value: selectedType === 'Recepies' ? parseFloat(newTransaction.value) : -Math.abs(parseFloat(newTransaction.value)),
            type: selectedType
        };

        setTransactions([...transactions, newEntry]);
        setNewTransaction({ name: '', date: '', value: '' });
        setModalVisible(false);
    };

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            <BarChart
                xAxis={[{ scaleType: 'band', data: [ 'Receits', 'Expenses' ] }]}
                series={[{ data: [1, 7] }, { data: [6, 2] }]}
                width={400}
                height={250}
                />
                <Text style={styles.title}>Upcoming Bills</Text>
                    <FlatList
                        data={[
                            { id: '1', date: '22 JUNE 2025', title: 'Crunchyroll', price: '9.50' },
                            { id: '2', date: '15 MAY 2025', title: 'Spotify', price: '5.99' },
                            { id: '3', date: '1 DECEMBER 2026', title: 'Amazon', price: '7.99' },
                        ]}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                        <View style={styles.cardContainerSlider}>
                            <Text style={styles.dateTextSlider}>{item.date}</Text>
                            <View style={styles.bottomSectionSlider}>
                                <View>
                                    <Text style={styles.titleSlider}>{item.title}</Text>
                                        <Text style={styles.priceSlider}>{item.price}€</Text>
                                </View>
                                <TouchableOpacity style={styles.buttonSlider}>
                                    <Ionicons name="arrow-forward-outline" size={18} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        )}
                    />
                <Text style={styles.title}>Transactions</Text>
                {transactions.map((transaction) => (
                    <View key={transaction.id} style={styles.transactionRow}>
                        <View style={styles.transactionInfo}>
                            <View style={[styles.iconContainerWeak, { backgroundColor: transaction.type === 'Recepies' ? '#4CAF50' : '#F44336' }]}>
                                <Ionicons name={transaction.type === 'Recepies' ? "arrow-up-outline" : "arrow-down-outline"} size={18} color="white" />
                            </View>
                            <View>
                                <Text style={styles.transactionName}>{transaction.name}</Text>
                                <Text style={styles.transactionDate}>{transaction.date}</Text>
                            </View>
                        </View>
                        <Text style={[styles.transactionValue, transaction.type === 'Recepies' ? styles.positive : styles.negative]}>
                            {transaction.value >= 0 ? `+${transaction.value.toFixed(2)}` : `${transaction.value.toFixed(2)}`}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            {/* Botão flutuante para adicionar nova despesa */}
            <TouchableOpacity style={styles.createButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>


            {/* Modal para adicionar transação */}
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>New Transaction</Text>

                    <View style={styles.switcherContainer}>
                        {[ 'Recepie', 'Expense' ].map((type) => (
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

                    <TextInput
                        style={styles.input}
                        placeholder="Price"
                        keyboardType="numeric"
                        value={newTransaction.value}
                        onChangeText={(text) => setNewTransaction({ ...newTransaction, value: text })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={newTransaction.name}
                        onChangeText={(text) => setNewTransaction({ ...newTransaction, name: text })}
                    />

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
                                                    <Text style={styles.transactionText}>{selectedCategory.label}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                {/* Modal Dropdown */}
                                <Modal
                                    animationType="none"
                                    transparent={true}
                                    visible={modalVisibleCategories}
                                    onRequestClose={() => setModalVisibleCategories(false)}
                                >
                                    <TouchableOpacity 
                                        style={styles.overlay} 
                                        activeOpacity={1} 
                                        onPress={() => setModalVisibleCategories(false)}
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
                                                            setModalVisibleCategories(false);
                                                        }}>
                                                        <View style={[styles.colorBox, { backgroundColor: item.color }]}></View>
                                                        <Text style={[styles.transactionText,]}>{item.label}</Text>
                                                    </TouchableOpacity>
                                                )}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </Modal>

                    <View style={styles.transactionRow}>
                    <View style={styles.transactionInfo}>
                        <View style={[styles.iconContainerWeak, { backgroundColor: '#3357FF' }]}>
                            <Ionicons name="calendar-outline" size={18} color="white" />
                        </View>
                        <View>
                            <Text style={ styles.transactionName }>Date</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.dateButton} onPress={() => setCalendarVisible(!calendarVisible)}>
                        <Text style={styles.transactionText}>
                            {newTransaction.date ? newTransaction.date : "Set Date"}
                        </Text>
                    </TouchableOpacity>

                    {/* Modal do Calendário */}
                    <Modal animationType="none" transparent={true} visible={calendarVisible}>
                        <View style={styles.centerView}>
                            <View style={styles.modalView}>
                                <View style={styles.calendarContainer}>
                                    <Calendar
                                        onDayPress={(day: DateData) => {
                                            setNewTransaction({ ...newTransaction, date: day.dateString });
                                            setCalendarVisible(false);
                                        }}
                                        markedDates={{
                                            [newTransaction.date || '']: { selected: true, marked: true, selectedColor: '#007bff' },
                                        }}
                                    />
                                </View>

                                <TouchableOpacity style={styles.button} onPress={() => setCalendarVisible(false)}>
                                    <Text style={styles.dateButtonText}>Fechar Calendário</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    
                </View>
                <View style={styles.modalButtons}>
                    <TouchableOpacity style = { styles.addCancelButtons } onPress={addTransaction}><Text style = { styles.addCancelButtonText }>Add</Text></TouchableOpacity>
                    <TouchableOpacity style = { styles.addCancelButtons } onPress={() => setModalVisible(false)}><Text style = { styles.addCancelButtonText }>Cancel</Text></TouchableOpacity>
                </View>
            </View>
            </View>
        </Modal>          
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: 140,
    },
    title: {
        fontSize: 18,
        marginLeft: 15,
        marginTop: 10,
        color: '#666',
    },
    card: {
        margin: 10,
        borderRadius: 10,
        elevation: 4,
        backgroundColor: "white",
    },
    createButton: {
        position: 'absolute',
        bottom: 90,
        alignSelf: 'center',
        height: 50,
        width: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007bff',
        elevation: 5,
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    transactionName: {
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
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
    transactionText: {
        fontSize: 16,
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
        marginLeft: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-start', 
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalContent: {
        width: '100%',
        height: '100%', 
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 0, 
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        borderRadius: 30,
        marginBottom: 20, // Adiciona uma margem para os botões não ficarem colados ao fundo
    },
    addCancelButtons: {
        borderRadius: 10,
        backgroundColor: "#007bff",
        height: 40,
        width: 90,
        marginHorizontal: 50,

    },
    addCancelButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
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
    dateButton: { 
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10 
    },
    dateButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    modalView: { 
        backgroundColor: 'white',
        padding: 20,
        elevation: 5 
    },
    calendarContainer: { 
        padding: 10, 
        backgroundColor: 'white', 
        borderRadius: 10, 
        elevation: 3 
    },
    centerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    button: {
        marginTop: 10,
        height: 40,
        borderRadius: 8,
        marginHorizontal: 40,
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
    slidingCard: {
        width: 200,
        marginRight: 10,
        borderRadius: 10,
        elevation: 4,
        backgroundColor: 'white',
        padding: 15,
    },
    cardContainerSlider: {
        width: 180,
        height: 150,
        backgroundColor: '#fff', 
        borderRadius: 20,
        elevation: 4,
        padding: 15,
        justifyContent: 'space-between',
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    dateTextSlider: {
        fontSize: 12,
        color: '#333', 
        textAlign: 'center',
    },
    bottomSectionSlider: {
        backgroundColor: '#fff', // Roxo médio
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    titleSlider: {
        fontSize: 14,
        color: 'black',
    },
    priceSlider: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#3357FF',
    },
    buttonSlider: {
        width: 35,
        height: 35,
        backgroundColor: 'orange',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Finances;
