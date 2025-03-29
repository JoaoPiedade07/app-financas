import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, Dimensions, FlatList } from 'react-native';
import { Card } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useLanguage } from '../Languages/LanguageContente';

 
const Profile = () => {

    // Current language state (default to English)
    const {currentLanguage, setCurrentLanguage, getText} = useLanguage();

    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    // Language options with display names
    const languageOptions = [
        { code: 'en', name: 'English' },
        { code: 'pt', name: 'Português' },
        { code: 'es', name: 'Español' },
        { code: 'de', name: 'Deutsch' },
        { code: 'ja', name: '日本語' },
        { code: 'zh', name: '中文' },
        
    ];

    const toggleLanguageDropdown = () => {
        setShowLanguageDropdown(!showLanguageDropdown);
    };

    // Change language
    const changeLanguage = (langCode: string) => {
        setCurrentLanguage(langCode);
        setShowLanguageDropdown(false);
    };

    return (
        <View>
            <TouchableOpacity style={styles.profileIconContainer}>
                <Image 
                source={require('@/assets/images/logo.png')} 
                style={styles.profileIcon} 
            />
            </TouchableOpacity>
            <Text>{getText('name')}</Text>

            

            <Text style={styles.title}>{getText ('category')}</Text>
            <Card style={styles.card}>
                <Link href = { '/(profile)/categorias' }>
                    <Card.Content>
                        <View style={styles.transactionRow}>
                            <View style={styles.transactionInfo}>
                                <View style={[styles.iconContainerWeak, { backgroundColor: '#4CAF50' }]}>
                                    <Ionicons name="pricetag-outline" size={18} color="white" />
                                </View>
                                <Text style={styles.transactionName}>{getText ('category')}</Text>
                            </View>
                        </View>
                    </Card.Content>
                </Link>
            </Card>

            {/* Language Selector */}
        <View style = {styles.languageSelector}>
            <View style={styles.titleWithIcon}>
                <Ionicons name="globe-outline" size={20} color="#666" />
                <Text style={styles.titleText}>{getText('language')}</Text>
            </View>
        <TouchableOpacity 
            style = {styles.languageButton}
            onPress={toggleLanguageDropdown} >
            <Text>
                {languageOptions.find(lang => lang.code === currentLanguage)?.name} 
            </Text>
            <Ionicons name = "chevron-down-outline" size={16} color="#666" />
        </TouchableOpacity>

        {/* Language Dropdown Modal */}

        <Modal
            visible = {showLanguageDropdown}
            transparent = {true}
            animationType='fade'
            onRequestClose={() => setShowLanguageDropdown(false)}>
                <TouchableOpacity style = {styles.overlay}
                activeOpacity = {1}
                onPress = {() => setShowLanguageDropdown(false)}>
                    <View style = {styles.dropdownContainer}>
                        {languageOptions.map((lang) => (
                            <TouchableOpacity
                                key={lang.code}
                                style = {[styles.languageOption,
                                lang.code === currentLanguage && styles.selectedLanguage]}
                                onPress={() => changeLanguage(lang.code)}>
                                <Text style={styles.selectedLanguageText}>
                                    {lang.name}
                                </Text>
                            </TouchableOpacity>
                        ))}

                    </View>
                </TouchableOpacity>
            </Modal>
    </View>
            
        </View>
    );
}; 

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        padding: 10,
    },
    profileIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,  
    },
    profileIcon: {
        width: 120,
        height: 120,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#fff',
    },
    settingsIcon: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 10,
    },
    // Language selector styles
    languageSelector: {
        marginTop: 20,
        marginBottom: 10,
    },
    titleWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginTop: 10,
    },
    titleText: {
        fontSize: 18,
        marginLeft: 8,
        color: '#666',
    },
    languageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginHorizontal: 10,
        marginTop: 5,
    },
    dropdownContainer: {
        position: 'absolute',
        top: '30%',
        left: '10%',
        right: '10%',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    languageOption: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    selectedLanguage: {
        backgroundColor: '#e6f7ff',
    },
    selectedLanguageText: {
        fontWeight: 'bold',
        color: '#0066cc',
    },
    card: {
        margin: 10,
        borderRadius: 10,
        elevation: 4,
        backgroundColor: "white",
    },
    title: {
        fontSize: 18,
        marginLeft: 15,
        marginTop: 10,
        color: '#666',
    },
    iconContainerWeak: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        marginLeft: 0,
    },
    transactionName: {
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
        marginLeft: 5,
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
    transactionValue: {
        fontSize: 16,
        marginRight: 20,
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
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
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
        minWidth: 120,
        maxWidth: 200,
    },   
});

export default Profile;