import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, Modal, Pressable, Animated, ScrollView } from 'react-native';
import { Card } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useLanguage } from '../Languages/LanguageContente';
import { useTheme } from '@/components/ThemeContext';
import { profileStyles as styles} from '@/app/styles/profile.styles'

 
const Profile = () => {
    // Current language state (default to English)
    const {currentLanguage, setCurrentLanguage, getText} = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const switchAnim = useRef(new Animated.Value(theme === 'dark' ? 1 : 0)).current;

    function handleToggleTheme() {
        Animated.timing(switchAnim, {
            toValue: theme === 'dark' ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
        toggleTheme();
    }

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
        <ScrollView style={styles.container}>
            <Text style={styles.headerTitle}>{getText('profile')}</Text>
            
            {/* Categories Section */}
            <Text style={styles.sectionTitle}>{getText('category')}</Text>
            <Card style={styles.card}>
                <Link href={'/(profile)/categorias'}>
                    <Card.Content>
                        <View style={styles.transactionRow}>
                            <View style={styles.transactionInfo}>
                                <View style={[styles.iconContainerWeak, { backgroundColor: '#4CAF50' }]}>
                                    <Ionicons name="pricetag-outline" size={18} color="white" />
                                </View>
                                <Text style={styles.transactionName}>{getText('category')}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#666" />
                        </View>
                    </Card.Content>
                </Link>
            </Card>

            {/* Theme Toggle Section */}
            <Text style={styles.sectionTitle}>{getText('appearance')}</Text>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.transactionRow}>
                        <View style={styles.transactionInfo}>
                            <View style={[styles.iconContainerWeak, { backgroundColor: '#9C27B0' }]}>
                                <Ionicons name={theme === 'dark' ? "moon" : "sunny"} size={18} color="white" />
                            </View>
                            <Text style={styles.transactionName}>{getText('darkMode')}</Text>
                        </View>
                        <TouchableOpacity onPress={handleToggleTheme} style={styles.switchContainer}>
                            <Animated.View 
                                style={[
                                    styles.switchTrack, 
                                    { backgroundColor: switchAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['#e0e0e0', '#4CAF50']
                                    })}
                                ]}
                            >
                                <Animated.View 
                                    style={[
                                        styles.switchThumb,
                                        {
                                            transform: [{
                                                translateX: switchAnim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [0, 22]
                                                })
                                            }]
                                        }
                                    ]}
                                />
                            </Animated.View>
                        </TouchableOpacity>
                    </View>
                </Card.Content>
            </Card>

            {/* Language Selector */}
            <Text style={styles.sectionTitle}>{getText('language')}</Text>
            <Card style={styles.card}>
                <Card.Content>
                    <TouchableOpacity 
                        style={styles.transactionRow}
                        onPress={toggleLanguageDropdown}
                    >
                        <View style={styles.transactionInfo}>
                            <View style={[styles.iconContainerWeak, { backgroundColor: '#2196F3' }]}>
                                <Ionicons name="globe-outline" size={18} color="white" />
                            </View>
                            <Text style={styles.transactionName}>{getText('language')}</Text>
                        </View>
                        <View style={styles.languageSelection}>
                            <Text style={styles.languageText}>
                                {languageOptions.find(lang => lang.code === currentLanguage)?.name}
                            </Text>
                            <Ionicons name="chevron-down-outline" size={16} color="#666" />
                        </View>
                    </TouchableOpacity>
                </Card.Content>
            </Card>

            {/* About Section */}
            <Text style={styles.sectionTitle}>{getText('about')}</Text>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.transactionRow}>
                        <View style={styles.transactionInfo}>
                            <View style={[styles.iconContainerWeak, { backgroundColor: '#FF9800' }]}>
                                <Ionicons name="information-circle-outline" size={18} color="white" />
                            </View>
                            <Text style={styles.transactionName}>{getText('version')}</Text>
                        </View>
                        <Text style={styles.versionText}>1.0.0</Text>
                    </View>
                </Card.Content>
            </Card>

            {/* Language Dropdown Modal */}
            <Modal
                visible={showLanguageDropdown}
                transparent={true}
                animationType='fade'
                onRequestClose={() => setShowLanguageDropdown(false)}
            >
                <TouchableOpacity 
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={() => setShowLanguageDropdown(false)}
                >
                    <View style={styles.dropdownContainer}>
                        {languageOptions.map((lang) => (
                            <TouchableOpacity
                                key={lang.code}
                                style={[
                                    styles.languageOption,
                                    lang.code === currentLanguage && styles.selectedLanguage
                                ]}
                                onPress={() => changeLanguage(lang.code)}
                            >
                                <Text style={[
                                    styles.languageOptionText,
                                    lang.code === currentLanguage && styles.selectedLanguageText
                                ]}>
                                    {lang.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </ScrollView>
    );
}; 

export default Profile;