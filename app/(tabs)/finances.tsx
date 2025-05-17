import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, ScrollView, Modal, TextInput, Dimensions, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { BarChart } from '@mui/x-charts/BarChart';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTransactions } from '../Transactions/TransactionContent';
import { useLanguage } from '../Languages/LanguageContente';
import ErrorMessage from '@/components/ErrorMessage';
import { financesStyles as styles } from '../styles/finances.styles';

const categories = [
    { label: "Home", color: "#FF5733" }, //Color - Red
    { label: "Food", color: "#33FF57" }, //Color - Green
    { label: "Transporte", color: "#3357FF" }, //Color - Blue
    { label: "Personal", color: "#FF33A1" }, //Color - Pink
];

const Finances = () => {

    const { getText } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleCategories, setModalVisibleCategories] = useState(false);
    const [modalVisibleDelete, setModalVisibleDelete] = useState(false);
    const dropdownRef = useRef<View>(null); // Definir um ref corretamente tipado
    const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0, width: 0 });
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const [selectedType, setSelectedType] = useState('Expenses'); // Default como despesa
    const [newTransaction, setNewTransaction] = useState({ name: '', date: '', value: '' });
    const [calendarVisible, setCalendarVisible] = useState(false);
    const translateY = useSharedValue(0); // Controla a posição vertical do modal
    const isModalOpen = useSharedValue(true); // Indica se o modal está aberto
    const { transactions, addTransaction, deleteTransaction, loading, error, refreshTransactions } = useTransactions();
    const [swipedTransactionId, setSwipedTransactionId] = useState<string | null>(null);
    const swipeX = useSharedValue(0);
    const deleteWidth = useSharedValue(0);
    const deleteOpacity = useSharedValue(0);
    const [transactionToDelete, setTransactionToDelete] = useState<any>(null);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [addTransactionError, setAddTransactionError] = useState<string | null>(null);
    
    const rowAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: swipeX.value }]
        };
    });

    // Function to refresh transactions
    const handleRefresh = async () => {
        try {
            setRefreshing(true);
            await refreshTransactions();
        } catch (err) {
            // Error is already handled in the context
        } finally {
            setRefreshing(false);
        }
    };

    // Clear error message after 5 seconds
    useEffect(() => {
        if (addTransactionError) {
            const timer = setTimeout(() => {
                setAddTransactionError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [addTransactionError]);
            
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

    const swipeContainerStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: swipedTransactionId ? 
                `rgba(244, 67, 54, ${deleteOpacity.value})` : 'transparent'
        };
    });

    const getButtonColor = () => {
        if (selectedType === 'Recepies') return '#4CAF50'; // Verde para receitas
        if (selectedType === 'Expenses') return '#F44336'; // Vermelho para despesas
        return '#FF9800'; // Laranja para as upcoming bills
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
            iconName: selectedType === 'Recepies' ? "arrow-up-outline" : "arrow-down-outline",
            isUpcomingBill: selectedType === 'Upcoming Bills',
        };
    
            addTransaction(newEntry);

            setNewTransaction({ name: '', date: '', value: '' });
            setModalVisible(false);
        };
    
    const gesture = Gesture.Pan()
    .onStart(() => {

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

    const handleDeleteTransaction = async (id: string | number) => {
        try {
            await deleteTransaction(id);
            setConfirmDeleteVisible(false);
            setTransactionToDelete(null);
            
            // Reset the swipe state
            swipeX.value = withTiming(0, { duration: 300 });
            deleteWidth.value = withTiming(0, { duration: 300 });
            deleteOpacity.value = withTiming(0, { duration: 300 });
            setTimeout(() => {
                setSwipedTransactionId(null);
            }, 300);
        } catch (err: any) {
            // Show error message but keep modal open
            alert(err.message || getText('errorDeletingTransaction'));
        }
    };

    return (
        <View style={styles.screen}>
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={['#007bff']}
                    />
                }
            >
            <BarChart
                xAxis={[{ scaleType: 'band', data: [ 'Receits', 'Expenses' ] }]}
                series={[{ data: [1, 7] }, { data: [6, 2] }]}
                width={400}
                height={250}
                />
            <Text style={styles.title}>{getText ('upcomingBills')}</Text>
            <FlatList
                data={transactions.filter(t => t.isUpcomingBill)}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <View style={styles.cardContainerSlider}>
                    <Text style={styles.dateTextSlider}>{item.date}</Text>
                    <View style={styles.bottomSectionSlider}>
                        <View>
                            <Text style={styles.titleSlider}>{item.name}</Text>
                            <Text style={styles.priceSlider}>{Math.abs(item.value).toFixed(2)}€</Text>
                        </View>
                        <TouchableOpacity style={styles.buttonSlider}>
                            <Ionicons name="arrow-forward-outline" size={18} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            {error ? getText('tryAgainLater') : getText('noUpcomingBillsFound')}
                        </Text>
                    </View>
                }
            />
            
            <TouchableOpacity onPress={() => {setModalVisibleDelete(true); 
                translateY.value = withTiming(0, { duration: 300 });
                isModalOpen.value = true;}} >
                <Text style={styles.title}>Transactions</Text>
                {transactions.length > 0 ? (
                    transactions.map((transaction) => (
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
                    ))
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            {error ? getText('tryAgainLater') : getText('noTransactionsFound')}
                        </Text>
                    </View>
                )}
                </TouchableOpacity>
            </ScrollView>
            
            {/* Modal para eliminar transação */}

            <Modal visible={modalVisibleDelete} animationType='none' transparent={true}>
                <View style={styles.modalContainer}>
                    <GestureDetector gesture={gesture}>
                        <Animated.View style={[styles.modalContent, animatedStyle]}>
                            <View style={styles.dragIndicator}/>

                            <Text style={styles.modalTitle}>{getText ('deleteTransaction')}</Text>
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
                        <Text style={styles.confirmModalTitle}>{getText ('deleteTransaction')}</Text>
                        {transactionToDelete && (
                        <View style={styles.confirmTransactionDetails}>
                            <Text style={styles.confirmQuestion}>
                                {getText ('deleteConfirmation')}
                            </Text>
                            
                            <View key={transactionToDelete.id} style={styles.transactionRow}>
                                <View style={styles.transactionInfo}>
                                    <View style={[styles.iconContainerWeak, { backgroundColor: transactionToDelete.type === 'Recepies' ? '#4CAF50' : '#F44336' }]}>
                                        <Ionicons name={transactionToDelete.type === 'Recepies' ? "arrow-up-outline" : "arrow-down-outline"} size={18} color="white" />
                                    </View>
                                    <View>
                                        <Text style={styles.transactionName}>{transactionToDelete.name}</Text>
                                        <Text style={styles.transactionDate}>{transactionToDelete.date}</Text>
                                    </View>
                                </View>
                                <Text style={[styles.transactionValue, transactionToDelete.type === 'Recepies' ? styles.positive : styles.negative]}>
                                    {transactionToDelete.value >= 0 ? `+${transactionToDelete.value.toFixed(2)}` : `${transactionToDelete.value.toFixed(2)}`}
                                </Text>
                            </View>
                        </View>
                    )}
                        
                        <View style={styles.confirmButtonsContainer}>
                            <TouchableOpacity 
                                style={[styles.confirmButton, styles.cancelButton]}
                                onPress={() => setConfirmDeleteVisible(false)}
                            >
                                <Text style={styles.confirmButtonText}>{getText ('cancel')}</Text>
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
                            <Text style={styles.confirmButtonText}>{getText ('delete')}</Text>
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
                            <Text style={styles.modalTitle}>{getText ('newTransaction')}</Text>
                            
                            {/* Error message */}
                            {addTransactionError && (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorText}>{addTransactionError}</Text>
                                </View>
                            )}
                            <View style={styles.switcherContainer}>
                                {['Recepies', 'Expenses', 'Upcoming Bills'].map((type) => (
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
                                        <Text style={styles.transactionName}>{getText ('category')}</Text>
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
                                    <Text style={styles.transactionName}>{getText ('date')}</Text>
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
                                            <Text style={styles.dateButtonText}>{getText ('closeCalendar')}</Text>
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
                                    {selectedType === 'Recepies' ? '+ Add Recepie' : selectedType === 'Expenses' ? '+ Add Expense' : '+ Upcoming Bill'}
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </GestureDetector>
                </View>
                </Modal>
        </View>
    );
};

export default Finances;