import { StyleSheet, Dimensions } from 'react-native';

// Dimensões da tela
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Tema de cores
const COLORS = {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#4CAF50',
    danger: '#F44336',
    warning: '#FFC107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    white: '#ffffff',
    background: '#f5f5f5',
    text: {
        primary: '#333333',
        secondary: '#666666',
        light: '#999999',
    }
};

// Espaçamentos
const SPACING = {
    xs: 5,
    sm: 10,
    md: 15,
    lg: 20,
    xl: 30
};

// Tamanhos de fonte
const FONT_SIZES = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24
};

// Bordas arredondadas
const BORDER_RADIUS = {
    sm: 5,
    md: 8,
    lg: 15,
    xl: 20,
    circle: 50
};

export const financesStyles = StyleSheet.create({
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
        fontSize: 15,
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
        marginLeft: 15,
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

    errorContainer: {
        backgroundColor: '#FFEBEE',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#F44336',
    },
    errorText: {
        color: '#D32F2F',
        fontSize: 14,
    },
    emptyContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
})

export default financesStyles;