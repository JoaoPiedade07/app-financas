import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, View, FlatList, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { useLanguage } from '../Languages/LanguageContente';
import { Ionicons } from '@expo/vector-icons';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const Budget = () => {
    const { getText } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [modalVisible, setModalVisible] = useState(false);
    const translateY = useSharedValue(0); // Controla a posição vertical do modal
    const isModalOpen = useSharedValue(true); // Indica se o modal está aberto

    // Categories for the filter
    const categories = [
        { id: 'all', name: 'All', color: '#4CAF50' },
        { id: 'personal', name: 'Personal', color: '#FF33A1' },
        { id: 'home', name: 'Home', color: '#FF5733' },
        { id: 'travel', name: 'Travel', color: '#2196F3' },
    ];

    // Sample budget data array to match your Figma design
    const budgets = [
        {
            id: '1',
            name: "Trip to Berlin",
            total: 3000,
            spent: 2900,
            category: "Personal",
            categoryColor: "#FF33A1",
            deadline: "2025-05-01",
            currency: "€"
        },
        {
            id: '2',
            name: "House",
            total: 340000,
            spent: 100000,
            category: "Home",
            categoryColor: "#FF5733",
            deadline: "2026-12-23",
            currency: "€"
        },
        {
            id: '3',
            name: "House",
            total: 340000,
            spent: 100000,
            category: "Home",
            categoryColor: "#FFC107",
            deadline: "2026-12-23",
            currency: "€"
        },
        {
            id: '4',
            name: "House",
            total: 340000,
            spent: 100000,
            category: "Home",
            categoryColor: "#FFC107",
            deadline: "2026-12-23",
            currency: "€"
        },
        {
            id: '5',
            name: "House",
            total: 340000,
            spent: 100000,
            category: "Home",
            categoryColor: "#FFC107",
            deadline: "2026-12-23",
            currency: "€"
        },
    ];

    // Filter budgets based on selected category
    const filteredBudgets = selectedCategory === 'All' 
        ? budgets 
        : budgets.filter(budget => budget.category === selectedCategory);

    const renderCategoryItem = ({ item }: { item: { id: string; name: string; color: string } }) => (
        <TouchableOpacity
            style={[
                styles.categoryItem,
                selectedCategory === item.name && styles.selectedCategoryItem
            ]}
            onPress={() => setSelectedCategory(item.name)}
        >
            <View style={[styles.categoryDot, { backgroundColor: item.color }]} />
            <Text style={styles.categoryItemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderBudgetItem = ({ item }: { item: { 
        id: string;
        name: string;
        total: number;
        spent: number;
        category: string;
        categoryColor: string;
        deadline: string;
        currency: string;
    }}) => {
        // Calculate percentage spent
        const percentageSpent = (item.spent / item.total) * 100;
        const remaining = item.total - item.spent;
    
        return (
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.headerRow}>
                        <Text style={styles.budgetName}>{item.name}</Text>
                    </View>
                    
                    {/* Budget amount */}
                    <View style={styles.amountContainer}>
                        <Text style={styles.budgetTotal}>{item.total}{item.currency}</Text>
                    </View>
                    
                    {/* Category and percentage row */}
                    <View style={styles.categoryPercentRow}>
                        <View style={styles.categoryContainer}>
                            <View style={[styles.categoryDot, { backgroundColor: item.categoryColor }]} />
                            <Text style={styles.categoryText}>{item.category}</Text>
                        </View>
                        <Text style={styles.percentageText}>{percentageSpent.toFixed(1)}%</Text>
                    </View>
                    
                    {/* Progress Bar */}
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBackground}>
                            <View 
                                style={[
                                    styles.progressFill, 
                                    { 
                                        width: `${Math.min(percentageSpent, 100)}%`,
                                        backgroundColor: percentageSpent > 90 ? '#FF5252' : '#4CAF50'
                                    }
                                ]} 
                            />
                        </View>
                    </View>
                    
                    <View style={styles.bottomRow}>
                        <Text style={styles.deadline}>{item.deadline}</Text>
                        <Text style={styles.remainingText}>
                            {remaining}{item.currency} {getText('remaining')}
                        </Text>
                    </View>
                </Card.Content>
            </Card>
        );
    };

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>{getText('budget')}</Text>
            
            {/* Categories horizontal scroll */}
            <View style={styles.categoriesContainer}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    keyExtractor={item => item.id}
                    renderItem={renderCategoryItem}
                    contentContainerStyle={styles.categoriesList}
                />
            </View>
            
            {/* Budgets list */}
            <FlatList
                data={filteredBudgets}
                keyExtractor={item => item.id}
                renderItem={renderBudgetItem}
                contentContainerStyle={styles.scrollContainer}
            />

        <TouchableOpacity style={styles.createButton} onPress={() => {setModalVisible(true); 
            translateY.value = withTiming(0, { duration: 300 });
            isModalOpen.value = true;}} >
            <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },

    scrollContainer: {
        paddingBottom: 80,
        paddingHorizontal: 10,
    },

    title: {
        fontSize: 18,
        marginLeft: 15,
        marginTop: 20,
        color: '#666',
        marginBottom: 10,
    },
    // Categories styles
    categoriesContainer: {
        marginBottom: 15,
    },

    categoriesList: {
        paddingHorizontal: 10,
    },

    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 4,
    },

    selectedCategoryItem: {
        backgroundColor: '#E8F5E9',
    },

    categoryItemText: {
        fontSize: 14,
        fontWeight: '500',
    },
    // Budget card styles
    card: {
        marginBottom: 15,
        borderRadius: 12,
        elevation: 3,
        backgroundColor: "white",
    },

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

    budgetName: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    amountContainer: {
        alignItems: 'flex-end',
        marginBottom: 4,
    },

    budgetTotal: {
        fontSize: 16,
        fontWeight: '500',
    },

    categoryPercentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },

    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
        backgroundColor: '#f5f5f5',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },

    categoryDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 5,
    },

    categoryText: {
        fontSize: 14,
        color: '#666',
    },

    percentageText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
    },

    progressContainer: {
        marginBottom: 8,
    },

    progressBackground: {
        height: 10,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        overflow: 'hidden',
    },

    progressFill: {
        height: '100%',
        borderRadius: 4,
    },

    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },

    deadline: {
        fontSize: 14,
        color: '#666',
    },

    remainingText: {
        fontSize: 14,
        color: '#666',
    },

    createButton: {
        position: 'absolute',
        bottom: 90,
        right: 30,
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007bff',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },

    buttonText: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 56,
    },
})

export default Budget;