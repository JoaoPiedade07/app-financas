import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, Image, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { VictoryPie } from "victory";
import { Card } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import { transformSync } from '@babel/core';
import { useTransactions } from '../Transactions/TransactionContent';
import { useLanguage } from '../Languages/LanguageContente';
import ErrorMessage from '@/components/ErrorMessage';

const screenWidth = Dimensions.get("window").width;

const Home = () => {

    const { getText } = useLanguage();
    const { transactions, loading, error, refreshTransactions } = useTransactions();
    const [refreshing, setRefreshing] = useState(false);

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
        
    }));

    // Filtrar transações que são "upcoming bills"
    const upcomingBills = formattedTransactions.filter(transaction => transaction.type === 'upcoming Bills');

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
                            <Image 
                                source={require('@/assets/images/logo.png')} 
                                style={styles.profileIcon} 
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
                                        <VictoryPie
                                            data={chartData}
                                            x="label"
                                            y="value"
                                            innerRadius={65}
                                            padAngle={2}
                                            labels={() => null}
                                            style={{ labels: { display: "none" } }}
                                            colorScale={chartData.map(item => item.color)}
                                            width={screenWidth * 0.65}
                                            height={260}
                                            padding={{ left: 0, right: 50 }}
                                        />
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

const styles = StyleSheet.create({
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
    card: {
        margin: 10,
        borderRadius: 10,
        elevation: 4,
        backgroundColor: "white",
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    chartContainer: {
        width: "40%",
        alignItems: "center",
        marginLeft: 0,
    },
    legend: {
        width: "60%",
        paddingLeft: 5,
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    colorBox: {
        width: 8,
        height: 8,
        borderRadius: 10,
        marginRight: 8,
    },
    legendText: {
        fontSize: 16,
        color: "#333",
        textAlign: 'left',
        flex: 1,
    },
    euroText: {
        fontSize: 16,
        color: "#333",
        flex: 1,
        textAlign: "right",
        minWidth: 60,
    },
    
    //profileContainer: {
        //position: 'absolute',
        //top: 5, // Ajuste conforme necessário
        //left: 10,
        //zIndex: 1,
        //borderRadius: 30,
        //overflow: 'hidden',
        //borderWidth: 1,
        //borderColor: '#fff',
    //},
    //profileImage: {
        //width: 50,
        //height: 50,
        //resizeMode: 'cover',
        //borderRadius: 30,
    //},
    infoContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            //marginTop: 10,
            paddingHorizontal: 20,
        },
    infoColumn: {
            alignItems: 'center',
            maxWidth: '50%', // Limita a largura das colunas
        },
    labelRow: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
        },
    textColumn: {
            marginLeft: 10, // Espaçamento entre ícone e texto
            alignItems: 'flex-start',
        },
    contentContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingTop: 15,
            paddingBottom: 10,
        },
    leftContainer: {
            flex: 1,
            paddingRight: 15,
            alignItems: 'flex-start',
        },
    rightContainer: {
            flex: 1,
            paddingLeft: 15,
            alignItems: 'flex-end',
            borderLeftWidth: 1,
            borderLeftColor: '#eee',
        },
    iconContainer: {
            width: 32,
            height: 32,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 15, // Espaço entre o ícone e o texto
        },
    infoTextColumn: {
            justifyContent: 'center',
        },
    infoLabelRow: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    infoText: {
            fontSize: 16,
            color: '#666',
        },
    infoValue: {
            fontSize: 17,
            color: '#333',
            marginTop: 2,
        },
        // Estilos para as transações
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
    profileIconContainer: {
            position: 'absolute',
            top: 20, // Ajuste conforme sua margem superior
            right: 20,
            zIndex: 10,
        },
    profileIcon: {
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 2,
            borderColor: '#fff',
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
        marginLeft: 15,
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        minHeight: 200,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    emptyContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginVertical: 10,
        marginHorizontal: 10,
        minWidth: 180,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});

export default Home;
