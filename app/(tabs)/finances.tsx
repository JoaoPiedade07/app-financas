import React, { useState, useRef, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, TextInput, Button, Dimensions, FlatList } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { BarChart } from '@mui/x-charts/BarChart';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTransactions } from '../Transactions/TransactionContent';

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

    const [open, setOpen] = useState(false); 
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleCategories, setModalVisibleCategories] = useState(false);
    const [modalVisibleDelete, setModalVisibleDelete] = useState(false);
    const dropdownRef = useRef<View>(null); // Definir um ref corretamente tipado
    const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0, width: 0 });
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState('Expenses'); // Default como despesa
    const [newTransaction, setNewTransaction] = useState({ name: '', date: '', value: '' });
    const [calendarVisible, setCalendarVisible] = useState(false);
    const translateY = useSharedValue(0); // Controla a posição vertical do modal
    const isModalOpen = useSharedValue(true); // Indica se o modal está aberto
    const { transactions, addTransaction, deleteTransaction } = useTransactions();
    const [swipedTransactionId, setSwipedTransactionId] = useState<string | null>(null);
    const swipeX = useSharedValue(0);
    const deleteWidth = useSharedValue(0);
    const deleteOpacity = useSharedValue(0);
    const [transactionToDelete, setTransactionToDelete] = useState<any>(null);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

    const swipeGesture = Gesture.Pan()
        .onUpdate((event) => {
            // Only allow left swipe (negative values)
            if (event.translationX < 0) {
                swipeX.value = event.translationX;
            }
        })
        .onEnd((event) => {
            // If swiped more than 80px to the left, keep it open
            // Otherwise, snap back to original position
            if (event.translationX < -80) {
                swipeX.value = withTiming(-80);
            } else {
                swipeX.value = withTiming(0);
                setSwipedTransactionId(null);
            }
        });
    
        const rowAnimatedStyle = useAnimatedStyle(() => {
            return {
                transform: [{ translateX: swipeX.value }]
            };
        });
            
        // Function to handle starting a swipe on a transaction
        const handleSwipeStart = useCallback((transactionId: string) => {
            setSwipedTransactionId(transactionId);
            swipeX.value = 0; // Reset the swipe position
        }, []);

        // Create a separate gesture for each transaction
        const createSwipeGesture = useCallback((transactionId: string) => {
            return Gesture.Pan()
                .onBegin(() => {
                    handleSwipeStart(transactionId);
                    deleteOpacity.value = 0;
                    deleteWidth.value = 0;
                })
                .onUpdate((event) => {
                    if (event.translationX < 0) {
                        swipeX.value = Math.max(-80, event.translationX);
                        deleteWidth.value = Math.min(80, Math.abs(event.translationX));
                        deleteOpacity.value = Math.min(1, Math.abs(event.translationX) / 80);
                    }
                })
                .onEnd((event) => {
                    if (event.translationX < -40) { // Reduced threshold for better UX
                        swipeX.value = withTiming(-80, { duration: 300 });
                        deleteWidth.value = withTiming(80, { duration: 300 });
                        deleteOpacity.value = withTiming(1, { duration: 300 });
                    } else {
                        swipeX.value = withTiming(0, { duration: 300 });
                        deleteWidth.value = withTiming(0, { duration: 300 });
                        deleteOpacity.value = withTiming(0, { duration: 300 });
                        setTimeout(() => {
                            setSwipedTransactionId(null);
                        }, 300);
                    }
                });
        }, [handleSwipeStart]);

        const deleteButtonStyle = useAnimatedStyle(() => {
            return {
                width: deleteWidth.value,
                opacity: deleteOpacity.value,
                transform: [
                    { translateX: (80 - deleteWidth.value) }, // Slide in from right
                    { scale: 0.9 + (deleteOpacity.value * 0.1) } // Subtle scale effect
                ]
            };
        });

    // Add this to your existing animated styles
    const swipeContainerStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: swipedTransactionId ? 
                `rgba(244, 67, 54, ${deleteOpacity.value})` : 'transparent'
        };
    });

    const getButtonColor = () => {
        return selectedType === 'Recepies' ? '#4CAF50' : '#F44336'; // Verde para Recepie, Vermelho para Expense
    };

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

    const handleAddTransaction = () => {
        if (!newTransaction.name || !newTransaction.date || !newTransaction.value) return;

        const newEntry = {
            id: Date.now().toString(),
            name: newTransaction.name,
            date: newTransaction.date,
            value: selectedType === 'Recepies' ? 
            parseFloat(newTransaction.value) : -Math.abs(parseFloat(newTransaction.value)),
            type: selectedType as 'Recepies' | 'Expenses',
            category: selectedType === 'Recepies' ? 'Income' :
            selectedCategory.label,
            iconColor: selectedType === 'Recepies' ? '#4CAF50' : '#F44336',
            iconName: selectedType === 'Recepies' ? "arrow-up-outline" : "arrow-down-outline"
        };
    
            addTransaction(newEntry);

            setNewTransaction({ name: '', date: '', value: '' });
            setModalVisible(false);
        };
    
        const gesture = Gesture.Pan()
        .onStart(() => {
            // Quando o usuário começa a arrastar
        })
        .onUpdate((event) => {
            if (event.translationY > 0) {
                translateY.value = event.translationY; // Move o modal para baixo
            }
        })
        .onEnd((event) => {
            if (event.translationY > screenHeight * 0.3) {
                // Fecha o modal se o usuário arrastar mais de 30% da tela
                translateY.value = withTiming(screenHeight, { duration: 300 });
                isModalOpen.value = false;
                setTimeout(() =>  {
                    if (modalVisible) setModalVisible(false);
                    if (modalVisibleDelete) setModalVisibleDelete(false);
                }, 300); // Fecha o modal após a animação
            } else {
                // Volta ao topo se o usuário não arrastar o suficiente
                translateY.value = withTiming(0, { duration: 300 });
            }
        });
    
        const animatedStyle = useAnimatedStyle(() => {
            return {
                transform: [{ translateY: translateY.value }],
            };
        });

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
                            { id: '1', date: '22 JUNE 2025', title: 'Crunchyroll', price: '9.55' },
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
                <TouchableOpacity onPress={() => {setModalVisibleDelete(true); 
                translateY.value = withTiming(0, { duration: 300 });
                isModalOpen.value = true;}} >
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
                </TouchableOpacity>
            </ScrollView>

            {/* Modal para eliminar transação */}

            <Modal visible={modalVisibleDelete} animationType='none' transparent={true}>
                <View style={styles.modalContainer}>
                    <GestureDetector gesture={gesture}>
                        <Animated.View style={[styles.modalContent, animatedStyle]}>
                            <View style={styles.dragIndicator}/>

                            <Text style={styles.modalTitle}>Delete Transaction</Text>
                            {transactions.map((transaction) => (
                            <View key={transaction.id} style={styles.swipeContainer}>
                                <Animated.View style={[styles.swipeContainerBackground, swipeContainerStyle]} />
                                <GestureDetector 
                                    gesture={createSwipeGesture(transaction.id.toString())}
                                >
                                    <Animated.View 
                                        style={[
                                            styles.transactionRow, 
                                            swipedTransactionId === transaction.id ? rowAnimatedStyle : null,
                                            { width: '100%', backgroundColor: 'white', borderRadius: 8 }
                                        ]}
                                    >
                                
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
                                    </Animated.View>
                                    </GestureDetector>
                                    {swipedTransactionId === transaction.id && (
                                    <Animated.View style={[styles.deleteButton, deleteButtonStyle]}>
                                        <TouchableOpacity 
                                            style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
                                            onPress={() => {
                                                // Set the transaction to delete and show confirmation modal
                                                setTransactionToDelete(transaction);
                                                setConfirmDeleteVisible(true);
                                            }}
                                        >
                                            <Ionicons name="trash-outline" size={24} color="white" />
                                        </TouchableOpacity>
                                    </Animated.View>
                                    )}
                        </View>
                        ))}
                        </Animated.View>
                    </GestureDetector>
                </View>
            </Modal>

            {/* Confirmation Delete Modal */}
            <Modal
                visible={confirmDeleteVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setConfirmDeleteVisible(false)}
            >
                <View style={styles.confirmModalContainer}>
                    <View style={styles.confirmModalContent}>
                        <Text style={styles.confirmModalTitle}>Delete Transaction</Text>
                        
                        {transactionToDelete && (
                            <View style={styles.confirmTransactionDetails}>
                                <Text style={styles.confirmQuestion}>
                                    Are you sure you want to delete this transaction?
                                </Text>
                                
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
                            </View>
                        )}
                        
                        <View style={styles.confirmButtonsContainer}>
                            <TouchableOpacity 
                                style={[styles.confirmButton, styles.cancelButton]}
                                onPress={() => setConfirmDeleteVisible(false)}
                            >
                                <Text style={styles.confirmButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                            style={[styles.confirmButton, styles.deleteConfirmButton]}
                            onPress={() => {
                                // Actually delete the transaction
                                if (transactionToDelete) {
                                    deleteTransaction(transactionToDelete.id);
                                    setConfirmDeleteVisible(false);
                                    setTransactionToDelete(null);
                                    // Reset the swipe state
                                    swipeX.value = withTiming(0, { duration: 300 });
                                    deleteWidth.value = withTiming(0, { duration: 300 });
                                    deleteOpacity.value = withTiming(0, { duration: 300 });
                                    setTimeout(() => {
                                        setSwipedTransactionId(null);
                                    }, 300);
                                }
                            }}
                        >
                            <Text style={styles.confirmButtonText}>Delete</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal para adicionar transação */}
            <TouchableOpacity style={styles.createButton} onPress={() => {setModalVisible(true); 
                translateY.value = withTiming(0, { duration: 300 });
                isModalOpen.value = true;}} >
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>

            {/* Modal para adicionar transação */}
            <Modal visible={modalVisible} animationType="none" transparent={true}>
                <View style={styles.modalContainer}>
                    <GestureDetector gesture={gesture}>
                        <Animated.View style={[styles.modalContent, animatedStyle]}>
                            {/* Tracinho no topo */}
                            <View style={styles.dragIndicator} />
                             {/* Título */}
                             <Text style={styles.modalTitle}>New Transaction</Text>
                                {/* Switcher */}
                            <View style={styles.switcherContainer}>
                                {['Recepies', 'Expenses'].map((type) => (
                                    <TouchableOpacity
                                        key={type}
                                        style={[
                                            styles.switcherButton,
                                            selectedType === type && styles.switcherButtonActive
                                        ]}
                                        onPress={() => setSelectedType(type)}
                                    >
                                    <Text
                                            style={[
                                                styles.switcherText,
                                                selectedType === type && styles.switcherTextActive
                                            ]}
                                        >
                                            {type}
                                        </Text>
                                    </TouchableOpacity>
                                    ))}
                            </View>
                            {/* Campos de entrada */}
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

                            {/* Categoria */}
                            {selectedType === 'Expenses' && (
                                <>
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
                             {/* Dropdown de categorias */}
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
                                            renderItem={({ item }) => (
                                                <TouchableOpacity
                                                    style={styles.categoryItem}
                                                    onPress={() => {
                                                        setSelectedCategory(item);
                                                        setModalVisibleCategories(false);
                                                    }}
                                                >
                                                    <View style={[styles.colorBox, { backgroundColor: item.color }]}></View>
                                                    <Text style={styles.transactionText}>{item.label}</Text>
                                                </TouchableOpacity>
                                            )}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </Modal>
                            </>
                            )}

                            {/* Data */}
                            <View style={styles.transactionRow}>
                                <View style={styles.transactionInfo}>
                                    <View style={[styles.iconContainerWeak, { backgroundColor: '#3357FF' }]}>
                                        <Ionicons name="calendar-outline" size={18} color="white" />
                                    </View>
                                    <Text style={styles.transactionName}>Date</Text>
                                </View>
                                <TouchableOpacity style={styles.dateButton} onPress={() => setCalendarVisible(!calendarVisible)}>
                                    <Text style={styles.transactionText}>
                                        {newTransaction.date ? newTransaction.date : "Set Date"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                             {/* Calendário */}
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

                            {/* Botão "Add" */}
                            <TouchableOpacity
                                style={[
                                    styles.addCancelButtons, // Estilo fixo
                                    { backgroundColor: getButtonColor() }, // Cor dinâmica
                                ]}
                                onPress={handleAddTransaction}
                            >
                                <Text style={styles.addCancelButtonText}>
                                    {selectedType === 'Recepies' ? '+ Add Recepie' : '+ Add Expense'}
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </GestureDetector>
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
        justifyContent: 'flex-end', 
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },

    modalContent: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '60%',
        padding: 20,
    },

    dragIndicator: {
        width: 40,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: -10,
        marginBottom: 10,
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },

    modalButtons: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20, 
    },
    addCancelButtons: {
        paddingVertical: 12, // Espaçamento interno vertical
        paddingHorizontal: 25, // Espaçamento interno horizontal
        borderRadius: 8, // Bordas arredondadas
        alignSelf: 'center', // Centraliza o botão horizontalmente
        width: '80%', // Largura responsiva
        alignItems: 'center', // Centraliza o conteúdo horizontalmente
    },
    
    addCancelButtonText: {
        color: '#fff',
        fontSize: 18, // Tamanho de fonte adequado
        fontWeight: 'bold', // Texto em negrito para melhor legibilidade
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
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 }, // Sombras laterais
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4, // Para Android
    },   

    switcherText: {
        fontSize: 16,
        color: "#333",
    },

    switcherTextActive: {
        color: "#333",
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
        borderWidth: 1,
        borderColor: '#333',
        elevation: 5 
    },

    calendarContainer: { 
        padding: 10, 
        backgroundColor: 'white',
        elevation: 3, 
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
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 }, // Sombras laterais
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4, // Para Android
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

    swipeContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 4,
        overflow: 'hidden',
    },
    
    deleteButton: {
        position: 'absolute',
        right: 0,
        height: '100%',
        backgroundColor: '#F44336',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        overflow: 'hidden',
    },

    swipeContainerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 8,
    },

    confirmModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    
    confirmModalContent: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        width: '80%',
        elevation: 5,
    },
    
    confirmModalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#F44336',
    },
    
    confirmQuestion: {
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'center',
    },
    
    confirmTransactionDetails: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
    },
    
    transactionDetailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    
    detailLabel: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#555',
    },
    
    detailValue: {
        fontSize: 15,
    },
    
    confirmButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    
    confirmButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        minWidth: 100,
        alignItems: 'center',
    },
    
    cancelButton: {
        backgroundColor: '#9e9e9e',
    },
    
    deleteConfirmButton: {
        backgroundColor: '#F44336',
    },
    
    confirmButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Finances;