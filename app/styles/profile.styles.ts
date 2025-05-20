import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const profileStyles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 15,
        marginTop: 20,
        marginBottom: 10,
        color: '#333',
    },
    sectionTitle: {
        fontSize: 18,
        marginLeft: 15,
        marginTop: 20,
        marginBottom: 5,
        color: '#666',
    },
    card: {
        margin: 10,
        borderRadius: 10,
        elevation: 4,
        backgroundColor: "white",
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
    iconContainerWeak: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    transactionName: {
        fontSize: 16,
        color: '#333',
    },
    switchContainer: {
        padding: 5,
    },
    switchTrack: {
        width: 50,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        paddingHorizontal: 3,
    },
    switchThumb: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: 'white',
        elevation: 2,
    },
    languageSelection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    languageText: {
        marginRight: 5,
        color: '#666',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownContainer: {
        position: 'absolute',
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        elevation: 5,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
    },
    languageOption: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    languageOptionText: {
        fontSize: 16,
        color: '#333',
    },
    selectedLanguage: {
        backgroundColor: '#e6f7ff',
    },
    selectedLanguageText: {
        fontWeight: 'bold',
        color: '#0066cc',
    },
    versionText: {
        color: '#666',
        fontSize: 14,
    },
})

export default profileStyles;