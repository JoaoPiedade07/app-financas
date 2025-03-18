import React from 'react';
import { Tabs } from 'expo-router';
import { TabBar } from '@/components/TabBar';
import { Ionicons } from '@expo/vector-icons';
import TransactionProvider from '../Transactions/TransactionContent';
import { LanguageProvider, useLanguage } from '../Languages/LanguageContente';

export default function RootLayout() {
    return (
        <TransactionProvider>
            <LanguageProvider>
                <TabNavigator />
            </LanguageProvider>
        </TransactionProvider>
    );
};

// Separate component to use language context after it's initialized
function TabNavigator() {
    // Now this hook is used within the LanguageProvider
    const { getText } = useLanguage();
    
    return (
        <Tabs tabBar={props => <TabBar {...props} />}>
            <Tabs.Screen 
                name="home" 
                options={{
                    title: getText('home'),
                    headerShown: false, 
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }} 
            />
            <Tabs.Screen 
                name="finances" 
                options={{
                    title: getText('finances'),
                    headerShown: false, 
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="bar-chart-outline" size={size} color={color} />
                    ),
                }} 
            />
            <Tabs.Screen 
                name="budget" 
                options={{
                    title: getText('budget'),
                    headerShown: false, 
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list-outline" size={size} color={color} />
                    ),
                }} 
            />
            <Tabs.Screen 
                name="profile" 
                options={{
                    title: getText('profile'),
                    headerShown: false, 
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }} 
            />
        </Tabs>
    );
}