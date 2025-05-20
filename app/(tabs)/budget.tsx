import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { useLanguage } from '../Languages/LanguageContente';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import ErrorMessage from '@/components/ErrorMessage';
import { budgetStyles as styles } from '@/app/styles/budget.styles';

const Budget = () => {
    const { getText } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [modalVisible, setModalVisible] = useState(false);
    const translateY = useSharedValue(0); // Controla a posição vertical do modal
    const isModalOpen = useSharedValue(true); // Indica se o modal está aberto
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Categories for the filter
    const categories = [
        { id: 'all', name: 'All', color: '#4CAF50' },
        { id: 'personal', name: 'Personal', color: '#FF33A1' },
        { id: 'home', name: 'Home', color: '#FF5733' },
        { id: 'travel', name: 'Travel', color: '#2196F3' },
    ];

    // Sample budget data array to match your Figma design
    const [budgets, setBudgets] = useState([
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
    ]);

    // Simulating data fetching with error handling
    const fetchBudgets = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Simulate API call
            // In a real app, this would be a fetch or axios call
            // await fetch('your-api-endpoint')
            
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // If you want to test error handling, uncomment the line below
            // throw new Error('Failed to fetch budgets');
            
            // If successful, data is already in the state
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

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

    if (loading) {
        return (
            <View style={[styles.screen, styles.centerContent]}>
                <Text>Loading budgets...</Text>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>{getText('budget')}</Text>
            
            {/* Error message */}
            {error && (
                <ErrorMessage 
                    message={error} 
                    onRetry={fetchBudgets} 
                />
            )}
            
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
            {filteredBudgets.length > 0 ? (
                <FlatList
                    data={filteredBudgets}
                    keyExtractor={item => item.id}
                    renderItem={renderBudgetItem}
                    contentContainerStyle={styles.scrollContainer}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        {error ? getText('tryAgainLater') : getText('noBudgetsFound')}
                    </Text>
                </View>
            )}

            <TouchableOpacity style={styles.createButton} onPress={() => {
                setModalVisible(true); 
                translateY.value = withTiming(0, { duration: 300 });
                isModalOpen.value = true;
            }}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Budget;