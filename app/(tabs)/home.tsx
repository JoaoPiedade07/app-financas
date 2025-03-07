import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, Image, } from 'react-native';
import { VictoryPie } from "victory";
import { Card } from "react-native-paper";

const screenWidth = Dimensions.get("window").width;

const Home = () => {
    const data = [
        { label: "Home", value: 40, color: "#FF5733", euro: "250.00" },
        { label: "Food", value: 30, color: "#33FF57", euro: "339.70" },
        { label: "Transporte", value: 20, color: "#3357FF", euro: "21.99" },
        { label: "Personal", value: 10, color: "#FF33A1", euro: "110.00" },
    ];

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Card style={styles.card}>
                    <Card.Content>
                        {/* Container da imagem de perfil */}
                        <View style={styles.profileContainer}>
                            <Image 
                                source={require('@/assets/images/react-logo.png')} 
                                style={styles.profileImage} 
                            />
                        </View>
                        
                        {/* Container dos textos "Receitas" e "Despesas" */}
                        <View style={styles.infoContainer}>
                        {/* Coluna Receitas */}
                        <View style={styles.infoColumn}>
                            <Text style={styles.infoText}>Receitas</Text>
                            <Text style={styles.infoValue}>4000.00€</Text>
                        </View>

                        {/* Coluna Despesas */}
                        <View style={styles.infoColumn}>
                            <Text style={styles.infoText}>Despesas</Text>
                            <Text style={styles.infoValue}>7.569.45€</Text>
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
            </ScrollView>

            {/* 🔹 Botão flutuante FIXO no fundo da tela */}
            <TouchableOpacity style={styles.createButton}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
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
        fontSize: 20,
        marginLeft: 15,
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
        fontSize: 30,
        textAlign: 'center',
    },
    profileContainer: {
        position: 'absolute',
        top: 0, // Ajuste conforme necessário
        left: 10,
        zIndex: 1,
        borderRadius: 30,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#fff',
    },
    profileImage: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 30,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 40,
        paddingHorizontal: 20,
      },
      infoColumn: {
        alignItems: 'center',
      },
      infoText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
      },
      infoValue: {
        fontSize: 20,
        color: '#333',
      },
});

export default Home;
