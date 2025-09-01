import { StyleSheet, Dimensions } from 'react-native';

// Dimensões da tela
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const homeStyles = StyleSheet.create({
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
    pieChartContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    pieChart: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
        position: 'relative',
    },
    pieSlice: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 60,
        transform: [{ rotate: '0deg' }],
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
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
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
    offlineBanner: {
        backgroundColor: '#FF9800',
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    offlineText: {
        color: 'white',
        fontSize: 12,
        marginLeft: 5,
        textAlign: 'center',
    },
});

export default homeStyles;