import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, Image, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { Card } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import { transformSync } from '@babel/core';
import { useTransactions } from '../Transactions/TransactionContent';
import { useLanguage } from '../Languages/LanguageContente';
import ErrorMessage from '@/components/ErrorMessage';
import { homeStyles as styles} from '@/app/styles/home.styles';
import { useAuth } from '@/app/(auth)/AuthContext';
import { useImage } from '@/app/Image/ImageContent';

const screenWidth = Dimensions.get("window").width;

const Home = () => {

    const { getCurrentUser } = useAuth();

    // Em alguma função assíncrona
    const checkUser = async () => {
    const firebaseUser = await getCurrentUser();
    // Faça algo com o usuário do Firebase
    };

    const { getText } = useLanguage();
    const { transactions, loading, error, refreshTransactions, isOnline } = useTransactions();
    const [refreshing, setRefreshing] = useState(false);

    const { currentImage } = useImage();

    // Function to handle refresh
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

    const totalIncome = transactions.filter(t => t.type === 'Recepies').reduce((sum, t) => sum + Math.abs(t.value), 0);
    const totalExpense = transactions.filter(t => t.type === 'Expenses').reduce((sum, t) => sum + Math.abs(t.value), 0);
    const totalBalance = totalIncome - totalExpense;

    const expensesByCategory = transactions
        .filter(t => t.type === 'Expenses')
        .reduce((acc, transaction) => {
            const category = transaction.category || 'Other';
            if (!acc[category]) {
                acc[category] = 0;
            }
            acc[category] += Math.abs(transaction.value);
            return acc;
        }, {} as Record<string, number>);

        const categoryColors: Record<string, string> = {
            "Home": "#FF5733",
            "Food": "#33FF57",
            "Transporte": "#3357FF",
            "Personal": "#FF33A1",
            "Other": "#CCCCCC"
        };

        //Create data for VictoryPie
        const pieData = Object.entries(expensesByCategory).map
        (([label, value]) => ({
            label,
            value,
            color: categoryColors[label] || '#CCCCCC',
            euro: value.toFixed(2),
        }));

    const chartData = pieData.length > 0 ? pieData: [
        { label: "Home", value: 25, color: "#FF5733", euro: "0.00" },
        { label: "Food", value: 25, color: "#33FF57", euro: "0.00" },
        { label: "Transporte", value: 25, color: "#3357FF", euro: "0.00" },
        { label: "Personal", value: 25, color: "#FF33A1", euro: "0.00" },
    ];

    const formattedTransactions = transactions.map(transaction => ({
        id: transaction.id.toString(),
        type: transaction.type === 'Recepies' ? 'income' : 'expense',
        name: transaction.name,
        date: transaction.date,
        value: transaction.value >= 0 ? `+${transaction.value.toFixed(2)}` 
        : `${transaction.value.toFixed(2)}`,
        iconColor: transaction.iconColor || (transaction.type ===
            'Recepies' ? '#4CAF50' : '#F44336'),
        iconName: transaction.iconName || (transaction.type ===
            'Recepies' ? 'arrow-up-outline' : 'arrow-down-outline'),
        isUpcomingBill: transaction.isUpcomingBill || false,
    }));

    // Filtrar transações que são "upcoming bills"
    const upcomingBills = formattedTransactions.filter(transaction => 
        transaction.isUpcomingBill === true
    );

    return (
        <View style={styles.screen}>
            {!isOnline && (
                <View style={styles.offlineBanner}>
                    <Ionicons name="cloud-offline-outline" size={16} color="white" />
                    <Text style={styles.offlineText}>Você está offline. Os dados serão sincronizados quando a conexão for restaurada.</Text>
                </View>
            )}
            <ScrollView 
                contentContainerStyle={[
                    styles.scrollContainer,
                    !isOnline && { paddingTop: 30 }
                ]}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={['#007bff']}
                    />
                }
            >
                {loading && !refreshing ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#007bff" />
                        <Text style={styles.loadingText}>{getText('loading')}</Text>
                    </View>
                ) : error ? (
                    <ErrorMessage message={getText('errorLoadingData')} />
                ) : (
                    <>
                        <Text style={{ fontSize: 26, marginLeft: 20, marginTop: 20, }}>{totalBalance.toFixed(2)}€</Text>
                        <Text style={{ fontSize: 18, marginLeft: 20, marginBottom: 15, color: '#333' }}>{getText('earnings')}</Text>
                        <TouchableOpacity style={styles.profileIconContainer}>
                            <Image style={styles.profileIcon}
                                source={currentImage}
                            />
                        </TouchableOpacity>
                        <Card style={styles.card}>
                            <Card.Content>
                                {/* Container dos textos "Receitas" e "Despesas" */}
                                <View style={styles.contentContainer}>
                                    {/* Container Esquerdo (Receitas) */}
                                    <View style={styles.leftContainer}>
                                        <View style={styles.infoLabelRow}>
                                        <View style={[styles.iconContainer, { backgroundColor: '#4CAF50' }]}>
                                            <Ionicons 
                                            name="arrow-up-outline" 
                                            size={18} 
                                            color="white" 
                                            />
                                        </View>
                                        <View style={styles.infoTextColumn}>
                                            <Text style={styles.infoText}>{getText ('Recepies')}</Text>
                                            <Text style={[ styles.infoValue, styles.positive ]}>{totalIncome.toFixed(2)}€</Text>
                                        </View>
                                        </View>
                                    </View>

                                    {/* Container Direito (Despesas) */}
                                    <View style={styles.rightContainer}>
                                        <View style={styles.infoLabelRow}>
                                        <View style={[styles.iconContainer, { backgroundColor: '#F44336' }]}>
                                            <Ionicons 
                                            name="arrow-down-outline" 
                                            size={18} 
                                            color="white" 
                                            />
                                        </View>
                                        <View style={styles.infoTextColumn}>
                                            <Text style={styles.infoText}>{getText ('expenses')}</Text>
                                            <Text style={[ styles.infoValue, styles.negative ]}>{totalExpense.toFixed(2)}€</Text>
                                        </View>
                                        </View>
                                    </View>
                                    </View>
                            </Card.Content>
                        </Card>
                        <Text style={styles.title}>{getText ('expensesByCategory')}</Text>
                        <Card style={styles.card}>
                            <Card.Content>
                                <View style={styles.container}>
                                    <View style={styles.chartContainer}>
                                        <View style={styles.pieChartContainer}>
                                            <View style={styles.pieChart}>
                                                {chartData.map((item, index) => {
                                                    const total = chartData.reduce((sum, d) => sum + d.value, 0);
                                                    const percentage = total > 0 ? (item.value / total) * 100 : 0;
                                                    const angle = (percentage / 100) * 360;
                                                    
                                                    return (
                                                        <View
                                                            key={index}
                                                            style={[
                                                                styles.pieSlice,
                                                                {
                                                                    backgroundColor: item.color,
                                                                    transform: [
                                                                        { rotate: `${index * (360 / chartData.length)}deg` }
                                                                    ]
                                                                }
                                                            ]}
                                                        />
                                                    );
                                                })}
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.legend}>
                                        {chartData.map((item, index) => (
                                            <View key={index} style={styles.legendItem}>
                                                <View style={[styles.colorBox, { backgroundColor: item.color }]} />
                                                <Text style={styles.legendText}>{item.label}</Text>
                                                <Text style={styles.euroText}>{item.euro}€</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </Card.Content>
                        </Card>
                            <Text style={styles.title}>{getText ('upcomingBills')}</Text>
                                <FlatList
                                data={upcomingBills}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.cardContainerSlider}>
                                        <Text style={styles.dateTextSlider}>{item.date}</Text>
                                        <View style={styles.bottomSectionSlider}>
                                            <View>
                                                <Text style={styles.titleSlider}>{item.name}</Text>
                                                <Text style={styles.priceSlider}>{Math.abs(parseFloat(item.value)).toFixed(2)}€</Text>
                                            </View>
                                            <TouchableOpacity style={styles.buttonSlider}>
                                                <Ionicons name="arrow-forward-outline" size={18} color="white" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                                ListEmptyComponent={
                                    <View style={styles.emptyContainer}>
                                        <Text style={styles.emptyText}>{getText('noUpcomingBillsFound')}</Text>
                                    </View>
                                }
                            />
                            
                            <Text style={styles.title}>{getText ('weekTransactions')}</Text>
                            {formattedTransactions.length > 0 ? (
                                formattedTransactions.map((transaction) => (
                                    <View key={transaction.id} style={styles.transactionRow}>
                                        <View style={styles.transactionInfo}>
                                            <View style={[styles.iconContainerWeak, { 
                                                backgroundColor: transaction.iconColor }]}>
                                                    <Ionicons name={transaction.iconName as any} size={18} color="white" />
                                            </View>
                                            <View>
                                                <Text style={styles.transactionName}>
                                                    {transaction.name}</Text>
                                                <Text style={styles.transactionDate}>
                                                    {transaction.date}</Text>
                                            </View>
                                        </View>
                                        <Text style={[styles.transactionValue,
                                            transaction.type === 'income' ? styles.positive 
                                            : styles.negative,]}>
                                                {transaction.value}
                                            </Text>
                                    </View>
                                ))
                            ) : (
                                <View style={styles.emptyContainer}>
                                    <Text style={styles.emptyText}>{getText('noTransactionsFound')}</Text>
                                </View>
                            )}
                        </>
                    )}
                </ScrollView>
            </View>
        );
};

export default Home;
