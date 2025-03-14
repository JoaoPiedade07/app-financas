import React, { useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { VictoryPie } from "victory";
import { Card } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import { TransactionContext } from '../Transactions/TransactionContext';

const screenWidth = Dimensions.get("window").width;

const Home = () => {

    const data = [
        { label: "Home", value: 30, color: "#FF5733", euro: "250.00" },
        { label: "Food", value: 40, color: "#33FF57", euro: "339.70" },
        { label: "Transporte", value: 10, color: "#3357FF", euro: "21.99" },
        { label: "Personal", value: 20, color: "#FF33A1", euro: "110.00" },
    ];

    const { totalRecepies, totalExpenses } = useContext(TransactionContext);

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style = {{ fontSize: 26, marginLeft: 20, marginTop: 20, }}>6.158.37€</Text>
                <Text style = {{ fontSize: 18, marginLeft: 20, marginBottom: 15, color: '#333' }}>Earnings</Text>
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
                                    <Text style={styles.infoText}>Recepies</Text>
                                    <Text style={[ styles.infoValue, styles.positive ]}>{ totalRecepies.toFixed(2) }€</Text>
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
                                    <Text style={styles.infoText}>Expenses</Text>
                                    <Text style={[ styles.infoValue, styles.negative ]}>{ totalExpenses.toFixed(2) }€</Text>
                                </View>
                                </View>
                            </View>
                            </View>
                    </Card.Content>
                </Card>
                <Text style={styles.title}>Expenses by category</Text>
                <Card style={styles.card}>
                    <Card.Content>
                        <View style={styles.container}>
                            <View style={styles.chartContainer}>
                                <VictoryPie
                                    data={data}
                                    x="label"
                                    y="value"
                                    innerRadius={50}
                                    padAngle={3}
                                    labels={() => null}
                                    style={{ labels: { display: "none" } }}
                                    colorScale={data.map(item => item.color)}
                                    width={screenWidth * 0.65}
                                    height={260}
                                />
                            </View>
                            <View style={styles.legend}>
                                {data.map((item, index) => (
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
                <Text style={styles.title}>Weak Transactions</Text>
                {/* Transação 1 */}
                <View style={styles.transactionRow}>
                    <View style={styles.transactionInfo}>
                        <View style={[styles.iconContainerWeak, { backgroundColor: '#4CAF50' }]}>
                            <Ionicons name="arrow-up-outline" size={18} color="white" />
                        </View>
                        <View>
                            <Text style={styles.transactionName}>App UI</Text>
                            <Text style={styles.transactionDate}>12 Set 2025</Text>
                        </View>
                    </View>
                    <Text style={[styles.transactionValue, styles.positive]}>+10.000</Text>
                </View>

                {/* Transação 2 */}
                <View style={styles.transactionRow}>
                    <View style={styles.transactionInfo}>
                        <View style={[styles.iconContainerWeak, { backgroundColor: '#F44336' }]}>
                            <Ionicons name="arrow-down-outline" size={18} color="white" />
                        </View>
                        <View>
                            <Text style={styles.transactionName}>Shopping</Text>
                            <Text style={styles.transactionDate}>10 Set 2025</Text>
                        </View>
                    </View>
                    <Text style={[styles.transactionValue, styles.negative]}>-120.99</Text>
                </View>

                {/* Transação 3 */}
                <View style={styles.transactionRow}>
                    <View style={styles.transactionInfo}>
                        <View style={[styles.iconContainerWeak, { backgroundColor: '#4CAF50' }]}>
                            <Ionicons name="arrow-up-outline" size={18} color="white" />
                        </View>
                        <View>
                            <Text style={styles.transactionName}>Visual Design</Text>
                            <Text style={styles.transactionDate}>08 Set 2025</Text>
                        </View>
                    </View>
                    <Text style={[styles.transactionValue, styles.positive]}>+300.00</Text>
                </View>

                <View style={styles.transactionRow}>
                    <View style={styles.transactionInfo}>
                        <View style={[styles.iconContainerWeak, { backgroundColor: '#F44336' }]}>
                            <Ionicons name="arrow-down-outline" size={18} color="white" />
                        </View>
                        <View>
                            <Text style={styles.transactionName}>Food Shopping</Text>
                            <Text style={styles.transactionDate}>23 Dec 2025</Text>
                        </View>
                    </View>
                    <Text style={[styles.transactionValue, styles.negative]}>-30.45</Text>
                </View>
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
    },
    chartContainer: {
        width: "40%",
        alignItems: "flex-start",
    },
    legend: {
        width: "60%",
        paddingLeft: 10,
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
});

export default Home;
