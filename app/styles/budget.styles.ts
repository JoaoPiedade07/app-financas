import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const budgetStyles = StyleSheet.create ({
    screen: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
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
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
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
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
    },
    buttonText: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 56,
    },
})

export default budgetStyles;